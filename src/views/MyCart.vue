<template>
    <div class="cart__container">
        <h2>My shopping cart</h2>
        <div class="items__container">
            <div class="item">
                <div class="item__name">
                    <p>Potatoes</p>
                </div>
                <div class="item__price">
                    <p>1.65$</p>
                </div>
                <div class="item__btn">
                    <a>Make a purchase</a>
                </div>
                <div class="item__image">
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
.cart__container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.cart__container h2 {
    width: 100%;
    margin-top: 40px;
    font-size: 42px;
    font-style: italic;
    text-align: center;
}
.cart__container .items__container {
    width: 75%;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
}
.item {
    width: 100%;
    height: 150px;
    border-radius: 5px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    border: 1px solid;
    background-image: url('../assets/—Pngtree—gradient\ l\ green\ solid\ triangle_4481122.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgb(255, 255, 255);
}
.item__name {
    width: 15%;
    display: flex;
    align-items: center;
    padding-left: 70px;
}
.item__name p {
    color: #000;
    font-size: 32px;
    font-weight: bold;
}
.item__price {
    width: 35%;
    display: flex;
    padding-left: 150px;
    align-items: center;
}
.item__price p {
    color: #000;
    font-size: 24px;
    font-weight: 500;
    font-style: italic;
}
.item__btn {
    width: 25%;
    display: flex;
    align-items: center;
}
.item__btn a {
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 22px;
    transition: ease all .3s;
    cursor: pointer;
    background-color: #56b763;
}
.item__btn a:hover {
    transform: scale(1.02);
}
.item__image {
    width: 25%;
}
.item__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.cart__container .items__container .item .item__image img {
    cursor: default;
}
</style>