<template>
    <v-data-table group-by="date" :headers="headers" :items-per-page="30" :items="items" :loading="fetchState.pending" :custom-sort="customSort">
        <template #[`item.name`]="{ item: event }">
                <v-tooltip bottom>
                    <template #activator="{ on }">
                        <a target="_blank" v-on="event.short_description != '' ? on : null" :href="event.url">{{ event.name }}</a>
                    </template>
                    {{ event.short_description }}
                </v-tooltip>
        </template>

        <template #[`item.categories`]="{ item }">
            <template v-if="item.categoryIcons !== undefined">
                <span v-for="(icon, i) in item.categoryIcons" :key="i">
                    <v-icon class="mr-1">{{ icon }}</v-icon>
                </span>
            </template>
        </template>

        <template #[`item.date`]="{ value }">
            {{ value }}
        </template>

        <template #[`group.header`]="{ group, headers }">
            <td>
                {{ group }}
            </td>
            <td v-for="i in headers.length - 1" :key="i">
            </td>
        </template>
  </v-data-table>
</template>

<script>

import moment from 'moment';
import 'moment-recur';

const EVENT_URL = 'https://cdn.experiencecr.com/training/events.json'
const CATEGORIES = {
    'agent': 'mdi-incognito',
    'management': 'mdi-briefcase-account'
};
const STATIC_HEADERS= [
    {
        text: 'Time',
        value: 'time',
        sortable: false
    },
    {
        text: 'Date',
        value: 'date',
        sortable: false
    },
    {
        text: 'Event Name',
        value: 'name',
        sortable: false,
        align: "end"
    },
]


export default {
    props: {
        disableCategories:{
            type: Boolean,
            default: false
        },
        checkedCategories:{
            default: []
        }
    },

    data() {
        return {
            fetchState: {
                error: null,
                pending: true,
            },
            events: null,
            occurances: null,
        }
    },

    created() {
        this.fetch();
    },

    computed: {

        headers() {
            const headers = STATIC_HEADERS
            const isCategoriesEnabled = !this.disableCategories
            if (isCategoriesEnabled){
                headers.push({
                    text: 'Categories',
                    value: 'categories',
                    sortable: false
                })
            }  
            
            return headers
        },


        items() {
            if (this.occurances == null) return [];


            const items = this.occurances
                .filter(occurance => {
                    if (occurance.categories === undefined) return false;
                    const belongsToSelectedCategory = occurance.categories.some(category => this.checkedCategories.indexOf(category) !== -1);
                    return belongsToSelectedCategory;  
                })
                .map(occurance => {
                    occurance.categoryIcons = occurance.categories === undefined
                        ? []
                        : occurance.categories.map(category => CATEGORIES[category]);
                    return occurance;
                });

            return items;
        },

        startDate() {
            return moment();
        },

        endDate() {
            return moment().add(30, 'days');
        }

    },

    methods: {
        async fetch() {
            this.fetchState.pending = true;

            try {
                this.events = await fetch(EVENT_URL)
                    .then(res => res.json())
                    .then(events => events.map(event => {
                        let recurrance = moment().recur(this.startDate, this.endDate).every(...event.every);

                        if (event.every_addon != undefined) recurrance = recurrance.every(...event.every_addon);

                        return {
                            ...event,
                            recurrance
                        }
                    }))

                this.occurances = this.events
                    .map(event => event.recurrance
                        .all()
                        .map(occurance => occurance.hour(event.hour).minutes(event.minute))
                        .map(occurance => ({
                            ...event,
                            order: occurance.unix(),
                            date: occurance.format('dddd, MMMM Do, YYYY'),
                            time: occurance.format('h:mmA')
                        }))
                    )
                    .flat(1)
                    .sort((a, b) => a.order - b.order)
            } catch (e) {
                this.fetchState.error = e;
                console.error(e);
            }

            this.fetchState.pending = false;
        },
        customSort(items, index, isDesc) {
            items.sort((a, b) => {
                if (index === "date") {
                    if (isDesc) {
                        return compare(a.date, b.date);
                    } else {
                        return compare(b.date, a.date);
                    }
                }
            });
            return items;
        }
    }
}
</script>

<style>

</style>