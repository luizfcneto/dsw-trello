<template>
    <div>
        <h2> Área Logada </h2>
    </div>
</template>

<script>
import { logout } from "../../services/logout.js";

export default {
    name: "LoggedHome",

    data() {
        return {
        }
    },

    props: {

    },

    created() {
        console.log("created executado");
        const token = this.$root.credentials.token;
        if (token === null || token === undefined || token === "") {
            logout(this.$root);
        }
    }

}
</script>

<style></style>