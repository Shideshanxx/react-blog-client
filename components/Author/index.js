import {Avatar, Divider, Popover} from 'antd';
import classnames from 'classnames'
import './style.less';
import IconFont from '@/components/IconFont'
import { useState } from 'react';

const Author = function() {
    const [contact, setContect] = useState([{icon: 'github',type:'github',link: 'https://github.com/Shideshanxx',code:''},{icon: 'qq',type: 'qq',link: '',code:'http://cdn.zjutshideshan.cn/myqq.png'},{icon: 'wechat',type: 'wx',link: '',code:'http://cdn.zjutshideshan.cn/myWx.JPG'}])

    const switchType = (type) => {
		switch (type) {
			case 'bilibili':
				return (
					<Avatar size={28} className={classnames("contact-icon bilibili")}>
						<IconFont type="iconbilibili-line" />
					</Avatar>
				)
			case 'weibo':
				return (
					<Avatar size={28} icon="weibo-circle" className={classnames("contact-icon weibo")} />
				)
			case 'github':
				return (
					<Avatar size={28} icon="github" className={classnames("contact-icon github")} />
				)
			case 'qq':
				return (
					<Avatar size={28} icon="qq" className={classnames("contact-icon qq")} />
				)
			case 'wx':
				return (
					<Avatar size={28} icon="wechat" className={classnames("contact-icon wx")} />
				)
		}
	}
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="http://cdn.zjutshideshan.cn/image/landscape_art_road.jpg" />
            </div>
            <div className="author-introduction">
                IT界的吴彦祖，专注于WEB和移动端前端开发。
                <Divider>联系站主</Divider>
                {
                    contact.map((item,index) => (
                        <a href={item.link&&item.link} target="_blank" key={index}>
                            {
                                item.code? 
                                    <Popover placement="bottom" content={
                                        <div className="re-code">
                                            <div className="re-code"><img src={item.code} alt="" /></div>
                                        </div>
                                    }>
                                        {(switchType(item.type))}
                                    </Popover>
                                    : switchType(item.type)
                            }
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default Author;