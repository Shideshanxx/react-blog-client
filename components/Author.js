import {Avatar, Divider} from 'antd';
import {GithubOutlined,QqOutlined,WechatOutlined} from '@ant-design/icons';
import '../public/style/components/author.css';

const Author = function() {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="http://cdn.zjutshideshan.cn/image/landscape_art_road.jpg" />
            </div>
            <div className="author-introduction">
                IT界的吴彦祖，专注于WEB和移动端前端开发。
                <Divider>社交帐号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                <Avatar size={28} icon={<QqOutlined />}  className="account" />
                <Avatar size={28} icon={<WechatOutlined />}  className="account"  />
            </div>
        </div>
    )
}

export default Author;