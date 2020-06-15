import App from 'next/app';
import 'antd/dist/antd.css';
import '@/public/style/global.css';
import { Provider } from 'react-redux';
import store from '@/store'
import NProgress from 'nprogress'
import Router from 'next/router'
import 'nprogress/nprogress.css'

//声明一个MyApp组件，然后这个组件用Provider进行包裹 react-redux。

export default class MyApp extends App {
    state = {}

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

Router.events.on('routeChangeStart', (...args) => {
    NProgress.start();
})

Router.events.on('routeChangeComplete', (...args) => {
    NProgress.done();
})

Router.events.on('routeChangeError', (...args) => {
    NProgress.done();
})