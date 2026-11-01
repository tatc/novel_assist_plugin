// all-copy

/*
* 可以抓取的网址 
* haitangtxt po18r rourouwu wodeshubao dameishuwang fushutxt
*/
let websiteObj = [
    {
        index: 1,
        url: 'https://m.haitangtxt.net',
        sign: 'haitangtxt',
        title: '',
        article: ''
    },
    {
        index: 2,
        url: 'https://www.po18r.com/',
        sign: 'po18r',
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
        url: 'https://www.po18yu.vip/',
        sign: 'po18yu',
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
        url: 'https://m.fushutxt.org/',
        sign: 'fushutxt',
        title: '',
        article: '',
        turn: ''
    }
];
let over = true; // 可以翻页

if ($(document)) {
    $(document).ready(function () {
        init();
    })
} else {
    init();
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
        if (window.location.href.includes(obj.sign)) {
            result = obj.index;
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
        case 2: // po18r  
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
            let strArr = document.querySelectorAll('#ChapterView div');
            let p = '';
            let clearTitle = false; // 不是一章的首页
            let quit = false;
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

            let i = 0;
            strArr.forEach(e => {
                if (window.getComputedStyle(e).display != 'none') {
                    if (e.children[0].nodeName == 'P') {
                        i++;
                        p = e.children[0].innerText;
                        let title = document.getElementsByClassName('page-title')[0].innerText;
                        if (clearTitle && i == 1) {
                            str = ' _目录_  【 ' + title.trim() + ' 】 \n\n\n';
                        }
                        // if(p.trim()=='--'){
                        //     quit=true;
                        // }
                        // if(quit){
                        //     return;
                        // }
                        // if(clearTitle){
                        //     if(i==2){
                        //        str=' _目录_  【 ' + p.trim() + ' 】 \n\n\n';
                        //     }else if(i>2){
                        //         str=str+p;
                        //     }
                        // }else{                    
                        //     if(i==1){
                        //         str='  ';
                        //     }
                        //     str=str+p;
                        // }
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
        case 6: // po18yu  
            a = $('#mlfy_main_text h1').text();
            b = $('#TextContent').text().replace('\n   \n   theme();', '').replace('chap_tp();', '').replace(`<br />`, ``).replace(`<br />`, ``);
            str = ' _目录_  【 ' + a + ' 】' + b;
            over = false;
            if (!isCheck) {
                over = true;
            }
            break;
        case 8: // fushutxt 
            // 不按网页每页顶部的标题来做目录，按正文内出现的章节来做目录 
            a = $('#text').text().replace(`<br />`, `\n`);
            b = matchChapter(a);
            str = b.slice(0, b.indexOf('耽美小说 www fushutxt cc 福 书 网')).trimStart();
            str = '\n\n　　' + str.replaceAll('　　', '\n\n　　');
            over = false;
            if (!isCheck) {
                over = true;
            }
            break;
        default: // 基础的通过标签id或者class类名获取章节内容
            a = $(websiteObj[index - 1].title).innerText;
            b = $(websiteObj[index - 1].article).innerText.replace('    ', '\n   ').replace('<br>', '\n   ');
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
        localStorage.setItem('test', testStr);
        showNotification('复制成功');
    }
    document.body.removeChild(transfer);
}

/*
* 弹窗提示信息 
* showNotification('复制成功');
*/
function showNotification(message = '', duration = 1500) {
    var notification = document.createElement('div');
    // notification.className = 'notification';
    notification.style.cssText = "position: fixed;top: 35%;left: 45%;padding: 15px;background-color: #f0f0f0;color: #333;border: 1px solid #ccc;border-radius: 5px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);z-index: 9999;opacity: 1;transition: opacity 0.3s ease-in-out;";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(function () {
        notification.style.opacity = 0;
        // setTimeout(function () {
        document.body.removeChild(notification);
        // }, 0);
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
        case 2: // po18r
            $('.mlfy_page a')[4].click();
            break;
        case 3: // rourouwu
            $('#pt_next')[0].click();
            break;
        case 4: // wodeshubao
            let nextPageArr = document.querySelectorAll('.chapterPages a');
            let nextChapter = document.getElementsByClassName('next')[0];
            let choose = true;

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
        case 6: // po18yu
            $('.mlfy_page a')[4].click();
            break;
        case 8: // fushutxt
            if ($('.pageLink')[0].innerText.includes('尾页')) {
                $('.pageLink a')[$('.pageLink a').length - 2].click();
            } else {
                showNotification('全文结束!');
            }
            break;
        default: // 基础的通过标签id或者class类名获取章节内容
            $(websiteObj[index - 1].turn).click();
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
    let arr = str.match(/(第)([\u4e00-\u9fa5a-zA-Z0-9]{1,7})[章]/g);
    if (arr) {
        arr.map(e => {
            str = str.replace('【', '[').replace('】', ']').replace(e, '\n\n\n  _目录_  【 ' + e + ' 】');
        })
        return str
    }
    return str;
}
