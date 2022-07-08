<template>
    <div class="welcome__container">
        <h1>Welcome to our store!</h1>
        <router-link to="/groceries">Go to groceries</router-link>
    </div>
</template>

<script>

</script>

<style>
.welcome__container {
    width: 60%;
    margin: 0 auto;
}
h1 {
    font-size: 50px;
    padding-top: 25px;
    margin-bottom: 20px;
}
.welcome__container > a {
    font-style: italic;
    font-size: 20px;
    letter-spacing: 2px;
}
</style>