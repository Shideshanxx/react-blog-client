/**
 * 网站介绍（在footer中打开）
 */
import React from "react";
import Head from "../../components/Head";
import { Card, Timeline } from "antd";
import "./style.less";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Asunarail_blog-关于博客</title>
      </Head>

      <>
        <Card bordered={false}>
          <p>
            <b>前言：</b>
          </p>
          Hi,你好： <br></br>
          <div style={{ textIndent: "2em" }}>
            欢迎来到我的博客，很高兴能在这里遇到你。本来是想做一个个人博客当云笔记来用，写写东西、发发牢骚以及各种新技术的试验地。后面刚好朋友也有这种笔记需求，一拍大腿干脆搞个多人博客平台。
            之后想法就越来越多，需求，设计，开发，维护，工作量也越来越大。因为平时也要上班，空闲的时间也不多，迭代的话全
            <b>看心情</b>
            ，不过有收到反馈的话还是很积极的。网站停停更更修修改改搞了大半年。改了很多版也重构了好多次，不满意的地方还有很多，后面要改的地方也有很多。但网站无论怎么改初衷都不会变，那就是：
            <b>分享技术，记录生活。</b>
          </div>
          <div style={{ textIndent: "2em" }}>
            希望网站的内容能帮到你，同时也欢迎提出bug和建议，分享你的想法,一起来打造你我的
            <b>冲浪记录站</b>。
          </div>
        </Card>
        <Card bordered={false}>
          <p>
            <b>规则：</b>
          </p>
          <br></br>
          <div>
            1.网站用户分 "游客" "普通用户" "博主" "管理员" 这4种。<br></br>
            3."游客" 不用登陆，不可以发文章，不可以 点赞 评论
            关注，只能浏览文章。<br></br>
            3."普通用户" 不可以发文章，但可以 点赞 评论 关注。<br></br>
            4."博主" 可以发文章，也可以点赞 评论 关注。<br></br>
            5."管理员"
            网站的维护者，博主的升级版，除了日常网站的更新和维护外，还可以对所有
            违规的文章和评论 进行删改！<br></br>
          </div>
        </Card>

        <Card bordered={false}>
          <p>
            <b>版本：</b>
          </p>
          <Timeline mode="alternate" pending="持续更新中...">
            <Timeline.Item>start 2020-6-19 🎉 项目立项 </Timeline.Item>
            <Timeline.Item>1.0 2020-09-05 🚀 版本正式上线</Timeline.Item>
            <Timeline.Item>2.0 2020-09-21 🚀 个人博主版</Timeline.Item>
            <Timeline.Item>2.1 2020-10-05 🎨 响应式改造</Timeline.Item>
            <Timeline.Item>3.0 2020-12-19 🚀 多用户版</Timeline.Item>
            <Timeline.Item>
              3.1 2021-01-12 ✨ 添加天气模块和图片预览功能
            </Timeline.Item>
            <Timeline.Item>
              3.2 2021-03-02 🐛
              修复有时候第三方的接口失灵导致播放器出错问题和优化文章阅读体验
            </Timeline.Item>
            <Timeline.Item>
              3.3 2021-03-27 💄 新增暗黑模式和天气地图
            </Timeline.Item>
            <Timeline.Item>
              4.0 2021-04-12 ✨ 1.代码优化，架构升级，框架和依赖更新至最新版本
              2.评论设置验证码功能。
            </Timeline.Item>
          </Timeline>
        </Card>
      </>
    </>
  );
};

export default AboutPage;
