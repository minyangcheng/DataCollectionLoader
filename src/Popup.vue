<template>
  <transition name="fade">
  <div v-show="showFlag" class="popup-layer" @click="clickLayer">
    <div class="popup-content">
      <slot></slot>
    </div>
  </div>
  </transition>
</template>
<script>
  import $ from 'zeptojs';
  export default {
    data () {
      return {
        showFlag:false,
      }
    },
    computed: {
    },
    created () {
    },
    mounted(){
    },
    methods: {
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
      },
      close(){
        this.showFlag=false;
      },
      clickLayer(){
        this.close();
      }
    },
    watch: {
    }
  }
</script>
<style scoped>
  .popup-layer{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
  }
  .popup-content{
    position: absolute;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
