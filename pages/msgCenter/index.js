import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Card, Affix, Spin, Avatar } from 'antd'
import classnames from 'classnames'
import request from '@/public/utils/request'
import serviceApi from '@/config/service'
import './style.less'
// import LazyImg from '@/components/LazyImg'
import MsgList from '@/components/MsgList'
import { connect } from 'react-redux'

const MsgPage = (props) => {
    const [tabKey, setTabKey] = useState(0)
    const [dataList, setDataList] = useState([])

    const navData = [
		{
			icon: 'bell',
			key: 0,
			text: '全部消息'
		},
		{
			icon: 'mail',
			key: 12,
			text: '回复我的'
		},
		{
			icon: 'like',
			key: 34,
			text: '收到的赞'
		},
		{
			icon: 'heart',
			key: 5,
			text: '粉丝关注'
		},
		{
			icon: 'sound',
			key: 6,
			text: '系统通知'
		}
	]
    
    useEffect(() => {
		getMsgList(tabKey)
    }, [])
    
    const getMsgList = (type) => {
		request(serviceApi.getMsgList,{
			method: 'get',
			params: { type: type == 0 ? null : type}
		}).then(res=>{
			setDataList(res.data)

			request(serviceApi.getMsg).then(ress=>{
				props.changeMsg(ress.data)
			})
		})
    }
    
    // 切换消息类型
	const tabKeyChang = (key) => {
		setTabKey(key)
		getMsgList(key)
    }
    
    // 格式化标题
	const formatTitle = (key) =>{
		return navData.filter(item=>{
			return item.key == key
		})[0]
	}

    return (
        <>
            <Head>
				<title>消息中心 | Younster_Shi's Blog</title>
			</Head>
            <>
                <Row className="msg-page">
                    {/* 这里分两份代码 pc 和移动 这样子最省事 */}
                    {/* PC端 */}
					<Col xs={0} sm={0} md={0} lg={5} xl={5} className="left-nav-box" style={{ paddingRight: 24 }}>
						<Affix offsetTop={68}>
							<Card bordered={false}>
								<ul className="left-nav-list">
									{
										navData.map(item => (
											<li key={item.key} className={tabKey == item.key ? 'active' : ''} onClick={() => tabKeyChang(item.key)}>
												<Icon type={item.icon} /> {item.text}
											</li>
										))
									}
								</ul>
							</Card>
						</Affix>
					</Col>
                    {/* 移动端不用固定 */}
					<Col xs={24} sm={24} md={0} lg={0} xl={0} className="left-nav-box" >
						<Card
							style={{ marginBottom: 20 }}
							bordered={false}
						>
							<ul className="left-nav-list">
									{
										navData.map(item => (
											<li key={item.key} className={tabKey == item.key ? 'active' : ''} onClick={() => tabKeyChang(item.key)}>
												<Icon type={item.icon} /> {item.text}
											</li>
										))
									}
								</ul>
						</Card>
					</Col>

                    {/* 列表 */}
					<Col id='left-box' xs={24} sm={24} md={24} lg={19} xl={19} >
						<div className={classnames('data-list')}>
							<Card
								bordered={false} 
								title={
									<>
										<Icon type={formatTitle(tabKey).icon} className="search-result-icon" style={{ color: '#1890ff', marginRight: 10 }} />
										{formatTitle(tabKey).text}
									</>
								}
							>
								<Spin spinning={props.getMsgListLoading}>
									<MsgList data={dataList} />
								</Spin>
							</Card>
						</div>
					</Col>
                </Row>
            </>
        </>
    )
}

const stateToProps = (state) => {
	return {
		msgData: state.msgData,
		getMsgListLoading: state.getMsgListLoading
	}
}

const dispatchToProps = (dispatch) => {
	return {
		changeMsg(obj) {
			dispatch({
				type: 'changeMsg',
				payload: obj
			})
		}
	}
}

export default connect(stateToProps, dispatchToProps)(MsgPage)
