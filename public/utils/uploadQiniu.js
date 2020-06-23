import {
    v1 as uuidv1
} from 'uuid';
import request from '@/public/utils/request'
import serviceApi from '@/config/service'

/***
* file 上传文件
* callback 回调
* 先获取token（与七牛云的空间、sk、ak相关联，在后端设置的）,然后上传到http://up-z0.qiniup.com，返回一个key，拼接到七牛云cdn的后面就是资源的路径
*/

export const uploadQiniu = async (file, callback) => {
    let formData = new FormData();

    await new Promise(resolve => (
        // 获取签名
        request(serviceApi.getQiniuToken).then((res) => {
            formData.append('file', file)
            formData.append('token', res.data.uploadToken)
            formData.append('key', uuidv1()); // 自定义上传图片的名字，即上传成功后七牛返回给我们的图片名字
            resolve();
        })
    ))

    await new Promise(resolve => (
        request(serviceApi.uploadQiniu, {
            method: 'post',
            data: formData
        }).then((re) => {
            if (re && re.key) {
                callback('http://cdn.zjutshideshan.cn/' + re.key)
                resolve()
            } else {
                message.error('上传七牛云出错！');
                return
            }
        })
    ))
};