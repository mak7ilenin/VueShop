<template>
  <div class="wrapper">
    <Navigation 
      :authUser="authUser"
      :authed="authed"
    />
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';

import { db, auth } from '@/firebase/init';
import { onSnapshot, collection } from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';
export default {
  data() {
    return {
      authUser: null,
      user_name: undefined,
      user_money: 0,
      authed: false
    }
  },
  name: 'App',
  components: {
    Navigation
  },
  methods: {
    isSignedIn: async function() {
      onAuthStateChanged(auth, (user) => {
        if(user) {
            this.authed = true;
            $('.log-in').removeClass('unlogged');
            $('.log-in').removeClass('unlogged, unlogged-1');
            $('.username').removeClass('unknown');

            onSnapshot(collection(db, 'users'), (querySnapshot) => {
                const userList = [];
                querySnapshot.forEach((doc) => {
                    const user = {
                        id: doc.id,
                        userId: doc.data().userId,
                        username: doc.data().username,
                        money: doc.data().money,
                        cartItems: doc.data().cartItems
                    }
                    userList.push(user);
                });
                const authUser = userList.find(user => user.userId === (auth.currentUser).uid);
                this.authUser = authUser;
                
                this.user_money = authUser.money;
                this.user_name = authUser.username;
            });
        } else {
            this.authed = false;
            $('.log-in').addClass('unlogged');
            $('.log-in').addClass('unlogged-1');
            $('.username').addClass('unknown');
        }
      });
    }
  },
  beforeMount() {
    this.isSignedIn();
  }
}
</script>

<style>
/* Remove Default */
li {list-style: none} 
ul {padding: 0; margin-bottom: 0;}
a {text-decoration: none !important; color: #fff;}
p, li {margin: 0;}
/*  */
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #2c3e50;
}
#app {
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
