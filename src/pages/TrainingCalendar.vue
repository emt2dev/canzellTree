<template>
  <v-sheet>
    <v-alert dense type="info">
      All dates and times are in EST.
    </v-alert>
    <calendar />
  </v-sheet>
</template>

<script>
import Calendar from '../components/Calendar.vue';
export default {
  components: { Calendar }
}
</script>

<style>

</style>