import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, Breadcrumb,Affix } from 'antd';
import {CalendarOutlined,FolderOutlined,FireOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import Author from '@/components/Author';
import Advert from '@/components/Advert';
import Footer from '@/components/Footer';
import './style.css';

import ReactMarkdown from 'react-markdown';
// 引入markdown-navbar及其样式
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import serviceApi from '@/config/service';
import request from '@/public/utils/request';


const Detail = (props) => {

  const [info, setInfo] = useState(props.articleInfo)
  let markdown = info ? info.content : '没有数据';

  return (
    <div className="container">
      <Head>
        <title>Detail</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} xxl={10}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>xxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                React实战视屏教程-Hooks开发（第10集）
                </div>
              <div className="list-icon center">
                <span><CalendarOutlined/> 2020-05-20</span>
                <span><FolderOutlined/> 视屏教程 </span>
                <span><FireOutlined/> 5000 人</span>
              </div>
              <div className="detailed-content">
                {/* escapeHtml={false}表示markdown里面的html代码不进行转换 */}
                <ReactMarkdown
                  source={markdown}
                  escapeHtml={false}
                />
              </div>
            </div>

          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} xxl={3}>
            <Author/>
            <Advert/>
            <Affix offsetTop={5}>
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                {/* headingTopOffset表示点击navmarkdow滚动后距离顶部的距离；ordered表示nav列表是否要带编号 */}
                <MarkNav
                  className="article-menu"
                  source={markdown}
                  headingTopOffset={0}
                  ordered={false}
                />
              </div>
            </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Detail.getInitialProps = async (context) => {
  const promise = new Promise((resolve) => {
    request(serviceApi.getArticleInfo, {
      method: 'get',
      params: { id: context.query.id }
    }).then((res) => {
      resolve(res.data[0])
    })
  })

  let articleInfo = await promise;

  return {articleInfo}
}

export default Detail
