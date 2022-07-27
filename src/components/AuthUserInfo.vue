<template>
    <!-- <MyCart :authUser="authUser"/> -->
    <div class="user__info"></div>
</template>

<script>
import MyCart from '@/views/MyCart'
export default {
    props: ['authUser'],
    components: {
        MyCart
    }
}
</script>

<style>
.user__info {
    display: none;
}
</style>