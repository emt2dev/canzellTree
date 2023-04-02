import Vue from 'vue';
import Vuetify from "vuetify/lib";
import vuetifyColors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

const options = {
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#212529", // Cheaty Gray
                secondary: "#A8A497", // Greige
                tertiary: "#5C5D5D", // Charcoal
                accent: "#D01C1F", // Red
                success: "#94C106", // Cheaty Lime
                teal: "#4B878B", // Dark Teal
                ocean: '#94C1C6', // Ocean
                error: "#D01C1F", // Red
                warning: "#E6CA68", // Gold
                info: "#4B878B", // Dark Teal
                money: '#00c805' // Money/Robinhood Green
            },
            dark: {
                primary: vuetifyColors.blue.darken2,
                accent: vuetifyColors.grey.darken3,
                secondary: vuetifyColors.amber.darken3,
                info: vuetifyColors.teal.lighten1,
                warning: vuetifyColors.amber.base,
                error: vuetifyColors.deepOrange.accent4,
                success: vuetifyColors.green.accent3
            }
        }
    }
}

export default new Vuetify(options);