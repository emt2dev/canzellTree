import Vue from "vue";
import VueRouter from "vue-router"
import SplitTrainingCalendar from "../pages/SplitTrainingCalendar.vue"
import TrainingCalendar from "../pages/TrainingCalendar.vue"
import BrokerRoster from '../pages/BrokerRoster.vue';
import Dashboard from '../pages/agentDashboard.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/dashboard/:email",
            name: "Dashboard",
            component: Dashboard,
            props: true
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard
        },
        {
            path: "/",
            redirect: "/dashboard"
        }
    ]
})