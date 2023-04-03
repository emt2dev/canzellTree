<template>
    <div class="container">

        <template v-if="testing == true" >
            true
            <v-skeleton-loader type="card-avatar" />
        </template>
        
        <template v-if="testing == true" >
            true
            <v-skeleton-loader type="card-avatar" />
        </template>

        <template v-else>
            false
        </template>

        {{  $route.params }}
        <h1> here{{ $route.params.email }}</h1>
        {{ email }}
    </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue';

const CIRCLES_URL = "https://api.canzell.com/__public__/user-service/v2/circles/";
const USER_URL = "https://api.canzell.com/__public__/user-service/users/?key=id";


export default {
  components: { Dashboard },
  props: {
    isLoggedIn : false,
    email: ['email']
  },

  data() {
    return {
        isLoggedIn: false,
        email: null
    }
  },
  methods: {
    
  }
//   https://api.canzell.com/__public__/user-service/?email=melissa.hinojosa@canzell.com
}
</script>

<style>

</style>