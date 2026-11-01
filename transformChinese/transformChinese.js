/*
**映射简体和繁体的字典

traditionalSimplifiedDict.txt 保存到的字典文件
traditionalSimplifiedDictFinally.txt 保存到的字典文件，备份文件，用于恢复traditionalSimplifiedDict.txt
arrDict.txt 保存到的变量数组文件
temDict.txt 临时字典文件，测试专用

使用方法：通过变量 TraditionalChineseWord 
变量 TraditionalChinesePhrases 
和文件 traditionalSimplifiedDict.txt 
来生成字典并保存到文件 traditionalSimplifiedDict.txt 和文件 arrDict.txt

**启动和停止调试

F5: 启动并进入断点模式。
Ctrl+F5: 开始执行，不进入断点。
Shift+F5: 停止调试。
Ctrl+Shift+F5: 重启调试。

**逐步执行

F10: 逐过程执行（Step Over）。
F11: 逐语句执行（Step Into）。
Shift+F11: 跳出（Step Out）。

**断点管理

F9: 切换断点。
Ctrl+F9: 启用/停止断点。
Ctrl+Shift+F9: 删除全部断点。

**其他调试操作

F1: 打开命令面板。
Ctrl+Shift+D: 打开运行和调试视图。
Ctrl+Shift+P: 过滤“调试：选择并开始调试”或键入 'debug' 并选择要调试的配置。
*/

// 在 Node.js 中，可以将全局对象 global 赋值给 window 来模拟浏览器环境。
global.window = global;
global.document = {
  createElement: () => { },
};

/**
 * 启动 Node.js 服务器
 * @param {number} port 服务器端口
 * @example
 * runNodeServer();
 * https://nodejs.cn/api/http.html#serverlisten
 */
function runNodeServer(port = 1711) {
  // server.mjs   import { createServer } from 'node:http';
  const createServer = require('http').createServer;
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('127.0.0.1:1235\n');
  });
  // starts a simple http server locally on port 1235
  server.listen(port, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:' + port, 'chrome://127.0.0.1:' + port);
  });
}

// https://www.hanyuguoxue.com/zidian/jianfan 常用简繁汉字对照表
// https://github.com/BYVoid/OpenCC/blob/master/data/dictionary/TSPhrases.txt 開放中文轉換 https://opencc.js.org/converter?config=tw2sp
const RootDirectory = 'E:/f/洬/n/000-tool/简繁转换/';
const DictStyle = ' : ', DictTemFile = RootDirectory + 'temDict.txt', DictStrFile = RootDirectory + 'traditionalSimplifiedDict.txt', DictArrFile = RootDirectory + 'arrDict.txt';
const DICT = readDict(DictStrFile).split('\n');
// 繁体词语大全
let content = `龙晨抵達市区的銀銳銷鋒鋪时候，則剋剛個們側備劃劇`;
/* 繁体字 */
const TraditionalChineseWord = `餞` // `並乾亂亙佈`
const SimplifiedChineseWord = `饯` // `并干乱亘布`
/* 繁体词语，空格分割 */
const TraditionalChinesePhrases = `
實際 無際
`;
const SimplifiedChinesePhrases = `
实际 无际
`;

/**
 * 单字简体/繁体中文转换，通过内置常量字典字符串转换
 * @param {string} word 要转换的中文字符串
 * @param {boolean} transform true 繁转简 false 简转繁
 * @example
 * transformWord('勁優動', true) or transformWord('劲优动', false)
 * @returns '劲优动' or '勁優動'
 */
function transformWord(word = '', transform = true) {
  if (word.length > 1) {
    return word.split('').map(item => transformWord(item, transform)).join('')
  }

  let index = TraditionalChineseWord.indexOf(word)
  transform ? index = TraditionalChineseWord.indexOf(word) : index = SimplifiedChineseWord.indexOf(word);

  if (index != -1 && index < TraditionalChineseWord.length - 1 && index < SimplifiedChineseWord.length - 1) {
    return transform ? SimplifiedChineseWord[index] : TraditionalChineseWord[index]
  } else {
    return word
  }
}

/**
 * 词组简体/繁体中文转换，通过内置常量字典字符串转换
 * @param {string} phrases 要转换的中文词组
 * @param {boolean} transform true 繁转简 false 简转繁
 * @example
 * transformPhrases('徹底', true) or transformPhrases('彻底', false)
 * @returns '彻底' or '徹底'
 */
function transformPhrases(phrases = '', transform = true) {
  let tArr = TraditionalChinesePhrases.replaceAll('\n', ' ').split(' ').filter((word) => word.length > 0);
  let sArr = SimplifiedChinesePhrases.replaceAll('\n', ' ').split(' ').filter((word) => word.length > 0);
  let obj = {}
  let keyArr = transform ? tArr : sArr,
    valueArr = transform ? sArr : tArr;
  keyArr.forEach((key, i) => {
    obj[key] = valueArr[i]
  })
  return obj[phrases] || phrases
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
function transformContent(content = '', transform = true, dict = DICT) {
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

/**
 * 字符串排序
 * @param {string} str 排序后的字符串
 * @param {boolean} space true 包含空格 false 不包含空格
 * @returns '串后字序排的符' 
 */
function stringSort(str = '', space = false) {
  return str.replaceAll('\n', '').split(space ? ' ' : '').filter((word) => word.length > 0).sort().join('');

}

/**
 * 生成词典
 * @param {string} tWord 繁中 `並乾亂`
 * @param {string} sWord 简中 `并干乱`
 * @param {string} type 词典类型 word or phrases
 * @example
 * getDict('並乾亂', '并干乱', 'word') or getDict('乾涸 乾淨', '干涸 干净', 'phrases')
 * @returns ['並 : 并', '乾 : 干', '亂 : 乱'] or ['乾涸 : 干涸', '乾淨 : 干净']
 */
function getDict(traditional = TraditionalChineseWord, simplified = SimplifiedChineseWord, type = 'word') {
  let dict = [];
  let transformSet = new Set();
  if (type == 'word') {
    traditional.replaceAll('\n', '').split('').forEach((item, index) => {
      transformSet.add(item + DictStyle + simplified[index]); // '並 : 并'
    })
  } else if (type == 'phrases') {
    let tArr = traditional.replaceAll('\n', ' ').split(' ').filter((word) => word.length > 0);
    let sArr = simplified.replaceAll('\n', ' ').split(' ').filter((word) => word.length > 0);
    tArr.map((key, i) => {
      transformSet.add(key + DictStyle + sArr[i]);
    })
  }
  dict = Array.from(transformSet).sort();
  return dict
}

/**
 * 保存词典 traditionalSimplifiedDict 
 * @param {string} filename 词典文件名
 * @param {array | string} dict 词典内容 ['並 : 并',乾 : 干] or '並 : 并\n乾 : 干'
 * @param {string} type 保存类型 string or array
 * @example
 * saveDictToTxt(DictStrFile, dict, type = 'string'); or
 * saveDictToTxt(DictArrFile, dict, 'array');
 * @returns `並 : 并\n乾 : 干` or ['並 : 并', '乾 : 干']
 * https://nodejs.cn/api/fs.html#filehandlewritefiledata-options
 */
function saveDictToTxt(filename = DictStrFile, dict = getDict(), type = 'string') {
  if (type == 'string') {
    dict = dict.join('\n');
  }
  if (type == 'array') {
    // let arr = '[ \n';
    /*del*/let arr = '  const DICT = [ \n\t';
    if (typeof dict == 'string') {
      dict = dict.split('\n');
    }
    dict.forEach((el, i) => {
      if (i == dict.length - 1) {
       // arr += "'" + el.trim() + "' \n]";
        /*del*/arr += "'" + el.trim() + "' \n];";
      } else {
        arr += "'" + el.trim() + "',";
      }
    })
    dict = arr;
  }

  const fs = require('fs');
  fs.writeFile(filename, dict, (err) => {
    if (err) throw err;
    console.log('File saved!', ' err: ' + err);
  });
}

/**
 * 读取词典 traditionalSimplifiedDict
 * @param {string} filename 词典文件名
 * @returns '並 : 并\n乾 : 干'
 */
function readDict(filename = DictStrFile) {
  const fs = require('fs');
  const data = fs.readFileSync(filename, 'utf8');
  return data;
}

/**
 * 按id去重对象数组
 * https://juejin.cn/post/7571742703534571556
 * @param {array} arr 数组
 * @param {string} method 去重方法 set or map
 * @description set 只保留第一次出现该 id 的对象;map 用 id 作为唯一 key，重复 key 会覆盖，保留最后一个对象
 * @example method = 'set'
 * removeDuplicateById([
      { id: 1, name: '张三' },
      { id: 1, name: '张三2' }, // id 相同，视为重复
      { id: 2, name: '李四' }
    ], 'set') // 输出：[{ id: 1, name: '张三' }, { id: 2, name: '李四' }]
 * @example method = 'map'
 * removeDuplicateById([
      { id: 1, name: '张三' },
      { id: 1, name: '张三2' }, // id 相同，视为重复
      { id: 2, name: '李四' }
    ], 'map') // 输出：[{ id: 1, name: '张三更新版' }, { id: 2, name: '李四' }]
 * @returns 去重后的数组
 */
function removeDuplicateById(objArr = [], method = 'set') {
  if (objArr.length == 0) {
    return objArr;
  }

  // 方法 1： 步骤：按 id 生成唯一标识 → Set 去重 → 筛选原数组
  let uniqueIds = new Set(objArr.map(obj => obj.id)); // 存储唯一 id
  let uniqueObjArr = objArr.filter((obj, index) => {
    // 只保留第一次出现该 id 的对象
    return objArr.findIndex(item => item.id === obj.id) === index;
  });

  // 方法 2： Map 辅助去重（更灵活，支持复杂场景）
  const map = new Map();
  objArr.forEach(obj => {
    // 用 id 作为唯一 key，重复 key 会覆盖，保留最后一个对象
    map.set(obj.id, obj);
  });

  uniqueObjArr = [...map.values()]; // Map 的 values() 是去重后的对象

  return uniqueObjArr;
}

/**
 * 去重排序词典文件 
 * @param {string} filename 词典文件名
 * @param {boolean} saved 是否保存到文件
 * @param {array} dictArr 词典内容 ['並 : 并','乾 : 干']
 * @example
 * duplicatedSortDictFile(DictStrFile, false, ['並 : 并','乾 : 干']);
 * @returns 词典内容 ['並 : 并',乾 : 干']
 */
function duplicatedSortDictFile(filename = DictTemFile, saved = true, dictArr = []) {
  let setWord = new Set(), setPhrases2 = new Set(), setPhrases3 = new Set(), setPhrases4 = new Set(), arr = [];
  DICT.concat(dictArr).filter((el) => el.length > 0).forEach((el) => {
    el = el.trim();
    if (el.length == 5) {
      setWord.add(el.split(DictStyle)[0] + DictStyle + el.split(DictStyle)[1]);
    } else if (el.length == 7) {
      setPhrases2.add(el.split(DictStyle)[0] + DictStyle + el.split(DictStyle)[1]);
    } else if (el.length == 9) {
      setPhrases3.add(el.split(DictStyle)[0] + DictStyle + el.split(DictStyle)[1]);
    } else if (el.length == 11) {
      setPhrases4.add(el.split(DictStyle)[0] + DictStyle + el.split(DictStyle)[1]);
    } else {
      console.log(el);
    }
  })

  arr = Array.from(setPhrases4).sort().concat(Array.from(setPhrases3).sort(), Array.from(setPhrases2).sort(), Array.from(setWord).sort());

  if (saved) {
    saveDictToTxt(filename, arr, type = 'string');
  } else {
    return arr;
  }
}

/**
 * 通过内置常量简/繁体字符串/词典文件,去重排序并合成new词典文件
 * @param {string} filename 词典文件名
 * @param {string} type string-字符串, array-数组
 * @example
 * getDictFileFinal(false,'string') or getDictFileFinal(true,'array')
 * @returns temDict.txt or arrDict.txt
 */
function getDictFileFinal(filename = DictTemFile, type = 'string') {
  let dictArrParses = getDict(TraditionalChinesePhrases, SimplifiedChinesePhrases, 'phrases')
  let dictArrWord = getDict(TraditionalChineseWord, SimplifiedChineseWord, 'word')

  let arr = duplicatedSortDictFile(DictStrFile, false, dictArrParses.concat(dictArrWord));

  /* traditionalSimplifiedDict.txt */
  saveDictToTxt(filename, arr, type);
  /* arrDict.txt */
  saveDictToTxt(DictArrFile, arr, 'array');
}

getDictFileFinal(DictStrFile, 'string');


// del 
debugger;
// del
