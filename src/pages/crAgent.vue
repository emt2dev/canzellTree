<template>
  <v-sheet>
    <v-alert dense type="info">
      All dates and times are in EST.
    </v-alert>
    <calendar />
  </v-sheet>
</template>

<script>
import Agent from '../components/Agent.vue';
export default {
  components: { Agent }
}
</script>

<style>

</style>