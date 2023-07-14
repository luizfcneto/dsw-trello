<template>
    <div class="list">
        <!-- <div class="list-title">
            <p> {{ list.title }} </p>
        </div> -->
        <div v-if="!isUpdatingListTitle" class="list-header-container">
            <button class="list-icon icon" @click="goToLeft"> left </button>
            <button class="list-title btn" @click="startingUpdateTitle"> {{ list.title }}</button>
            <button class="list-icon icon" @click="goToRight"> right </button>
            <button class="list-icon icon" @click="deleteList"> del </button>
        </div>
        <div v-else>
            <input class="input-title" type="text" v-model.lazy="otherListTitle" @blur="stoppingUpdateTitle" autofocus>
        </div>

        <div class="list-items">
            <CardList @refresh-board-info="getBoardInfo" v-for="(card, index) of list.cards" :key="index" :card="card">
            </CardList>
        </div>
        <div v-if="!isCreatingCard">
            <button class="add-card-btn btn" @click="startingCreateCard">Add a card</button>
        </div>
        <div v-else>
            <input class="input-card-content" type="text" v-model.lazy="newCardContent" @blur="stoppingCreateCard"
                autofocus>

        </div>
    </div>
</template>

<script>
import CardList from './CardList.vue';
import { updateListInfoAPI, removeListAPI, createNewCardAPI } from "../../services/api.js";

export default {
    name: "BoardList",
    components: {
        CardList
    },
    props: {
        list: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isUpdatingListTitle: false,
            isCreatingCard: false,
            otherListTitle: "",
            newCardContent: "",

            userToken: "",
            boardToken: "",

            updateListRequest: {
                list: {}
            },

            createCardRequest: {
                card: {}
            }

        }
    },

    watch: {
        async otherListTitle(newValue) {
            if (newValue !== this.list.title) {
                console.log("Valor novo da lista:", newValue);
                this.buildUpdateListRequest(newValue, this.list.orderIndex);
                await this.updateListInfo();
            }
        },

        async newCardContent(newValue) {
            if (newValue) {
                console.log("Valor de card: ", newValue);
                this.createCardRequest.card.content = newValue;
                this.createCardRequest.card.listId = this.list.id;
                await this.createNewCard();
            }
        }
    },

    methods: {
        startingUpdateTitle() {
            this.isUpdatingListTitle = true;
        },
        stoppingUpdateTitle() {
            this.isUpdatingListTitle = false;
        },
        startingCreateCard() {
            this.isCreatingCard = true;
        },
        stoppingCreateCard() {
            this.isCreatingCard = false;
        },

        buildUpdateListRequest(title, orderIndex) {
            this.updateListRequest.list.title = title;
            this.updateListRequest.list.orderIndex = orderIndex;
            this.updateListRequest.list.id = this.list.id;
        },

        async goToLeft() {
            if (this.list.orderIndex - 1 > 0) {
                console.log("this.updateListRequest.list.orderIndex = this.list.orderIndex - 1");
                this.buildUpdateListRequest(this.list.title, this.list.orderIndex - 1);
                await this.updateListInfo();
            }
        },

        async goToRight() {
            console.log("this.updateListRequest.list.orderIndex = this.list.orderIndex + 1");
            this.buildUpdateListRequest(this.list.title, this.list.orderIndex + 1);
            await this.updateListInfo();
        },

        clearUpdateListRequest() {
            this.updateListRequest.list.orderIndex = this.list.orderIndex;
            this.updateListRequest.list.title = this.list.title;
            this.updateListRequest.list.id = this.list.id;
        },

        async updateListInfo() {
            console.log("updateListInfo() executed");
            try {
                await updateListInfoAPI(this.userToken, this.boardToken, this.updateListRequest);
                this.clearUpdateListRequest();
                this.$emit('refresh-board-info');
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async deleteList() {
            console.log("deleteList() executed");

            try {
                await removeListAPI(this.userToken, this.list.id);
                this.$emit('refresh-board-info');
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async createNewCard() {
            console.log("createNewCard() executed");
            console.log("this.createCardRequest");
            console.log(this.createCardRequest);
            try {
                await createNewCardAPI(this.userToken, this.createCardRequest);
                this.$emit('refresh-board-info');
            } catch (error) {
                console.error(error.name, error.message);
            }
        },
        async getBoardInfo() {
            console.log("getBoardInfo do componente BoardList e propagando");
            this.$emit('refresh-board-info');
        }
    },

    async created() {
        console.log("Componente de BoardList Criado");
        this.userToken = this.$root.credentials.token;
        this.boardToken = this.$route.params.boardId;
    }
}
</script>

<style scoped>
/* Botões de adicionar elemento */
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
    width: 100%;
}

.icon {
    font: inherit;
    background-color: inherit;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
}

.add-card-btn {
    display: block;
    font-size: 1.4rem;
    font-weight: 400;
    color: #838c91;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
}

.add-card-btn:hover {
    background-color: #cdd2d4;
    color: #4d4d4d;
    text-decoration: underline;
}

.add-card-btn::after,
.add-list-btn::after {
    content: '...';
}

/* Estilos das listas */
.list {
    flex: 0 0 20rem;
    display: flex;
    flex-direction: column;
    background-color: #e2e4e6;
    max-height: calc(100vh - 11.8rem);
    border-radius: 0.3rem;
    margin-right: 1rem;
}

.list:last-of-type {
    margin-right: 0;
}

.list-header-container {
    width: 100%;
    display: flex;
}

.list-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
    padding: 1rem;
    width: 70%;
}

.input-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
    padding: 1rem;
    width: 89%;
}

.list-icon {
    width: 10%;
}

.list-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: start;
    padding: 0 0.6rem 0.5rem;
    overflow-y: auto;
    width: 89%;
}

.list-items::-webkit-scrollbar {
    width: 1.6rem;
}

.list-items::-webkit-scrollbar-thumb {
    background-color: #c4c9cc;
    border-right: 0.6rem solid #e2e4e6;
}

.list-items .card-container {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.3;
    background-color: #fff;
    padding: 0.65rem 0.6rem;
    color: #4d4d4d;
    border-bottom: 0.1rem solid #ccc;
    border-radius: 0.3rem;
    margin-bottom: 0.6rem;
    word-wrap: break-word;
    cursor: pointer;
}

.list-items .card-container:last-of-type {
    margin-bottom: 0;
}

.list-items .card-container:hover {
    background-color: #eee;
}

.input-card-content {
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
    padding: 1rem;
    width: 89%;
}

@supports (display: grid) {
    .list {
        display: grid;
        grid-template-rows: auto minmax(auto, 1fr) auto;
    }

    .list-items {
        display: grid;
        grid-row-gap: 0.6rem;
    }

    .list,
    .list-items li,
    .btn {
        margin: 0;
    }
}
</style>