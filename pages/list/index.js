import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { Row, Col, Icon, Card } from 'antd'
import classnames from 'classnames'
import request from '@/public/utils/request'
import serviceApi from '@/config/service'
import dynamic from 'next/dynamic'

const ArticleList = dynamic(import('@/components/ArticleList'))
const LazyImg = dynamic(import('@/components/LazyImg'))
import './style.less'

const ListPage = (props) => {
	const [listData, setListData] = useState(props.articleList)
	const [tabKey, setTabKey] = useState(props.tabIndex)
	const [advert, setAdvert] = useState([
		{
			title: '广告位',
			link: '',
			url: 'http://cdn.zjutshideshan.cn/advertisement.jfif'
		}
	])

	// 页数
	const [page, setPage] = useState(1)
	const [loadMoreLoading, setLoadMoreLoading] = useState(false)
	const [isNoData, setIsNoData] = useState(false)
	const [listSort, setListSort] = useState(true)

	useEffect(() => {
		queryLsit(props.tabIndex, 1, 5, listSort).then((res) => {
			setListData(res.data)
		})
		setTabKey(props.tabIndex)
	}, [props.tabIndex])

	// 切换排序
	const listSortFn = () => {
		queryLsit(tabKey, 1, 5, !listSort).then((res) => {
			setListData(res.data)
			setLoadMoreLoading(false)
		})

		setListSort(!listSort)
		setPage(1)
		setLoadMoreLoading(true)
	}

	/**
	  * 查询列表方法
	  * @description: 公用查询列表方法
	  * @param { type page limit listSort }
	  * @return: 文章列表/用户列表
	  */
	const queryLsit = (tabKey, page, limit, listSort) => {
		return new Promise((resolve, reject) => {
			request(serviceApi.getTypeList, {
				method: 'get',
				params: {
					type: tabKey === '0' ? null : tabKey,
					page: page,
					limit: limit,
					sort: listSort ? 0 : 1
				}
			}).then((res) => {
				resolve(res)
			})
		})
	}

	// 加载更多
	const loadMore = () => {
		setPage(page + 1)
		setLoadMoreLoading(true)

		queryLsit(tabKey, page + 1, 5, listSort).then((res) => {
			if (!res.data.length) {
				setLoadMoreLoading(false)
				setIsNoData(true)
				return
			}
			setListData([].concat(listData, res.data))
			setLoadMoreLoading(false)
		})
	}

	// 切换tab
	const tabKeyChang = (key) => {
		queryLsit(key, 1, 5, listSort).then((res) => {
			setListData(res.data)
			setLoadMoreLoading(false)
		})

		setPage(1)
		setLoadMoreLoading(true)
		setIsNoData(false)
		setTabKey(key)

	}

	const operationTabList = [
		{
			key: '0',
			tab: (
				<span>
					全部
				</span>
			),
		},
		{
			key: '1',
			tab: (
				<span>
					<Icon type="experiment" />
					技术
				</span>
			),
		},
		{
			key: '2',
			tab: (
				<span>
					<Icon type="camera" />
					摄影
				</span>
			),
		},
		{
			key: '3',
			tab: (
				<span>
					<Icon type="coffee" />
					生活
				</span>
			),
		},
	];

	return (
		<>
			<Head>
				<title>文章 | Younster_Shi's Blog</title>
			</Head>

			<>
				<Row>
					{/* 列表 */}
					<Col id='left-box' xs={24} sm={24} md={24} lg={18} xl={18} >
						<div className={classnames('list-nav')}>
							<Card
								bordered={false}
								tabList={operationTabList}
								activeTabKey={tabKey}
								onTabChange={tabKeyChang}
								tabBarExtraContent={
									<span onClick={listSortFn} className="switch-btn">
										<Icon type="swap" style={{ color: '#1890ff', marginRight: 10 }} />
										切换为
										{
											listSort ? '热门排序' : '时间排序'
										}
									</span>
								}
							>
								<ArticleList
									loadMore={loadMore}
									isNoData={isNoData}
									loading={loadMoreLoading}
									data={listData}
								/>
							</Card>
						</div>
					</Col>

					<Col xs={0} sm={0} md={0} lg={6} xl={6} style={{ paddingLeft: 24 }}>

						{/* 广告位 */}
						<div className="advert-list">
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
						</div>
					</Col>
				</Row>

			</>
		</>
	)
}

ListPage.getInitialProps = async (context) => {
	let tabIndex = context.query.type;

	return { tabIndex }
}

export default ListPage
