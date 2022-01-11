<template>
    <footer>
        <h4>Groupomania</h4>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>

footer {
    grid-area: footer;
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color:#339966;
    box-shadow: 0px -10px 13px -7px #000000;
}
footer h4 {
    color: white;
}

</style>