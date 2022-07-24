<template>
  <div class="about">
    <div class="ui category search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search..." v-model="key">
        <i class="search icon"></i>
      </div>
    </div>
    <h1>加總</h1>
    <table class="ui celled table">
      <thead>
        <tr><th>姓名/法名</th>
        <th>佛號</th>
        <th>加總</th>
      </tr></thead>
      <tbody>
        <tr v-for = "u in users()">
          <td data-label="Name">{{ u }}</td>
          <td data-label="Number">
             <div class="ui list">
               <div class="item" v-for="a in  list(u)">
                 {{a.date}}: {{a.number}}
               </div>
             </div>
          </td>
          <td data-label="Total">總共{{ count(u) }}聲佛號</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
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
    count: function(u) {
      var ans = 0;
      var key = this.key;
      for (var i = 0; i < this.numbers.length; i++) {
        let n = this.numbers[i].n;
        if (u == n) {
          ans += parseInt(this.numbers[i].number, 10);
        }
      }
      return ans;
    },
    users: function () {
      var u = [];
      var key = this.key;
      for (var i = 0; i < this.numbers.length; i++) {
        let n = this.numbers[i].n;
        if (u.indexOf(n) == -1) {
          u.push(n);
        }
      }
      if (key) {
        u = u.filter(function(k) {
          return k.indexOf(key) > -1
        })
      }
      return u;
    }
  }
}
</script>
