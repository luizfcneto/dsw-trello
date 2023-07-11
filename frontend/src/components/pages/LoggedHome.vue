<template>
    <div class="logged-home">
        <Header v-show="isHeaderProfileReady" :is-logged="isLogged()" :user="user"></Header>
        <h2> Meus Quadros </h2>

        <div class="container-content">
            <div class="container-form-board">
                <BoardRegister @atualizar-pai="newBoard" :collections="collectionsBoards"></BoardRegister>
            </div>

            <div v-if="isCollectionReady" class="container-boards-collection">
                <div v-for="(collection, index) of collectionsBoards" :key="index">
                    <CollectionBoards :collectionName="collection.name" :boards="collection.boards">
                    </CollectionBoards>
                </div>
            </div>
            <div v-if="!isCollectionReady" class="container-boards-collection">
                <h2> ... </h2>
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
            isCollectionReady: false
            // collectionsBoardsIsEmpty: tre
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
                this.isCollectionReady = true;
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async newBoard() {
            console.log("newBoard acionado");
            await this.getUserBoards();
        }

    },

    async created() {
        if (!this.isLogged()) {
            console.log("não esta logado, redirecionado pro logout -> login page")
            logout(this.$root);
        }

        if (this.isLogged()) {
            console.log("está logado, carregar informações do usuário");
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
</style>