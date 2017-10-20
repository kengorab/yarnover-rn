package com.yarnover.modules;

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

import java.util.HashMap;
import java.util.Map;

import oauth.signpost.exception.OAuthCommunicationException;
import oauth.signpost.exception.OAuthExpectationFailedException;
import oauth.signpost.exception.OAuthMessageSignerException;
import oauth.signpost.exception.OAuthNotAuthorizedException;
import okhttp3.OkHttpClient;
import se.akerfeldt.okhttp.signpost.OkHttpOAuthConsumer;
import se.akerfeldt.okhttp.signpost.OkHttpOAuthProvider;
import se.akerfeldt.okhttp.signpost.SigningInterceptor;

public class OAuth10Module extends ReactContextBaseJavaModule {
    private class OAuthProvider {
        final OkHttpOAuthConsumer consumer;
        final OkHttpOAuthProvider provider;
        final String authKey;
        final String secretKey;
        final String requestTokenUrl;
        final String accessTokenUr;
        final String authorizeUrl;
        final String callbackUrl;

        OAuthProvider(
                OkHttpOAuthConsumer consumer,
                OkHttpOAuthProvider provider,
                String authKey,
                String secretKey,
                String requestTokenUrl,
                String accessTokenUr,
                String authorizeUrl,
                String callbackUrl) {
            this.consumer = consumer;
            this.provider = provider;
            this.authKey = authKey;
            this.secretKey = secretKey;
            this.requestTokenUrl = requestTokenUrl;
            this.accessTokenUr = accessTokenUr;
            this.authorizeUrl = authorizeUrl;
            this.callbackUrl = callbackUrl;
        }
    }

    private static final String PARAM_AUTH_KEY = "authKey";
    private static final String PARAM_SECRET_KEY = "secretKey";
    private static final String PARAM_REQ_TOKEN_URL_KEY = "requestTokenUrl";
    private static final String PARAM_ACCESS_TOKEN_URL_KEY = "accessTokenUrl";
    private static final String PARAM_AUTHORIZE_URL_KEY = "authorizeUrl";
    private static final String PARAM_CALLBACK_URL_KEY = "callbackUrl";

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
    public void registerProvider(
            String providerName,
            ReadableMap providerParams,
            Callback callback
    ) {
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
        providers.put(providerName, new OAuthProvider(consumer, provider, authKey, secretKey,
                requestTokenUrl, accessTokenUrl, authorizeUrl, callbackUrl));

        callback.invoke((Object) null);
    }

    @ReactMethod
    public void getAuthorizationUrl(
            String providerName,
            Promise promise
    ) {
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
    public void getAccessToken(
            String providerName,
            String oauthVerifier,
            Promise promise
    ) {
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

            OkHttpClient httpClient = new OkHttpClient.Builder()
                    .addInterceptor(new SigningInterceptor(oAuthProvider.consumer))
                    .build();
            httpClients.put(providerName, httpClient);

            WritableMap accessToken = new WritableNativeMap();
            accessToken.putString("token", token);
            accessToken.putString("tokenSecret", tokenSecret);
            promise.resolve(accessToken);
        } catch (OAuthMessageSignerException | OAuthNotAuthorizedException | OAuthCommunicationException | OAuthExpectationFailedException e) {
            promise.reject(e);
        }
    }
}
