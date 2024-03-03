import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add your custom head content here */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="img/icons8-beach-bubbles-96.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="img/icons8-beach-bubbles-96.png"
          />
          {/* Add other icon sizes if needed */}
          {/* Add other custom head elements here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
