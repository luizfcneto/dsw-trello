<template>
    <div class="container-collection">
        <p class="collection-name"> {{ collectionName }} </p>
        <ul class="container-boards">
            <li class="board" v-for="(board, index) of boards" :key="index">
                <router-link class="nav-link" :to="board.id">
                    <p class="board-title"> {{ board.title }} </p>
                </router-link>

            </li>
        </ul>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "CollectionBoards",
    components: {
        RouterLink
    },

    props: {
        boards: {
            type: Array,
            required: true
        },
        collectionName: {
            type: String,
            required: true
        }
    },

    data() {
        return {
        }
    }


}

</script>

<style>
.container-collection {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
}

.collection-name {
    font-size: 20px;
    font-weight: bold;
    margin-left: 1em;
}


.container-boards {
    display: flex;
    flex-flow: row wrap;
    width: 95%;
    margin: 1em auto 2.5em auto;
    background-color: #fff;
    justify-content: flex-start;

}

ul,
li {
    list-style: none;
}

.board {
    border-radius: 10px;
    width: 15%;
    margin: 1em;
    padding: 2em;
    background-color: aqua;
    max-height: 3em;
}

.board-title {
    font-size: 15px;
    font-weight: bold;
    text-align: start;
}

.nav-link {
    text-decoration: none;
}
</style>