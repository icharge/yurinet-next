import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import JssProvider from 'react-jss/lib/JssProvider';
import NProgress from 'nprogress';
import getPageContext from '../lib/getPageContext';
import store from '../store';
import Layout from '../layout';

import 'semantic-ui-css/semantic.min.css';

Router.events.on('routeChangeStart', (url) => {
  // console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();

  /**
   * !!Workaround!! : Style not loaded by import for each page on Dev ENV.
   * 
   * @link https://github.com/zeit/next-plugins/issues/282#issuecomment-432127816
   */
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
    const timestamp = new Date().valueOf();
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
});
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx,
    ctx: {
      store,
      isServer,
    },
  }) {
    return {
      pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };
  }

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>YuriNET 2</title>
        </Head>

        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
          <Provider store={store}>
            {
              pageProps.layout !== false ?
                <Layout>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </Layout>
                :
                <Component pageContext={this.pageContext} {...pageProps} />
            }
          </Provider>
        </JssProvider>

        {/* <Provider store={store}>
          <Component {...pageProps} />
        </Provider> */}
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);
