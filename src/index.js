import Popup from './Popup.vue';

const iview = {
  Popup,
}
const install = function (Vue, opts = {}) {

  Object.keys(iview).forEach((key) => {
    Vue.component(key, iview[key]);
  });

};

//auto install
if (typeof window !== 'undefined' && window.Vue) {
  console.log(22)
  install(window.Vue);
}
console.log(11)
export default Object.assign(iview, {install});
