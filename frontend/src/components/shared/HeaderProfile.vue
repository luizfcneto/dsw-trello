<template>
    <div class="header-profile container-dropdown">
        <p class="dropdown-header">
            {{ user.username }}
        </p>

        <div class="dropdown-content">
            <ul>
                <li v-for="(option, index) of optionsDropDown" :key="index">
                    <router-link class="nav-link" :to="option.url">
                        {{ option.titulo }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "HeaderProfile",

    components: {
        RouterLink
    },

    props: {
        user: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            optionsDropDown: [
                { titulo: "Perfil", url: "/esqueci" },
                { titulo: "Sair", url: "/login" }
            ]
        }
    }
}
</script>

<style scoped>
.header-profile {
    background-color: #323232;
    color: #f4f7f7;
    text-decoration: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
}

.dropdown-header {
    font-size: 18px;
}

.dropdown-content {
    display: none;
    background-color: #323232;
    min-width: 100%;
    padding: 1em;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #ffffff;
    border-top-style: unset;
}


.container-dropdown {
    display: flex;
    width: 10%;
    flex-flow: column;
}

.container-dropdown:hover .dropdown-content {
    display: block;
    margin-bottom: -11em;
    z-index: 999;
}

.container-dropdown:hover {
    border-style: solid;
    border-width: 2px;
    border-color: #ffffff;
}

.nav-link {
    text-decoration: none;
    color: #ffffff;
    display: block;
    padding: 1em 0em;
    margin: 0 -1em;
    text-align: center;
}

.nav-link:hover {
    margin-left: -1em;
    margin-right: -1em;
    background-color: #212121;
    cursor: pointer;
}

@media screen and (min-width: 1200px) {
    .header-profile {
        width: 10%;
    }
}

@media screen and (max-width: 871px) {
    .header-profile {
        width: 20%;
    }
}
</style>