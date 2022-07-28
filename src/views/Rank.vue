<template>
  <div class="about">
    <h1>榮譽榜</h1>
    <div class="ui segment container" v-show="!dismiss2">
      <h3 class ="ui header"> 說明</h3>
      <p>大家隨喜念佛，別太在意數字，加油喔&nbsp;&nbsp;&nbsp;&nbsp;<a class="ui tiny gray button" @click="dismiss2 = true">不再顯示提示</a></p>
    </div>
    <table class="ui celled table">
      <thead>
        <tr><th><i class="calendar icon"/>日期</th>
        <th><i class="chess king
 icon"/>最高</th>
      </tr></thead>
      <tbody>
        <tr v-for = "d in days().slice().reverse()" :key="d">
          <td data-label="Name">{{ d }}</td>
          <td data-label="Total" v-show="nameF(d)[0]">
            <div><img src="../assets/fuo.jpg" class="avatar"/>{{ nameF(d)[0] }}<br class="thin-only"/><span class="highlight">{{ countF(d)[0] }}聲</span><br class="thin-only"/>佛號</div>
            <div class="ui divider"></div>
            <div v-show="nameF(d)[1]"><img src="../assets/fuo3.jpg" class="avatar"/>{{ nameF(d)[1] }}<br class="thin-only"/><span class="highlight">{{ countF(d)[1] }}聲</span><br class="thin-only"/>佛號</div>
            <div class="ui divider"></div>
            <div v-show="nameF(d)[2]"><img src="../assets/fuo4.jpg" class="avatar"/>{{ nameF(d)[2] }}<br class="thin-only"/><span class="highlight">{{ countF(d)[2] }}聲</span><br class="thin-only"/>佛號</div></td>
          <br/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { numbersRef } from '../firebase'

export default {
  name: 'Rank',
  metaInfo: {
    title: '榮譽榜',
  },
  firebase: {
    numbers: numbersRef
  },
  data: () => ({
      numbers: [],
      key: '',
      dismiss2: false
  }),
  methods: {
    days: function (){
      var ans = [];
      for (var i = 0; i < this.numbers.length; i++) {
        let d = this.numbers[i].date;
        if (ans.indexOf(d) == -1) {
          ans.push(d)
        }
      }
      return ans
    },
    countF: function(d) {
      var list = this.numbers.filter(function(k) {
        return k.date == d
      })
      list.sort(function(a, b) {
        return parseInt(b.number) - parseInt(a.number)
      })

      var ans = list.slice(0,3).map(function(u) { return parseInt(u.number) });
      return ans;
    },
    nameF: function(d) {
      var list = this.numbers.filter(function(k) {
        return k.date == d
      })
      list.sort(function(a, b) {
        return parseInt(b.number) - parseInt(a.number)
      })

      var ans = list.slice(0,3).map(function(u) { return u.n });
      return ans;
    }
  },
  mounted() {
    if (localStorage.dismiss2) {
      this.dismiss2 = localStorage.dismiss2;
    }
  },
  watch: {
    dismiss2(newDismiss) {
      localStorage.dismiss2 = newDismiss;
    }
  }
}
</script>

<style scoped>

td {
}

</style>
