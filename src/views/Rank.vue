<template>
  <div class="about">
    <div class="ui category search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search..." v-model="key">
        <i class="search icon"></i>
      </div>
    </div>
    <h1>榮譽榜</h1>
    <table class="ui celled table">
      <thead>
        <tr><th>日期</th>
        <th>最高</th>
      </tr></thead>
      <tbody>
        <tr v-for = "d in days().slice().reverse()" :key="d">
          <td data-label="Name">{{ d }}</td>
          <td data-label="Total">{{ nameF(d) }}: <span class="highlight">{{ countF(d) }}聲</span>佛號</td>
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
    list: function(u) {
      var key = this.key;
      var ans = this.numbers.filter(function(k) {
        return k.n == u
      });
      if (key) {
        ans = ans.filter(function(k) {
          return k.n.indexOf(key) > -1
        })
      }
      return ans
    },
    countF: function(d) {
      var list = this.numbers.filter(function(k) {
        return k.date == d
      })
      var ans = list.slice().sort(function(a, b) {
        return a.number > b.number
      })[0].number
    },
    nameF: function(d) {
      var list = this.numbers.filter(function(k) {
        return k.date == d
      })
      var ans = list.slice().sort(function(a, b) {
        return a.number > b.number
      })[0].n
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
