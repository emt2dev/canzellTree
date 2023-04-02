<template>
  <v-card>
      <v-card-title class="text-h4">
        <slot name="title">
          <strong>CAN</strong><em>ZELL</em>&nbsp Calendar
        </slot>
      </v-card-title>
      <v-card-text>
          <template v-if="!disableCategories">
            <v-checkbox prepend-icon="mdi-incognito" dense hide-details label="Agent Events" value="agent" v-model="checkedCategories"/>
            <v-checkbox prepend-icon="mdi-briefcase-account" dense hide-details label="Management Events" value="management" v-model="checkedCategories"/>
          </template>
          <calendar-event-table :disable-categories="disableCategories" :checked-categories="checkedCategories" />
      </v-card-text>
  </v-card>
</template>

<script>
import CalendarEventTable from './CalendarEventTable.vue'
export default {
  components: { CalendarEventTable },
  props:{
    categories:{
      default() {
        return ["agent"]
        },
      type:Array
    },
    disableCategories:{
      default:false,
      type:Boolean
    },
  },
  data() {
    return {
      checkedCategories: this.categories
    }
  },
}
</script>

<style>

</style>