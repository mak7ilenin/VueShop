<template>
    <div id="cartAlert" class="cart_alert">
        <span>This product has been successfully added to cart</span>
    </div>
</template>

<script>
export default {
    props: {
        product_name: ''
    }
}
</script>

<style>
.cart_alert {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;

    width: 100%;
    height: 85px;
    opacity: 0;
    background-color: rgba(199, 199, 199, 0.837);

    display: flex;
    align-items: center;
    justify-content: center;

    color: #000;
    font-size: 26px;
    font-weight: 900;

    transform: translateY(-70%);
    z-index: 10;
    transition: ease all 0.5s;
    transition-timing-function: cubic-bezier(.46,-0.71,.47,.79);
    /* transition-timing-function: cubic-bezier(0.46,-0.71, 0.35, 1.71); */
}
.cart_alert span {
    font-family: 'Albert Sans', sans-serif;
    font-style: italic;
    padding-left: 8px;
    color: #000000;
    font-size: 28px;
    font-weight: 600;
}
.active_alert {
    opacity: 1;
    transform: translateY(0%);
}
</style>