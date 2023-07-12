<template>
    <div class="form-login-container">
        <h2>Login</h2>
        <ErrorSpan class="error-span" v-show="warning.message !== null" :message="warning.message">
        </ErrorSpan>
        <form class="login-form" @submit.prevent="submitForm">
            <div class="form-group">
                <label for="email">E-mail: *</label>
                <input type="email" id="email" name="email" v-model="request.login.email" required>
            </div>
            <div class="form-group">
                <label for="password">Senha: *</label>
                <input type="password" id="password" name="password" v-model="request.login.password" required>
            </div>
            <button type="submit">Logar</button>
        </form>
        <div class="options-container">
            <router-link class="options realizar-cadastro" to="/cadastro" target="_self">Não tenho
                conta</router-link>
            <router-link class="options esqueci-minha-senha" to="/esqueceu/senha" target="_self">Esqueci minha
                senha</router-link>
        </div>
    </div>
</template>

<script>
import { doLogin } from "../../services/api.js";
import ErrorSpan from "../shared/ErrorSpan.vue";

export default {
    name: "UserLoginPage",
    components: {
        ErrorSpan,
    },
    data() {
        return {
            warning: {
                message: null
            },
            request: {
                login: {
                    email: null,
                    password: null
                }
            }
        }
    },
    methods: {
        async submitForm() {
            console.log("submitForm executado");
            console.log(this.$data.request);
            const response = await doLogin(this.$data.request);

            if (response instanceof Error) {
                this.warning.message = `${response.response.status} - ${response.response.data.message}`;
            }

            if (response.status === 200) {
                this.warning.message = null;
                this.clearInputs();
                this.$root.credentials.token = response.data.user.token;
                this.$router.replace("home");
            }
        },

        clearInputs() {
            this.$data.request.login.email = "";
            this.$data.request.login.password = "";
        }

    }
}
</script>


<style scoped>
h2 {
    width: 100%;
    text-align: center;
    margin: 0.5em auto;
    font-size: 32px;
    font-weight: bold;
}


.form-login-container {
    display: flex;
    width: 100%;
    margin: 0 auto;
    flex-flow: column;
}

.error-span {
    width: 50%;
}

.login-form {
    width: 50%;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    background-color: #FFFFFFFF;
}

h2 {
    width: 100%;
    text-align: center;
    margin: 0.5em auto;
    font-size: 32px;
    font-weight: bold;
}

.form-group {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    margin: 0.5em 0;
}

label {
    width: 100%;
    font-size: large;
    text-align: left;
}

input {
    margin: 0.5em auto;
    padding: 0.5em 0.5em;
    width: 95%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: medium;
}

button[type="submit"] {
    display: block;
    width: 100%;
    padding: 1em;
    background-color: #4c61af;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1em;
    font-size: large;
}

button[type="submit"]:hover {
    background-color: #3a3eb9;
}

.options-container {
    width: 60%;
    display: flex;
    margin: 0 auto;
    flex-flow: row;
}

.options {
    width: 30%;
    text-decoration: none;
    color: black
}

.realizar-cadastro,
.esqueci-minha-senha {
    margin: 1em auto;
    text-align: center;
}
</style>