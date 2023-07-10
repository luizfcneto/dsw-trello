<template>
    <div>
        <h2> Board page </h2>
        <h2> {{ boardId }}</h2>
    </div>
</template>

<script>
export default {
    name: "UserBoardPage",
    props: {
        boardId: {
            type: String,
            required: true
        }
    }
}
</script>

<style></style>