<template>
  <div class="about">
    <h1>榮譽榜</h1>
    <table class="ui celled table">
      <thead>
        <tr><th>日期</th>
        <th>最高</th>
      </tr></thead>
      <tbody>
        <tr v-for = "d in days().slice().reverse()" :key="d">
          <td data-label="Name">{{ d }}</td>
          <td data-label="Total">1
           {{ nameF(d)[0] }}: <span class="highlight">{{ countF(d)[0] }}聲</span>佛號
          <br/>2
           {{ nameF(d)[1] }}: <span class="highlight">{{ countF(d)[1] }}聲</span>佛號
          <br/>3. {{ nameF(d)[2] }}: <span class="highlight">{{ countF(d)[2] }}聲</span>佛號</td>
          <br/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { numbersRef } from '../firebase'

export default {
  name: 'Sum',
  metaInfo: {
    title: '加總',
  },
  firebase: {
    numbers: numbersRef
  },
  data: () => ({
      numbers: [],
      key: '',
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

      var ans = list.slice(0,3).map(function(u) { return u.number });
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
  }
}
</script>

<style scoped>

td {
  max-width:33vw !important;
}

.highlight {
  display: inline-block;
  background-color: gold;
  padding: 0 0.5em;
  border-radius: 10px;
}

</style>
