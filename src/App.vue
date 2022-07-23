<template>
  <div id="app">
    <div id="nav" class="ui menu">
      <router-link class = "item" to ="/">首頁</router-link>
      <router-link class = "item" to ="/about">加總</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50px;
}

.router-link-exact-active {
  background-color: #cfc !important;
}
</style>
