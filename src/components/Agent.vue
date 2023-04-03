<template>
    <v-card>
        <v-card-title class="text-h4 justify-center py-6">
            <canzell-icon height="32px" class="mr-2" />
            <span>
                <strong>CAN</strong><em>ZELL</em> Tree
            </span>
        </v-card-title>

        <template v-if="fetchState.pending">
            <v-skeleton-loader type="card" />
        </template>
        <template v-else>
            <v-simple-table v-for="(state,key, i) in rows" :key="i" style="border-bottom: 5px rgb(75 135 139 / 42%) solid;">
                <thead v-if="i === 0">
                    <tr class="info">
                        <td class="font-weight-bold py-2 white--text">
                            Circle Name
                            <v-icon class="ml-1" color="white" small>mdi-map-marker-radius</v-icon>
                        </td>
                        <td class="font-weight-bold py-2 white--text">
                            Managing Broker
                            <v-icon class="ml-1" color="white" small>mdi-briefcase-variant</v-icon>
                        </td>
                        <td class="font-weight-bold py-2 white--text">
                            Phone
                            <v-icon class="ml-1" color="white" small>mdi-phone</v-icon>
                        </td>
                        <td class="font-weight-bold py-2 white--text">
                            Email
                            <v-icon class="ml-1" color="white" small>mdi-email-fast</v-icon>
                        </td>
                        <td class="font-weight-bold py-2 white--text">
                            Location
                            <v-icon class="ml-1" color="white" small>mdi-map-marker</v-icon>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in state" :key="i">
                        <td class="text-h6" style="width: 35%">{{ row.circle_name }}</td>
                        <td class="py-2" style="width: 25%">
                            <v-avatar size="42" class="mr-2">
                                <v-img :src="row.imageUrl" />
                            </v-avatar>
                            {{ row.managing_broker }}
                        </td>
                        <td style="width: 15%">
                            <a :href="`tel:${row.phone}`">{{ formatPhone(row.phone) }}</a>
                        </td>
                        <td style="width: 18%">
                            <a :href="`mailto:${row.email}`" target="_blank">{{ row.email }}</a>
                        </td>
                        <td style="width: 7%">
                            <a target="_blank">
                                <v-tooltip v-model="show" left>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon color="grey lighten-1">
                                                mdi-office-building-marker
                                            </v-icon>&nbsp;
                                            {{row.state}}
                                        </v-btn>
                                    </template>
                                    <span> {{ row.address }} <br> {{row.city}}, {{ row.state }}, {{ row.zip }}</span>
                                </v-tooltip>
                                <br>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </template>
    </v-card>
</template>

<script>
import CanzellIcon from './CanzellIcon.vue';

const CIRCLES_URL = "https://api.canzell.com/__public__/user-service/v2/circles/";
const USER_URL = "https://api.canzell.com/__public__/user-service/users/?key=id";

export default {
    components: { CanzellIcon },
    data() {
        return {
            data: [],
            fetchState: {
                pending: true,
                error: null,
            },
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        formatPhone(phone) {
            phone = `${phone}`.replace(/\D/g, '');
            phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
            return phone;
        },
        async fetch() {
            this.fetchState.pending = true;
            try {
                const circles = await fetch(CIRCLES_URL).then((res) => res.json());
                const users = await fetch(USER_URL).then((res) => res.json());

                const circlesFormatted = circles
                    .map((circle) => {
                        const user = users[circle.leaders.managing_broker_id];

                        if (user === undefined) return null; // User must've been offboarded!

                        return {
                        circle_name: circle.name,
                        managing_broker: `${user.first_name} ${user.last_name}`,
                        imageUrl: user.mug,
                        phone: user.phone,
                        email: user.email,
                        address: circle.address,
                        city: circle.city,
                        state: circle.state,
                        zip: circle.zip,
                        };
                    })
                    .filter((circle) => circle !== null);

                // this.data = circlesFormatted;
                this.groupAndSortCircles(circlesFormatted);
                this.fetchState.error = null;
            } catch (e) {
                this.data = [];
                this.fetchState.error = e;
                console.error(e);
            }
            this.fetchState.pending = false;
        },

        groupAndSortCircles(circlesFormatted){
            const sorted = circlesFormatted.sort((a,b) => (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0));

            const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})

            this.data = groupByKey(sorted, 'state');
            console.log(this.data);
        }
    },
    computed: {
        rows() {
            return this.data;
        },
    },
};
</script>
