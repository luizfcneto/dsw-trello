<template>
    <div class="form-email-container">
        <ErrorSpan class="error-span" v-show="warning.message !== null" :message="warning.message">
        </ErrorSpan>
        <form class="form-email-esqueceu-senha" @submit.prevent="submitForm">
            <p class="form-description">Digite sua nova senha...</p>
            <div class="form-group">
                <label for="password">Senha: *</label>
                <input type="password" id="password" name="password" v-model="request.recoveryPassword.password" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirmar Senha: *</label>
                <input type="password" id="confirmPassword" name="confirmPassword"
                    v-model="request.recoveryPassword.confirmPassword" required>
            </div>
            <button type="submit">Trocar Senha</button>
        </form>
    </div>
</template>

<script>
import ErrorSpan from '../shared/ErrorSpan.vue';

export default {
    name: "RecoveryToken",
    components: {
        ErrorSpan
    },
    data() {
        return {
            warning: {
                message: null
            },
            request: {
                recoveryPassword: {
                    password: "",
                    confirmPassword: "",
                    recoveryToken: ""
                },

            }
        }
    },

    methods: {
        async submitForm() {
            console.log("submitForm executed");
            // const response = await getUserRecoveryToken(this.request);

            // if (response instanceof Error) {
            //     this.$router.replace('/esqueceu/senha');
            // } else {
            //     console.log("roteando...");
            //     console.log(response.data);
            //     this.$router.push(`/login`);
            // }
        }
    },

    created() {
        const recoveryToken = this.$route.params.recoveryToken;
        this.request.recoveryPassword.recoveryToken = recoveryToken;

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
    width: 100%;
    font-weight: bold;
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