<template>
    <li>
        <p> {{ card.content }} </p>
    </li>
</template>

<script>
export default {
    name: "CardList",
    props: {
        card: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped></style>