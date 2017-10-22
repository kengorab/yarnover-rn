# Yarnover

This repo is a rewrite of the [other app](https://github.com/kengorab/Yarnover) I had written using Kotlin, but this
time with [React Native](https://facebook.github.io/react-native/). It serves partly as an experiment on how quickly
(and with what degree of ease) I can achieve feature parity with the native Android app, but also because I want to
continue work on the app, but prefer the methodologies and component-based design that React Native brings to the table.
I also wanted to give [Reason](https://github.com/reasonml-community/bs-react-native) a shot, but I figured I'd stick to
just plain React for this one.

## Libraries Used

- React / React Native (obviously)
- Routing / Navigation: `react-navigation`
- Material Design components: `react-native-material-ui`
- SVG Drawing: `react-native-svg`
- Authentication / API Calls: See "Auth" section below
- Types: Flow (though these are used very sparingly, really only to provide some type-safety when using the Ravelry API)

## Note on OAuth

I need to perform oauth (1.0a) with the Ravelry API in order to make this app. For the original native Kotlin app, I
used the excellent [signpost](https://github.com/mttkay/signpost) and
[okhttp-signpost](https://github.com/pakerfeldt/okhttp-signpost) libraries to facilitate oauth and make signed http
requests, and I had a pretty great experience with them. In getting started with this app, I hoped there'd be something
similar. I gave a number a decent shot, including [`react-native-oauth`](https://github.com/fullstackreact/react-native-oauth),
and [`react-native-simple-auth`](https://github.com/adamjmcgrath/react-native-simple-auth), but none of them worked.
Maybe I messed something up and misused them, maybe the Ravelry OAuth is non-standard... I don't know! But I wished I
could have just used the signpost/okhttp-signpost implementation I had had such a great time with the first time around.

That's when I decided to explore the realm of writing native code in React Native. In my previous uses of React Native
(mostly pedagogical) I've stuck with the javascript side of things, digging into the native side (java and objective c)
only to explore what was happening under the hood. This time, I tried my hand at writing a javascript wrapper around
the signpost/okhttp-signpost flow; the result worked out very well. The `oauth/OAuthManager.js` file is the javascript
side of the implementation; the java side lives in the `OAuth10Module` in the `com.yarnover.oauth` package.

I know this solution only works for Android, and I'm okay with that. I have no interest in developing this app for iOS.

Eventually, I might pull out this implementation into a library and publish it on NPM.
