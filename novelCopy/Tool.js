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
// @match        https://www.fushutxt.cc/*
// @match        http://m.yuzhengong.com/*
// @match        https://m.yuzhengong.com/*
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
// @match        https://www.256wx.org/*
// @match        https://www.pia66.com/*
// @match        https://piaotian.bestzhufu.com/*
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
     * haitangtxt po18 rourouwu wodeshubao dameishuwang 52shuku fushu yuzhengong bikuxs baishuwu 22shuqu piaotianapp vipsalary yimixs nidedizhi1 ganjv tmwk jcxs 256wx piaotian
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
            url: ["https://www.52shuku.net/"],
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
        {
            index: 20,
            url: "https://www.256wx.org/",
            sign: "256wx",
            title: "",
            article: "",
        },
        {
            index: 21,
            url: ["https://www.pia66.com/", "https://piaotian.bestzhufu.com"],
            sign: "piaotian",
            title: "",
            article: "",
        },

    ];
    /**
     * 是否可以翻页，默认可以
     */
    let Is_over = true;
    /**
     * 是否保存本页，默认保存
     */
    let Is_save = getIsSave();
    /**
     * 是否转换繁体/简体中文，默认不转换
     */
    let Is_transform = getIsTransform();


    console.log(checkout() ? "btn show" : "btn hidden", judgeInfoPage());

    // showNotification(judgeInfoPage(),2000,false); // 判断是列表页还是正文页

    addBtn();
    addBtnInfo();
    addBtnClear();

    // 页面加载完成
    window.addEventListener("load", () => {
        // vivaldi read model add btn
        listenReadModel();
        init();
    });


    if (!$) {
        var s = document.createElement("script");
        s.src = "http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js";
        s.async = false;
        document.documentElement.appendChild(s);
    }

    /**
     * 监听滚动条事件添加底部按钮
     */
    function listenReadModel() {
        let lastKnownScrollPosition = 0;
        let ticking = false;
        const controller = new AbortController();
        // 为 滚动条 添加可被移除的事件监听器 
        document.addEventListener("scroll", (event) => {
            lastKnownScrollPosition = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const page = document.getElementById("readability-page-1");
                    const btn = document.getElementById("btn_copy_novel");

                    if (page && btn) {
                        controller.abort();
                    }
                    if (page && !btn || !page) {
                        if (!btn) {
                            addBtn('div', false);
                            addBtnInfo('div');
                            addBtnClear('div'); console.log('add btn success');

                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { signal: controller.signal /* abort() 移除监听器 */ });
    }

    /**
     * 判断是列表页还是正文页
     */
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

    function addBtn(tag = 'button', isCopy = true) {
        const btn = document.createElement(tag);
        if (document.getElementById("btn_copy_novel")) {
            document.getElementById("btn_copy_novel").remove();
        }
        btn.id = "btn_copy_novel";
        btn.style.cssText = `
        position: fixed;bottom: 5%;left: 3%;padding: 7px 12px;
        background-color: #aaccee;color: #e8f1f9;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;
    `;
        btn.value = "next";
        btn.textContent = isCopy ? "copy" : "next";
        btn.onclick = () => nextPage(isCopy);
        document.documentElement.appendChild(btn);
    }

    function addBtnInfo(tag = 'button') {
        const btn = document.createElement(tag);
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

    function addBtnClear(tag = 'button') {
        const btn = document.createElement(tag);
        btn.id = "btn_clear_novel";
        btn.style.cssText = `position: fixed;bottom: 5%;right: 10%;padding: 7px;
        background-color: #e8f1f9;color: #222e17;border: 1px solid #f2f2ef;border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9000;
        opacity: 1;transition: opacity 0.3s ease-in-out;
        user-select:none;cursor: pointer;opacity: 0.5;`;
        btn.textContent = "n";
        if (localStorage.getItem("Novel-Copy-novel_content")) {
            btn.textContent = "X";
        }
        btn.onclick = clearStorage;
        document.documentElement.appendChild(btn);
    }

    /**
     * 下一章
     * @param {boolean} isCopy 是否复制内容 默认复制
     */
    function nextPage(isCopy = true) {
        if (isCopy) {
            copyInit();
        } else {
            turnPage(checkout());
        }
    }

    function getIsSave() {
        let res = localStorage.getItem("Novel-Copy-Is_save");
        if (res) {
            res = res === "true" ? true : false;
        } else {
            res = true;
        }
        return res;
    }

    function getIsTransform() {
        let res = localStorage.getItem("Novel-Copy-Is_transform");
        if (res) {
            res = res === "true" ? true : false;
        } else {
            res = false;
        }
        return res;
    }

    /**
     * 展示缓存的内容列表
     * 设置是否保存
     */
    function openSetting() {
        let message = "";
        Object.keys(localStorage).forEach((key) => {
            message =
                message +
                `<p>
                    ${key}：${localStorage[key].slice(0, 20)}
                </p>`;
        });

        // 创建遮罩层
        const overlay = document.createElement("div");
        overlay.id = "modal_overlay";
        overlay.style.cssText = `
            width: 100%; height: 100%;
            display: flex;justify-content: center;align-items: center;
            position: fixed;top: 0; left: 0;z-index: 9001;
            background: rgba(0,0,0,0.5);
        `;

        // 创建弹窗内容
        const modal = document.createElement("div");

        modal.setAttribute("id", "modal_content");
        GM_addStyle(`
        #modal_content{
            background: #fff;padding: 10px 0 10px 10px;
            border-radius: 10px;
            min-width: 300px;
            max-width: 80%;
            max-height: 80%;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            text-align: center;
        }
        `);

        modal.innerHTML = `
            <div class="modal_checkbox">
            <div><input id="is_save" type="checkbox" checked>
            <p>是否保存本页：</p></div>
            <div><input id="is_transform" type="checkbox" checked>
            <p>是否转换繁体：</p></div>
            </div>
            <p>
            <button id="novel_copy" class="btn">novel copy</button>
            </p>
            <div class="modal_message">${message}</div>
            <br />
            <button id="modal_close_btn" class="btn">关闭</button>
            <button id="modal_reset_btn" class="btn">重置</button>
        `;
        GM_addStyle(`
        .modal_checkbox{
            display: inline-flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        #modal_content .modal_message{
            height:300px;
            margin-top: 10px;
            overflow:auto;
        }
        .btn{
            margin: 0 5px;cursor: pointer;
        }
        `);

        // 插入到遮罩层
        overlay.appendChild(modal);
        // 插入到页面
        document.body.appendChild(overlay);
        // 禁止页面滚动
        document.body.style.overflow = "hidden";
        // review checkbox
        document.getElementById("is_save").checked = getIsSave();
        document.getElementById("is_transform").checked = getIsTransform();

        overlay.addEventListener("click", (e) => {
            // 点击遮罩层关闭（但点到弹窗内容时不关闭）
            if (
                e.target === overlay ||
                e.target === document.getElementById("modal_close_btn")
            ) {
                overlay.remove();
                document.body.style.overflow = ""; // 恢复页面滚动
            }
            // 翻页按钮是否保存本页 
            if (e.target === document.getElementById("is_save")) {
                localStorage.setItem("Novel-Copy-Is_save", e.target.checked);
                Is_save = e.target.checked;
            }
            // 翻页按钮是否转换繁体
            if (e.target === document.getElementById("is_transform")) {
                localStorage.setItem("Novel-Copy-Is_transform", e.target.checked);
                Is_transform = e.target.checked;
                init();
            }
            // 复制全文
            if (e.target === document.getElementById("novel_copy")) {
                let novel = localStorage.getItem("Novel-Copy-novel_content");
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
            // 重置设置
            if (e.target === document.getElementById("modal_reset_btn")) {
                localStorage.removeItem("Novel-Copy-Is_save");
                localStorage.removeItem("Novel-Copy-Is_transform");
            }
        });
    }

    function clearStorage() {
        localStorage.removeItem("Novel-Copy-novel_content");
        document.getElementById("btn_clear_novel").innerText = "n";
    }

    /**
     * 初始化页面
     */
    function init() {
        // 文本简体/繁体中文转换
        if (Is_transform) {
            // 图标转换为中文，繁转简
            if (checkout() == 21) {
                piaotian_icon_to_word();
            } else {
                document.body.innerHTML = transformContentFix(transformContent(document.body.innerHTML));
            }
        }
    }

    function copyInit() {
        // 海棠的开启加载完整性校验
        if (checkout() == 1) {
            copyContent(getCopyText(checkout(), true));
        } else {
            copyContent(getCopyText(checkout()));
        }
        if (Is_over) {
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
                Is_over = false;
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
                            Is_over = true;
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
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 3: // rourouwu
                a = $("#nr_title").text();
                b = $("#nr1")[0].innerText.replace("    ", "\n   ");
                str = " _目录_  【 " + a.trim() + " 】" + b;
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
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
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 5: // dameishuwang
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $(".book h1").text();
                b = $(".readcontent")[0]
                    .innerText.replace("本章未完，点击下一页继续阅读", `\n`)
                    .replace(`<br />`, `\n`).replaceAll('    ', '\t').trim();
                str = matchChapter(b);
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 6: // 52shuku
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = $("#nr1").text().replace(`<br />`, `\n`)
                    .replace(`window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: '68f61475d1f53e4710bfd6f1', id: 'pf-16922-1'})`, '');
                b = matchChapter(a);
                str = b.slice(0, b.indexOf("目录 上一页 下一页 尾页")).trimStart();
                str = "\n\n　　" + str.replaceAll("　　", "\n\n　　").replace(/\n{3,}/g, "\n\n");
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 8: // fushu
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                if ($("#readability-page-1")) {
                    // TODO 浏览器阅读模式获取不到页面元素
                    a = $("#readability-page-1").text();
                } else {
                    a = $("#text").text().replace(`<br />`, `\n`);
                }
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
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
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

                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 11: // bikuxs
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                a = htmlToPlainTextForNotepad($("#content")[0].innerHTML);
                str = matchChapter(a);
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 12: // baishuwu 
                // TODO: 目录问题，有些正文没章节名，需要从每页顶部的标题提取章节名
                $(".word_read p").each((i, e) => {
                    let p = e.innerText.trim();
                    if (i > 0) {
                        str = str + "\n\n" + "    " + p;
                    } else {
                        let con = localStorage.getItem("Novel-Copy-novel_content");
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

                let con = localStorage.getItem("Novel-Copy-novel_content");
                if (con) {
                    con = con.trim();
                    if (con.includes(a.trim())) {
                        str = b;
                    }
                }
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
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
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
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

                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
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
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 17: // nidedizhi1
                a = $("#chaptertitle").text();
                b = "";
                Is_over = false;
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
                        Is_over = true;
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

                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 19: // jcxs
                a = $('.novel h1')[0].innerText;
                b = $('.yd_text2')[0].innerHTML.replaceAll("&nbsp;&nbsp;&nbsp;&nbsp;", "\n\n").replace(/^/gm, "　　");
                str = "\n _目录_  【 " + a.trim() + " 】" + "\n" + b;

                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 20: // 256wx
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                b = $("#nr1")[0].innerHTML;
                b = b.slice(0, b.indexOf(`<div class="page">`)).trimStart();
                str = matchChapter(htmlToPlainTextForNotepad(b));
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
                }
                break;
            case 21: // piaotian
                // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录
                b = transformContent($("#pt-pop")[0].innerHTML);
                b = b.slice(0, b.indexOf(`<div class="page">`)).trimStart();

                str = matchChapter(htmlToPlainTextForNotepad(b));
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
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
                Is_over = false;
                if (!isCheck) {
                    Is_over = true;
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
    function copyContent(copyStr = '') {
        const transfer = document.createElement("textarea");
        document.body.appendChild(transfer);
        transfer.value = copyStr + "\n\n\n"; // 这里表示想要复制的内容
        transfer.focus();
        transfer.select();
        if (document.execCommand("copy")) {
            document.execCommand("copy");
        }
        transfer.blur();
        if (Is_over) {
            let novel_content = "";
            if (localStorage.getItem("Novel-Copy-novel_content")) {
                novel_content = localStorage.getItem("Novel-Copy-novel_content");
            } else {
                novel_content = '　　';
            }
            let testStr = "";
            if (copyStr.trim().indexOf("_目录_  【") == 0) {
                let oldTitle = novel_content.slice(novel_content.indexOf('_目录_  【 '), novel_content.indexOf(' 】') + 2).trim();
                let newTitle = copyStr.slice(copyStr.indexOf('_目录_  【 '), copyStr.indexOf(' 】') + 2).trim();

                if (oldTitle.length > 0 && newTitle == oldTitle) {
                    // 顶部标题重复
                    testStr = novel_content.trim() + copyStr.replace(oldTitle, "").trim();
                } else {
                    testStr = novel_content + "\n\n\n" + copyStr;
                }
            } else {
                testStr = mergeSentence(novel_content, copyStr);
            }

            if (judgeRepeat(testStr)) {
                showNotification("翻页成功");
            } else {
                localStorage.setItem("Novel-Copy-novel_content", testStr);
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
            case 0: // 不能校验此网站
                break;
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
                if (!$(".pageLink")[0]) { // vivaldi read model
                    let url = window.location.href;
                    let num = url.slice(url.indexOf('_') + 1, url.indexOf('.html', '_'));
                    window.location.href = url.slice(url.indexOf('http'), url.indexOf('_') + 1) + (Number(num) + 1) + '.html';
                    return;
                }
                if ($(".pageLink")[0] && $(".pageLink")[0].innerText.includes("尾页")) {
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
            case 20: // 256wx
                let len = $(".page a").length;
                $(".page a")[len - 2].click();
            case 21: // piaotian
                $(".pt-nextchapter a")[0].click();

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

    // TODO 中文章节大于一百有问题！
    // TODO 想办法把章节名也筛选进【】中
    /**
     * 匹配章节 如：第1章、第一章
     * 改成标准目录格式头：_目录_  【 第1章 】
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
        let con = localStorage.getItem("Novel-Copy-novel_content");
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

    /**
   * 文本简体/繁体中文转换，通过字典数组转换
   * @param {string} content 要转换的中文文本
   * @param {boolean} transform true 繁转简 false 简转繁
   * @param {array} dict 词典内容 ['並 : 并',乾 : 干]
   * @example
   * transformContent('並乾', true, ['並 : 并', '乾 : 干'])
   * @returns '并干'
   */
    function transformContent(content = ' : ', transform = true, dict = DICT) {
        const DictStyle = ' : ';
        if (typeof dict == 'string') {
            dict = dict.split('\n');
        }
        let transformSet = new Set();
        dict.forEach((el) => {
            transformSet.add(el.split(DictStyle)[0] + DictStyle + el.split(DictStyle)[1]);
        })

        let result = content;
        for (let item of transformSet.keys()) {
            if (transform) {
                result = result.replace(new RegExp(item.split(DictStyle)[0], 'g'), item.split(DictStyle)[1]);
            } else {
                result = result.replace(new RegExp(item.split(DictStyle)[1], 'g'), item.split(DictStyle)[0]);
            }
        }
        return result
    }

    // 修复错字
    function transformContentFix(content = ' : ', icon = '') {
        const DictStyle = ' : ';
        let arr = [
            '干坤 : 乾坤',
            '衣菱 : 衣领',
            '狼借 : 狼籍',
            '慰借 : 慰籍',
        ];
        if (checkout() == 21) {
            arr.push('沈 : 沉', 'xue : 穴');  // , ' : '
        }
        arr.map((el) => {
            content = content.replaceAll(el.split(DictStyle)[0], el.split(DictStyle)[1]);
        })
        return content;
    }

    /**
     * 图标转换为中文，繁转简
     */
    function piaotian_icon_to_word() {
        var iconObj = {
            '01': '成', '02': '阴', '03': '唇', '04': '淫', '05': '洞', '06': '根', '07': '经', '08': '交', '09': '叫',
            '10': '媒', '11': '媚', '12': '女', '13': '肉', '14': '乳', '15': '物', '16': '性', '17': '穴', '18': '血', '19': '欲',
            '20': '嘴', '21': '虐', '22': '童', '23': '茎', '24': '舔', '25': '棍', '26': '蜜', '27': '兽', '28': '液', '29': '肏',
            '30': '喉', '31': '鸡', '32': '巴', '33': '奸', '34': '尻', '35': '慰', '36': '熟', '37': '殖', '38': '潮', '39': '感',
            '40': '肛', '41': '酥', '42': '胸', '43': '插', '44': '验', '45': '龟', '46': '蒂', '47': '射', '48': '精', '49': '颜',
            '50': '缩', '51': '爆', '52': '菊', '53': '幼', '54': '恋', '55': '伦', '56': '轮', '57': '缝', '58': '密', '59': '处',
            '60': '肥', '61': '操', '62': '臀', '63': '膜', '64': '跨', '65': '蹂', '66': '躏', '67': '洛', '68': '鸦', '69': '妓',
            '70': '楼', '71': '凤', '72': '胴', '73': '戳', '74': '奶', '75': '逼', '76': '诱', '77': '蒲', '78': '荡', '79': '骚',
            '80': '偷', '81': '露', '82': '裸', '83': '漏', '84': '御', '85': '嫩', '86': '惑', '87': '陰', '88': '茎', '89': '兽',
            '90': '鸡', '91': '龟', '92': '陽', '93': '颜', '94': '缩', '95': '恋', '96': '尸', '97': '奸', '98': '乱', '99': '术',
            '100': '轮', '101': '遗', '102': '缝', '103': '处', '104': '躏', '105': '鸦', '106': '凤', '107': '侣', '108': '诱', '109': '荡',
            '110': '骚', '111': '御', '112': '屄', '113': '屌', '114': '脱', '115': '扒', '116': '光', '117': '肤', '118': '裙', '119': '她',
            '120': '抚', '121': '美', '122': '丰', '123': '腴', '124': '揉', '125': '撩', '126': '粉', '127': '腿', '128': '胯', '129': '禁',
            '130': '摸', '131': '享', '132': '受', '133': '裤', '134': '裆', '135': '内', '136': '具', '137': '亢', '138': '奋', '139': '伸',
            '140': '入', '141': '贴', '142': '緊', '143': '股', '144': '動', '145': '情', '146': '挤', '147': '身', '148': '压', '149': '羞',
            '150': '涩', '151': '嬌', '152': '颤', '153': '勃', '154': '亵', '155': '渍', '156': '衣', '157': '硬', '158': '痒', '159': '体',
            '160': '碰', '161': '触', '162': '色', '163': '痞', '164': '器', '165': '官', '166': '渴', '167': '望', '168': '粗', '169': '摩',
            '170': '擦', '171': '挺', '172': '呻', '173': '吟', '174': '豊', '175': '丝', '176': '袜', '177': '肌', '178': '捏', '179': '搓',
            '180': '柔', '181': '软', '182': '隐', '183': '秘', '184': '毛', '185': '少', '186': '沟', '187': '汁', '188': '爱', '189': '透',
            '190': '湿', '191': '滑', '192': '抽', '193': '饥', '194': '饿', '195': '喘',
            // '196': ' : ', '197': ' : ', '198': ' : ', '199': ' : '
        };

        let fontArr = [], icon = '✨';
        document.querySelectorAll('i').forEach(e => {
            let num = e.className.replace('icon-', '').trim();

            // 图标转换为文字
            if (Object.hasOwn(iconObj, num)) {
                fontArr.push(num + '-' + icon + iconObj[num]);
                e.outerText = icon + iconObj[num];
            } else {
                e.innerText = ' : ' + num + e.innerText;
                e.setAttribute('style', 'background-color: green; color:wheat;');
            }
        })

        console.log('繁体:\n\n', $("#pt-pop")[0].innerText);
        // 文本简体/繁体中文转换
        $("#pt-pop")[0].innerHTML = transformContentFix(transformContent($("#pt-pop")[0].innerHTML), icon);

        // 高亮显示图标
        fontArr.forEach((item, i) => {
            let con = $("#pt-pop")[0].innerHTML;
            item = transformContent(item);
            if (con.indexOf(item.split('-')[1]) !== -1) {
                $("#pt-pop")[0].innerHTML = con.replace(item.split('-')[1], highLightIcon(item.split('-')[0], item.at(-1)));
                delete fontArr[i];
            }
        });
        // 高亮显示其他图标
        fontArr.filter(item => item !== undefined || item !== '').forEach(item => {
            let con = $("#pt-pop")[0].innerHTML, position = con.indexOf(icon);
            $("#pt-pop")[0].innerHTML = con.slice(0, position) + highLightIcon(item.split('-')[0], con.at(position + 1)) + con.slice(position + 2, con.length);
        })
    }

    function highLightIcon(key = '', val = '') {
        return `<b icon="${key}" style="border-bottom: 3px solid #ffff00a1;">${val}</b>`;
    }

    // 繁体中文转换简体中文 对照表
    const DICT = [
        '克己覆禮 : 克己复礼', '反反覆覆 : 反反复复', '心中一沈 : 心中一沉', '昏昏沈沈 : 昏昏沉沉', '死氣沈沈 : 死气沉沉', '死而覆生 : 死而复生', '浮浮沈沈 : 浮浮沉沉', '石沈大海 : 石沉大海', '萬劫不覆 : 万劫不复', '身經百鍊 : 身经百炼', '面沈如水 : 面沉如水', '少以為 : 自以为', '怎麼辦 : 怎么办', '手搟面 : 手擀面', '昏沈沈 : 昏沉沉', '沈了沈 : 沉了沉', '沈住气 : 沉住气', '沈甸甸 : 沉甸甸', '沈著臉 : 沉着脸', '覆讀機 : 复读机', '陰沈沈 : 阴沉沉', '书藉 : 书籍', '乾涸 : 干涸', '乾淨 : 干净', '乾燥 : 干燥', '乾糧 : 干粮', '亮著 : 亮着', '介面 : 界面', '仗著 : 仗着', '低沈 : 低沉', '修覆 : 修复', '冷著 : 冷着', '剛纔 : 刚才', '創辦 : 创办', '勾著 : 勾着', '包著 : 包着', '半乾 : 半干', '反覆 : 反复', '咬著 : 咬着', '回覆 : 回复', '圍著 : 围着', '報覆 : 报复', '實際 : 实际', '少己 : 自己', '帶著 : 带着', '平覆 : 平复', '康覆 : 康复', '彷彿 : 仿佛', '微沈 : 微沉', '徹底 : 彻底', '恢覆 : 恢复', '抵著 : 抵着', '拉鍊 : 拉链', '掛著 : 挂着', '提著 : 提着', '晕沈 : 晕沉', '暗沈 : 暗沉', '朝著 : 朝着', '未乾 : 未干', '沈寂 : 沉寂', '沈思 : 沉思', '沈悶 : 沉闷', '沈浸 : 沉浸', '沈淀 : 沉淀', '沈溺 : 沉溺', '沈穩 : 沉稳', '沈聲 : 沉声', '沈迷 : 沉迷', '沈醉 : 沉醉', '沈重 : 沉重', '沈静 : 沉静', '沈默 : 沉默', '浮沈 : 浮沉', '深沈 : 深沉', '無際 : 无际', '照著 : 照着', '特兩 : 特别', '環著 : 环着', '發沈 : 发沉', '看著 : 看着', '秒鐘 : 秒钟', '等著 : 等着', '答覆 : 答复', '繁覆 : 繁复', '莞爾 : 莞尔', '著急 : 着急', '覆仇 : 复仇', '覆刻 : 复刻', '覆查 : 复查', '覆核 : 复核', '覆活 : 复活', '覆燃 : 复燃', '覆盖 : 覆盖', '覆蘇 : 复苏', '覆返 : 复返', '覆述 : 复述', '覆雜 : 复杂', '託著 : 托着', '趕緊 : 赶紧', '辦好 : 办好', '辦法 : 办法', '連結 : 链接', '鉅變 : 巨变', '陰沈 : 阴沉', '隊員 : 队员', '順著 : 顺着', '丟 : 丢', '並 : 并', '乹 : 乾', '乾 : 干', '亂 : 乱', '亙 : 亘', '亞 : 亚', '亱 : 夜', '亾 : 亡', '伕 : 夫', '佈 : 布', '佔 : 占', '併 : 并', '來 : 来', '侖 : 仑', '侶 : 侣', '侷 : 局', '係 : 系', '俠 : 侠', '俬 : 私', '倆 : 俩', '倉 : 仓', '個 : 个', '們 : 们', '倖 : 幸', '倫 : 伦', '偉 : 伟', '側 : 侧', '偵 : 侦', '偽 : 伪', '傑 : 杰', '傘 : 伞', '備 : 备', '傢 : 家', '傭 : 佣', '傯 : 偬', '傳 : 传', '傴 : 伛', '債 : 债', '傷 : 伤', '傾 : 倾', '僂 : 偻', '僅 : 仅', '僑 : 侨', '僕 : 仆', '僥 : 侥', '僱 : 雇', '價 : 价', '儀 : 仪', '億 : 亿', '儉 : 俭', '儐 : 傧', '儕 : 侪', '儘 : 尽', '償 : 偿', '優 : 优', '儲 : 储', '儼 : 俨', '兇 : 凶', '兌 : 兑', '兒 : 儿', '兗 : 兖', '內 : 内', '兩 : 两', '冊 : 册', '冪 : 幂', '凃 : 涂', '凍 : 冻', '凜 : 凛', '凱 : 凯', '別 : 别', '刧 : 劫', '刪 : 删', '則 : 则', '剋 : 克', '剛 : 刚', '剝 : 剥', '剮 : 剐', '創 : 创', '剷 : 铲', '劃 : 划', '劇 : 剧', '劉 : 刘', '劊 : 刽', '劍 : 剑', '劑 : 剂', '勁 : 劲', '勅 : 敕', '動 : 动', '務 : 务', '勝 : 胜', '勞 : 劳', '勢 : 势', '勵 : 励', '勸 : 劝', '勻 : 匀', '匯 : 汇', '匱 : 匮', '匳 : 奁', '區 : 区', '協 : 协', '卻 : 却', '厀 : 膝', '厙 : 厍', '厛 : 厅', '厭 : 厌', '厲 : 厉', '參 : 参', '叡 : 睿', '叢 : 丛', '吚 : 咿', '吳 : 吴', '呂 : 吕', '咊 : 和', '哐 : 哐', '員 : 员', '哶 : 羋', '唄 : 呗', '唸 : 念', '問 : 问', '啓 : 启', '啞 : 哑', '啟 : 启', '啣 : 衔', '喒 : 咱', '喚 : 唤', '喦 : 岩', '喪 : 丧', '喬 : 乔', '單 : 单', '喲 : 哟', '嗆 : 呛', '嗇 : 啬', '嗎 : 吗', '嗚 : 呜', '嗩 : 唢', '嘆 : 叹', '嘍 : 喽', '嘔 : 呕', '嘖 : 啧', '嘗 : 尝', '嘩 : 哗', '嘮 : 唠', '嘯 : 啸', '嘰 : 叽', '嘸 : 呒', '噁 : 恶', '噅 : 咴', '噝 : 咝', '噠 : 哒', '噥 : 哝', '噦 : 哕', '噲 : 哙', '噴 : 喷', '噸 : 吨', '噹 : 当', '嚀 : 咛', '嚇 : 吓', '嚐 : 尝', '嚕 : 噜', '嚥 : 咽', '嚨 : 咙', '嚮 : 向', '嚴 : 严', '囁 : 嗫', '囂 : 嚣', '囈 : 呓', '囉 : 啰', '囌 : 苏', '囑 : 嘱', '囪 : 囱', '囬 : 回', '圇 : 囵', '國 : 国', '圍 : 围', '園 : 园', '圓 : 圆', '圖 : 图', '團 : 团', '圜 : 圆', '坰 : 垧', '坿 : 附', '垵 : 埯', '埛 : 坰', '執 : 执', '堅 : 坚', '堘 : 塍', '堝 : 埚', '報 : 报', '場 : 场', '塊 : 块', '塋 : 茔', '塒 : 埘', '塗 : 涂', '塤 : 埙', '塵 : 尘', '塹 : 堑', '塼 : 砖', '墊 : 垫', '墜 : 坠', '墮 : 堕', '墳 : 坟', '墾 : 垦', '壇 : 坛', '壓 : 压', '壘 : 垒', '壞 : 坏', '壟 : 垄', '壠 : 垄', '壩 : 坝', '壯 : 壮', '壺 : 壶', '壻 : 婿', '壽 : 寿', '夀 : 寿', '夠 : 够', '夢 : 梦', '夥 : 伙', '夾 : 夹', '奐 : 奂', '奪 : 夺', '奬 : 奖', '奮 : 奋', '妝 : 妆', '妬 : 妒', '娛 : 娱', '婦 : 妇', '婭 : 娅', '媧 : 娲', '媮 : 偷', '媽 : 妈', '嫋 : 袅', '嫗 : 妪', '嫵 : 妩', '嫻 : 娴', '嬌 : 娇', '嬙 : 嫱', '嬡 : 嫒', '嬤 : 嬷', '嬰 : 婴', '嬸 : 婶', '孃 : 娘', '孫 : 孙', '學 : 学', '宮 : 宫', '寀 : 采', '寢 : 寝', '實 : 实', '寧 : 宁', '審 : 审', '寫 : 写', '寬 : 宽', '寵 : 宠', '寶 : 宝', '將 : 将', '專 : 专', '尋 : 寻', '對 : 对', '導 : 导', '尷 : 尴', '屆 : 届', '屍 : 尸', '屢 : 屡', '層 : 层', '屬 : 属', '岅 : 阪', '岡 : 冈', '峯 : 峰', '峴 : 岘', '島 : 岛', '崗 : 岗', '崢 : 峥', '嵐 : 岚', '嵗 : 岁', '嶄 : 崭', '嶺 : 岭', '嶼 : 屿', '嶽 : 岳', '巖 : 岩', '巹 : 卺', '帥 : 帅', '師 : 师', '帬 : 裙', '帳 : 帐', '帶 : 带', '幀 : 帧', '幙 : 幙', '幟 : 帜', '幣 : 币', '幫 : 帮', '幹 : 干', '幾 : 几', '庫 : 库', '廁 : 厕', '廂 : 厢', '廄 : 厩', '廈 : 厦', '廐 : 廏', '廚 : 厨', '廝 : 厮', '廟 : 庙', '廠 : 厂', '廢 : 废', '廣 : 广', '廬 : 庐', '廳 : 厅', '廵 : 巡', '弒 : 弑', '弔 : 吊', '張 : 张', '強 : 强', '彆 : 别', '彈 : 弹', '彊 : 强', '彌 : 弥', '彎 : 弯', '彙 : 汇', '彫 : 雕', '後 : 后', '徑 : 径', '從 : 从', '徠 : 徕', '復 : 复', '徴 : 征', '徵 : 征', '徹 : 彻', '恆 : 恒', '恠 : 怪', '恥 : 耻', '悅 : 悦', '悤 : 匆', '悵 : 怅', '悶 : 闷', '悽 : 凄', '惘 : 惘', '惡 : 恶', '惱 : 恼', '惻 : 恻', '愛 : 爱', '愜 : 惬', '愷 : 恺', '愾 : 忾', '慄 : 栗', '態 : 态', '慍 : 愠', '慘 : 惨', '慙 : 惭', '慚 : 惭', '慟 : 恸', '慣 : 惯', '慪 : 怄', '慫 : 怂', '慮 : 虑', '慳 : 悭', '慶 : 庆', '慾 : 欲', '憂 : 忧', '憊 : 惫', '憐 : 怜', '憑 : 凭', '憚 : 惮', '憤 : 愤', '憫 : 悯', '憲 : 宪', '憶 : 忆', '懇 : 恳', '應 : 应', '懕 : 恹', '懞 : 蒙', '懟 : 怼', '懣 : 懑', '懨 : 恹', '懲 : 惩', '懶 : 懒', '懷 : 怀', '懸 : 悬', '懺 : 忏', '懼 : 惧', '懽 : 欢', '戀 : 恋', '戰 : 战', '戲 : 戏', '戶 : 户', '挐 : 拿', '挾 : 挟', '挿 : 插', '捨 : 舍', '捱 : 挨', '捲 : 卷', '掃 : 扫', '掄 : 抡', '掙 : 挣', '掛 : 挂', '採 : 采', '揀 : 拣', '揚 : 扬', '換 : 换', '揫 : 揪', '揮 : 挥', '揹 : 背', '損 : 损', '搖 : 摇', '搗 : 捣', '搥 : 搥', '搯 : 掏', '搶 : 抢', '摜 : 掼', '摟 : 搂', '摯 : 挚', '摳 : 抠', '摺 : 折', '摻 : 掺', '撃 : 击', '撈 : 捞', '撐 : 撑', '撓 : 挠', '撚 : 捻', '撟 : 挢', '撥 : 拨', '撦 : 钞', '撫 : 抚', '撲 : 扑', '撻 : 挞', '撾 : 挝', '撿 : 捡', '擁 : 拥', '擄 : 掳', '擇 : 择', '擊 : 击', '擋 : 挡', '擔 : 担', '擕 : 携', '據 : 据', '擠 : 挤', '擧 : 举', '擬 : 拟', '擰 : 拧', '擱 : 搁', '擲 : 掷', '擴 : 扩', '擺 : 摆', '擻 : 擞', '擾 : 扰', '攏 : 拢', '攔 : 拦', '攙 : 搀', '攜 : 携', '攝 : 摄', '攢 : 攒', '攣 : 挛', '攤 : 摊', '攪 : 搅', '攬 : 揽', '敗 : 败', '敘 : 叙', '敭 : 扬', '敵 : 敌', '數 : 数', '斂 : 敛', '斃 : 毙', '斬 : 斩', '斷 : 断', '於 : 于', '旾 : 春', '昇 : 升', '時 : 时', '晉 : 晋', '晝 : 昼', '晳 : 晰', '暈 : 晕', '暉 : 晖', '暢 : 畅', '暫 : 暂', '暱 : 昵', '曆 : 历', '曇 : 昙', '曉 : 晓', '曖 : 暧', '曠 : 旷', '曬 : 晒', '書 : 书', '會 : 会', '朢 : 望', '朧 : 胧', '東 : 东', '桮 : 杯', '桺 : 柳', '桿 : 杆', '梔 : 栀', '條 : 条', '棄 : 弃', '棗 : 枣', '棟 : 栋', '棧 : 栈', '棲 : 栖', '楊 : 杨', '楓 : 枫', '楥 : 楦', '業 : 业', '極 : 极', '榖 : 谷', '榦 : 干', '榪 : 杩', '榮 : 荣', '構 : 构', '槍 : 枪', '槓 : 杠', '槕 : 桌', '様 : 樣', '槨 : 椁', '槳 : 桨', '樁 : 桩', '樂 : 乐', '樑 : 梁', '樓 : 楼', '標 : 标', '樞 : 枢', '樣 : 样', '樸 : 朴', '樹 : 树', '橋 : 桥', '機 : 机', '橢 : 椭', '橫 : 横', '檁 : 檩', '檔 : 档', '檢 : 检', '檯 : 台', '檳 : 槟', '檸 : 柠', '檻 : 槛', '檾 : 苘', '櫃 : 柜', '櫚 : 榈', '櫝 : 椟', '櫥 : 橱', '櫫 : 橥', '櫳 : 栊', '櫻 : 樱', '欄 : 栏', '權 : 权', '欒 : 栾', '欖 : 榄', '欞 : 棂', '欽 : 钦', '歎 : 叹', '歗 : 啸', '歡 : 欢', '歲 : 岁', '歷 : 历', '歸 : 归', '歿 : 殁', '殘 : 残', '殞 : 殒', '殫 : 殚', '殭 : 僵', '殲 : 歼', '殺 : 杀', '殼 : 壳', '毀 : 毁', '毆 : 殴', '氂 : 牦', '氈 : 毡', '氌 : 氇', '氣 : 气', '氫 : 氢', '氳 : 氲', '氷 : 冰', '汙 : 污', '決 : 决', '沒 : 没', '況 : 况', '洩 : 泄', '洶 : 汹', '涇 : 泾', '涼 : 凉', '淚 : 泪', '淨 : 净', '淩 : 凌', '淪 : 沦', '淵 : 渊', '淺 : 浅', '渙 : 涣', '渦 : 涡', '測 : 测', '渾 : 浑', '湊 : 凑', '湧 : 涌', '湯 : 汤', '準 : 准', '溝 : 沟', '溫 : 温', '溼 : 湿', '滄 : 沧', '滅 : 灭', '滎 : 荥', '滬 : 沪', '滯 : 滞', '滲 : 渗', '滷 : 卤', '滾 : 滚', '滿 : 满', '漚 : 沤', '漢 : 汉', '漣 : 涟', '漬 : 渍', '漲 : 涨', '漸 : 渐', '漿 : 浆', '潑 : 泼', '潔 : 洁', '潛 : 潜', '潤 : 润', '潰 : 溃', '潷 : 滗', '澀 : 涩', '澆 : 浇', '澤 : 泽', '澱 : 淀', '濁 : 浊', '濃 : 浓', '濕 : 湿', '濘 : 泞', '濛 : 蒙', '濟 : 济', '濤 : 涛', '濫 : 滥', '濬 : 浚', '濰 : 潍', '濱 : 滨', '濺 : 溅', '濾 : 滤', '瀆 : 渎', '瀉 : 泻', '瀋 : 渖', '瀏 : 浏', '瀕 : 濒', '瀝 : 沥', '瀟 : 潇', '瀠 : 潆', '瀰 : 弥', '瀲 : 潋', '瀾 : 澜', '灃 : 沣', '灋 : 法', '灑 : 洒', '灕 : 漓', '灘 : 滩', '灝 : 灏', '灧 : 滟', '灩 : 滟', '災 : 灾', '炤 : 照', '為 : 为', '烏 : 乌', '烴 : 烃', '無 : 无', '煇 : 辉', '煉 : 炼', '煙 : 烟', '煥 : 焕', '煩 : 烦', '煬 : 炀', '熄 : 熄', '熒 : 荧', '熗 : 炝', '熱 : 热', '熾 : 炽', '燁 : 烨', '燈 : 灯', '燉 : 炖', '燒 : 烧', '燙 : 烫', '燜 : 焖', '營 : 营', '燦 : 灿', '燬 : 毁', '燭 : 烛', '燻 : 熏', '燼 : 烬', '爍 : 烁', '爐 : 炉', '爛 : 烂', '爭 : 争', '爺 : 爷', '爾 : 尔', '牆 : 墙', '牕 : 窗', '牴 : 抵', '牽 : 牵', '犇 : 奔', '犢 : 犊', '犧 : 牺', '狀 : 状', '狽 : 狈', '猂 : 悍', '猙 : 狰', '猨 : 猿', '猶 : 犹', '猻 : 狲', '獁 : 犸', '獄 : 狱', '獅 : 狮', '獎 : 奖', '獨 : 独', '獫 : 猃', '獰 : 狞', '獲 : 获', '獵 : 猎', '獷 : 犷', '獸 : 兽', '獻 : 献', '珎 : 珍', '現 : 现', '瑣 : 琐', '瑤 : 瑶', '瑩 : 莹', '瑪 : 玛', '璣 : 玑', '環 : 环', '瓈 : 璃', '瓊 : 琼', '瓏 : 珑', '瓔 : 璎', '甕 : 瓮', '產 : 产', '産 : 产', '甦 : 苏', '畝 : 亩', '畢 : 毕', '畫 : 画', '異 : 异', '畱 : 留', '當 : 当', '疊 : 叠', '疎 : 疏', '疿 : 痱', '痐 : 蛔', '痙 : 痉', '痠 : 酸', '瘂 : 痖', '瘋 : 疯', '瘖 : 喑', '瘡 : 疮', '瘧 : 疟', '療 : 疗', '癄 : 憔', '癆 : 痨', '癉 : 瘅', '癒 : 愈', '癟 : 瘪', '癢 : 痒', '癤 : 疖', '癥 : 症', '癧 : 疬', '癮 : 瘾', '癰 : 痈', '癱 : 瘫', '癲 : 癫', '發 : 发', '皚 : 皑', '皷 : 鼓', '皺 : 皱', '盃 : 杯', '盜 : 盗', '盞 : 盏', '盡 : 尽', '監 : 监', '盤 : 盘', '盧 : 卢', '盪 : 荡', '眥 : 眦', '眾 : 众', '睏 : 困', '睜 : 睁', '睞 : 睐', '瞘 : 眍', '瞞 : 瞒', '瞭 : 了', '瞼 : 睑', '矇 : 蒙', '矚 : 瞩', '矯 : 矫', '硃 : 朱', '硤 : 硖', '硯 : 砚', '碩 : 硕', '確 : 确', '碼 : 码', '磚 : 砖', '磣 : 碜', '磧 : 碛', '礎 : 础', '礙 : 碍', '礦 : 矿', '礬 : 矾', '禍 : 祸', '禦 : 御', '禪 : 禅', '禮 : 礼', '禱 : 祷', '秈 : 籼', '秌 : 秋', '稅 : 税', '稜 : 棱', '稟 : 禀', '稭 : 秸', '種 : 种', '稱 : 称', '稺 : 稚', '穀 : 谷', '積 : 积', '穎 : 颖', '穢 : 秽', '穩 : 稳', '穫 : 获', '窩 : 窝', '窪 : 洼', '窮 : 穷', '窺 : 窥', '竄 : 窜', '竅 : 窍', '竈 : 灶', '竊 : 窃', '競 : 竞', '筆 : 笔', '筍 : 笋', '筦 : 管', '箇 : 个', '箏 : 筝', '節 : 节', '範 : 范', '築 : 筑', '篛 : 箬', '篠 : 筱', '篤 : 笃', '篩 : 筛', '篹 : 纂', '簍 : 篓', '簡 : 简', '簣 : 篑', '簫 : 箫', '簷 : 檐', '簽 : 签', '簾 : 帘', '籃 : 篮', '籌 : 筹', '籐 : 藤', '籟 : 籁', '籠 : 笼', '籤 : 签', '籬 : 篱', '籮 : 箩', '籲 : 吁', '粵 : 粤', '糞 : 粪', '糧 : 粮', '糰 : 团', '糴 : 籴', '糶 : 粜', '糾 : 纠', '紀 : 纪', '約 : 约', '紅 : 红', '紆 : 纡', '紈 : 纨', '紋 : 纹', '納 : 纳', '紐 : 纽', '紓 : 纾', '純 : 纯', '紗 : 纱', '紙 : 纸', '級 : 级', '紛 : 纷', '紥 : 扎', '紮 : 扎', '細 : 细', '紱 : 绂', '紲 : 绁', '紹 : 绍', '紿 : 绐', '終 : 终', '絃 : 弦', '組 : 组', '絆 : 绊', '絎 : 绗', '結 : 结', '絕 : 绝', '絞 : 绞', '絡 : 络', '絢 : 绚', '給 : 给', '絨 : 绒', '統 : 统', '絲 : 丝', '絹 : 绢', '綁 : 绑', '綃 : 绡', '經 : 经', '綜 : 综', '綞 : 缍', '綠 : 绿', '綢 : 绸', '綣 : 绻', '綫 : 线', '維 : 维', '綰 : 绾', '綱 : 纲', '網 : 网', '綴 : 缀', '綵 : 彩', '綺 : 绮', '綻 : 绽', '綽 : 绰', '綾 : 绫', '綿 : 绵', '緇 : 缁', '緊 : 紧', '緋 : 绯', '緍 : 缗', '緒 : 绪', '緘 : 缄', '緙 : 缂', '線 : 线', '緝 : 缉', '緞 : 缎', '緣 : 缘', '緥 : 褓', '編 : 编', '緩 : 缓', '緬 : 缅', '緯 : 纬', '緱 : 缑', '緲 : 缈', '練 : 练', '緹 : 缇', '緻 : 致', '縈 : 萦', '縊 : 缢', '縋 : 缒', '縐 : 绉', '縑 : 缣', '縛 : 缚', '縝 : 缜', '縣 : 县', '縫 : 缝', '縮 : 缩', '縱 : 纵', '縴 : 纤', '縷 : 缕', '縹 : 缥', '總 : 总', '績 : 绩', '繃 : 绷', '繆 : 缪', '織 : 织', '繕 : 缮', '繖 : 伞', '繙 : 翻', '繚 : 缭', '繞 : 绕', '繡 : 绣', '繩 : 绳', '繪 : 绘', '繫 : 系', '繭 : 茧', '繳 : 缴', '繹 : 绎', '繼 : 继', '繽 : 缤', '繾 : 缱', '續 : 续', '纍 : 累', '纏 : 缠', '纓 : 缨', '纔 : 才', '纖 : 纤', '纜 : 缆', '缽 : 钵', '缾 : 瓶', '罇 : 樽', '罈 : 坛', '罎 : 坛', '罰 : 罚', '罵 : 骂', '罷 : 罢', '羅 : 罗', '羆 : 罴', '羈 : 羁', '義 : 义', '習 : 习', '翶 : 翶', '翹 : 翘', '翺 : 翱', '聖 : 圣', '聞 : 闻', '聯 : 联', '聰 : 聪', '聲 : 声', '聳 : 耸', '聵 : 聩', '聶 : 聂', '職 : 职', '聽 : 听', '聾 : 聋', '肅 : 肃', '肐 : 胳', '肧 : 胚', '脅 : 胁', '脈 : 脉', '脛 : 胫', '脩 : 修', '脫 : 脱', '脹 : 胀', '腎 : 肾', '腖 : 胨', '腡 : 脶', '腦 : 脑', '腫 : 肿', '腳 : 脚', '腸 : 肠', '膚 : 肤', '膠 : 胶', '膩 : 腻', '膽 : 胆', '膿 : 脓', '臉 : 脸', '臏 : 膑', '臓 : 赃', '臘 : 腊', '臚 : 胪', '臟 : 脏', '臠 : 脔', '臢 : 臜', '臥 : 卧', '臨 : 临', '臺 : 台', '與 : 与', '興 : 兴', '舉 : 举', '舊 : 旧', '艕 : 艕', '艙 : 舱', '艦 : 舰', '艪 : 橹', '艱 : 艰', '艷 : 艳', '芻 : 刍', '苧 : 苎', '茲 : 兹', '荊 : 荆', '莊 : 庄', '莖 : 茎', '菑 : 灾', '華 : 华', '菴 : 庵', '菸 : 烟', '萊 : 莱', '萬 : 万', '葉 : 叶', '著 : 着', '葯 : 药', '葷 : 荤', '蒐 : 搜', '蒞 : 莅', '蒼 : 苍', '蓀 : 荪', '蓋 : 盖', '蓧 : 莜', '蓮 : 莲', '蓴 : 莼', '蓽 : 荜', '蔔 : 卜', '蔥 : 葱', '蔭 : 荫', '蕋 : 蕊', '蕓 : 芸', '蕚 : 萼', '蕢 : 蒉', '蕩 : 荡', '蕪 : 芜', '蕭 : 萧', '薑 : 姜', '薦 : 荐', '薩 : 萨', '藉 : 借', '藍 : 蓝', '藝 : 艺', '藥 : 药', '藶 : 苈', '藷 : 薯', '藹 : 蔼', '蘆 : 芦', '蘇 : 苏', '蘊 : 蕴', '蘋 : 苹', '蘐 : 萱', '蘤 : 花', '蘭 : 兰', '蘿 : 萝', '處 : 处', '虖 : 乎', '虛 : 虚', '虜 : 虏', '號 : 号', '虧 : 亏', '虯 : 虬', '蛺 : 蛱', '蜋 : 螂', '蜺 : 霓', '蝕 : 蚀', '蝟 : 猬', '蝦 : 虾', '蝸 : 蜗', '螞 : 蚂', '螡 : 蚊', '螢 : 萤', '螻 : 蝼', '蟄 : 蛰', '蟣 : 虮', '蟬 : 蝉', '蟲 : 虫', '蟶 : 蛏', '蟻 : 蚁', '蠅 : 蝇', '蠍 : 蝎', '蠐 : 蛴', '蠑 : 蝾', '蠔 : 蚝', '蠟 : 蜡', '蠱 : 蛊', '蠶 : 蚕', '蠻 : 蛮', '衆 : 众', '衇 : 脉', '衊 : 蔑', '術 : 术', '衚 : 胡', '衛 : 卫', '衝 : 冲', '衞 : 卫', '衹 : 只', '袠 : 帙', '裊 : 袅', '裏 : 里', '補 : 补', '裝 : 装', '裡 : 里', '裦 : 褒', '製 : 制', '複 : 复', '褲 : 裤', '褳 : 裢', '褸 : 褛', '褻 : 亵', '襍 : 杂', '襖 : 袄', '襝 : 裣', '襠 : 当', '襤 : 褴', '襪 : 袜', '襬 : 摆', '襯 : 衬', '襲 : 袭', '見 : 见', '規 : 规', '覓 : 觅', '覔 : 觅', '視 : 视', '覡 : 觋', '覦 : 觎', '親 : 亲', '覬 : 觊', '覷 : 觑', '覺 : 觉', '覽 : 览', '覿 : 觌', '觀 : 观', '觸 : 触', '訂 : 订', '計 : 计', '訊 : 讯', '討 : 讨', '訓 : 训', '訕 : 讪', '託 : 托', '記 : 记', '訛 : 讹', '訝 : 讶', '訟 : 讼', '訣 : 诀', '訥 : 讷', '訦 : 谌', '訪 : 访', '設 : 设', '許 : 许', '訴 : 诉', '診 : 诊', '註 : 注', '証 : 证', '詆 : 诋', '詐 : 诈', '評 : 评', '詘 : 诎', '詛 : 诅', '詞 : 词', '詡 : 诩', '詢 : 询', '詣 : 诣', '試 : 试', '詩 : 诗', '詫 : 诧', '詭 : 诡', '詰 : 诘', '話 : 话', '該 : 该', '詳 : 详', '詼 : 诙', '詿 : 诖', '誅 : 诛', '誆 : 诓', '誇 : 夸', '誌 : 志', '認 : 认', '誒 : 诶', '誕 : 诞', '誘 : 诱', '語 : 语', '誠 : 诚', '誡 : 诫', '誣 : 诬', '誤 : 误', '誥 : 诰', '誦 : 诵', '誨 : 诲', '說 : 说', '誰 : 谁', '課 : 课', '誹 : 诽', '誼 : 谊', '調 : 调', '諂 : 谄', '談 : 谈', '諉 : 诿', '請 : 请', '諒 : 谅', '論 : 论', '諛 : 谀', '諜 : 谍', '諠 : 喧', '諡 : 谥', '諧 : 谐', '諭 : 谕', '諱 : 讳', '諳 : 谙', '諷 : 讽', '諸 : 诸', '諾 : 诺', '謀 : 谋', '謁 : 谒', '謂 : 谓', '謄 : 誊', '謅 : 诌', '謊 : 谎', '謎 : 谜', '謐 : 谧', '謔 : 谑', '謙 : 谦', '講 : 讲', '謝 : 谢', '謠 : 谣', '謨 : 谟', '謫 : 谪', '謬 : 谬', '謹 : 谨', '謾 : 谩', '譁 : 哗', '證 : 证', '譌 : 讹', '譎 : 谲', '譏 : 讥', '識 : 识', '譚 : 谭', '譜 : 谱', '譟 : 噪', '譫 : 谵', '譭 : 毁', '譯 : 译', '議 : 议', '譴 : 谴', '護 : 护', '譽 : 誉', '譾 : 谫', '讀 : 读', '變 : 变', '讐 : 雠', '讒 : 谗', '讓 : 让', '讕 : 谰', '讚 : 赞', '讜 : 挡', '豈 : 岂', '豎 : 竖', '豐 : 丰', '豔 : 艳', '豬 : 猪', '貍 : 狸', '貓 : 猫', '貝 : 贝', '負 : 负', '財 : 财', '貢 : 贡', '貧 : 贫', '貨 : 货', '販 : 贩', '貪 : 贪', '貫 : 贯', '責 : 责', '貰 : 贳', '貳 : 贰', '貴 : 贵', '買 : 买', '費 : 费', '貼 : 贴', '貿 : 贸', '賀 : 贺', '賂 : 赂', '賄 : 贿', '賅 : 赅', '資 : 资', '賉 : 恤', '賊 : 贼', '賑 : 赈', '賓 : 宾', '賜 : 赐', '賞 : 赏', '賠 : 赔', '賡 : 赓', '賢 : 贤', '賣 : 卖', '賤 : 贱', '賦 : 赋', '質 : 质', '賬 : 账', '賭 : 赌', '賮 : 赆', '賴 : 赖', '賺 : 赚', '購 : 购', '賽 : 赛', '賾 : 赜', '贅 : 赘', '贇 : 赟', '贈 : 赠', '贊 : 赞', '贋 : 赝', '贏 : 赢', '贓 : 赃', '贖 : 赎', '贜 : 赃', '趂 : 趁', '趕 : 赶', '趙 : 赵', '趨 : 趋', '趲 : 趱', '跡 : 迹', '跴 : 踩', '踐 : 践', '踡 : 蜷', '踫 : 踫', '踰 : 踰', '踴 : 踊', '蹌 : 跄', '蹟 : 迹', '蹣 : 蹒', '蹤 : 踪', '蹵 : 辏', '蹺 : 跷', '躂 : 跶', '躊 : 踌', '躋 : 跻', '躍 : 跃', '躓 : 踬', '躕 : 蹰', '躡 : 蹑', '躥 : 蹿', '躪 : 躏', '躰 : 体', '軀 : 躯', '車 : 车', '軋 : 轧', '軌 : 轨', '軍 : 军', '軒 : 轩', '軟 : 软', '軲 : 轱', '軸 : 轴', '軹 : 轵', '軺 : 轺', '較 : 较', '載 : 载', '輔 : 辅', '輕 : 轻', '輛 : 辆', '輝 : 辉', '輩 : 辈', '輪 : 轮', '輯 : 辑', '輸 : 输', '輾 : 辗', '輿 : 舆', '轅 : 辕', '轆 : 辘', '轉 : 转', '轍 : 辙', '轎 : 轿', '轔 : 辚', '轟 : 轰', '轡 : 辔', '轤 : 辤', '辤 : 辞', '辦 : 办', '辭 : 辞', '辮 : 辫', '辯 : 辩', '農 : 农', '辳 : 农', '迆 : 迤', '迴 : 回', '逕 : 径', '這 : 这', '連 : 连', '週 : 周', '進 : 进', '遊 : 游', '運 : 运', '過 : 过', '達 : 达', '違 : 违', '遙 : 遥', '遜 : 逊', '遞 : 递', '遠 : 远', '適 : 适', '遲 : 迟', '遷 : 迁', '選 : 选', '遺 : 遗', '遼 : 辽', '邁 : 迈', '還 : 还', '邊 : 边', '邏 : 逻', '郵 : 邮', '鄉 : 乡', '鄒 : 邹', '鄘 : 墉', '鄧 : 邓', '鄭 : 郑', '鄰 : 邻', '鄺 : 邝', '酧 : 酬', '醃 : 腌', '醖 : 酝', '醜 : 丑', '醞 : 酝', '醤 : 酱', '醫 : 医', '醬 : 酱', '釀 : 酿', '釁 : 衅', '釋 : 释', '釐 : 厘', '釔 : 钇', '釗 : 钊', '釘 : 钉', '針 : 针', '釣 : 钓', '釦 : 扣', '釵 : 钗', '鈉 : 钠', '鈍 : 钝', '鈐 : 钤', '鈕 : 钮', '鈞 : 钧', '鈥 : 钬', '鈴 : 铃', '鈺 : 钰', '鉅 : 钜', '鉈 : 铊', '鉗 : 钳', '鉚 : 铆', '鉛 : 铅', '鉞 : 钺', '鉤 : 钩', '鉦 : 钲', '鉭 : 钽', '鉸 : 铰', '鉻 : 铬', '銀 : 银', '銅 : 铜', '銘 : 铭', '銜 : 衔', '銠 : 铑', '銫 : 铯', '銬 : 铐', '銳 : 锐', '銷 : 销', '銹 : 锈', '鋁 : 铝', '鋌 : 铤', '鋒 : 锋', '鋤 : 锄', '鋥 : 锃', '鋦 : 锔', '鋪 : 铺', '鋰 : 锂', '鋻 : 鉴', '鋼 : 钢', '錄 : 录', '錈 : 锩', '錐 : 锥', '錕 : 锟', '錘 : 锤', '錠 : 锭', '錢 : 钱', '錦 : 锦', '錨 : 锚', '錫 : 锡', '錮 : 锢', '錯 : 错', '録 : 录', '錶 : 表', '鍊 : 炼', '鍋 : 锅', '鍍 : 镀', '鍛 : 锻', '鍩 : 锘', '鍫 : 锹', '鍵 : 键', '鍾 : 钟', '鎇 : 镅', '鎔 : 镕', '鎖 : 锁', '鎧 : 铠', '鎩 : 铩', '鎪 : 锼', '鎬 : 镐', '鎮 : 镇', '鎵 : 镓', '鏇 : 旋', '鏈 : 链', '鏍 : 镙', '鏑 : 镝', '鏚 : 戚', '鏟 : 铲', '鏡 : 镜', '鏢 : 镖', '鏤 : 镂', '鏽 : 锈', '鐐 : 镣', '鐓 : 镦', '鐘 : 钟', '鐠 : 镨', '鐦 : 锎', '鐮 : 镰', '鐲 : 镯', '鐵 : 铁', '鐺 : 铛', '鐿 : 镱', '鑄 : 铸', '鑊 : 镬', '鑌 : 镔', '鑑 : 鉴', '鑣 : 镳', '鑰 : 钥', '鑲 : 镶', '鑼 : 锣', '鑽 : 钻', '鑾 : 銮', '鑿 : 凿', '長 : 长', '門 : 门', '閃 : 闪', '閆 : 闫', '閉 : 闭', '開 : 开', '閌 : 闶', '閒 : 闲', '間 : 间', '閔 : 闵', '閘 : 闸', '閡 : 阂', '閣 : 阁', '閤 : 合', '閥 : 阀', '閨 : 闺', '閩 : 闽', '閫 : 阃', '閱 : 阅', '閻 : 阎', '閾 : 阈', '闃 : 阒', '闆 : 板', '闈 : 闱', '闊 : 阔', '闋 : 阕', '闌 : 阑', '闔 : 阖', '闕 : 阙', '闖 : 闯', '關 : 关', '闞 : 阚', '闡 : 阐', '闢 : 辟', '阨 : 阨', '陗 : 陗', '陞 : 升', '陣 : 阵', '陰 : 阴', '陳 : 陈', '陸 : 陆', '陽 : 阳', '隉 : 陧', '隊 : 队', '階 : 阶', '隕 : 陨', '際 : 际', '隨 : 随', '險 : 险', '隱 : 隐', '隷 : 隶', '隸 : 隶', '隻 : 只', '雋 : 隽', '雖 : 虽', '雙 : 双', '雛 : 雏', '雜 : 杂', '雞 : 鸡', '離 : 离', '難 : 难', '雲 : 云', '電 : 电', '霧 : 雾', '霽 : 霁', '靂 : 雳', '靈 : 灵', '靚 : 靓', '靜 : 静', '靦 : 腼', '靭 : 韧', '鞏 : 巩', '鞦 : 秋', '韁 : 缰', '韆 : 千', '韉 : 鞯', '韌 : 韧', '韙 : 韪', '韞 : 韫', '韤 : 袜', '韻 : 韵', '響 : 响', '頁 : 页', '頂 : 顶', '頃 : 顷', '項 : 项', '順 : 顺', '頇 : 顸', '須 : 须', '頊 : 顼', '頌 : 颂', '頎 : 颀', '預 : 预', '頑 : 顽', '頒 : 颁', '頓 : 顿', '頗 : 颇', '領 : 领', '頜 : 颌', '頤 : 颐', '頦 : 颏', '頭 : 头', '頰 : 颊', '頷 : 颔', '頸 : 颈', '頹 : 颓', '頻 : 频', '頽 : 颓', '顆 : 颗', '題 : 题', '額 : 额', '顎 : 颚', '顏 : 颜', '願 : 愿', '顛 : 颠', '類 : 类', '顧 : 顾', '顫 : 颤', '顬 : 颥', '顯 : 显', '顱 : 颅', '顴 : 颧', '風 : 风', '颯 : 飒', '颱 : 台', '颳 : 刮', '颶 : 飓', '飄 : 飘', '飆 : 飙', '飇 : 飙', '飛 : 飞', '飢 : 饥', '飩 : 饨', '飪 : 饪', '飭 : 饬', '飯 : 饭', '飲 : 饮', '飼 : 饲', '飽 : 饱', '飾 : 饰', '餃 : 饺', '餅 : 饼', '養 : 养', '餌 : 饵', '餑 : 饽', '餒 : 馁', '餓 : 饿', '餘 : 余', '餚 : 肴', '餛 : 馄', '餞 : 饯', '餡 : 馅', '館 : 馆', '餬 : 糊', '餵 : 喂', '餹 : 餹', '餿 : 馊', '饅 : 馒', '饈 : 馐', '饉 : 馑', '饋 : 馈', '饌 : 馔', '饒 : 饶', '饗 : 飨', '饜 : 餍', '饞 : 馋', '馬 : 马', '馳 : 驰', '馴 : 驯', '駁 : 驳', '駐 : 驻', '駕 : 驾', '駛 : 驶', '駝 : 驼', '駭 : 骇', '駮 : 驳', '駱 : 骆', '駿 : 骏', '騁 : 骋', '騅 : 骓', '騎 : 骑', '騏 : 骐', '騖 : 骛', '騙 : 骗', '騣 : 鬃', '騫 : 骞', '騮 : 骝', '騰 : 腾', '騶 : 驺', '騷 : 骚', '驀 : 蓦', '驁 : 骜', '驂 : 骖', '驃 : 骠', '驄 : 骢', '驅 : 驱', '驊 : 骅', '驍 : 骁', '驕 : 骄', '驗 : 验', '驚 : 惊', '驛 : 驿', '驟 : 骤', '驢 : 驴', '骯 : 肮', '髏 : 髅', '髒 : 脏', '體 : 体', '髖 : 髋', '髮 : 发', '髻 : 髻', '鬀 : 剃', '鬆 : 松', '鬍 : 胡', '鬚 : 须', '鬢 : 鬓', '鬥 : 斗', '鬧 : 闹', '鬨 : 哄', '鬭 : 斗', '鬱 : 郁', '魘 : 魇', '魚 : 鱼', '魴 : 鲂', '魷 : 鱿', '鮭 : 鲑', '鮮 : 鲜', '鯉 : 鲤', '鯝 : 鲴', '鯡 : 鲱', '鯧 : 鲳', '鯿 : 鳊', '鰉 : 鳇', '鰒 : 鳆', '鰓 : 鳃', '鰥 : 鳏', '鰳 : 鳓', '鰷 : 鲦', '鰾 : 鳔', '鱈 : 鳕', '鱉 : 鳖', '鱔 : 鳝', '鱖 : 鳜', '鱘 : 鲟', '鱸 : 鲈', '鳥 : 鸟', '鳩 : 鸠', '鳳 : 凤', '鳴 : 鸣', '鳶 : 鸢', '鴆 : 鸩', '鴉 : 鸦', '鴛 : 鸳', '鴟 : 鸱', '鴣 : 鸪', '鴦 : 鸯', '鴨 : 鸭', '鴯 : 鸸', '鴻 : 鸿', '鴿 : 鸽', '鵂 : 鸺', '鵑 : 鹃', '鵓 : 鹁', '鵝 : 鹅', '鵞 : 鹅', '鵠 : 鹄', '鵡 : 鹉', '鵪 : 鹌', '鵶 : 鸦', '鶉 : 鹑', '鶓 : 鹋', '鶩 : 鹜', '鶯 : 莺', '鶴 : 鹤', '鷄 : 鸡', '鷙 : 鸷', '鷴 : 鹇', '鷸 : 鹬', '鷹 : 鹰', '鷺 : 鹭', '鸎 : 莺', '鸛 : 鹳', '鹸 : 硷', '鹹 : 咸', '鹺 : 鹾', '鹽 : 盐', '麅 : 狍', '麐 : 麟', '麗 : 丽', '麥 : 麦', '麯 : 曲', '麵 : 面', '麼 : 么', '麽 : 么', '黃 : 黄', '黌 : 黉', '點 : 点', '黨 : 党', '黴 : 霉', '鼉 : 鳄', '鼕 : 冬', '齊 : 齐', '齋 : 斋', '齒 : 齿', '齜 : 龇', '齡 : 龄', '齣 : 出', '齧 : 啮', '齬 : 龉', '龍 : 龙', '龐 : 庞', '龕 : 龛', '龜 : 龟'
    ];



})();