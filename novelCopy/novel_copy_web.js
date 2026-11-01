/**
 * https://www.juseshuyuan.com/7/7383/1924872.html
 * 通用大部分小说网站 meta 阅读
 * 翻页、复制
 * 章节名从网页标签或文章内获取，区分标签有第几章节的是否真有章节名，标签和文章内是否存在重复章节名
 * 章节名重复去重，如第1章 第1章 
 * 章节名获取完整判断
 * 区分目录页或文章页
 * 区分当前页是否章节完整
 * 区分首页和末页
 * 区分列表页面和正文页面
 * 每一页单独保存并去重
 * function
 * 展示缓存的内容列表
 * 设置是否保存
 * 开启加载完整性校验
 * 校验是否可以复制此网站
 * 获取文本内容
 * 复制到剪贴板
 * 弹窗提示信息
 * 翻页下一章
 * 匹配章节名改成标准目录格式头：_目录_  【 第1章 】
 * 判断文章是否重复
 * 合并两段字符串，去除首尾重复的句子
 * 播放语音
 * 转换HTML为纯文本，用于Notepad++等不支持HTML的文本编辑器
 * 
 * http://m.yuzhengong.com/html/242834/
 * https://m.wodeshubao.org/6/6627/
*/




/**
 * http://m.yuzhengong.com/html/246580/
 * https://www.chaorenbook.com/102_102830/32295248.html
 * 最新章节\章节列表
 * http://m.yuzhengong.com/html/242834/
 * http://m.yuzhengong.com/html/242834/215500.html
 * 最新章节
 * https://m.haitangtxt.net/book/2/
 * https://m.haitangtxt.net/0/2/478.html
 * 章节目录
 * https://www.po18r.com/book/2.html
 * https://www.po18r.com/book/2/6103193.html
 * 网页列表
http://m.yimixs.org/*
http://m.yuzhengong.com/*
http://www.yimixs.org/*
https://ganjv.com/*
https://m.22shuqu.net/*
https://m.blxsw.cc/*
https://m.fushutxt.cc/*
https://m.fushutxt.org/*
https://m.fushuw.org/*
https://m.haitangtxt.net/*
https://m.rourouwu.de/*
https://m.wodeshubao.org/*
https://shubaowb.com/*
https://www.52shuku.net/*
https://www.baishuwu.com/*
https://www.bikuxs.com/*
https://www.dameishuwang.net/*
https://www.dingdianwang.net/*
https://www.fushuw.org/*
https://www.jcxs.cc/*
https://www.juseshuyuan.com/*
https://www.nidedizhi1.com/*
https://www.piaotianapp.com/*
https://www.po18r.com/*
https://www.po18yu.vip/*
https://www.tmwk.cc/*
https://www.vipsalary.com/*


https://jiujiuzuowen.com/*
 */

//del
let urlArr = [
  'http://m.yuzhengong.com/html/242834/',
  'http://m.yuzhengong.com/html/242834/215500.html',
  'https://m.haitangtxt.net/book/106987/',
  'https://m.haitangtxt.net/106/106987/7131768.html',
  'https://www.po18r.com/book/2.html',
  'https://www.po18r.com/book/2/6103193.html',
  ''
];

/**
 * 模板设置
 * @param {number } index 模板索引
 * @param {string | array} url 匹配的网页url
 * @param {string} sign 模板标识
 * @param {string} titlePosition 标题位置 top or middle
 * @param {string} title 标题选择器
 * @param {string} article 文章选择器
 * @param {string} turn 翻页选择器
 * @param {string} replace 替换内容
 * @param {string} describe 描述
 * */
let template = [
  {
    index: 1,
    url: [""], // 匹配的网页url
    sign: "",
    titlePosition: "", // top or middle
    title: "", // 标题选择器
    article: "", // 文章选择器
    turn: "", // 翻页选择器
    replace: "",
    describe: ``,
  },
  {
    index: 2,
    url: [""],
    sign: "",
    titlePosition: "",
    title: "",
    article: "",
    turn: "",
    replace: "",
    describe: ``,
  },
  {
    index: 3,
    url: [""],
    sign: "",
    titlePosition: "",
    title: "",
    article: "",
    turn: "",
    replace: "",
    describe: ``,
  }
];

