import React, { useState, useEffect } from 'react';
import './style.less';
import Head from 'next/head';
import { Row, Col, Affix, Typography, Divider, Card, Avatar, Badge, Popover } from 'antd';
import dynamic from 'next/dynamic';
const LazyImg = dynamic(import('@/components/LazyImg'))
import Link from 'next/link';
import Tocify from '@/components/Tocify/index.tsx';
import Reward from '@/components/Reward';

import classnames from 'classnames';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';
import renderMathInElement from '@/public/utils/autorender.js';

import serviceApi from '@/config/service';
import request from '@/public/utils/request';
import Router from 'next/router'
import moment from 'moment';
moment.locale('zh-cn');

const { Title } = Typography

const Detail = (props) => {
  // markdown目录
  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  // markdown目录
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer, // 这个是必须填写的，也可以通过自定义的 style={{marginRight:10}}Renderer渲染出自定义的格式
    gfm: true, // 采用github风格
    pedantic: false, // 容错
    sanitize: false, // 是否忽视html渲染
    tables: true, // 是否允许输出github样式的表格
    breaks: false, // 是否允许github样式的换行符
    smartLists: true, // 是否自动渲染列表
    smartypants: true,
    highlight: function (code) {
      // 自动高亮
      return hljs.highlightAuto(code).value
    }
  })
  hljs.configure({ useBR: true });

  const [info, setInfo] = useState(props.articleInfo)
  const [likeCount, setLikeCount] = useState(0)
  const [likeState, setLikeState] = useState(false)

  // 广告
  const [advert, setAdvert] = useState([
    {
      link: '',
      url: 'http://cdn.zjutshideshan.cn/advertisement.jfif'
    }
  ])

  let markdown = info ? info.content : '没有数据';

  let html = marked(markdown)

  useEffect(() => {
    if (process.browser) {
      document.onload = renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: "block" },
          { left: "$", right: "$", display: "inblock" }
        ]
      })
    }
  }, [])

  // 文章点赞
  const clickLike = () => {
    // 权限校验
    if (!isLogin()) {
      message.warning('靓仔，请先登录哦！')
      return false
    }
    
    request(serviceApi.articleClickLike, {
      method: 'get',
      params: {
        id: info.id,
      }
    }).then((res) => {
      if(res && res.code == 200){
        getLikestatus(info.id)
        message.success(res.msg)
      }
    })
  }

  // 获取文章的点赞状态
  const getLikestatus = (id) =>{
    request(serviceApi.getLikeStatus, {
      method: 'get',
      params: {
        id,
      }
    }).then((res) => {
      if(res && res.code == 200){
          setLikeCount(res.data.count)
        if(res.data.status === '1'){
          setLikeState(true)
        }else{
          setLikeState(false)
        }
      }
    })
  }

  return (
    <>
      <Head>
        <title>{info.title}</title>
      </Head>
      
      <div className="detail-box">
        <div className="info">
          <Title>{info.title}</Title>

          <div className="user-nav">
            <Link href={{ pathname: '/userCenter', query: { id: info.userId } }}>
              <a style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Avatar src={info.avatar} style={{ marginRight: 5 }} />
                {info.userName}
              </a>
            </Link>
            <Divider type="vertical" />
            {moment(info.createTime).startOf('hour').fromNow()} <Divider type="vertical" />
              阅读 {info.viewCount}
            <Divider type="vertical" />
              点赞 {likeCount}
          </div>
        </div>

        <Divider />

        <Row type="flex" justify="center">

          {/* 文章分享 */}
          <Col lg={1} xl={1} className="left-side">
            <Affix offsetTop={120}>
              <Card bodyStyle={{ padding: 0 }} title={null} bordered={false} className="left-card">

                <a onClick={clickLike} className={classnames({ 'active': likeState })}>
                  <Badge count={likeCount} >
                    <Avatar shape="square" size={28} icon="like" style={likeState ? { backgroundColor: '#ffc7ba' } : null} className={classnames("contact-icon")} />
                  </Badge>
                </a>

                <Popover placement="right" title="分享到" content={(
                  <>
                    <a href={`http://service.weibo.com/share/share.php?url=http://shideshan.cn${Router.router && Router.router.asPath}?sharesource=weibo&title=${info.title}&pic=${info.cover}&appkey=2706825840`} target="_blank" style={{ marginRight: 10 }}>
                      <Avatar shape="square" size={28} icon="weibo-circle" style={{ backgroundColor: '#f9752f' }} className={classnames("contact-icon")} title="分享到微博" />
                    </a>

                    <a href={`http://connect.qq.com/widget/shareqq/index.html?url=http://shideshan.cn${Router.router && Router.router.asPath}&sharesource=qzone&title=${info.title}&pics=${info.cover}&summary=${info.introduce}&desc=${info.title}`} target="_blank" style={{ marginRight: 10 }}>
                      <Avatar shape="square" size={28} icon="qq" style={{ backgroundColor: '#25c5fd' }} className={classnames("contact-icon")} title="分享到QQ" />
                    </a>

                    {/* 微信太麻烦 暂时不弄 */}
                    {/* <a href="" target="_blank" style={{ marginRight: 10 }}>
                        <Avatar shape="square" size={28} icon="wechat" style={{ backgroundColor: '#2bad13' }} className={classnames("contact-icon")} title="分享到微信" />
                      </a> */}

                  </>
                )}>
                  <Avatar shape="square" size={28} icon="share-alt" className={classnames("contact-icon share")} />
                </Popover>

              </Card>
            </Affix>
          </Col>

          {/* 博客主体内容 */}
          <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
            <div className="content-box">
              <div className="detailed-content">
                <div dangerouslySetInnerHTML={{ __html: html }} ></div>
                <Reward userId={info && info.userId ? info.userId : null} />
              </div>
              
            </div>
          </Col>

          <Col xs={0} sm={0} md={0} lg={5} xl={5} xxl={5}>
            {
              advert && advert.length ? advert.map((item, index) => (
                <Card
                  style={{ marginBottom: 24 }}
                  bordered={false}
                  key={index}
                >
                  <p style={{ fontWeight: 'bold' }}>广告</p>
                  <a href={item.link}>
                    <LazyImg src={item.url} />
                  </a>
                </Card>
              )) : null
            }
            {
              tocify && tocify.tocItems && tocify.tocItems.length
                ?
                <Affix offsetTop={60}>
                  <div className="detailed-nav comm-box">
                    <div className="nav-title">
                      {/* <Icon type="read" style={{ marginRight: 10 }} /> */}
                          目录
                      </div>
                    <div className="toc-list" style={{ maxHeight: 500, overflowY: 'auto' }}>
                      {tocify && tocify.render()}
                    </div>
                  </div>
                </Affix> : null
            }
          </Col>
        </Row>
      </div>
    </>
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

  return { articleInfo }
}

export default Detail
