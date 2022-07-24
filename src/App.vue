<template>
  <div id="app">
    <div id="nav" class="ui menu">
      <router-link class = "item" to ="/">
        <i class ="home icon"/>首頁</router-link>
      <router-link class = "item" to ="/about"><i class ="plus icon"/>加總</router-link>
      <div class="right menu">
        <router-link class = "item" to ="/88"><i class ="user icon"/>88佛</router-link>
        <a class = "item fat-only" href="https://sites.google.com/view/innerpurelight/%E9%A6%96%E9%A0%81" target="_blank"><i class ="calendar icon"/>台東永明佛寺</a>
        <a class = "item fat-only" href="https://github.com/bestian/number" target="_blank"><i class ="github icon"/>原始碼</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: '歡迎',
    // all titles will be injected into this template
    titleTemplate: '%s | 唸佛號',
  }
}
</script>

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

@media screen and (min-width: 601px) {
  .thin-only {
    display: none !important;
  }
}

@media screen and (max-width: 600px) {

  .fat-only {
    display: none !important;
  }
}
</style>
