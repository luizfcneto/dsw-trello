<template>
    <div class="logged-home">
        <Header v-show="isHeaderProfileReady" :is-logged="isLogged()" :user="user"></Header>
        <h2> Meus Quadros </h2>

        <div class="container-content">
            <div class="container-form-board">
                <BoardRegister @atualizar-pai="newBoard" :collections="collectionsBoards"></BoardRegister>
            </div>

            <div v-if="!isCollectionReady" class="container-boards-collection">
                <h2> ... </h2>
            </div>
            <div v-if="isCollectionReady" v-show="!isEmpty" class="container-boards-collection">
                <div v-for="(collection, index) of collectionsBoards" :key="index">
                    <CollectionBoards :collectionName="collection.name" :boards="collection.boards">
                    </CollectionBoards>
                </div>
            </div>
            <div v-show="isEmpty" class="container-boards-collection-empty">
                <h3> Nenhum Quadro Registrado </h3>
                <p> Cadastre um quadro novo utilizando o formulário ao lado</p>
            </div>

        </div>

        <LoggedFooter></LoggedFooter>
    </div>
</template>

<script>
import Header from "../shared/Header.vue";
import LoggedFooter from "../shared/LoggedFooter.vue";
import CollectionBoards from "../shared/CollectionBoards.vue";
import BoardRegister from "../shared/BoardRegister.vue";
import { logout } from "../../services/logout.js";
import { getUserByToken } from "../../services/api.js";
import { getUserCollectionBoards } from "../../services/api.js";

export default {
    name: "LoggedHome",
    components: {
        Header,
        LoggedFooter,
        CollectionBoards,
        BoardRegister
    },

    data() {
        return {
            user: {
                username: "",
                email: ""
            },
            isHeaderProfileReady: false,
            collectionsBoards: [],
            isCollectionReady: false,
            isEmpty: false
        }
    },

    props: {

    },

    methods: {
        isLogged() {
            return this.$root.credentials.token !== null;
        },
        async getUserInfo() {
            console.log("getUserInfo executado");
            try {
                const { user } = await getUserByToken(this.$root.credentials.token);
                this.user = user;
                this.isHeaderProfileReady = true;
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async getUserBoards() {
            console.log("getUsersCollectionsBoards executado");

            try {
                const { collectionBoards } = await getUserCollectionBoards(this.$root.credentials.token);
                this.collectionsBoards = collectionBoards;
                if (this.collectionsBoards.length === 0) {
                    this.isEmpty = true;
                } else {
                    this.isEmpty = false;
                }
                this.isCollectionReady = true;
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async newBoard() {
            await this.getUserBoards();
        }

    },

    async created() {
        if (!this.isLogged()) {
            logout(this.$root);
        }

        if (this.isLogged()) {
            await this.getUserInfo();
            await this.getUserBoards();
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


h3 {
    width: 100%;
    text-align: center;
    margin: 0.5em auto;
    font-size: 25px;
    font-weight: bold;
}

p {
    font-size: 20px;
}

.logged-home {
    z-index: 1;
}

.container-content {
    display: flex;
    width: 95%;
    margin: 0 auto;
    flex-flow: row;
}

.container-form-board {
    width: 40%;
    margin: 0 auto;
}

.container-boards-collection {
    width: 80%;
}

.container-boards-collection-empty {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    border-radius: 10px;
    background-color: red;
    padding: 1em;
}
</style>