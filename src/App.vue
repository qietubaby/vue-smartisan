<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view/>
  </div>
</template>

<script>
 //头部公共组件
 import headerNav from '@/components/header-nav'
 console.log(headerNav)
 export default {
  name: 'app',
  components:{
    headerNav
  }
 }
</script>

<style>

</style>
