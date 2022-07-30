<template>
  <div id="app">
    <div id="nav" class="ui menu">
      <router-link class = "item" to ="/">
        <i class ="home icon"/>
        <span class="fat-only">首頁</span></router-link>
      <router-link class = "item" to ="/about"><i class ="plus icon"/>
        <span class="fat-only">加總</span></router-link>
      <router-link class = "item" to ="/day"><i class ="calendar icon"/>
        <span class="fat-only">每日</span></router-link>
      <router-link class = "item" to ="/rank"><i class ="chess king
 icon"/>
        <span class="fat-only">榮譽</span></router-link>
      <div class="right menu">
        <!-- <a v-if="!deferredPrompt"
          class="item"
          @click="install()"
        >
          <i class ="download icon"/>
          安裝
        </a> -->
        <router-link class = "item" to ="/88"><i class ="users icon"/>
        <span class="fat-only">88佛</span></router-link>
        <a class = "item fat-only" href="https://sites.google.com/view/innerpurelight/%E9%A6%96%E9%A0%81" target="_blank"><i class ="globe icon"/>台東永明佛寺</a>
        <a class = "item fat-only" href="https://github.com/bestian/number" target="_blank"><i class ="github icon"/>原始碼</a>
        <a class = "item fat-only" href="https://number-59440-default-rtdb.firebaseio.com/numbers.json" target="_blank"><i class ="download icon"/>資料下載</a>
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
    titleTemplate: '%s | 永明佛寺念佛號',
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
  width: 50px;
  height: 50px;
  border-radius: 25px;
  -webkit-animation:spin 4s 2 linear;
  -moz-animation:spin 4s 2 linear;
  animation:spin 4s 2 linear;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(1800deg);
    transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(1800deg);
    transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

@-webkit-keyframes jump {
  0% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(1.2);
    transform: scaleY(1.2);
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

@keyframes jump {
  0% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(1.2);
    transform: scaleY(1.2);
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
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

.highlight {
  display: inline-block;
  background-color: #9f9;
  padding: 0 0.5em;
  border-radius: 10px;
  -webkit-animation: jump 1s linear infinite;
  animation: jump 1s linear infinite;
}
</style>
