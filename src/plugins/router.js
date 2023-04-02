import Vue from "vue";
import VueRouter from "vue-router"
import SplitTrainingCalendar from "../pages/SplitTrainingCalendar.vue"
import TrainingCalendar from "../pages/TrainingCalendar.vue"
import BrokerRoster from '../pages/BrokerRoster.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/training-calendar",
            name: "TrainingCalendar",
            component: TrainingCalendar
        },
        {
            path: "/split-training-calendar",
            name: "SplitTrainingCalendar",
            component: SplitTrainingCalendar
        },
        {
            path: "/",
            redirect: "/training-calendar"
        },
        {
            path: "/broker-roster",
            name: "BrokerRoster",
            component: BrokerRoster
        }
    ]
})