import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { Provider } from "react-redux";
import "../styles/globals.css";
import "antd/dist/antd.css";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store.js";
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
          <script
            async
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&token=130458&libraries=places&v=weekly`}
          />
          <link
            href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}
if (process.env.NODE_ENV !== "production") {
  Router.events.on("routeChangeComplete", () => {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]'
    );
    const timestamp = new Date().valueOf();
    for (let i = 0; i < els.length; i++) {
      if (els[i].rel === "stylesheet") {
        els[i].href = "/_next/static/css/styles.chunk.css?v=" + timestamp;
        break;
      }
    }
  });
}
const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
