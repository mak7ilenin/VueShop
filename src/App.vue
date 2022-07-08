<template>
  <div class="wrapper">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Home from '@/views/Home'
export default {
  name: 'App',
  components: {
    Navigation,
    Home
  }
}
</script>

<style>
/* Remove Default */
li {list-style: none} 
ul {padding: 0}
a {text-decoration: none; color: #fff;}
p, li {margin: 0;}
/*  */
body {
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
}
.wrapper {
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
