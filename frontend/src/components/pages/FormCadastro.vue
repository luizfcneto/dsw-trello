<template>
    <div>
        <h2>Cadastro</h2>
        <h2 v-show="warning.message !== null">{{ warning.message }}</h2>
        <form class="signup-form" @submit.prevent="submitForm">
            <div class="form-group">
                <label for="username">Usuário: </label>
                <input type="text" id="username" name="username" v-model="request.user.username" required>
            </div>
            <div class="form-group">
                <label for="email">E-mail: </label>
                <input type="email" id="email" name="email" v-model="request.user.email" required>
            </div>
            <div class="form-group">
                <label for="password">Senha: </label>
                <input type="password" id="password" name="password" v-model="request.user.password" required>
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirmar Senha: </label>
                <input type="password" id="confirm-password" name="confirm-password" required>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    // Nome do componente (opcional)
    name: 'FormCadastro',

    // Componentes aninhados (opcional)
    components: {
    },

    // Propriedades de dados do componente
    data() {
        return {
            warning: {
                message: null,
            },
            request: {
                user: {
                    username: null,
                    email: null,
                    password: null,
                }
            }
        }
    },

    // Propriedades recebidas do componente pai (opcional)
    props: {

    },

    // Propriedades computadas (opcional)
    computed: {
    },

    // Métodos do componente (opcional)
    methods: {
        async submitForm() {
            console.log("submitForm executado");
            console.log(this.$data);
            try {
                const response = await axios.post('http://localhost:3000/user/', this.$data.request);

                console.log("Deu certo");
                console.log(response.data);
                this.clearInputs();

            } catch (error) {
                console.log("Deu merda");
                this.$data.warning.message = error.message;
                this.clearInputs();
                console.log(error);
            }
        },
        clearInputs() {
            this.$data.request.user.username = "";
            this.$data.request.user.email = "";
            this.$data.request.user.password = "";
            this.$data.request.user.confirmPassword = "";
        }
    },

    // Lógica a ser executada quando o componente é criado (opcional)
    created() {
        console.log(this.$data);
    },

    // Lógica a ser executada quando o componente é montado no DOM (opcional)
    mounted() {
    },

    // Outros ganchos de ciclo de vida (opcional)
    updated() {

    },

    destroyed() {

    }


}
</script>

<style>
.signup-form {
    max-width: 25em;
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
    margin: 1em auto;
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
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1em;
    font-size: large;
}

button[type="submit"]:hover {
    background-color: #45a049;
}
</style>