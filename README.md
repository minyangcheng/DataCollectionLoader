## data-collection-loader

前几天在简书上看了一篇，关于用插桩的方式做android端数据埋点的方案，该方案不用修改源码就可以实现数据采集，非常方便，侵入性也极低。由此我想到了Vue前端开发中是不是也可以采用这样的方案，只是android插桩修改的是class文件，而Vue修改的是.vue文件，实现起来比android端更加简单。

> 插桩：插桩就是在代码中插入一段我们自定义的代码

## 技术点

1. webpack
2. vue
3. 正则表达式

## 实现步骤

在vue开发中一般都会用webpack作为打包工具。我这里的实现也是基于webpack loader来动态修改.vue文件来插入埋点的代码。以下是关键代码部分介绍，具体的请自行查看源码。

#### 实现一个webpack loader

该webpack loader主要功能：
1. 寻找@click字符串，匹配到具体的点击事件调用函数，在函数中插入`this.$monitor.onClick(this);`
2. 寻找created字符串，匹配到具体的初始化调用函数，在函数中插入`this.$monitor.onCreate(this);`
3. 寻找destroyed字符串，匹配到具体的销毁函数，在函数钟插入`this.$monitor.onDestroy(this);`


```
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
```

#### 数据采集监听

当有点击、页面创建、页面销毁事件产生的时候，就会相应的方法进行数据处理，最终调用`Vue.prototype.$monitor.onEvent`方法，我们只需要在工程中引入该js文件，并实现`Vue.prototype.$monitor.onEvent`方法即可。
收集到的数据有：事件类型、产生事件的页面路由、调用方法名称、页面停留时间


```
import Vue from 'vue';
import Utils from './utils';

Vue.prototype.$monitor = {

  onClick(vueComponent) {
    let event = {
      type: 'onClick',
      routePath: Utils.getRoutePath(vueComponent),
      methodName: Utils.getMethodName(),
    }
    this.sendEvent(event, vueComponent);
  },

  onCreate(vueComponent) {
    vueComponent._createPageTime = new Date().getTime();
    vueComponent._routePath = Utils.getRoutePath(vueComponent);
    let event = {
      type: 'onCreate',
      routePath: Utils.getRoutePath(vueComponent),
      methodName: Utils.getMethodName(),
    }
    if (Utils.judgePage(vueComponent)) {
      this.sendEvent(event, vueComponent);
    }
  },

  onDestroy(vueComponent) {
    let remainTime = (new Date().getTime()) - vueComponent._createPageTime;
    let event = {
      type: 'onDestroy',
      routePath: vueComponent._routePath,
      methodName: Utils.getMethodName(),
      remainTime
    }
    if (Utils.judgePage(vueComponent)) {
      this.sendEvent(event, vueComponent);
    }
  },

  sendEvent(event, vueComponent) {
    if (!this.onEvent) {
      return;
    }
    this.onEvent(event, vueComponent);
  }

}

export default Vue.prototype.$monitor;
```

#### Vue工程webpack引入loader

在调试环境下可以通过软链接的方式，在node_mouldes中新建一个软链接data-collection-loader指向data-collection-loader开发工程的位置，即可在webpack配置文件中直接使用data-collection-loader。

```
{
  test: /\.vue$/,
  loader: ['vue-loader', 'data-collection-loader'],
},

```

#### Vue工程引入monitor文件

```
import Vue from 'vue'
import App from './App'
import router from './router'
import monitor from 'data-collection-loader/src/monitor'

Vue.config.productionTip = false;

monitor.onEvent = event => {
  //可以在这里进行上送数据操作
  console.log(event)
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

```

