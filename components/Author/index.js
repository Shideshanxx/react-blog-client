import {Avatar, Divider} from 'antd';
import './style.css';

const Author = function() {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="http://cdn.zjutshideshan.cn/image/landscape_art_road.jpg" />
            </div>
            <div className="author-introduction">
                IT界的吴彦祖，专注于WEB和移动端前端开发。
                <Divider>联系站主</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />
            </div>
        </div>
    )
}

export default Author;