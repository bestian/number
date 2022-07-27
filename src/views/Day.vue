<template>
  <div class="about">
    <h1>每日加總</h1>
    <table class="ui celled table">
      <thead>
        <tr><th><i class="calendar icon"/>日期</th>
        <th><i class="plus icon"/>加總</th>
        <th><i class="users icon"/>永明佛寺加總</th>
      </tr></thead>
      <tbody>
        <tr v-for = "d in days().slice().reverse()" :key="d">
          <td data-label="Name">{{ d }}</td>
          <td data-label="Total">總共<span class="highlight">{{ count(d) }}聲</span>佛號</td><td data-label="Total">永明佛寺總共<span class="highlight">{{ countY(d) }}聲</span>佛號</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { numbersRef } from '../firebase'

export default {
  name: 'Date',
  metaInfo: {
    title: '日期',
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
    count: function(d) {
      var ans = 0;
      for (let i = 0; i < this.numbers.length; i++) {
        if (d == this.numbers[i].date) {
          ans += parseInt(this.numbers[i].number)
        }
      }
      return ans
    },
    countY: function(d) {
      var ns = this.numbers.filter(function(u) { return ['廣律', '廣弘', '廣成', '廣清', '聖願'].indexOf(u.n) > -1})
      var ans = 0;
      for (let i = 0; i < ns.length; i++) {
        if (d == ns[i].date) {
          ans += parseInt(ns[i].number)
        }
      }
      return ans
    }
  }
}
</script>

<style scoped>

</style>
