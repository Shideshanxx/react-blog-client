/**
 * 页面右下角的 回到顶部和反馈系统
 */

import React from 'react'
import { BackTop } from 'antd'
import { ArrowUpOutlined, BugOutlined } from '@ant-design/icons'
import './style.less'

const Side = () => {
  return (
    <div id='side'>
      <BackTop>
        <div className="action-btn">
          <ArrowUpOutlined style={{fontSize: 18}}/>
        </div>
      </BackTop>
      {/* 使用兔小巢第三方反馈系统 */}
      <div className="action-btn" style={{ cursor: 'pointer' }} onClick={() => window.open('https://support.qq.com/product/337454')}>
				<BugOutlined style={{fontSize: 18}}/>
			</div>
    </div>
  )
}

export default Side