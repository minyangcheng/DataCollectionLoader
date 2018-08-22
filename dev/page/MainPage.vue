<template>
  <div>
    <div class="btn" @click="testBtn">testBtn1</div>
    <div class="btn" @click="goSettingBtn">goSettingBtn</div>
    <Child/>
  </div>
</template>

<script>
  import Child from './component/Child';

  export default {
    components: {
      Child
    },
    data() {
      return {
        name: 'main-page'
      }
    },
    methods: {
      testBtn() {
        console.log('MainPage is testBtn');
      },
      goSettingBtn() {
        console.log('MainPage is goSettingBtn');
        this.$router.push('/SettingPage');
      },
    },
    created() {
    },
    destroyed() {
    },
  }
</script>

<style scoped>

  .btn {
    width: 80%;
    margin: 10px auto;
    background: #ff5a37;
    color: #ffffff;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
  }

</style>
