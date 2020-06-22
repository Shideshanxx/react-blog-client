import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import classnames from 'classnames';
import dynamic from 'next/dynamic';

import Author from '@/components/Author';
const ArticleList = dynamic(import('@/components/ArticleList'));
const LazyImg = dynamic(import('@/components/LazyImg'))

import serviceApi from '@/config/service';
import request from '@/public/utils/request';

import './style.less';

const Home = (props) => {
  // 文章列表
  const [articleList, setArticleList] = useState(props.list)

  // 广告
  const [advert, setAdvert] = useState([
    {
      link: '',
      url: 'http://cdn.zjutshideshan.cn/advertisement.jfif'
    }
  ])

  // tabkey(最新、最热)
  const [tabKey, setTabKey] = useState('0')

  // 页数
  const [page, setPage] = useState(1)
  const [isNoData, setIsNoData] = useState(false)

  const operationTabList = [
    {
      key: '0',
      tab: (
        <span>
          最 新
        </span>
      ),
    },
    {
      key: '1',
      tab: (
        <span>
          热 门
        </span>
      ),
    },
  ];

  // 最新/最热 切换
  const tabKeyChang = (key) => {
    setTabKey(key)
    setPage(1)
    setIsNoData(false)

    request(serviceApi.getArticleList, {
      method: 'get',
      params: {
        id: key,
        page: 1,
        limit: 5,
      }
    }).then((res) => {
      setArticleList(res ? res.data : [])
    })
  }

  // 加载更多
  const loadMore = () => {
    setPage(page + 1)

    request(serviceApi.getArticleList, {
      method: 'get',
      params: {
        id: tabKey,
        page: page + 1,
        limit: 5,
      }
    }).then((res) => {
      if (!res.data.length) {
        setIsNoData(true)
        return
      }

      setArticleList([].concat(articleList, res.data))
    })
  }

  return (
    <>
      <Head>
        <title>首页 | Younster_Shi's Blog</title>
        <link rel="shortcut icon" href="../../public/favicon.ico"></link>
      </Head>

      <div className={classnames('wrap content-box')}>
        <Row>
          {/* 列表 */}
          <Col xs={24} sm={24} md={24} lg={18} xl={18} id='left-box'>
            <div className={classnames('list-nav')}>
              <Card
                bordered={false}
                tabList={operationTabList}
                activeTabKey={tabKey}
                onTabChange={tabKeyChang}
              >
                <ArticleList
                  loadMore={loadMore}
                  isNoData={isNoData}
                  typeTag
                  loading={props.listLoading}
                  data={articleList}
                />
              </Card>
            </div>
          </Col>


          <Col xs={0} sm={0} md={0} lg={6} xl={6}>
            {/* 博主信息 */}
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <Author />
            </Card>

            {/* 广告位 */}
            <>
              {
                advert && advert.length ? advert.map((item, index) => (
                  <Card
                    style={{ marginTop: 24 }}
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
            </>

          </Col>
        </Row>
      </div>
    </>
  )
}

Home.getInitialProps = async () => {
  const promise1 = new Promise((resolve) => {
    request(serviceApi.getArticleList, {
      method: 'get',
      params: { id: 0, page: 1, limit: 5 }
    }).then((res) => {
      resolve(res ? res.data : [])
    })
  })

  let list = await promise1;
  return { list };
}

const stateToProps = (state) => {
  return {
    listLoading: state.getArticleListLoading
  }
}

export default connect(stateToProps, null)(Home)
