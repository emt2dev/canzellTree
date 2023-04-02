<template>
  <v-app>
      <v-main>
        <router-view/>
      </v-main>
  </v-app>
</template>

<script>
import TrainingCalendar from './pages/TrainingCalendar.vue'
import EventContent from './pages/SplitTrainingCalendar.vue'
import Roster from './pages/BrokerRoster.vue';
export default {
  components: { TrainingCalendar, EventContent, Roster },
}
</script>

<style>

</style>