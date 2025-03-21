import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";
import "../global.css";
import { Platform } from "react-native";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />
        {/* <style
          id="expo-reset"
          dangerouslySetInnerHTML={{
            __html: `body,html{height:100%}#root{min-height:100%;display:flex}`,
          }}
        /> */}

        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body
        style={{
          fontFamily: Platform.select({
            android: "Poppins_900Black",
            ios: "Poppins-Black",
          }),
        }}
      >
        {children}
      </body>
    </html>
  );
}
