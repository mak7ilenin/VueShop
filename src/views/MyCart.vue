<template>
    <div class="cart__page">
        <h2>My shopping cart</h2>
        <div class="carts__container">
            <div class="cart">
                <div class="cart__decoration1"></div>
                <div class="cart__decoration2"></div>
                <div class="cart__name">
                    <p>Potatoes</p>
                </div>
                <div class="cart__price">
                    <p>1.65$</p>
                </div>
                <div class="cart__btn">
                    <p>Количество: </p>
                    <a>Make a purchase</a>
                </div>
                <div class="cart__image">
                    <img src="https://firebasestorage.googleapis.com/v0/b/web-shop-c2757.appspot.com/o/products%2FiC7HBvohbJqExqvbKcV3pP.jpg?alt=media&token=31c89c4a-7a5f-4502-8feb-4c7abb34bab0" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.cart__page {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.cart__page h2 {
    width: 100%;
    margin-top: 40px;
    font-size: 42px;
    font-style: italic;
    text-align: center;
}
.carts__container {
    width: 75%;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
}
.cart {
    width: 100%;
    height: 150px;
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
    width: 15%;
    display: flex;
    align-items: center;
    padding-left: 70px;
    z-index: 1;
}
.cart__name p {
    color: #000;
    letter-spacing: 2px;
    font-size: 32px;
    font-weight: bold;
}
.cart__price {
    width: 35%;
    display: flex;
    padding-left: 150px;
    align-items: center;
    z-index: 1;
}
.cart__price p {
    color: #000;
    font-size: 24px;
    font-weight: 500;
    font-style: italic;
}
.cart__btn {
    width: 25%;
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
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-style: italic;
    /* padding: 10px 15px; */
    border-radius: 20%;
    padding: 15px 25px;
    font-size: 22px;
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
    width: 25%;
    z-index: 1;
}
.cart__image img {
    width: 100%;
    height: 100%;
    border-radius: 0 0px 0px 100px;
    object-fit: cover;
}
.cart__container .carts__container .cart .cart__image img {
    cursor: default;
}
</style>