<template>
  <v-card>
      <v-card-text>
          <v-container fluid>
            <v-alert dense type="info">
              All dates and times are in EST.
            </v-alert>
          <v-row>
              <v-col align-self="auto" sm="7">
                <calendar disable-categories :categories='["agent"]'>
                  <template v-slot:title>
                    <strong>CAN</strong><em>ZELL</em>&nbsp Training Calendar
                  </template>
                </calendar>
              </v-col>
              <v-col align-self="auto" sm="5">
                <calendar disable-categories :categories='["management"]'>
                  <template v-slot:title>
                    Management Calendar
                  </template>
                </calendar>
              </v-col>
          </v-row>
          </v-container>
      </v-card-text>
  </v-card>
</template>

<script>
import Calendar from '../components/Calendar.vue'
import CalendarEventTable from '../components/CalendarEventTable.vue'
export default {
  components: { CalendarEventTable, Calendar },
}
</script>

<style>

</style>