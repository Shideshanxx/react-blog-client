import PropTypes from 'prop-types'
import { List } from 'antd';
import Link from 'next/link';
import {FolderOutlined, CalendarOutlined, FireOutlined} from '@ant-design/icons';

import moment from 'moment';
moment.locale('zh-cn');

const ArticleList = (props) => {
    return (
        <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={props.data}
              renderItem={item=>(
                <List.Item key={item.id}>
                  <div className="list-title">
                    <Link href={{pathname: '/detail',query:{id:item.id}}}><a>{item.title}</a></Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined/> {moment(item.createTime).format('YYYY-MM-DD HH:mm')}</span>
                    <span><FolderOutlined/> {item.typeName} </span>
                    <span><FireOutlined/> {item.viewCount} 人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />
        </div>
    )
}

ArticleList.propTypes = {

}

export default ArticleList;