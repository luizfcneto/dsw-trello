<template>
    <form class="board-register-form" @submit.prevent="submitForm">
        <div class="form-group">
            <label for="title">Nome do Quadro: * </label>
            <input type="text" id="title" name="title" v-model="request.board.title" required>
        </div>
        <div class="dropdown form-group">
            <label for="collection">Coleção: * </label>
            <select id="collection" name="collection" v-model="selectedCollection">
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Outro">Outro</option>
            </select>
        </div>

        <div class="form-group" v-if="isNewCollection()">
            <label for="newCollection">Nome da Coleção: * </label>
            <input type="text" id="newCollection" name="newCollection" v-model="request.board.collection" required>
        </div>
        <button type="submit">Criar</button>
    </form>
</template>

<script>
export default {
    name: "BoardRegister",

    data() {
        return {
            request: {
                board: {
                    title: "",
                },
            },
            selectedCollection: ""
        }
    },

    methods: {
        submitForm() {

        },
        isNewCollection() {
            return this.selectedCollection === "Outro"
        }
    },

    async created() {

    }
}
</script>

<style scoped>
.board-register-form {
    width: 30%;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    background-color: #FFFFFFFF;
    position: fixed;
}

.form-group {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 0.5em 0;
}

label {
    width: 100%;
    font-size: medium;
    text-align: left;
    font-weight: bold;
}

input,
select {
    margin: 0.5em auto;
    padding: 0.5em 0.5em;
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: medium;
}

select {
    width: 100%;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}


button[type="submit"] {
    width: 50%;
    padding: 0.5em;
    background-color: #4c61af;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 1em auto 0 auto;
    font-size: medium;
}

button[type="submit"]:hover {
    background-color: #3a3eb9;
}
</style>