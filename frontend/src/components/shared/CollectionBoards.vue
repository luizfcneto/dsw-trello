<template>
    <div class="container-collection">
        <p class="collection-name"> {{ collectionName }} </p>
        <ul class="container-boards">
            <li class="board-element" v-for="(board, index) of boards" :key="index">
                <router-link class="nav-link" :to="{ path: `/board/${encodeURIComponent(board.path_url)}` }">
                    <div class="board-linked">
                        <p class="board-title"> {{ board.title }} </p>
                    </div>
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
    padding-bottom: 1em;
}

ul,
li {
    list-style: none;
    padding: 0;
    margin: 0;
}

.board-element {
    border-radius: 10px;
    width: 28%;
    margin: 0.75em;
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

.board-linked {
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5em;
    cursor: pointer;
    background-color: aqua;

}
</style>