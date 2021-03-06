# mife

基于 [umi](https://umijs.org/) 的前端微服务(micro-frontend)扩展插件。

## 特性

* **项目隔离**，将复杂的前端拆分成多个子项目，单独编译打包；子项目可独立运行，或多个组合运行
* **运行环境隔离**，将打包的子项目作为模块，生成唯一标识，防止不同项目的js，css等资源污染
* **提供注册和注销API(sub, unsub)**，子项目组合时，可在.umirc.js中配置需要注册的子项目，也可以通过API自动注册子项目

## 他是怎么来的？

目前的趋势是构建一个功能丰富且强大的前端应用，即单页面应用(SPA)，其本身一般都是建立在一个微服务架构之上。前端层通常由一个单独的团队开发，随着时间的推移，会变得越来越庞大而难以维护。
微前端背后的理念是将一个网站或者 Web App 当成特性的组合体，每个特性都由一个独立的团队负责。每个团队都有擅长的特定业务领域或是它关心的任务。这里，一个团队是跨职能的，它可以端到端，从数据库到用户界面完整的开发它所负责的功能。

## 工具
* [mife-cli](https://github.com/lsqaisen/mife-cli) 脚手架

## DEMO实例

* [micro-frontend](https://github.com/lsqaisen/micro-frontend)