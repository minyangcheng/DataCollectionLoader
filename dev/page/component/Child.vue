<template>
  <div class="container" @click="onClickChild">
    this is child
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'child-comp'
      }
    },
    methods: {
      onClickChild() {
        console.log('child click');
      }
    }
  }
</script>

<style scoped>
  .container {
    background: #cccccc;
    padding: 15px;
  }
</style>
