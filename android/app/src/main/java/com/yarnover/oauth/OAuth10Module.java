package com.yarnover.oauth;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.yarnover.util.HttpUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import oauth.signpost.exception.OAuthCommunicationException;
import oauth.signpost.exception.OAuthExpectationFailedException;
import oauth.signpost.exception.OAuthMessageSignerException;
import oauth.signpost.exception.OAuthNotAuthorizedException;
import okhttp3.Call;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import se.akerfeldt.okhttp.signpost.OkHttpOAuthConsumer;
import se.akerfeldt.okhttp.signpost.OkHttpOAuthProvider;
import se.akerfeldt.okhttp.signpost.SigningInterceptor;

public class OAuth10Module extends ReactContextBaseJavaModule {
    private static final String PARAM_AUTH_KEY = "authKey";
    private static final String PARAM_SECRET_KEY = "secretKey";
    private static final String PARAM_REQ_TOKEN_URL_KEY = "requestTokenUrl";
    private static final String PARAM_ACCESS_TOKEN_URL_KEY = "accessTokenUrl";
    private static final String PARAM_AUTHORIZE_URL_KEY = "authorizeUrl";
    private static final String PARAM_CALLBACK_URL_KEY = "callbackUrl";

    private static final String TAG = "OAuth10ModuleTag";

    private Map<String, OAuthProvider> providers = new HashMap<>();
    private Map<String, OkHttpClient> httpClients = new HashMap<>();

    public OAuth10Module(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OAuth10Module";
    }

    @ReactMethod
    public void registerProvider(String providerName, ReadableMap providerParams, Callback callback) {
        String[] params = new String[]{PARAM_AUTH_KEY, PARAM_SECRET_KEY, PARAM_REQ_TOKEN_URL_KEY,
                PARAM_ACCESS_TOKEN_URL_KEY, PARAM_AUTHORIZE_URL_KEY, PARAM_CALLBACK_URL_KEY};
        boolean paramsValid = true;
        WritableArray missingParams = new WritableNativeArray();

        for (String param : params) {
            if (!providerParams.hasKey(param)) {
                paramsValid = false;
                missingParams.pushString(param);
            }
        }

        if (!paramsValid) {
            WritableMap err = new WritableNativeMap();
            err.putString("error", "Could not create provider named " + providerName);
            err.putString("reason", "Required parameters missing (see `missing` field)");
            err.putArray("missing", missingParams);
            callback.invoke(err);
        }
        if (providers.containsKey(providerName)) {
            WritableMap err = new WritableNativeMap();
            err.putString("error", "Could not create provider named " + providerName);
            err.putString("reason", "There is already a provider with that name");
            callback.invoke(err);
        }

        String authKey = providerParams.getString(PARAM_AUTH_KEY);
        String secretKey = providerParams.getString(PARAM_SECRET_KEY);
        String requestTokenUrl = providerParams.getString(PARAM_REQ_TOKEN_URL_KEY);
        String accessTokenUrl = providerParams.getString(PARAM_ACCESS_TOKEN_URL_KEY);
        String authorizeUrl = providerParams.getString(PARAM_AUTHORIZE_URL_KEY);
        String callbackUrl = providerParams.getString(PARAM_CALLBACK_URL_KEY);

        OkHttpOAuthConsumer consumer = new OkHttpOAuthConsumer(authKey, secretKey);
        OkHttpOAuthProvider provider = new OkHttpOAuthProvider(requestTokenUrl, accessTokenUrl, authorizeUrl);
        providers.put(providerName, new OAuthProvider(consumer, provider, callbackUrl));

        callback.invoke((Object) null);
    }

    @ReactMethod
    public void getAuthorizationUrl(String providerName, Promise promise) {
        if (!providers.containsKey(providerName)) {
            promise.reject("ENOPROVIDER", "There is no provider configured with name " + providerName);
            return;
        }

        OAuthProvider oAuthProvider = providers.get(providerName);
        try {
            String authorizationUrl = oAuthProvider.provider.retrieveRequestToken(oAuthProvider.consumer, oAuthProvider.callbackUrl);
            promise.resolve(authorizationUrl);
        } catch (OAuthMessageSignerException | OAuthCommunicationException | OAuthExpectationFailedException | OAuthNotAuthorizedException e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getAccessToken(String providerName, String oauthVerifier, Promise promise) {
        if (!providers.containsKey(providerName)) {
            promise.reject("ENOPROVIDER", "There is no provider configured with name " + providerName);
            return;
        }

        OAuthProvider oAuthProvider = providers.get(providerName);

        try {
            oAuthProvider.provider.retrieveAccessToken(oAuthProvider.consumer, oauthVerifier);
            String token = oAuthProvider.consumer.getToken();
            String tokenSecret = oAuthProvider.consumer.getTokenSecret();

            if (token == null || tokenSecret == null) {
                promise.reject("EFAILEDAUTH", "OAuth dance failed, either token or tokenSecret (or both) came back null");
                return;
            }

            registerSignedClient(providerName, oAuthProvider.consumer);

            WritableMap accessToken = new WritableNativeMap();
            accessToken.putString("token", token);
            accessToken.putString("tokenSecret", tokenSecret);
            promise.resolve(accessToken);
        } catch (OAuthMessageSignerException | OAuthNotAuthorizedException | OAuthCommunicationException | OAuthExpectationFailedException e) {
            promise.reject(e);
        }
    }

    private void registerSignedClient(String providerName, OkHttpOAuthConsumer consumer) {
        OkHttpClient httpClient = new OkHttpClient.Builder()
                .addInterceptor(new SigningInterceptor(consumer))
                .build();
        httpClients.put(providerName, httpClient);
    }

    @ReactMethod
    public void registerSignedClient(String providerName, String token, String tokenSecret, Promise promise) {
        if (!providers.containsKey(providerName)) {
            promise.reject("ENOPROVIDER", "There is no provider configured with name " + providerName);
            return;
        }
        OAuthProvider oAuthProvider = providers.get(providerName);

        OkHttpOAuthConsumer consumer = oAuthProvider.consumer;
        consumer.setTokenWithSecret(token, tokenSecret);

        registerSignedClient(providerName, consumer);
        promise.resolve(null);
    }

    @ReactMethod
    public void makeAuthenticatedRequest(String providerName, final String url, final String method, ReadableMap headers, String body, final Promise promise) {
        if (!httpClients.containsKey(providerName)) {
            promise.reject("ENOCLIENT", "There is no authenticated client for provider: " + providerName);
            return;
        }
        OkHttpClient client = httpClients.get(providerName);

        RequestBody requestBody = null;
        if (body != null) {
            requestBody = RequestBody.create(MediaType.parse("application/json"), body);
        }

        Headers.Builder headersBuilder = new Headers.Builder();
        for (Map.Entry<String, Object> entry : headers.toHashMap().entrySet()) {
            headersBuilder.add(entry.getKey(), (String) entry.getValue());
        }

        Request request = new Request.Builder()
                .method(method.toUpperCase(), requestBody)
                .headers(headersBuilder.build())
                .url(url)
                .build();

        client.newCall(request).enqueue(new okhttp3.Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "Request to " + method + " " + url + " failed", e);
                promise.reject(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                WritableMap res = HttpUtils.responseToReact(response);
                promise.resolve(res);
            }
        });
    }
}
