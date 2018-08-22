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
      console.error('请手动在Vue.prototype.$monitor对象上添加OnEvent方法，用于处理数据上传!!!!!!');
      return;
    }
    this.onEvent(event, vueComponent);
  }

}

export default Vue.prototype.$monitor;
