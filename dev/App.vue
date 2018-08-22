<template>
  <div class="page">
    <div v-for="(item,index) in dataList" :key="index" class="list-item">
      <div>{{index}}---</div>
      <div>{{item}}</div>
      <div style="margin-left: auto" @click="onItemClick($event,index,item)"> . . . </div>
    </div>
    <Popup ref="popupRef">
      <div class="popup-option">
        <div style="height: 50%" @click="clickAttention">关注1</div>
        <div style="height: 50%" @click="clickCancelAttention">取消关注</div>
      </div>
    </Popup>
  </div>
</template>

<script>
 // import {Popup} from './../dist/index';
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
   // components:{Popup}
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
