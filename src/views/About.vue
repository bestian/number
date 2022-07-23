<template>
  <div class="about">
    <h1>加總</h1>
    <table class="ui celled table">
      <thead>
        <tr><th>大名</th>
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
  name: 'HelloWorld',
  firebase: {
    numbers: numbersRef
  },
  data: () => ({
      numbers: []
  }),
  methods: {
    list: function(u) {
      var ans = this.numbers.filter(function(k) {
        return k.n == u
      });
      return ans
    },
    count: function(u) {
      var ans = 0;
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
      for (var i = 0; i < this.numbers.length; i++) {
        let n = this.numbers[i].n;
        if (u.indexOf(n) == -1) {
          u.push(n);
        }
      }
      return u;
    }
  }
}
</script>
