<template>
  <div id="nav" v-if="!started">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |  -->
    <button type="button" class="btn btn-primary" @click="start">شروع بازی</button>
  </div>
  <router-view/>
</template>

<script>
import { ref } from '@vue/reactivity'
import router from './router'
import { useCounterStore } from './stores/store'
export default {
  setup() {
    let started = ref(useCounterStore().started)
    function start(){
      useCounterStore().started = true
      started.value =useCounterStore().started
      router.push("/names")
    }
    return{start,started}
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
