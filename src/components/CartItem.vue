<template>
    <div class="cart">
        <div class="cart__decoration1"></div>
        <div class="cart__decoration2"></div>

        <div class="cart__name">
            <p>{{ cartItem.name }}</p>
        </div>
        <div class="cart__price">
            <p>{{ cartItem.price }}$</p>
        </div>
        <div class="cart__btn">
            <p>Количество: {{ cartItem.quantity }}</p>
            <a>To pay </a>
        </div>
        <div class="cart__image">
            <img :src="cartItem.fileURL" :alt="cartItem.name">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cartItem: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.cart {
    width: 100%;
    height: 150px;
    margin: 20px;
    box-shadow: 0 0 10px 0 rgb(118, 255, 55);
    border-radius: 5px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
    border: 1px solid;
    background-color: rgb(255, 255, 255);
    overflow: hidden;
}
.cart__decoration1 {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;

    width: 0;
    height: 0;
    border-bottom: 400px solid #ff0000;
    border-right: 570px solid transparent;
    border-image-source: linear-gradient(to left, #00C853, #B2FF59);
    /* transform: rotate(40deg) scale(1.1) translateX(-50%); */
}
.cart__decoration2 {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;

    width: 0;
    height: 0;
    border-bottom: 750px solid rgb(224, 224, 224);
    border-left: 730px solid transparent;
}
.cart__name {
    width: 42%;
    display: flex;
    align-items: center;
    padding-left: 70px;
    z-index: 1;
}
.cart__name p {
    color: #000;
    letter-spacing: 1px;
    font-size: 26px;
    font-weight: bold;
}
.cart__price {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.cart__price p {
    color: #000;
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
}
.cart__btn {
    width: 21%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    z-index: 1;
}
.cart__btn p {
    width: 80%;
    color: #000;
    font-size: 20px;
    font-weight: bold;
}
.cart__btn a {
    width: 80%;
    height: 50px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20%;
    padding: 15px 25px;
    font-size: 20px;
    transition: ease all .3s;
    cursor: pointer;
    background-color: #56b763;
    /* background: linear-gradient(to left, #a8a8a8, #6da752);; */
}
.cart__btn a:hover {
    transform: scale(1.02);
    border-radius: 50%;
}
.cart__image {
    width: 22%;
    z-index: 1;
}
.cart__image img {
    width: 100%;
    height: 100%;
    border-radius: 0 0 0 100px;
    object-fit: cover;
}
.cart__container .carts__container .cart .cart__image img {
    cursor: default;
}
</style>