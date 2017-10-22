package com.yarnover.oauth;

import se.akerfeldt.okhttp.signpost.OkHttpOAuthConsumer;
import se.akerfeldt.okhttp.signpost.OkHttpOAuthProvider;

public class OAuthProvider {
    public final OkHttpOAuthConsumer consumer;
    public final OkHttpOAuthProvider provider;
    public final String callbackUrl;

    public OAuthProvider(OkHttpOAuthConsumer consumer, OkHttpOAuthProvider provider, String callbackUrl) {
        this.consumer = consumer;
        this.provider = provider;
        this.callbackUrl = callbackUrl;
    }
}
