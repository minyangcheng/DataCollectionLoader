## vue-lite-popup

在移动端开发时，经常会用到popupwindow这样的弹窗控件，给用户进行选项操作，android和ios中原生提供了这类控件，而在移动端前端中这类控件需要自己定义。我这里采用webpack+vue自定一个popup控件，可以在其他vue项目中直接使用。

<!-- more -->

### 如何使用

1. 安装npm依赖
 `npm install vue-lite-popup --save`
2. 在入口处引入库
```js
import PopupPlugin from 'vue-lite-popup';
import PopupPluginCss from 'vue-lite-popup/dist/style.css'
Vue.use(PopupPlugin);
```
3. 在页面中使用
```js
<template>
  <div class="page">
    <div v-for="(item,index) in dataList" :key="index" class="list-item">
      <div>{{index}}---</div>
      <div>{{item}}</div>
      <div style="margin-left: auto" @click="onItemClick($event,index,item)"> . . . </div>
    </div>
    <Popup ref="popupRef">
      <div class="popup-option">
        <div style="height: 50%" @click="clickAttention">关注</div>
        <div style="height: 50%" @click="clickCancelAttention">取消关注</div>
      </div>
    </Popup>
  </div>
</template>
<script>
//  import {Popup} from './../dist/index';
  export default {
    data () {
      return {
        dataList:[],
      }
    },
    mounted(){
      for(let i=0;i<20;i++){
        this.dataList.push('__'+i+'__');
      }
    },
    methods:{
      onItemClick(event,index,item){
        this.$refs.popupRef.showWithAchor(event.target,-90,10);
      },
      clickAttention(){
        console.log('关注');
        this.$refs.popupRef.close();
      },
      clickCancelAttention(){
        console.log('取消关注');
        this.$refs.popupRef.close();
      }
    },
//    components:{Popup}
  }
</script>
<style>
  @import './normalize.css';
  .page{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .list-item{
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 8px;
    margin-top: 3px;
    background: gray;
  }
  .popup-option{
    height: 60px;
    padding: 10px;
    background: #42b983;
  }
</style>
```

### 如何实现popup控件

当点击页面上任意一个dom节点时，可以通过zepto的offset()返回或设置匹配元素相对于文档的偏移。然后就可以设置popop控件的内容部分相对于文档的偏移量，通过方法控制这个popup控件展示与否，即可实现这个效果。

```
show(x,y){
    $(".popup-layer").children().css({left:x,top:y});
    $(".popup-layer").children().click(function (event) {
      event.stopPropagation();
    });
    this.showFlag=true;
},
showWithAchor(dom,dx,dy){
	let offsetValue=$(dom).offset();
	let left=offsetValue.left+dom.offsetWidth+dx;
	let top=offsetValue.top+dom.offsetHeight+dy;
	this.show(left,top);
}
```

### 如何在npm上发布控件

1. 在npm上注册一个账号
2. npm adduser
3. npm publish

*发布库的名称(package.json中的name)不能和npm上已有的重名，因此发布之前请检查*

#### 参考
1. <http://www.w3school.com.cn/jquery/css_offset.asp>
2. <https://segmentfault.com/a/1190000006250554>
3. <http://www.w2bc.com/Article/50764>

