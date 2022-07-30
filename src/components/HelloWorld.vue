<template>
  <div class="hello">
    <h1><img src="../assets/fuo.jpg" class="avatar" alt="fuo"/>永明佛寺念佛共修</h1>

    <div class="ui segment container" v-show="!dismiss">
      <h3 class ="ui header"> 使用說明</h3>
      <p>請在網站上登錄您的名字和今天念了幾聲佛號，再按「登錄佛號」按鈕即可</p>
      <p>每個名字每天只能登錄一次，請在晚上7:30前登錄以便回向，永明佛寺會在晚上7:30-8:00間回向</p>
      <p>回向是針對疫情和法界與地球揚升到淨土，願大眾福慧增長，人人平安，超生淨土&nbsp;&nbsp;&nbsp;&nbsp;<a class="ui tiny gray button" @click="dismiss = true">不再顯示提示</a></p>
    </div>

    <form class="ui form container" v-show="uid || true">
      <div class="fields">
        <div class="field">

          <label><i class = "user icon"/>您的姓名/法名：
          <input type="text" name="" v-model = "name"/> </label> 
        
        </div>
        <div class="field">
          <label><i class = "calendar icon"/>今天日期：</label>
          <input type="text" name="" v-model = "date" placeholder="今天日期: 如2022/7/22" />
        </div>
        <div class="field">
          <label><i class = "comment icon"/>您今天念了幾聲佛號：</label>
          <input type="number" v-model = "number" />
        </div>
      </div>

      <div class="field">
        <div class="ui buttons">
          <button class="ui huge green button ani tada" @click="submit()"><i class = "upload icon"/>登錄佛號</button>
          <div class="or"></div>
          <button class = "ui huge orange button ani tada" @click ="loginGoogle()"><i class = "google icon"/>google登入</button>
        </div>
      </div>
    </form>

    <div class="ui divider"></div>

    <select id="s" class="ui dropdown" v-model="mode">
      <option value="">模式</option>
      <option value="today">今日</option>
      <option value="all">所有</option>
    </select>

    <div class="ui list container left aligned" v-show="mode == 'today'">
      <div class="item" v-for = "n in t(s(numbers))" :key="n.n + n.date"> <img class="avatar" :src="n.photoURL" v-show="n.photoURL" :alt="n.n"/> {{n.date}}: {{n.n}}念了<span class="highlight"> {{parseInt(n.number)}} 聲</span>佛號!! </div>
    </div>

    <div class="ui list container left aligned" v-show="mode == 'all'">
      <div class="item" v-for = "n in s(numbers)" :key="n.n + n.date"> <img class="avatar" :src="n.photoURL" v-show="n.photoURL" :alt="n.n"/> {{n.date}}: {{n.n}}念了<span class="highlight"> {{parseInt(n.number)}} 聲</span>佛號!! </div>
    </div>

    <div class="ui divider"></div>
    
    <form class="ui form container" v-show="numbers[0]">
      <div class="fields">
        <div class="field">

          <label><i class = "user icon"/>您的姓名/法名：
          <input type="text" name="" v-model = "name"/> </label> 
        
        </div>
        <div class="field">
          <label><i class = "calendar icon"/>今天日期：</label>
          <input type="text" name="" v-model = "date" placeholder="今天日期: 如2022/7/22" />
        </div>
        <div class="field">
          <label><i class = "comment icon"/>您今天念了幾聲佛號：</label>
          <input type="number" v-model = "number" />
        </div>
      </div>

      <div class="field">
        <div class="ui buttons">
          <button class="ui huge green button ani tada" @click="submit()"><i class = "upload icon"/>登錄佛號</button>
          <div class="or"></div>
          <button class = "ui huge orange button ani tada" @click ="loginGoogle()"><i class = "google icon"/>google登入</button>
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
  metaInfo: {
    title: '歡迎',
  },
  firebase: {
    numbers: numbersRef
  },
  data: () => ({
      date: new Date().getFullYear() +'/'+ parseInt(1+new Date().getMonth()) +'/'+ new Date().getDate(),
      mode: 'today',
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
      photoURL: '',
      dismiss: false

  }),
  methods: {
    t:function (list) {
      var ans = list.filter(function(u) {
        return u.date == new Date().getFullYear() +'/'+ parseInt(1+new Date().getMonth()) +'/'+ new Date().getDate();
      });
      return ans;
    },
    s: function (list) {
      var l = list.slice().sort(function(a, b) {
        var arr1 = a.date.split('/');
        var arr2 = b.date.split('/');
        var ans = (parseInt(arr2[0]) * 36500 + parseInt(arr2[1]) * 3000 + parseInt(arr2[2]) * 100) - (parseInt(arr1[0]) * 36500 + parseInt(arr1[1]) * 3000 + parseInt(arr1[2]) * 100) + parseInt(b.time) - parseInt(a.time);
        return ans;
      })
      return l
    },
    submit: function () {
      var o = {
        uid: this.uid || '123',
        n: this.name,
        photoURL: this.photoURL || 'https://bestian.github.io/number/img/number.jpg',
        time: (new Date()).getTime(),
        date: this.date,
        number: this.number
      }
      if (this.number) {
        if (this.numbers.filter(function(u){
          return u.n == o.n && u.date == o.date
        }).length == 0) {
          this.$firebaseRefs.numbers.push(o);
          this.number = 0;
          window.alert('登入成功:' + o.n + '今天念了' + o.number +  '聲佛號')
        } else {
          window.alert('您今天已經登錄過了，請明天再來')
        }
      } else {
        window.alert('請輸入您今天念了幾聲佛號')
      }
    },
    loginGoogle: function () {
      var vm = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
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
        window.alert('Google 登入成功')
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
    if (localStorage.dismiss) {
      this.dismiss = localStorage.dismiss;
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    },
    dismiss(newDismiss) {
      localStorage.dismiss = newDismiss;
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

.ani {
}

.ani:hover {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}


@-webkit-keyframes tada {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%, 20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }

  30%, 50%, 70%, 90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%, 60%, 80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes tada {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%, 20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }

  30%, 50%, 70%, 90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%, 60%, 80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.tada:hover {
  -webkit-animation: tada 4s linear 3;
  animation: tada 4s linear 3;
}

#s {
  font-size: 16px;
}

</style>

