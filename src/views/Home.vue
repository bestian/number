<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" :numbers="numbers" :myTotal="myTotal" :myToDay="myToDay" :myS="myS" :allnumbers="allnumbers" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  props: ['numbers', 'myTotal', 'myToDay', 'myS', 'allnumbers'],
  components: {
    HelloWorld
  }
}
</script>
