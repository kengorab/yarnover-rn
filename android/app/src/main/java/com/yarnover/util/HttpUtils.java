package com.yarnover.util;

import android.util.Log;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import okhttp3.Response;

public class HttpUtils {
    private static final String TAG = "HttpUtilsTag";

    public static WritableMap responseToReact(Response response) {
        WritableMap res = new WritableNativeMap();
        res.putBoolean("ok", response.isSuccessful());
        res.putInt("status", response.code());

        WritableMap headers = new WritableNativeMap();
        Map<String, List<String>> resHeaders = response.headers().toMultimap();
        for (Map.Entry<String, List<String>> entry : resHeaders.entrySet()) {
            WritableArray headerValues = new WritableNativeArray();
            for (String value : entry.getValue()) {
                headerValues.pushString(value);
            }
            headers.putArray(entry.getKey(), headerValues);
        }
        res.putMap("headers", headers);

        String jsonString;
        try {
            jsonString = response.body().string();
        } catch (IOException e) {
            Log.w(TAG, "Couldn't decode response body to JSON string; returning with no body or bodyRaw", e);

            res.putBoolean("ok", false);
            res.putNull("body");
            res.putNull("bodyRaw");
            return res;
        }

        try {
            JSONObject json = new JSONObject(jsonString);
            WritableMap responseBody = JSONUtils.jsonToReact(json);
            res.putMap("body", responseBody);
            res.putNull("bodyRaw");
        } catch (JSONException e) {
            Log.w(TAG, "Couldn't decode JSON string into WritableMap; returning with bodyRaw", e);
            res.putNull("body");
            res.putString("bodyRaw", jsonString);
        }

        return res;
    }
}
