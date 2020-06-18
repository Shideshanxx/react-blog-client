import React, { Component } from 'react';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';
import BottomRight from '../BottomRight';
import dynamic from 'next/dynamic';
const MusicPlayer = dynamic(import('../MusicPlayer'), { ssr: false })
import './style.less';

const Layout = (props) => {
    return (
        <>
            <Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi" />
			</Head>

            <div id="box">
				<Header />
				<div id="content" className="wrap">
					{props.children}
					<BottomRight />
                    {/* id 是歌单的id */}
					<MusicPlayer id="705619441" />
				</div>
				<Footer />
			</div>
        </>
    )
}

export default Layout;