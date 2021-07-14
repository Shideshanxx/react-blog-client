import { v1 as uuidv1 } from "uuid";
import request from "@/public/utils/request";
import { message } from "antd";
import serviceApi from "@/config/service";

/***
 * file 上传文件
 * callback 回调
 */
export const uploadQiniu = async (file, callback) => {
  let formData = new FormData();
  await new Promise((resolve) =>
    // 获取签名
    request(serviceApi.getQiniuToken).then((res) => {
      formData.append("file", file);
      formData.append("token", res.data.uploadToken);
      formData.append("key", uuidv1()); // 自定义上传图片的名字，即上传成功后七牛返回给我们的图片名字
      resolve();
    })
  );

  await new Promise((resolve) =>
    request(serviceApi.uploadQiniu, {
      method: "post",
      data: formData,
    }).then((re) => {
      if (re && re.key) {
        callback("//cdn.zjutshideshan.cn/" + re.key);
        resolve();
      } else {
        message.error("上传七牛云出错！请联系站主！");
        return;
      }
    })
  );
};
