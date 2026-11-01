# novel_assist_plugin

[基本写作和格式语法](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)


# 目录结构
```text
├── novelRead                                   # 通过浏览器阅读本地的小说文档
│   ├── data.js                                 # 小说正文内容 
│   ├── main.js                                 # 阅读播放文档
│   ├── 小说阅读.html                            # 页面
├── transformChinese                            # 简繁转换
│   ├── traditionalSimplifiedDictFinally.txt    # 备份字典文件
│   ├── transformChinese.js                     # 映射简体和繁体生成字典文件
├── novelCopy                                   # 油猴插件，翻页并保存小说网页
│   ├── Tool.js                                 # 翻页并保存网页旧版
│   ├── novel_copy_web.js                       # 翻页并保存网页


       
```


- [novelRead/](./novelRead/)  
        [data.js](novelRead/data.js)  
        [main.js](novelRead/main.js)   
        [小说阅读.html](novelRead/小说阅读.html) 
- [transformChinese/](./transformChinese/)    
        [traditionalSimplifiedDictFinally.txt](transformChinese/traditionalSimplifiedDictFinally.txt)   
        [transformChinese.js](transformChinese/transformChinese.js)  
- [novelCopy/](./novelCopy/)    
        [Tool.js](novelCopy/Tool.js)   
        [novel_copy_web.js](novelCopy/novel_copy_web.js)   
