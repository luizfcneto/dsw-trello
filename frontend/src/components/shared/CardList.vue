<template>
    <div class="card-container">
        <button class="list-icon icon" @click="goToLeft"> lft </button>
        <div v-if="!isUpdatingCard">
            <button class="card-content btn" @click="startingUpdateContent"> {{ card.content }} </button>
        </div>
        <div v-else>
            <input class="input-title" type="text" v-model.lazy="newCardContent" @blur="stoppingUpdateContent" autofocus>
        </div>
        <button class="list-icon icon" @click="goToRight"> rht </button>
        <button class="list-icon icon" @click="deleteCard"> del </button>
    </div>
</template>

<script>
import { updateCardAPI, deleteCardAPI } from "../../services/api.js";

export default {
    name: "CardList",
    props: {
        card: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isUpdatingCard: false,
            newCardContent: "",
            userToken: "",
            boardToken: "",

            updateCardRequest: {
                card: {}
            }

        }
    },

    watch: {
        async newCardContent(newValue) {
            if (newValue !== this.card.content) {
                console.log("Novo valor de card: ", newValue);
                this.buildUpdateCardContentRequest(newValue);
                await this.updateContentCard();
            }
        }
    },

    methods: {
        startingUpdateContent() {
            this.isUpdatingCard = true;
        },
        stoppingUpdateContent() {
            this.isUpdatingCard = false;
        },
        goToLeft() {
            console.log("go to the left");
        },
        goToRight() {
            console.log("go to the right");

        },
        deleteList() {
            console.log("delete");
        },

        buildUpdateCardContentRequest(content) {
            this.updateCardRequest.card.id = this.card.id;
            this.updateCardRequest.card.content = content;
            this.updateCardRequest.card.listId = this.card.listId;
        },

        async updateContentCard() {
            console.log("updateContentCard() executed");
            console.log(this.updateCardRequest);
            try {
                await updateCardAPI(this.userToken, this.updateCardRequest);
                this.$emit('refresh-board-info');
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async deleteCard() {
            console.log("deleteCard() executed");
            console.log(this.updateCardRequest);
            try {
                await deleteCardAPI(this.userToken, this.card.id);
                this.$emit('refresh-board-info');
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

    },

    async created() {
        console.log("Componente de CardList Criado");
        this.userToken = this.$root.credentials.token;
        this.boardToken = this.$route.params.boardId;
    }
}
</script>

<style scoped>
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


.card-container {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    background-color: #eee;
}

.card-content {
    width: 70%;
}


.icon {
    font: inherit;
    background-color: inherit;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
}

.list-icon {
    width: 10%;
}
</style>