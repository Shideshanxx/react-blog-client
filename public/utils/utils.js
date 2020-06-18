/** 动态加载js脚本
 * @description: 
 * @param {url} string url
 * @param {callback} fun 回调
 * @return: 
 */
export const loadScript = (url, callback) => {
    // 检测是否加载了 js 文件
    const checkIsLoadScript = (src) => {
        let scriptObjs = document.getElementsByTagName('script');
        for (let sObj of scriptObjs) {
            if (sObj.src == src) {
                return true;
            }
        }
        return false;
    }

    if (checkIsLoadScript(url)) {
        callback();
        return false
    }

    let scriptNode = document.createElement("script");
    scriptNode.setAttribute("type", "text/javascript");
    scriptNode.setAttribute("src", url);
    document.body.appendChild(scriptNode);
    if (scriptNode.readyState) { //IE 判断
        scriptNode.onreadystatechange = () => {
            if (scriptNode.readyState == "complete" || scriptNode.readyState == 'loaded') {
                callback();
            }
        }
    } else {
        scriptNode.onload = () => {
            callback();
        }
    }
}