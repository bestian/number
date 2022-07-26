<template>
  <div id="app">
    <div id="nav" class="ui menu">
      <router-link class = "item" to ="/">
        <i class ="home icon"/>首頁</router-link>
      <router-link class = "item" to ="/about"><i class ="plus icon"/>加總</router-link>
      <router-link class = "item" to ="/day"><i class ="calendar icon"/>每日</router-link>
      <div class="right menu">
        <!-- <a v-if="!deferredPrompt"
          class="item"
          @click="install()"
        >
          <i class ="download icon"/>
          安裝
        </a> -->
        <router-link class = "item" to ="/88"><i class ="user icon"/>88佛</router-link>
        <a class = "item fat-only" href="https://sites.google.com/view/innerpurelight/%E9%A6%96%E9%A0%81" target="_blank"><i class ="calendar icon"/>台東永明佛寺</a>
        <a class = "item fat-only" href="https://github.com/bestian/number" target="_blank"><i class ="github icon"/>原始碼</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { BeforeInstallPromptEvent } from "vue-pwa-install";

console.log(BeforeInstallPromptEvent)


export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: '歡迎',
    // all titles will be injected into this template
    titleTemplate: '%s | 永明佛寺唸佛號',
  },
  data() {
    return {
      deferredPrompt: BeforeInstallPromptEvent
    }
  },
  created() {
    var vm = this;
    this.$on("canInstall", (event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt:
      event.preventDefault();

      // Stash the event so it can be triggered later:
      this.deferredPrompt = event;
    });
    window.addEventListener("appinstalled", () => {
      vm.deferredPrompt = null;
      console.log("PWA was installed");
    });
    window.addEventListener('beforeinstallprompt',(event)=>{
      console.log('Default a2hs triggered' ,event);
      // here preventing default prompt
      event.preventDefault();
      // storing that event
      vm.deferredPrompt = event;
      return false;
    })
  },
  methods: {
    install() {
      console.log(this.deferredPrompt)
      if (this.deferredPrompt) {

      // Show the prompt:
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt:
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }

          this.deferredPrompt = null;
        });
      }
    }
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
