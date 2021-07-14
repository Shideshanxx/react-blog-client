FROM daocloud.io/library/node:12.18
# 在容器中新建目录文件夹 egg
RUN mkdir -p /egg
# 将 /egg 设置为默认工作目录
WORKDIR /egg
# 将 package.json复制到默认工作目录
COPY package.json /egg/package.json
# 设置yarn源，安装生产环境依赖
RUN yarn config set registry https://registry.npm.taobao.org \
  && yarn install
# 再copy代码到容器中/egg目录下（./ 表示所有文件 ）
COPY ./ /egg
# 暴露3000端口
EXPOSE 3000

CMD yarn build \
  && yarn start