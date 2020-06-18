import React, { useState, useEffect } from 'react'
import './style.less'

const LazyImg = (props) => {
    // done标记图片是否下载完成
	const [done, setDone] = useState(false)
	useEffect(() => {
		const img = new Image();
		// 发出请求，请求图片
		img.src = props.src;
		// 当图片加载完毕
		img.onload = () => {
			setDone(true)
		}
	}, [])

	return (
		<>
			{
				done
					?
					(
						props.background ?
							<div style={props.style && props.style, { backgroundImage: `url(${props.src + (props.params ? props.params : '')})` }} className="item-background">
								{props.children ? props.children : null}
							</div>
							:
							<img style={props.style && props.style} src={props.src + (props.params ? props.params : '')} alt={props.alt} className="item-img" />

					)
					:
					<div className="loader">
						<span className="txt">
							<span>Loading...</span>
						</span>
					</div>
			}
		</>
	)
}

export default LazyImg