import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import './style.less'

const LazyImg = (props) => {
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
			<Choose>
				<When condition={done}>
					<Choose>
						<When condition={props.background}>
							<div
								style={props.style && props.style, { backgroundImage: `url(${props.src + (props.params ? props.params : '')})` }}
								className={classnames(`item-background ${props.className ? props.className : ''}`)}
								onClick={props.onClick ? props.onClick() : null}
							>
								{props.children ? props.children : null}
							</div>
						</When>
						<Otherwise>
							<img
								style={props.style && props.style} src={props.src + (props.params ? props.params : '')}
								alt={props.alt}
								className={classnames(`item-img ${props.className ? props.className : ''}`)}
								onClick={props.onClick ? props.onClick : null}
							/>
						</Otherwise>
					</Choose>
				</When>

				<Otherwise>
					<div className="cp-preloader cp-preloader_type1">
						<span className="cp-preloader__letter" data-preloader="B">B</span>
						<span className="cp-preloader__letter" data-preloader="L">L</span>
						<span className="cp-preloader__letter" data-preloader="O">O</span>
						<span className="cp-preloader__letter" data-preloader="G">G</span>
					</div>
				</Otherwise>
			</Choose>
		</>
	)
}

export default LazyImg