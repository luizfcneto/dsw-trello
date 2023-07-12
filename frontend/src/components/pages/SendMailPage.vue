<template>
    <div class="form-email-container">
        <ErrorSpan class="error-span" v-show="warning.message !== null" :message="warning.message">
        </ErrorSpan>
        <form class="form-email-esqueceu-senha" @submit.prevent="submitForm">
            <p class="form-description">Digite seu email para redirecionarmos você para página da troca de senha</p>
            <div class="form-group">
                <label for="email">E-mail: *</label>
                <input type="email" id="email" name="email" v-model="request.recoverPassword.email" required>
            </div>
            <button type="submit">Confirmar Email</button>
        </form>
    </div>
</template>

<script>
import ErrorSpan from '../shared/ErrorSpan.vue';
import { getUserRecoveryToken } from "../../services/api.js";

export default {
    name: "SendMailPage",
    components: {
        ErrorSpan
    },
    data() {
        return {
            warning: {
                message: null
            },
            request: {
                recoverPassword: {
                    email: "",
                }
            }
        }
    },

    methods: {
        async submitForm() {
            console.log("submitForm executed");
            const response = await getUserRecoveryToken(this.request);

            if (response instanceof Error) {
                this.warning.message = `${response.response.status} - ${response.response.data.message}`;

            } else {
                console.log("roteando...");
                this.$router.push(`/esqueceu/senha/${response.data.user.recoveryToken}`);
            }
        }
    },

    created() {
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

.form-description {
    margin: 0.5em auto 1em;
    text-align: left;
    font-size: 18px;
}

.form-email-container {
    display: flex;
    width: 60%;
    margin: 2em auto;
    flex-flow: column;
}

.error-span {
    width: 50%;
}

.form-email-esqueceu-senha {
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
</style>