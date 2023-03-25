<template>
  <div class="hello">
    <h1>
      <a @click="step = 0"><img src="../assets/fuo.jpg" class="avatar" alt="fuo"/>永明佛寺念佛共修</a></h1>

    <h2 v-show="step == 0">App免費下載</h2>

    <div class="ui buttons" v-show="step == 0">
      <a class="ui huge blue button" href="https://apps.apple.com/tw/app/%E5%BF%B5%E4%BD%9B%E8%99%9F/id1637378153" target="_blank"><i class="app store icon" />App Store下載
      </a>

      <a class="ui huge orange button" href="https://play.google.com/store/apps/details?id=tw.bestian.fuo" target="_blank"><i class="google play icon" />Google Play下載
      </a>
    </div>

    <div class="ui divider" v-show="step == 0"></div>

    <a @click="step = 1" v-show="step == 0">
      <img class = "fuo" src="../assets/fuo.jpg" />
    </a>
    <br v-show="step == 0" />
    <div class="ui buttons up" v-show="step == 0">
      <a class="ui huge teal button" @click="step = 1"><i class="globe icon" />網站版
      </a>
    </div>


    <div class="ui segment container" v-show="step == 1">

      <h2 class="ui header">2023春季千萬佛號活動</h2>

      <div class="ui active inverted dimmer" v-show="!myTotal">
        <div class="ui text loader">資料載入中...</div>
      </div>

      <div v-show="myTotal" class="ui indicating green progress" :data-value="myTotal" data-total="10000000" id="ex">
        <div class="bar" :style="{width: myS + '%'}">
          <div class="progress"></div>
        </div>
        <div class="label">已達成：{{ myTotal }} / 10000000</div>
      </div>

      <div v-show="myToDay" class="label">本日加總：{{ myToDay }}聲佛號</div>

      <!-- <h4 class="ui header">
        2023 永明佛寺行腳行程表
      <br/>
        <a href="https://docs.google.com/spreadsheets/d/19pJLqZK6HpKzg1W9rxkezJ2_g4BM5-FspMF3qZaLPQI/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
        行程表請按此</a>
      </h4> -->

      <h4 class="ui header">
        永明佛寺點亮心燈光明燈迴向表：
      <br/>
        <a href="https://forms.gle/zeuANUaxF5AWhrBH" target="_blank" rel="noopener noreferrer">https://forms.gle/zeuANUaxF5AWhrBH</a>
      <br/>
        永明佛寺為您守護一輩子光明心燈
      </h4>

      <div v-show="!dismiss">
        <h3 class ="ui header"> 使用說明</h3>
        <p>白淨家人佛安<br/>為世界千萬和平祈福！集結人們善念共振存儲無形富貴財富！</p>
        <p>請在網站上登錄您的名字和今天念了幾聲佛號，再按「登錄佛號」按鈕即可。</p>
        <p>每個名字每天只能登錄一次，請在晚上7:30前登錄以便回向，永明佛寺會在晚上7:30-8:00間回向。</p>
        <p>永明佛寺地址：台東縣太麻里鄉華源村南北坑58-1號。永明佛寺電話：<a herf="tel:0937280910">0937280910</a>、<a herf="tel:0982029814">0982029814</a></p>

        <p>目前有<router-link class = "item" to ="/about"><i class ="plus icon"/>
          <span class="fat-only">加總</span></router-link>的功能，您可以輸入關鍵字打自己的名字，查到所有的記錄和加總。</p>

        <p>若您希望在其他佛寺使用類似的軟體，<br/>可以在<i class = "github icon"/>Github上，將本專案創建分叉版(Fork)，自行修改架站。</p>
        <p>原始碼完全公開，請見此：<a href="https://github.com/bestian/number" target="_blank"><i class = "github icon"/>原始碼</a>

        &nbsp;&nbsp;&nbsp;&nbsp;<a class="ui tiny gray button" @click="dismiss = true">不再顯示提示</a></p>
      </div>
    </div>

    <form class="ui form container" v-show="step == 1 && myTotal">
      <div class="fields">
        <div class="field">
          <label><i class = "calendar icon"/>今天日期：{{date}}</label>
        </div>
        <div class="field">

          <label><i class = "user icon"/>您的姓名/法名：
          <input type="text" name="" v-model = "name"/> </label> 
        
        </div>
        <div class="field">
          <label><i class = "comment icon"/>您今天念了幾聲佛號：</label>
          <input type="number" v-model = "number" />
        </div>
        <div class="field">
          <label><i class = "question icon"/>念佛號原因：</label>
          <input type="text" v-model = "reason" />
        </div>

        <!-- <div class="field left aligned">
          <input type="checkbox" v-model = "notJoin" />
          <label>不加入千萬佛號統計請勾此</label>
        </div> -->
      </div>

      <div class="field">
        <div class="ui buttons">
          <button type="button" class="ui huge green button ani tada" @click.prevent="addNumber"><i class = "upload icon"/>登錄佛號</button>
          <div class="or"></div>
          <button  type="button" class = "ui huge orange button ani tada" @click.prevent ="loginGoogle" v-if="!user"><i class = "google icon"/>google登入</button>
          <button  type="button" class = "ui huge blue button ani tada" @click.prevent ="logout" v-else>
            <img id = "r" :src="photoURL" />
            <i class = "sign-out icon"/>登出</button>
        </div>
      </div>
    </form>

    <div class="ui divider" v-show="step == 1"></div>

    <select id="s" class="ui dropdown" v-model="mode" v-show="step == 1">
      <option value="">模式</option>
      <option value="today">今日</option>
      <option value="all">所有</option>
    </select>

    <div class="ui list container left aligned" v-show="mode == 'today' && step == 1">
      <div class="item" v-for = "(n, k) in t(s(numbers))" :key="k"> <img class="avatar" :src="par(n.photoURL)" v-show="n.photoURL" :alt="n.n"/> {{n.date}}: {{n.n}}念了<span class="highlight"> {{parseInt(n.number)}} 聲</span>佛號!! </div>
    </div>

    <div class="ui list container left aligned" v-show="mode == 'all' && step == 1">
      <div class="item" v-for = "(n, j) in s(allnumbers)" :key="j"> <img class="avatar" :src="par(n.photoURL)" v-show="n.photoURL" :alt="n.n"/> {{n.date}}: {{n.n}}念了<span class="highlight"> {{parseInt(n.number)}} 聲</span>佛號!! </div>
    </div>

    <div class="ui divider" v-show="step == 1"></div>
    
    <form class="ui form container" v-show="numbers[0] && step == 1 && myTotal">
      <div class="fields">
        <div class="field">
          <label><i class = "calendar icon"/>今天日期：{{date}}</label>
        </div>
        <div class="field">

          <label><i class = "user icon"/>您的姓名/法名：
          <input type="text" name="" v-model = "name"/> </label> 
        
        </div>
        <div class="field">
          <label><i class = "comment icon"/>您今天念了幾聲佛號：</label>
          <input type="number" v-model = "number" />
        </div>
        <div class="field">
          <label><i class = "question icon"/>您念佛號的原因：</label>
          <input type="text" v-model = "reason" />
        </div>
      </div>

      <!-- <div class="field left aligned">
        <input type="checkbox" v-model = "notJoin" />
        <label>不加入千萬佛號統計請勾此</label>
      </div> -->

      <div class="field">
        <div class="ui buttons">
          <button type="button" class="ui huge green button ani tada" @click.prevent="addNumber"><i class = "upload icon"/>登錄佛號</button>
          <div class="or"></div>
          <button type="button" class = "ui huge orange button ani tada" @click.prevent ="loginGoogle" v-if="!user"><i class = "google icon"/>google登入</button>
          <button type="button" class = "ui huge blue button ani tada" @click.prevent ="logout" v-else>
            <img id = "r" :src="photoURL" />
            <i class = "sign-out icon"/>登出</button>
        </div>
      </div>
    </form>
    <div id = "container" style="disply:none"></div>

  </div>
</template>

<script>
import { auth, db } from '../firebase.js'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { ref, set } from 'firebase/database'

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

export default {
  name: 'HelloWorld',
  metaInfo: {
    title: '歡迎',
  },
  props: ['numbers', 'myTotal', 'myToDay', 'allnumbers'],
  data: () => ({
      step: 1,
      date: new Date().getFullYear() +'/'+ parseInt(1+new Date().getMonth()) +'/'+ new Date().getDate(),
      mode: 'today',
      number: 0,
      notJoin: false,
      p: '',
      msg: '',
      reason: '',
      key: '',
      edit: '',
      read: 0,
      user: '',
      name: '',
      token: '',
      uid: '',
      provider: '',
      photoURL: '',
      dismiss: false,
  }),
  computed: {
    myS () {
      const ans = (this.myTotal || 0) * 100 / 10000000
      // console.log(ans)
      return ans
    }
  },
  methods: {
    par (u) {
      if (u == 'https://bestian.github.io/number/img/number.jpeg') {
        u = 'https://bestian.github.io/number/img/number.jpg'
      }
      return u
    },
    t: function (list) {
      var ans = list.filter(function(u) {
        return u.date == new Date().getFullYear() +'/'+ parseInt(1+new Date().getMonth()) +'/'+ new Date().getDate();
      });
      return ans;
    },
    s: function (list) {
      // console.log(list)
      list = list || []
      var l = list.slice().sort(function(a, b) {
        var arr1 = a.date.split('/');
        var arr2 = b.date.split('/');
        var ans = (parseInt(arr2[0]) * 36500 + parseInt(arr2[1]) * 3000 + parseInt(arr2[2]) * 100) - (parseInt(arr1[0]) * 36500 + parseInt(arr1[1]) * 3000 + parseInt(arr1[2]) * 100) + parseInt(b.time) - parseInt(a.time);
        return ans;
      })
      return l
    },
    obj_to_list (obj) {
      if (Array.isArray(obj)) {
        return obj
      } else {
        const ks = Object.keys(obj)
        const list = ks.map(function (i) {
          return obj[i]
        })
        return list
      }
    },
    addNumber () {
      const vm = this
      var arr = this.obj_to_list(this.numbers)
      // console.log(arr)
      
      if (!this.name) {
        alert('請輸入您的大名');
        return;
      }
      var o = {
        uid: this.uid || '123',
        n: this.name,
        reason: this.reason,
        photoURL: (this.photoURL && this.photoURL !== 'https://bestian.github.io/number/img/number.jpeg') ? this.photoURL : 'https://bestian.github.io/number/img/number.jpg',
        time: (new Date()).getTime(),
        date: this.date,
        notJoin: this.notJoin,
        number: this.number
      }
      if (this.number && parseInt(this.number) > 0) {
        if (this.numbers.filter(function (o) {
          return o.n === vm.name && o.date === vm.date
        }).length === 0) {
          const idx = arr.length
          arr.push(o)
          // console.log(arr)
          console.log('push new data')
          set(ref(db, 'names'), arr).then(() => {
            window.alert('登入成功:' + o.n + '今天念了' + o.number +  '聲佛號')
            localStorage.name = this.name;
            this.number = 0;
          })
        } else {
          window.alert('您今天已登入過，請明天再來')
        }
      } else {
        window.alert('請輸入您今天念了幾聲佛號')
      }
    },
    logout () {
      const vm = this
      auth.signOut().then(function() {
        vm.user = null
        vm.uid = null
        vm.photoURL = null
      })
    },
    loginGoogle () {
      const vm = this
      if (this.isInApp) {
        window.alert('本系統不支援facebook, line等app內部瀏覽，請用一般瀏覽器開啟，方可登入，謝謝')
      } else {
        signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        vm.user = user
        vm.email = user.providerData[0].email
        vm.token = token
        vm.uid = user.uid
        vm.photoURL = decodeURI(user.photoURL)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(errorCode)
        // console.log(errorMessage)
      });
      // signInWithRedirect(auth, provider)
      }
    }
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.dismiss) {
      this.dismiss = localStorage.dismiss;
    }
    if (localStorage.reason) {
      this.reason = localStorage.reason;
    }
  },
  watch: {
    reason(newReason) {
      localStorage.reason = newReason;
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

.fuo {
  width: 33vmin;
  border-radius: 15px;
  position: relative;
  top: 3.8em;
  z-index: -1;
}

#r {
  height: 2em;
  width: 2em;
  border-radius: 50%;
}

#ex {
  position: relative;
  width: 100%;
}

</style>

