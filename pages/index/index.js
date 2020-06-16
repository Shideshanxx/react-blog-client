import React, { useState } from 'react';
import Head from 'next/head';
import {Row,Col} from 'antd';
import { connect } from 'react-redux';
import Header from '@/components/Header';
import Author from '@/components/Author';
import Advert from '@/components/Advert';
import Footer from '@/components/Footer';
import ArticeList from '@/components/ArticleList';

import serviceApi from '@/config/service';
import request from '@/public/utils/request';

const Home = (props) => {
  const [articleListInfo, setArticleListInfo] = useState(props.list)

  return (
    <div className="container">
      <Head>
        <title>MyBlog</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} xxl={10}>
            <ArticeList
              typeTag
              loading={props.listLoading}
              data={articleListInfo}
            />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} xxl={3}>
            <Author/>
            <Advert/>
        </Col>
      </Row>
      <Footer/>
    </div>
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
  return {list};
}

const stateToProps = (state) => {
	return {
		listLoading: state.getArticleListLoading
	}
}

export default connect(stateToProps, null)(Home)
