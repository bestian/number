<template>
  <div id="app">
    <div id="nav" class="ui menu">
      <router-link class = "item" to ="/">
        <i class ="home icon"/>首頁</router-link>
      <router-link class = "item" to ="/about"><i class ="plus icon"/>加總</router-link>
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
  font-size: 18px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50px;
}

label, input {
  font-size: 18px !important;
}

.router-link-exact-active {
  background-color: #cfc !important;
}
</style>
