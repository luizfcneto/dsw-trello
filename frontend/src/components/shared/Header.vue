<template>
    <header class="header-container" v-show="isLogged">
        <router-link class="nav-link" to="/home">
            <h1 class="header-title">DSW-Trello</h1>
        </router-link>
        <HeaderProfile class="header-profile" :user="user"></HeaderProfile>
    </header>
</template>

<script>
import HeaderProfile from "./HeaderProfile.vue";
import { RouterLink } from "vue-router";

export default {
    name: "HeaderLogged",
    components: {
        HeaderProfile,
        RouterLink
    },

    props: {
        isLogged: {
            type: Boolean,
            required: true
        },

        user: {
            type: Object,
            required: true
        }
    },
}
</script>

<style>
.nav-link {
    text-decoration: none;
}

.header-container {
    display: flex;
    flex-flow: row;
    width: 100%;
    margin: 0 auto;
    background-color: #393E46;
    justify-content: space-between;
}

.header-title {
    color: #F5F5F5;
    font-size: 21px;
    font-weight: bold;
    margin: 0.5em;
    padding: 0.5em;
}

.header-profile {
    margin: 0.5em;
    font-weight: bold;
    padding: 1em;
}
</style>