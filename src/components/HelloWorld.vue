<template>
  <div class="hello">
    <h1>每天唸佛</h1>

    <form class="ui form container" v-show="uid || true">
      <div class="field">

        <label>您的姓名/法名：
        <input type="text" name="" v-model = "name"/> </label> 
      
      </div>
      <div class="field">
        <label>今天日期：</label>
        <input type="text" name="" v-model = "date" placeholder="今天日期: 如2022/7/22" />
      </div>
      <div class="field">
        <label>您今天唸了幾聲佛號：</label>
        <input type="number" v-model = "number" />
      </div>

      <div class="field">
        <div class="ui buttons">
          <button class = "ui huge orange button" @click ="loginGoogle()">google登入</button>
          <button class="ui huge green button" @click="submit()">登錄佛號</button>
        </div>
      </div>
    </form>

    <div class="ui list container left aligned">
      <div class="item" v-for = "n in numbers.slice().reverse()"> <img class="avatar" :src="n.photoURL" v-show="n.photoURL"/> {{n.date}}: {{n.n}}  唸了 {{n.number}} 聲佛號!! </div>
    </div>

    
    <form class="ui form container" v-show="uid || true">
      <div class="field">

        <label>您的姓名/法名：
        <input type="text" name="" v-model = "name"/> </label> 
      
      </div>
      <div class="field">
        <label>今天日期：</label>
        <input type="text" name="" v-model = "date" placeholder="今天日期: 如2022/7/22" />
      </div>
      <div class="field">
        <label>您今天唸了幾聲佛號：</label>
        <input type="number" v-model = "number" />
      </div>

      <div class="field">
        <div class="ui buttons">
          <button class = "ui huge orange button" @click ="loginGoogle()">google登入</button>
          <button class="ui huge green button" @click="submit()">登錄佛號</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { numbersRef } from '../firebase'

export default {
  name: 'HelloWorld',
  firebase: {
    numbers: numbersRef
  },
  data: () => ({
      date: new Date().getFullYear() +'/'+ parseInt(1+new Date().getMonth()) +'/'+ new Date().getDate(),
      number: 0,
      p: '',
      msg: '',
      key: '',
      edit: '',
      read: 0,
      user: '',
      name: '',
      token: '',
      numbers: [],
      uid: '',
      provider: '',
      photoURL: ''
  }),
  methods: {
    submit: function () {
      var o = {
        uid: this.uid || '123',
        n: this.name,
        photoURL: this.photoURL || 'https://bestian.github.io/number/img/number.jpeg',
        time: (new Date()).getTime(),
        date: this.date,
        number: this.number
      }
      if (this.number) {
        this.$firebaseRefs.numbers.push(o)
        this.number = 0
      }
    },
    loginGoogle: function () {
      console.log('a')
      var vm = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log('b')
        // This gives you a Google Access Token. You can use it to access the Google API.
        vm.provider = 'google'
        vm.token = result.credential.accessToken
        // The signed-in user info.
        vm.uid = result.user.uid
        console.log(vm.uid)
        vm.user = result.user
        vm.name = localStorage.name || vm.user.displayName
        console.log(vm.user)
        console.log(decodeURI(result.user.photoURL))
        decodeURI(result.user.photoURL)
        vm.photoURL = decodeURI(result.user.photoURL)
        for (var i = 0; i < vm.hands.length; i++) {
          console.log(vm.uid)
          console.log(vm.hands[i].uid)
          if (vm.hands[i].uid === vm.uid) {
            vm.center = vm.hands[i].latlngColumn.split(',')
            vm.zoom = 13
          }
        }
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        console.log(errorCode + errorMessage + email + credential)
      })
    }
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
