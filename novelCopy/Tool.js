// ==UserScript==
// @name         novel copy
// @name:zh-CN   小说复制文本
// @namespace    http://tampermonkey.net/
// @description  copy website like haitangtxt po18 rourouwu wodeshubao dameishuwang 52shuku fushu
// @description:zh-CN 可以复制 haitangtxt po18 rourouwu wodeshubao dameishuwang 52shuku fushu 这些网站
// @author       tatc
// @version       2024-10-6
// @match        https://m.haitangtxt.net/*
// @match        https://www.po18r.com/*
// @match        https://m.rourouwu.de/*
// @match        https://m.wodeshubao.org/*
// @match        https://www.dameishuwang.net//*
// @match        https://www.po18yu.vip/*
// @match        https://www.dingdianwang.net/*
// @match        https://m.fushuw.org/*
// @match        https://m.fushutxt.org/*
// @match        https://m.blxsw.cc/*
// @match        https://m.fushutxt.cc/*
// @match        http://m.yuzhengong.com/*
// @match        https://www.52shuku.net/*
// @match        https://shubaowb.com/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    /*
    // @require       https://static.hdslb.com/js/jquery.min.js
  */

    'use strict';

    /*
    * 可以抓取的网址
    * haitangtxt po18 rourouwu wodeshubao dameishuwang 52shuku fushu
    */
    let websiteObj = [
        {
            index: 1,
            url: 'https://m.haitangtxt.net',
            sign: 'haitangtxt',
            title: '',
            article: '',
            turn: ''
        },
        {
            index: 2,
            url: ['https://www.po18r.com/', 'https://www.po18yu.vip/'],
            sign: 'po18',
            title: '',
            article: ''
        },
        {
            index: 3,
            url: 'https://m.rourouwu.de',
            sign: 'rourouwu',
            title: '#nr_title',
            article: '#nr1'
        },
        {
            index: 4,
            url: 'https://m.wodeshubao.org/',
            sign: 'wodeshubao',
            title: '',
            article: ''
        },
        {
            index: 5,
            url: 'https://www.dameishuwang.net/',
            sign: 'dameishuwang',
            title: '',
            article: ''
        },
        {
            index: 6,
            url: 'https://www.52shuku.net/',
            sign: '52shuku',
            title: '',
            article: ''
        },
        {
            index: 7,
            url: 'https://www.dingdianwang.net/',
            sign: 'dingdianwang',
            title: '.ml_header h2',
            article: '#ml_imgs',
            turn: '.ml_x a'
        },
        {
            index: 8,
            url: ['https://m.fushutxt.org/', 'https://m.fushutxt.cc/', 'https://m.fushuw.org/', 'https://m.blxsw.cc/'],
            sign: 'fushu',
            title: '',
            article: ''
        },
        {
            index: 9,
            url: 'https://shubaowb.com/',
            sign: 'shubaowb',
            title: '.title1',
            article: '#chaptercontent',
            turn: '#pb_next'
        }
    ];
    let over = true; // 可以翻页


    console.log(checkout() ? 'btn show' : 'btn hidden', judgeInfoPage());

    // showNotification(judgeInfoPage(),2000,false); // 判断是列表页还是正文页

    addBtn();
    addBtnInfo();
    addBtnClear();

    if (!$) {
        var s = document.createElement("script");
        s.src = "http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js";
        s.async = false;
        document.documentElement.appendChild(s);
    }

    function judgeInfoPage() {
        let hostname = window.location.hostname;
        let pathname = window.location.pathname;
        // 根据网页标签名称判断
        if (pathname && pathname.at(-1) == '/' || pathname.includes('index_') || document.title.includes('最新章节')) {
            return 'listPage';
        }
        // 根据页面元素判断
        return 'infoPage';
    }

    function addBtn(copyStr) {
        const btn = document.createElement('button');
        if (document.getElementById("btn_copy_novel")) {
            document.getElementById("btn_copy_novel").remove();
        }
        btn.id = 'btn_copy_novel';
        btn.style.cssText = `position: fixed;bottom: 5%;left: 3%;padding: 7px 12px;
        background-color: #aaccee;color: #e8f1f9;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;`;
        btn.value = 'next';
        btn.textContent = 'copy';
        btn.onclick = nextPage;
        document.documentElement.appendChild(btn);
        console.log('addBtn');
    }

    function addBtnInfo() {
        const btn = document.createElement('button');
        btn.id = 'btn_info_novel';
        btn.style.cssText = `position: fixed;bottom: 5%;left: 25%;padding: 7px;
        background-color: #e8f1f9;color: #222e17;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;`;
        btn.textContent = 'info';
        btn.onclick = openSetting;
        document.documentElement.appendChild(btn);
    }

    function addBtnClear() {
        const btn = document.createElement('button');
        btn.id = 'btn_clear_novel';
        btn.style.cssText = `position: fixed;bottom: 5%;right: 10%;padding: 7px;
        background-color: #e8f1f9;color: #222e17;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;`;
        btn.textContent = 'n';
        if (localStorage.getItem('test')) {
            btn.textContent = 'X';
        }
        btn.onclick = clearStorage;
        document.documentElement.appendChild(btn);
    }

    function nextPage() {
        console.log('click');
        init();
    }

    /*
    * 展示缓存的内容列表
    * 设置是否保存
    */
    function openSetting() {
        let message = '';
        Object.keys(localStorage).forEach(key => {
            // message=message+'<p>'+key+'</p>';
            message = message + `<p>
              ${key}：${localStorage[key].slice(0, 20)}</p>`;
        });

        // 创建遮罩层
        const overlay = document.createElement("div");
        overlay.id = 'modal_overlay';
        overlay.style.cssText = `position: fixed;top: 0; left: 0;width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);display: flex;justify-content: center;align-items: center;z-index: 9001;`;

        // 创建弹窗内容
        const modal = document.createElement("div");
        modal.setAttribute('id', 'modal_content');
        GM_addStyle(`#modal_content{background: #fff;padding: 10px 0 10px 10px;border-radius: 10px;
        min-width: 300px;max-width: 80%;max-height: 80%;box-shadow: 0 5px 20px rgba(0,0,0,0.3);text-align: center;}`);

        modal.innerHTML = `
        <input id="is_save" type="checkbox" checked>
        <p>
            <button id="novel_copy">novel copy</button>
        </p>
        <div>${message}</div>
        <br />
        <button id="modal_close_btn">关闭</button>
      `;
        GM_addStyle('#modal_content div{height:300px;overflow:auto;}');
        GM_addStyle('#modal_close_btn{cursor: pointer;}');

        // 插入到遮罩层
        overlay.appendChild(modal);
        // 插入到页面
        document.body.appendChild(overlay);
        // 禁止页面滚动
        document.body.style.overflow = "hidden";

        overlay.addEventListener("click", (e) => {
            // 点击遮罩层关闭（但点到弹窗内容时不关闭）
            if (e.target === overlay || e.target === document.getElementById("modal_close_btn")) {
                overlay.remove();
                document.body.style.overflow = ""; // 恢复页面滚动
            }
            // 翻页按钮是否保存本页 TODO
            if (e.target === document.getElementById("is_save")) {
                console.log(e.target.checked)
            }
            // 复制全文
            if (e.target === document.getElementById("novel_copy")) {
                if (localStorage.getItem('test')) {
                    navigator.clipboard.writeText(localStorage.getItem('test')).then(() => { showNotification('复制全文'); }).catch(err => { console.error('novel_copy 复制失败', err); });
                }
            }

        });
    }

    function clearStorage() {
        localStorage.removeItem('test');
        document.getElementById('btn_clear_novel').innerText = 'n';
    }


    function init() {
        // 海棠的开启加载完整性校验
        if (checkout() == 1) {
            copyContent(getCopyText(checkout(), true));
        } else {
            copyContent(getCopyText(checkout()));
        }
        if (over) {
            turnPage(checkout());
        } else {
            showNotification('loading', 3000);
        }
    }

    /*
  * 校验是否可以复制此网站
  * 不能校验返回0，其他返回序号
  */
    function checkout() {
        let result = 0;
        websiteObj.forEach(obj => {
            if (result == 0) {
                if (typeof obj.url == 'object' && obj.url.join().includes(window.location.hostname)) {
                    result = obj.index;
                }
                else if (window.location.href.includes(obj.sign)) {
                    result = obj.index;
                }
            }
        });
        return result;
    }

    /*
  * 获取文本内容
  * index 网站序号
  * isCheck 是否校验网页是否加载完整
  */
    function getCopyText(index, isCheck = false) {
        let str = '', a = '', b = '';
        switch (index) {
            case 1: // haitangtxt
                a = $('#chaptertitle').text();
                str = ' _目录_  【 ' + a + ' 】 \n\n';
                b = '';
                over = false;
                $('#articlecontent div').each((i, e) => {
                    if (e.children[0].nodeName == 'P' && window.getComputedStyle(e).display != 'none') {
                        let text = e.children[0].innerText.trim();
                        if (text.length > 0 && !text.includes('本章尚未完结') && !text.includes('本章已阅读完毕')) {
                            b = b + '    ' + text + '\n\n';
                        }
                        if (text.includes('本章已阅读完毕') || text.includes('本章尚未完结') || !isCheck) {
                            over = true;
                        }
                    }
                })
                str += b;
                break;
            case 2: // po18
                a = $('#mlfy_main_text h1').text();
                b = $('#TextContent').text().replace('\n   \n   theme();', '').replace('chap_tp();', '').replace(`<br />`, ``).replace(`<br />`, ``);
                str = ' _目录_  【 ' + a + ' 】' + b;
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 3: // rourouwu
                a = $('#nr_title').text();
                b = $('#nr1')[0].innerText.replace('    ', '\n   ');
                str = ' _目录_  【 ' + a.trim() + ' 】' + b;
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 4: // wodeshubao
                // 是一章的首页
                var strArr = document.querySelectorAll('#ChapterView div');
                var p = '';
                var clearTitle = false; // 不是一章的首页
                if (document.getElementsByClassName('chapterPages')[0].innerText.length > 0) {
                    // 是一章的首页
                    if (document.getElementsByClassName('curr')[0].innerText == '【1】') {
                        clearTitle = true;
                    }
                }
                else {
                    // 是一章的首页
                    clearTitle = true;
                }

                var i = 0;
                strArr.forEach(e => {
                    if (window.getComputedStyle(e).display != 'none') {
                        if (e.children[0].nodeName == 'P') {
                            i++;
                            p = e.children[0].innerText;
                            let title = document.getElementsByClassName('page-title')[0].innerText;
                            if (clearTitle && i == 1) {
                                str = ' _目录_  【 ' + title.trim() + ' 】 \n\n\n';
                            }
                            str = str + p;
                        }
                    }
                })
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 5: // dameishuwang
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $('.book h1').text();
                b = $('.readcontent')[0].innerText.replace('本章未完，点击下一页继续阅读', `\n`).replace(`<br />`, `\n`);
                str = matchChapter(b);
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 6: // 52shuku
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $('#nr1').text().replace(`<br />`, `\n`);
                b = matchChapter(a);
                str = b.slice(0, b.indexOf('目录 上一页 下一页 尾页')).trimStart();
                str = '\n\n　　' + str.replaceAll('　　', '\n\n　　');
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 8: // fushu
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $('#text').text().replace(`<br />`, `\n`);
                b = matchChapter(a);
                // 剪裁底部无关正文内容
                if (b.includes('耽美小说 www')) {
                    str = b.slice(0, b.indexOf('耽美小说 www')).trimStart();
                } else if (b.includes('自愿捐助网站')) {
                    str = b.slice(0, b.indexOf('自愿捐助网站')).trimStart();
                }
                str = '\n\n　　' + str.replaceAll('　　', '\n\n　　');
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            /*       case 9:
      break; */
            default: // 基础的通过标签id或者class类名获取章节内容
                if (websiteObj[index - 1].title.includes('#')) {
                    a = $(websiteObj[index - 1].title).innerText;
                } else {
                    a = $(websiteObj[index - 1].title)[0].innerText;
                }
                if ($(websiteObj[index - 1].article).innerText) {
                    b = $(websiteObj[index - 1].article).innerText.replace('    ', '\n   ').replace('<br>', '\n   ');
                } else {
                    b = $(websiteObj[index - 1].article)[0].innerText.replace('    ', '\n   ').replace('<br>', '\n   ');
                }
                if (b[0] != '') {
                    b = '\n\n\n' + b;
                }
                str = ' _目录_  【 ' + a.trim() + ' 】' + b;
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
        }
        return str;
    }

    /*
  * 复制到剪贴板
  * 非重复的章节会存储到localStorage里
  * copyContent('这里表示想要复制的内容');
  */
    function copyContent(copyStr) {
        const transfer = document.createElement('textarea');
        document.body.appendChild(transfer);
        transfer.value = copyStr + '\n\n\n';  // 这里表示想要复制的内容
        transfer.focus();
        transfer.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
        }
        transfer.blur();
        if (over) {
            let test = '';
            if (localStorage.getItem('test')) {
                test = localStorage.getItem('test');
            }
            let testStr = '';
            if (copyStr.includes(' _目录_  【')) {
                testStr = test + '\n\n\n' + copyStr;
            } else {
                testStr = test + copyStr;
            }
            if (judgeRepeat(testStr)) {
                showNotification('翻页成功');
            } else {
                localStorage.setItem('test', testStr);
                showNotification('复制成功');
            }

        }
        document.body.removeChild(transfer);
    }

    /*
  * 弹窗提示信息
  * showNotification('复制成功');
  */
    function showNotification(message = '', duration = 1500, read = true) {
        if (read) {
            readText(message + ' ', 1); // 不加空格会不播放，猜测因为太短了
        }
        var notification = document.createElement('div');
        // notification.className = 'notification';
        notification.style.cssText = "position: fixed;top: 35%;left: 45%;padding: 15px;background-color: #f0f0f0;color: #333;border: 1px solid #ccc;border-radius: 5px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9999;opacity: 1;transition: opacity 0.3s ease-in-out;";
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(function () {
            notification.style.opacity = 0;
            document.body.removeChild(notification);
        }, duration);
    }

    /*
  * 下一章
  */
    function turnPage(index) {
        switch (index) {
            case 1: // haitangtxt
                $('.novelbutton li a')[3].click();
                break;
            case 2: // po18
                $('.mlfy_page a')[4].click();
                break;
            case 3: // rourouwu
                $('#pt_next')[0].click();
                break;
            case 4: // wodeshubao
                var nextPageArr = document.querySelectorAll('.chapterPages a');
                var nextChapter = document.getElementsByClassName('next')[0];
                var choose = true;

                if (nextPageArr.length > 0) {
                    let currentPage = document.getElementsByClassName('curr')[0].innerText.replace('【', '').replace('】', '');
                    nextPageArr.forEach((e, i) => {
                        // 下一页
                        if (choose && e.className != 'curr' && Number(e.innerText.replace('【', '').replace('】', '')) > Number(currentPage)) {
                            e.click();
                            choose = false;
                        }
                    })
                }
                // 下一章
                if (choose) {
                    nextChapter.click();
                }
                break;
            case 5: // dameishuwang
                $('#linkNext')[0].click();
                break;
            case 6: // 52shuku
                $('.pagination2 a')[2].click();
                break;
            case 8: // fushu
                if ($('.pageLink')[0].innerText.includes('尾页')) {
                    $('.pageLink a')[$('.pageLink a').length - 2].click();
                } else {
                    showNotification('全文结束!');
                }
                break;
            /*       case 9:
      break; */
            default: // 基础的通过标签id或者class类名获取章节内容
                if ($(websiteObj[index - 1].turn)[0]) {
                    $(websiteObj[index - 1].turn)[0].click();
                } else {
                    $(websiteObj[index - 1].turn).click();
                }
                break;
        }
    }

    /*
  * 匹配章节 如：第1章、第一章
  * 改成标准目录格式头：_目录_  【 第1章 】
  * TODO 中文章节大于一百有问题！
  * TODO 想办法把章节名也筛选进【】中
  */
    function matchChapter(str = '') {
        let con = str;
        let arr = str.match(/(第\s*)([\u4e00-\u9fa5a-zA-Z0-9]{1,7})\s*章/g);

        if (arr) {
            arr.map(e => {
                str = str.replaceAll('【', '[').replace('】', ']').replace(e, '\n\n\n  _目录_  【 ' + e + ' 】').replaceAll('_目录_  [', '_目录_  【').replaceAll('章 ]', '章 】');
            })
            return str
        }
        return str;
    }

    /**
   * 判断文章是否重复
   * @param {string} text
  */
    function judgeRepeat(text = '') {
        let con = localStorage.getItem('test');
        if (con) {
            con = con.trim();
        }
        text = text.trim();
        if (con && con.slice(con.length - 150, con.length).includes(text.slice(text.length - 150, text.length))) {
            return true;
        }
        return false;
    }

    const synth = window.speechSynthesis; // 获取浏览器的SpeechSynthesis接口
    let utterance = null; // 存储当前的语音内容
    let speakObj = {};
    /**
   * 播放语音
   * 在播放过程中修改音量没用
   * @param {string} text
   */
    function readText(text = '', volume = 1) {
        // 创建一个SpeechSynthesisUtterance对象（语音合成的内容）
        utterance = new SpeechSynthesisUtterance(text);
        // 可选：设置语音的语言、音量、速度和音调
        utterance.lang = 'zh-CN';  // 设置中文
        utterance.volume = volume;      // 设置音量（0到1之间）
        utterance.rate = 1;        // 设置语速（0.1到10之间）
        utterance.pitch = 1;       // 设置音调（0到2之间）

        // 播放监听
        speakObj.isSpeak = 0;
        speakObj.textNow = '';
        speakObj.textIndex = 0;

        // 暂停|播放
        if (synth.speaking) {
            speakObj.isSpeak = 0;
            synth.cancel();
        } else {
            speakObj.isSpeak = 1;
            // 通过SpeechSynthesis实例播放文本
            synth.speak(utterance);
        }

        let count = 0, countArr = [], stop = true;
        // 在语音播放到结束时
        utterance.onboundary = (event) => {
            /* 记录三次当前播放序号 */
            if (countArr.length == 3) {
                countArr.shift();
            }
            countArr.push(event.charIndex);

            /* 当前播放序号event.charIndex重复的情况下记录次数 */
            if (countArr.length > 2 && countArr[0] == countArr[1] && countArr[1] + 1 == countArr[2]) {
                count++;
                /* 打印计数器重复次数 */
                // console.log(`---------repeat--------- count: ${count}`)
            }

            if (countArr.length == 2 && countArr[0] !== countArr[1] || countArr.length == 3 && countArr[1] !== countArr[2]) {
                /* 当前朗读的文字 */
                speakObj.textNow = event.target.text.slice(event.charIndex, event.charIndex + 1);
                /* 当前朗读的文字位置 */
                speakObj.textIndex = event.charIndex;
            }


            /* 判断朗读结束 */
            let timer = 0;
            if (event.charIndex + count >= utterance.text.length || utterance.text.length - event.charIndex < 5) {
                timer = Math.abs(event.charIndex + count - utterance.text.length) * 1000;

                if (stop) {
                    stop = false;
                    setTimeout(() => {
                        speakObj.isSpeak = 3;
                        synth.cancel();
                        speakObj.textNow = event.target.text.slice(event.target.text.length - 2);
                        /* 打印朗读完成、计数器重复次数、朗读完成后等待几秒 */
                        // console.log(`----------cancel---------- ${event.charIndex} / ${utterance.text.length} repeat:${count} timer:${timer}`);
                    }, count * 300);
                }
            }
            /* 打印当前朗读文字序号、朗读剩余字数、计数器重复次数、朗读完成后等待几秒 */
            // console.log(`${event.charIndex} / ${utterance.text.length} ___ count:${count} ___ timer:${event.charIndex + count - utterance.text.length}`)
        };
    }

})();