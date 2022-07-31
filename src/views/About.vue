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
        <tr><th><i class="user icon"/>姓名/法名</th>
        <th><i class="comment icon"/>佛號</th>
        <th><i class="plus icon"/>加總</th>
      </tr></thead>
      <tbody>
        <tr v-for = "u in users()" :key="u">
          <td data-label="Name"><h3 class="ui header">{{ u }}</h3></td>
          <td data-label="Number">
             <div class="ui list">
               <div class="item" v-for="a in  list(u)" :key="a.date+a.n">
                 {{a.date}}: <span class="highlight">{{parseInt(a.number)}}聲</span>
               </div>
             </div>
          </td>
          <td data-label="Total">總共<br/>
          <span class="highlight">{{ count(u) }}聲</span>
          <br/>佛號</td>
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
        var re = /(.+)?[\/／\|丨\s]+/;
        let n = k.n.replace(re, '');
        let u2 = u.replace(re, '');
        re = /(.+)?[〈（](.+)[）〉].*/;
        n = n.replace(re, '$2');
        n = n.replace('丨','');
        re = /(.+)?[〈（](.+)[）〉].*/;
        u2 = u2.replace(re, '$2');
        u2 = u2.replace('丨','');
        return n == u2;
      });
      if (key) {
        ans = ans.filter(function(k) {
          return k.n.indexOf(key) > -1
        })
      }
      return ans.slice().reverse()
    },
    count: function(u) {
      var ans = 0;
      for (var i = 0; i < this.numbers.length; i++) {
        var re = /(.+)?[\/／\|丨\s]+/;
        let n = this.numbers[i].n.replace(re, '');
        n = n.replace('丨','');
        re = /(.+)?[〈（](.+)[）〉].*/;
        n = n.replace(re, '$2');
        u = u.replace('丨','');
        u = u.replace(re, '$2');
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
        var re = /(.+?)[\/／\|丨\s]/;
        let n = this.numbers[i].n.replace(re, '');
        re = /(.+)?[〈（](.+)[）〉].*/;
        n = n.replace(re, '$2');
        n = n.replace('丨','');
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

<style scoped>

td {
  max-width:33vw !important;
}

@media screen and (max-width: 600px) {
  td {
    max-width:100vw !important;
  }
}
</style>
