const loaderUtils = require('loader-utils');
const fs = require('fs');

module.exports = function (content) {
  if (content.indexOf('<template>') != -1) {
    content = callMethods(content, [handlerClick, handlerCreated, handlerDestroyed]);
  }
  return content;
};

function callMethods(str, methodArr) {
  methodArr.forEach(item => {
    str = item(str);
  })
  return str;
}

function handlerClick(str) {
  let regex = /@click.*\=\s*\"(\w+)\"/g;
  let tempResult = null;
  let findStrs = [];
  while ((tempResult = regex.exec(str)) != null) {
    findStrs.push(tempResult[1]);
  }
  var code = '\n        this.$monitor.onClick(this);';
  findStrs.forEach(item => {
    str = str.replace(new RegExp('(' + item + '.+\{)', 'g'), '$1' + code);
  });
  return str;
}

function handlerCreated(str) {
  let regex = /(created.+{)/g;
  if (regex.test(str) && !/\/\/\s*created.+{/g.test(str)) {
    let code = '\n      this.$monitor.onCreate(this);';
    str = str.replace(regex, '$1' + code);
  } else {
    regex = /(export\s+default\s+{)/g;
    let code = '\n    created() {\n      this.$monitor.onCreate(this);\n    },';
    str = str.replace(regex, '$1' + code);
  }
  return str;
}

function handlerDestroyed(str) {
  let regex = /(destroyed.+{)/g;
  if (regex.test(str) && !/\/\/\s*destroyed.+{/g.test(str)) {
    let code = '\n      this.$monitor.onDestroy(this);';
    str = str.replace(regex, '$1' + code);
  } else {
    regex = /(export\s+default\s+{)/g;
    let code = '\n    destroyed() {\n      this.$monitor.onDestroy(this);\n    },';
    str = str.replace(regex, '$1' + code);
  }
  return str;
}
