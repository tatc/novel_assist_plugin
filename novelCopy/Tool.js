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
// @match        https://www.dameishuwang.net/*
// @match        https://www.po18yu.vip/*
// @match        https://www.dingdianwang.net/*
// @match        https://m.fushuw.org/*
// @match        https://www.fushuw.org/*
// @match        https://m.fushutxt.org/*
// @match        https://m.blxsw.cc/*
// @match        https://m.fushutxt.cc/*
// @match        http://m.yuzhengong.com/*
// @match        https://www.52shuku.net/*
// @match        https://shubaowb.com/*
// @match        https://www.bikuxs.com/*
// @match        https://www.baishuwu.com/*
// @match        https://m.22shuqu.net/*
// @match        https://www.piaotianapp.com/*
// @match        https://www.vipsalary.com/*
// @match        http://m.yimixs.org/*
// @match        http://www.yimixs.org/*
// @match        https://www.nidedizhi1.com/*
// @match        https://ganjv.com/*
// @match        https://www.tmwk.cc/*
// @match        https://www.jcxs.cc/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    /*
  // @require       https://static.hdslb.com/js/jquery.min.js
  */

    "use strict";

    /*
     * 可以抓取的网址
     * haitangtxt po18 rourouwu wodeshubao dameishuwang 52shuku fushu yuzhengong bikuxs
     baishuwu 22shuqu piaotianapp vipsalary yimixs nidedizhi1 ganjv tmwk jcxs
     */
    let websiteObj = [
        {
            index: 1,
            url: "https://m.haitangtxt.net",
            sign: "haitangtxt",
            title: "",
            article: "",
            turn: "",
            describe: ``,
        },
        {
            index: 2,
            url: ["https://www.po18r.com/", "https://www.po18yu.vip/"],
            sign: "po18",
            title: "",
            article: "",
        },
        {
            index: 3, // 13
            url: "https://m.rourouwu.de",
            sign: "rourouwu",
            title: "#nr_title",
            article: "#nr1",
        },
        {
            index: 4,
            url: "https://m.wodeshubao.org/",
            sign: "wodeshubao",
            title: "",
            article: "",
        },
        {
            index: 5,
            url: ["https://www.dameishuwang.net/", "https://www.tmwk.cc/"],
            sign: "dameishuwang",
            title: "",
            article: "",
        },
        {
            index: 6,
            url: "https://www.52shuku.net/",
            sign: "52shuku",
            title: "",
            article: "",
        },
        {
            index: 7,
            url: "https://www.dingdianwang.net/",
            sign: "dingdianwang",
            title: ".ml_header h2",
            article: "#ml_imgs",
            turn: ".ml_x a",
        },
        {
            index: 8,
            url: [
                "https://m.fushutxt.org/",
                "https://www.fushutxt.org/",
                "https://m.fushutxt.cc/",
                "https://www.fushutxt.cc/",
                "https://m.fushuw.org/",
                "https://www.fushuw.org/",
                "https://m.blxsw.cc/",
            ],
            sign: "fushu",
            title: "",
            article: "",
        },
        {
            index: 9,
            url: "https://shubaowb.com/",
            sign: "shubaowb",
            title: ".title1",
            article: "#chaptercontent",
            turn: "#pb_next",
        },
        {
            index: 10,
            url: "http://m.yuzhengong.com/",
            sign: "yuzhengong",
            title: "",
            article: "",
            describe: `正文第一行可能是 第n节 (第n/m页) 也可能是 第n章 文章名 会有一章节不在同一页面的情况`,
        },
        {
            index: 11,
            url: "https://www.bikuxs.com/",
            sign: "bikuxs",
            title: "",
            article: "",
            describe: ``,
        },
        {
            index: 12,
            url: "https://www.baishuwu.com/",
            sign: "baishuwu",
            title: "",
            article: "",
            describe: ``,
        }, {
            index: 13, // 3
            url: "https://www.22shuqu.com/",
            sign: "22shuqu",
            title: "",
            article: "",
            describe: ``,
        }, {
            index: 14,
            url: "https://www.piaotianapp.com",
            sign: "piaotianapp",
            title: "",
            article: "",
            describe: ``,
        }, {
            index: 15,
            url: "https://www.vipsalary.com",
            sign: "vipsalary",
            title: "",
            article: "",
            describe: ``,
        }, {
            index: 16,
            url: ["http://m.yimixs.org/", "http://www.yimixs.org/"],
            sign: "yimixs",
            title: "",
            article: "",
            describe: ``,
        }, {
            index: 17, // 1
            url: "https://www.nidedizhi1.com",
            sign: "nidedizhi1",
            title: "",
            article: "",
            turn: "",
            describe: ``,
        },
        {
            index: 18, // 9
            url: "https://ganjv.com/",
            sign: "ganjv",
            title: "",
            article: "",
            turn: "",
            describe: ``,
        },
        {
            index: 19,
            url: "https://www.jcxs.cc/",
            sign: "jcxs",
            title: ".novel",
            article: ".yd_text2",
            turn: "",
            describe: ``,
        },

    ];
    /**
     * 是否可以翻页
     */
    let over = true;

    console.log(checkout() ? "btn show" : "btn hidden", judgeInfoPage());

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
        if (
            (pathname && pathname.at(-1) == "/") ||
            pathname.includes("index_") ||
            document.title.includes("最新章节")
        ) {
            return "listPage";
        }
        // 根据页面元素判断
        return "infoPage";
    }

    function addBtn(copyStr) {
        const btn = document.createElement("button");
        if (document.getElementById("btn_copy_novel")) {
            document.getElementById("btn_copy_novel").remove();
        }
        btn.id = "btn_copy_novel";
        btn.style.cssText = `position: fixed;bottom: 5%;left: 3%;padding: 7px 12px;
        background-color: #aaccee;color: #e8f1f9;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;`;
        btn.value = "next";
        btn.textContent = "copy";
        btn.onclick = nextPage;
        document.documentElement.appendChild(btn);
    }

    function addBtnInfo() {
        const btn = document.createElement("button");
        btn.id = "btn_info_novel";
        btn.style.cssText = `position: fixed;bottom: 5%;left: 25%;padding: 7px;
        background-color: #e8f1f9;color: #222e17;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;`;
        btn.textContent = "info";
        btn.onclick = openSetting;
        document.documentElement.appendChild(btn);
    }

    function addBtnClear() {
        const btn = document.createElement("button");
        btn.id = "btn_clear_novel";
        btn.style.cssText = `position: fixed;bottom: 5%;right: 10%;padding: 7px;
        background-color: #e8f1f9;color: #222e17;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;`;
        btn.textContent = "n";
        if (localStorage.getItem("test")) {
            btn.textContent = "X";
        }
        btn.onclick = clearStorage;
        document.documentElement.appendChild(btn);
    }

    function nextPage() {
        init();
    }

    /**
     * 展示缓存的内容列表
     * 设置是否保存
     */
    function openSetting() {
        let message = "";
        Object.keys(localStorage).forEach((key) => {
            // message=message+'<p>'+key+'</p>';
            message =
                message +
                `<p>
              ${key}：${localStorage[key].slice(0, 20)}</p>`;
        });

        // 创建遮罩层
        const overlay = document.createElement("div");
        overlay.id = "modal_overlay";
        overlay.style.cssText = `position: fixed;top: 0; left: 0;width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);display: flex;justify-content: center;align-items: center;z-index: 9001;`;

        // 创建弹窗内容
        const modal = document.createElement("div");
        modal.setAttribute("id", "modal_content");
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
        GM_addStyle("#modal_content div{height:300px;overflow:auto;}");
        GM_addStyle("#modal_close_btn{cursor: pointer;}");

        // 插入到遮罩层
        overlay.appendChild(modal);
        // 插入到页面
        document.body.appendChild(overlay);
        // 禁止页面滚动
        document.body.style.overflow = "hidden";

        overlay.addEventListener("click", (e) => {
            // 点击遮罩层关闭（但点到弹窗内容时不关闭）
            if (
                e.target === overlay ||
                e.target === document.getElementById("modal_close_btn")
            ) {
                overlay.remove();
                document.body.style.overflow = ""; // 恢复页面滚动
            }
            // 翻页按钮是否保存本页 TODO
            if (e.target === document.getElementById("is_save")) {
                console.log(e.target.checked);
            }
            // 复制全文
            if (e.target === document.getElementById("novel_copy")) {
                let novel = localStorage.getItem("test");
                if (novel) {
                    if (window.location.protocol === "https:") {
                        navigator.clipboard
                            .writeText(novel) // .replace(/\n{3,}/g, "\n\n")
                            .then(() => {
                                showNotification("复制全文");
                            })
                            .catch((err) => {
                                console.error("novel_copy 复制失败", err);
                            });
                    } else {
                        setClipboardText(novel);
                    }
                }
            }
        });
    }

    function clearStorage() {
        localStorage.removeItem("test");
        document.getElementById("btn_clear_novel").innerText = "n";
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
            showNotification("loading", 3000);
        }
    }

    /**
     * 校验是否可以复制此网站
     * 不能校验返回0，其他返回序号
     */
    function checkout() {
        let result = 0;
        websiteObj.forEach((obj) => {
            if (result == 0) {
                if (
                    typeof obj.url == "object" &&
                    obj.url.join().includes(window.location.hostname)
                ) {
                    result = obj.index;
                } else if (window.location.href.includes(obj.sign)) {
                    result = obj.index;
                }
            }
        });
        return result;
    }

    /**
     * 获取文本内容
     * @param {number} index 网站序号
     * @param {boolean} isCheck 是否校验网页是否加载完整
     * @returns {string} 获取网页文本内容
     */
    function getCopyText(index, isCheck = false) {
        let str = "",
            a = "",
            b = "";
        switch (index) {
            case 1: // haitangtxt
                a = $("#chaptertitle").text();
                str = " _目录_  【 " + a + " 】 \n\n";
                b = "";
                over = false;
                $("#articlecontent div").each((i, e) => {
                    if (
                        e.children[0].nodeName == "P" &&
                        window.getComputedStyle(e).display != "none"
                    ) {
                        let text = e.children[0].innerText.trim();
                        if (
                            text.length > 0 &&
                            !text.includes("本章尚未完结") &&
                            !text.includes("本章已阅读完毕")
                        ) {
                            b = b + "    " + text + "\n\n";
                        }
                        if (
                            text.includes("本章已阅读完毕") ||
                            text.includes("本章尚未完结") ||
                            !isCheck
                        ) {
                            over = true;
                        }
                    }
                });
                str += b;
                break;
            case 2: // po18
                a = $("#mlfy_main_text h1").text();
                b = $("#TextContent")
                    .text()
                    .replace("\n   \n   theme();", "")
                    .replace("chap_tp();", "")
                    .replace(`<br />`, ``)
                    .replace(`<br />`, ``);
                str = " _目录_  【 " + a + " 】" + b;
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 3: // rourouwu
                a = $("#nr_title").text();
                b = $("#nr1")[0].innerText.replace("    ", "\n   ");
                str = " _目录_  【 " + a.trim() + " 】" + b;
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 4: // wodeshubao
                // 是一章的首页
                var strArr = document.querySelectorAll("#ChapterView div");
                var p = "";
                var clearTitle = false; // 不是一章的首页
                if (
                    document.getElementsByClassName("chapterPages")[0].innerText.length >
                    0
                ) {
                    // 是一章的首页
                    if (document.getElementsByClassName("curr")[0].innerText == "【1】") {
                        clearTitle = true;
                    }
                } else {
                    // 是一章的首页
                    clearTitle = true;
                }

                var i = 0;
                strArr.forEach((e) => {
                    if (window.getComputedStyle(e).display != "none") {
                        if (e.children[0].nodeName == "P") {
                            i++;
                            p = e.children[0].innerText;
                            let title =
                                document.getElementsByClassName("page-title")[0].innerText;
                            if (clearTitle && i == 1) {
                                str = " _目录_  【 " + title.trim() + " 】 \n\n\n";
                            }
                            str = str + p;
                        }
                    }
                });
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 5: // dameishuwang
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $(".book h1").text();
                b = $(".readcontent")[0]
                    .innerText.replace("本章未完，点击下一页继续阅读", `\n`)
                    .replace(`<br />`, `\n`).replaceAll('    ', '\t').trim();
                str = matchChapter(b);
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 6: // 52shuku
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $("#nr1").text().replace(`<br />`, `\n`)
                    .replace(`window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: '68f61475d1f53e4710bfd6f1', id: 'pf-16922-1'})`, '');
                b = matchChapter(a);
                str = b.slice(0, b.indexOf("目录 上一页 下一页 尾页")).trimStart();
                str = "\n\n　　" + str.replaceAll("　　", "\n\n　　").replace(/\n{3,}/g, "\n\n");
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 8: // fushu
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $("#text").text().replace(`<br />`, `\n`);
                b = matchChapter(a);
                // 剪裁底部无关正文内容
                if (b.includes("耽美小说 www")) {
                    str = b.slice(0, b.indexOf("耽美小说 www")).trimStart();
                } else if (b.includes("自愿捐助网站")) {
                    str = b.slice(0, b.indexOf("自愿捐助网站")).trimStart();
                } else if (b.includes("福书网：")) {
                    str = b.slice(0, b.indexOf("福书网：")).trimStart();
                }
                str = "\n\n　　" + str.replaceAll("　　", "\n\n　　");
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 10:
                str = htmlToPlainTextForNotepad($('#chaptercontent')[0].innerHTML);
                let matchArr = str.match(/第(\d+)节\s*\(第(\d+)\/(\d+)页\)/);
                // 如果第一行只有第n节标题，就从文章内提取章节名
                if (matchArr) {
                    str = matchChapter(str.replace(matchArr[0], ""));
                } else {
                    // 第一行做标题
                    matchArr = str.match(/^.*?\(第\d+\/\d+页\)/);
                    str = str.replace(matchArr[0], "");

                    if (matchArr[0].includes("1/")) {
                        // 只有第一页的标题需要做目录
                        str = " _目录_  【 " + matchArr[0].trim() + " 】\n" + str;
                    }
                }

                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 11: // bikuxs
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = htmlToPlainTextForNotepad($("#content")[0].innerHTML);
                str = matchChapter(a);
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 12: // baishuwu  TODO: 目录问题，有些正文没章节名，需要从每页顶部的标题提取章节名
                $(".word_read p").each((i, e) => {
                    let p = e.innerText.trim();
                    if (i > 0) {
                        str = str + "\n\n" + "    " + p;
                    } else {
                        let con = localStorage.getItem("test");
                        if (con) {
                            con = con.trim();
                            if (!con.slice(con.length - p.length, con.length).includes(p)) {
                                str = str + "    " + p;
                            }
                        } else {
                            str = "\n\n\n    " + p;
                        }

                    }
                });
                str = matchChapter(str + "\n\n");
                break;
            case 13: // 22shuqu
                a = $("#nr_title").text();
                b = $("#nr1")[0].innerText.replace("    ", "\n   ").replace("由于不可抗拒原因，打不开请访问最新网址m.2shuqu.com", "").replace("【本章阅读完毕，; 】", "").replace(/^/gm, "　　");
                str = " _目录_  【 " + a.trim() + " 】" + b;

                let con = localStorage.getItem("test");
                if (con) {
                    con = con.trim();
                    if (con.includes(a.trim())) {
                        str = b;
                    }
                }
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 14: // piaotianapp
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $('#content').text()
                    .replaceAll('\n', '\n\n')
                    .replaceAll('&amp;nbsp;&amp;nbsp;', '')
                    .replace('沒有了', '')
                    .replace('上一頁', '')
                    .replace('下一章', '')
                    .replace('上一章', '')
                    .replace('下一頁', '')
                    .replace('舉報本章錯誤( 無需登錄 ) ', '').trim();

                str = matchChapter(a + '\n\n').replace(/\n{3,}/g, "\n\n");
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 15: // vipsalary
                // 判断标题是否存在
                a = $(".word_read h3").text();

                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                let hasTitle = false;
                let arr = a.match(/(第\s*)([\u4e00-\u9fa5a-zA-Z0-9]{1,7})\s*[章页]/g);
                if (arr) {
                    if (arr.length > 1 && arr[arr.length - 1].match(/第\d+页/g)) {
                        let title = a.slice(a.indexOf(arr[0]) + arr[0].length, a.indexOf(arr[arr.length - 1]) - 1);
                        if (title.length > 0) {
                            // 直接用标题做目录
                            hasTitle = true;
                        }
                    }
                }

                let stop = false;
                $(".word_read p").each((i, p) => {
                    // 去掉底部无关正文内容。
                    let text = p.innerText.replaceAll("&rdquo;", "");
                    if (text.includes('勿开启浏览器阅读模式，否则将导致章节内容缺失及无法阅读下一章。')) {
                        // 停止继续获取字符，余下非正文字符
                        stop = true;
                    }
                    if (!stop) {
                        b = b + "    " + text + "\n\n";
                    }
                })

                if (hasTitle) {
                    str = " _目录_  【 " + a.trim() + " 】" + "\n\n" + b;
                } else {
                    str = matchChapter(b);
                }

                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 16: // yimixs
                if (location.hostname.indexOf('m') == 0) {
                    a = $(".headline")[0].innerText;
                    b = $("#txt")[0].innerText.replace("「如章节缺失请退#出#阅#读#模#式」", "\n   ").replace(/^/gm, "　　");
                } else {
                    a = $("h1")[0].innerText;
                    b = $(".article-body")[0].innerText.replace("「如章节缺失请退#出#阅#读#模#式」", "\n   ").replace(/^/gm, "　　");
                }
                str = " _目录_  【 " + a.trim() + " 】" + matchChapter(b);
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 17: // nidedizhi1
                a = $("#chaptertitle").text();
                b = "";
                over = false;
                $(".articlecontent p").each((i, e) => {
                    let text = e.innerText.replaceAll("&esp;", "").trim();
                    if (
                        text.length > 0 &&
                        !text.includes("本章尚未完结") &&
                        !text.includes("本章已阅读完毕")
                    ) {
                        b = b + "    " + text + "\n\n";
                    }
                    if (
                        text.includes("本章已阅读完毕") ||
                        text.includes("本章尚未完结") ||
                        !isCheck
                    ) {
                        over = true;
                    }
                });

                if (a.match(/(第\s*)([\u4e00-\u9fa5a-zA-Z0-9]{1,7})\s*[章页]/g)) {
                    b = matchChapter(b);
                } else {
                    str = " _目录_  【 " + a + " 】 \n\n";
                }

                str += b;
                break;
            case 18: // ganjv
                let title = $('.title h1')[0].innerText.split(' ');
                a = title[title.length - 1];
                b = $('#chaptercontent')[0].innerText;
                str = "\n _目录_  【 " + a.trim() + " 】" + "\n\n" + matchChapter(b);

                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
            case 19: // jcxs
                a = $('.novel h1')[0].innerText;
                // b = $('.yd_text2')[0].innerText;
                b = $('.yd_text2')[0].innerHTML.replaceAll("&nbsp;&nbsp;&nbsp;&nbsp;", "\n\n").replace(/^/gm, "　　");
                str = "\n _目录_  【 " + a.trim() + " 】" + "\n" + b;

                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;

            //  case 9:
            //   break;
            default: // 基础的通过标签id或者class类名获取章节内容
                if (websiteObj[index - 1].title.includes("#")) {
                    a = $(websiteObj[index - 1].title).innerText;
                } else {
                    a = $(websiteObj[index - 1].title)[0].innerText;
                }
                if ($(websiteObj[index - 1].article).innerText) {
                    b = $(websiteObj[index - 1].article)
                        .innerText.replace("    ", "\n   ")
                        .replace("<br>", "\n   ");
                } else {
                    b = $(websiteObj[index - 1].article)[0]
                        .innerText.replace("    ", "\n   ")
                        .replace("<br>", "\n   ");
                }
                if (b[0] != "") {
                    b = "\n\n\n" + b;
                }
                str = " _目录_  【 " + a.trim() + " 】" + htmlToPlainTextForNotepad(b);
                over = false;
                if (!isCheck) {
                    over = true;
                }
                break;
        }
        return str;
    }

    /**
     * 复制到剪贴板
     * 非重复的章节会存储到localStorage里
     * @param {string} copyStr 要复制的内容，包含目录和正文
     * @example copyContent('这里表示想要复制的内容');
     */
    function copyContent(copyStr) {
        const transfer = document.createElement("textarea");
        document.body.appendChild(transfer);
        transfer.value = copyStr + "\n\n\n"; // 这里表示想要复制的内容
        transfer.focus();
        transfer.select();
        if (document.execCommand("copy")) {
            document.execCommand("copy");
        }
        transfer.blur();
        if (over) {
            let test = "";
            if (localStorage.getItem("test")) {
                test = localStorage.getItem("test");
            } else {
                test = '　　';
            }
            let testStr = "";
            if (copyStr.trim().indexOf("_目录_  【") == 0) {
                let oldTitle = test.slice(test.indexOf('_目录_  【 '), test.indexOf(' 】') + 2).trim();
                let newTitle = copyStr.slice(copyStr.indexOf('_目录_  【 '), copyStr.indexOf(' 】') + 2).trim();

                if (oldTitle.length > 0 && newTitle == oldTitle) {
                    // 顶部标题重复
                    testStr = test.trim() + copyStr.replace(oldTitle, "").trim();
                } else {
                    testStr = test + "\n\n\n" + copyStr;
                }
            } else {
                testStr = mergeSentence(test, copyStr);
            }

            if (judgeRepeat(testStr)) {
                showNotification("翻页成功");
            } else {
                localStorage.setItem("test", testStr);
                showNotification("复制成功");
            }
        }

        document.body.removeChild(transfer);
    }

    /**
     * 弹窗提示信息
     * @param {string} message 提示信息
     * @param {number} duration 显示时间，单位毫秒
     * @param {boolean} read 是否播放语音
     * @example showNotification('复制成功');
     */
    function showNotification(message = "", duration = 1500, read = true) {
        if (read) {
            readText(message + " ", 1); // 不加空格会不播放，猜测因为太短了
        }
        var notification = document.createElement("div");
        // notification.className = 'notification';
        notification.style.cssText =
            "position: fixed;top: 35%;left: 45%;padding: 15px;background-color: #f0f0f0;color: #333;border: 1px solid #ccc;border-radius: 5px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9999;opacity: 1;transition: opacity 0.3s ease-in-out;";
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(function () {
            notification.style.opacity = 0;
            document.body.removeChild(notification);
        }, duration);
    }

    /**
     * 下一章
     */
    function turnPage(index) {
        switch (index) {
            case 1: // haitangtxt
                $(".novelbutton li a")[3].click();
                break;
            case 2: // po18
                $(".mlfy_page a")[4].click();
                break;
            case 3: // rourouwu
                $("#pt_next")[0].click();
                break;
            case 4: // wodeshubao
                var nextPageArr = document.querySelectorAll(".chapterPages a");
                var nextChapter = document.getElementsByClassName("next")[0];
                var choose = true;

                if (nextPageArr.length > 0) {
                    let currentPage = document
                        .getElementsByClassName("curr")[0]
                        .innerText.replace("【", "")
                        .replace("】", "");
                    nextPageArr.forEach((e, i) => {
                        // 下一页
                        if (
                            choose &&
                            e.className != "curr" &&
                            Number(e.innerText.replace("【", "").replace("】", "")) >
                            Number(currentPage)
                        ) {
                            e.click();
                            choose = false;
                        }
                    });
                }
                // 下一章
                if (choose) {
                    nextChapter.click();
                }
                break;
            case 5: // dameishuwang
                $("#linkNext")[0].click();
                break;
            case 6: // 52shuku
                $(".pagination2 a")[2].click();
                break;
            case 8: // fushu
                if ($(".pageLink")[0].innerText.includes("尾页")) {
                    $(".pageLink a")[$(".pageLink a").length - 2].click();
                } else {
                    showNotification("全文结束!");
                }
                break;
            case 10:
                $("#pb_next")[0].click();
                break;
            case 11: // bikuxs
                $(".jump a")[2].click();
                break;
            case 12: // baishuwu
                $(".read_btn a")[3].click();
                break;
            case 13: // 22shuqu
                $("#pt_next")[0].click();
                break;
            case 14: // piaotianapp
                $('.m-tpage li')[1].childNodes[0].click();
                break;
            case 15: // vipsalary
                $('.read_btn a')[3].click();
                break;
            case 16: // yimixs
                if (location.hostname.indexOf('m') == 0) {
                    if ($('.pager')[0].childNodes[5].childNodes[3]) {
                        $('.pager')[0].childNodes[5].childNodes[3].click();
                    } else {
                        $('.pager')[0].childNodes[5].click();
                    }
                } else {
                    $('.article-page-next')[0].click();
                }
                break;
            case 17: // nidedizhi1
                $(".novelbutton li a")[3].click();
                break;
            case 18: // ganjv
                $(".last a")[0].click();
                break;
            case 19: // jcxs
                $(".pereview a")[2].click();

            // case 9:
            //   break;
            default: // 基础的通过标签id或者class类名获取章节内容
                if ($(websiteObj[index - 1].turn)[0]) {
                    $(websiteObj[index - 1].turn)[0].click();
                } else {
                    $(websiteObj[index - 1].turn).click();
                }
                break;
        }
    }

    /**
     * 匹配章节 如：第1章、第一章
     * 改成标准目录格式头：_目录_  【 第1章 】
     * TODO 中文章节大于一百有问题！
     * TODO 想办法把章节名也筛选进【】中
     * @param {string} str 文章内容
     * @returns {string} 改成标准目录格式头
     */
    function matchChapter(str = "") {
        let con = str.replace(
            /^(\s*)(第[0-9一二三四五六七八九十百千万零两]+(?:章|节|卷|话|篇|部|集|回))[\s\u3000：:—-]*\2/gm,
            "$1$2"
        );

        const arr = con.match(/(第\s*)([\u4e00-\u9fa5a-zA-Z0-9]{1,7})\s*章/g);

        if (arr) {
            arr.map((e) => {
                con = con
                    .replace(e, "\n\n\n  _目录_  【 " + e + " 】");
            });

            return con;
        }
        return con;
    }

    /**
     * 判断文章是否重复
     * @param {string} text
     * @returns {boolean} 是否重复
     */
    function judgeRepeat(text = "") {
        let con = localStorage.getItem("test");
        if (con) {
            con = con.trim();
        }
        text = text.trim();
        if (
            con &&
            con
                .slice(con.length - 150, con.length)
                .includes(text.slice(text.length - 150, text.length))
        ) {
            return true;
        }
        return false;
    }

    /**
     * 合并两段字符串，去除首尾重复的句子
     * @param {string} fir 第一段字符串
     * @param {string} sec 第二段字符串
     * @returns {string} 合并后的字符串
     */
    function mergeSentence(fir, sec) {
        if (fir.trim() == "") {
            return sec;
        }
        if (sec.trim() == "") {
            return fir;
        }
        fir = fir.replace(/^\s+|\s+$/g, "").trim();
        sec = sec.replace(/^\s+|\s+$/g, "").trim();

        // 获取最后一段
        const getLastLine = str => {
            const arr = str.split("\n");
            return arr[arr.length - 1].trim();
        };

        // 获取第一段
        const getFirstLine = str => {
            const arr = str.split("\n");
            return arr[0].trim();
        };

        const lastLine = getLastLine(fir);
        const firstLine = getFirstLine(sec);

        // 标准化：去掉末尾标点
        const normalize = s =>
            s.replace(/[。！？!?]+$/g, "").trim();

        // 如果重复
        if (
            lastLine &&
            firstLine &&
            normalize(lastLine) === normalize(firstLine)
        ) {
            // 仅删除 sec 的第一行，保留其它换行结构
            sec = sec.replace(/^.*(\r?\n|$)/, "");

            return fir + "\n" + sec;
        }

        return "　　" + fir + "\n\n　　" + sec;
    }

    const synth = window.speechSynthesis; // 获取浏览器的SpeechSynthesis接口
    let utterance = null; // 存储当前的语音内容
    let speakObj = {};
    /**
     * 播放语音
     * 在播放过程中修改音量没用
     * @param {string} text
     */
    function readText(text = "", volume = 1) {
        // 创建一个SpeechSynthesisUtterance对象（语音合成的内容）
        utterance = new SpeechSynthesisUtterance(text);
        // 可选：设置语音的语言、音量、速度和音调
        utterance.lang = "zh-CN"; // 设置中文
        utterance.volume = volume; // 设置音量（0到1之间）
        utterance.rate = 1; // 设置语速（0.1到10之间）
        utterance.pitch = 1; // 设置音调（0到2之间）

        // 播放监听
        speakObj.isSpeak = 0;
        speakObj.textNow = "";
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

        let count = 0,
            countArr = [],
            stop = true;
        // 在语音播放到结束时
        utterance.onboundary = (event) => {
            /* 记录三次当前播放序号 */
            if (countArr.length == 3) {
                countArr.shift();
            }
            countArr.push(event.charIndex);

            /* 当前播放序号event.charIndex重复的情况下记录次数 */
            if (
                countArr.length > 2 &&
                countArr[0] == countArr[1] &&
                countArr[1] + 1 == countArr[2]
            ) {
                count++;
                /* 打印计数器重复次数 */
                // console.log(`---------repeat--------- count: ${count}`)
            }

            if (
                (countArr.length == 2 && countArr[0] !== countArr[1]) ||
                (countArr.length == 3 && countArr[1] !== countArr[2])
            ) {
                /* 当前朗读的文字 */
                speakObj.textNow = event.target.text.slice(
                    event.charIndex,
                    event.charIndex + 1,
                );
                /* 当前朗读的文字位置 */
                speakObj.textIndex = event.charIndex;
            }

            /* 判断朗读结束 */
            let timer = 0;
            if (
                event.charIndex + count >= utterance.text.length ||
                utterance.text.length - event.charIndex < 5
            ) {
                timer =
                    Math.abs(event.charIndex + count - utterance.text.length) * 1000;

                if (stop) {
                    stop = false;
                    setTimeout(() => {
                        speakObj.isSpeak = 3;
                        synth.cancel();
                        speakObj.textNow = event.target.text.slice(
                            event.target.text.length - 2,
                        );
                        /* 打印朗读完成、计数器重复次数、朗读完成后等待几秒 */
                        // console.log(`----------cancel---------- ${event.charIndex} / ${utterance.text.length} repeat:${count} timer:${timer}`);
                    }, count * 300);
                }
            }
            /* 打印当前朗读文字序号、朗读剩余字数、计数器重复次数、朗读完成后等待几秒 */
            // console.log(`${event.charIndex} / ${utterance.text.length} ___ count:${count} ___ timer:${event.charIndex + count - utterance.text.length}`)
        };
    }

    /**
     * 转换HTML为纯文本，用于Notepad++等不支持HTML的文本编辑器
     */
    function htmlToPlainTextForNotepad(html) {
        // 1. 替换 <br> 为换行
        let text = html.replace(/&nbsp;/gi, ' ').replace(/<br\s*\/?>/gi, "\n");
        // 2. 将 <p> 或 <div> 换成换行符
        text = text.replace(/<\/?(p|div)[^>]*>/gi, "  \n");
        // 3. 去掉剩余 HTML 标签
        text = text.replace(/<\/?[^>]+(>|$)/g, "");
        // 4. 合并连续多个换行为两个（可选）
        text = text.replace(/\n{3,}/g, "\n\n");
        // 5. 去掉开头和结尾的空格和结尾的换行
        text = text.replace(/^\s+|\s+$/g, "");
        // 6. 首行缩进（每一行前加两个全角空格）
        text = text.replace(/^/gm, "　　");
        return text.trim();
    }

    /**
     * https://sicau-hsuyang.github.io/javascript/snippets/copy-into-clipboard.html
     * 复制内容到剪贴板
     * @param {string} content 写入剪贴板的内容
     */
    async function setClipboardText(content) {
        try {
            await navigator.clipboard.writeText(content);
        } catch (exp) {
            // const tmpInput = document.createElement("input");
            // document.body.appendChild(tmpInput);
            // tmpInput.value = content;
            // /* 需要让这个input是可见的，不能将其设置为visibility为hidden或者display为none */
            // tmpInput.style.left = "absolute";
            // tmpInput.style.left = "10000px";
            // tmpInput.style.top = "10000px";
            // tmpInput.select();
            // typeof document.execCommand === "function" &&
            //   document.execCommand("copy");
            // document.body.removeChild(tmpInput);
            // fallback: 临时 textarea，保留换行
            const tmp = document.createElement("textarea");
            tmp.value = content;
            tmp.style.position = "absolute";
            tmp.style.left = "-9999px";
            tmp.style.top = "0";
            document.body.appendChild(tmp);
            tmp.focus();
            tmp.select();
            if (typeof document.execCommand === "function") {
                document.execCommand("copy");
            }
            document.body.removeChild(tmp);
        }
    }



})();