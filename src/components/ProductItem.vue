<template>
    <div class="item" :id="product.id">
        <div class="item__close-btn" @click="deleteProduct()">&times;</div>
        <div class="item__img">
            <img src="@/assets/products/tomatoes-1296x728-feature.jpg" alt="">
            <!-- <a :href="file.url">{{ product. }}</a> -->
        </div>
        <div class="item__info">
            <h3>{{ product.name }}, {{ product.weight }} kg</h3>
            <p class="item__category">{{ product.category }}</p>
            <p class="item__price">
                <!-- <span class="dollars">2</span><sup>64</sup><span class="currency">$</span> -->
                <span class="dollars">{{ product.price }}</span><span class="currency">$</span>
            </p>
            <p class="item__desc">{{ product.description }}</p>
        </div>
        <div class="item__btns">
            <a href="" class="cart-btn">Add to cart</a>
            <a href="" class="buy-btn">Buy</a>
        </div>
    </div>
</template>

<script>
import { storage } from '@/firebase/init'
import { updateDoc, getDocs, deleteDoc, collection, doc, deleteField } from 'firebase/firestore'

export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteProduct() {
            // Clicked product id
            let id = this.product.id;

            // Works, but there is another way to do this.
            const productRef = doc(storage, 'products', id);
            updateDoc(productRef, {
                id: deleteField(),
                date: deleteField(),
                name: deleteField(),
                category: deleteField(),
                price: deleteField(),
                weight: deleteField(),
                description: deleteField()
            })
            .then(function() {
                console.log('Successful!');
            }).catch(function(e) {
                console.error('Error: ' + e.message);
            });

            // Check if element is empty
            ...

            // Second option (delete all products)
            
        }
    }
}
</script>

<style>
.item {
    width: 350px;
    height: auto;
    margin: 30px 0;
    border: 2px solid #88f3bd;
    box-shadow: 0 0 25px 0 #88f3be7c;
    border-radius: 4px;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
.item__close-btn {
    width: 40px;
    height: 40px;
    font-size: 28px;
    z-index: 9;

    background-color: #be5959;
    border: 1px solid #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -2px;
    right: -2px;

    cursor: pointer;
    transition: all .3s;
}
.item__close-btn:hover {
    background-color: #ff6565;
}
.item__img {
    width: 100%;
    height: 200px;
    border-bottom: 1px solid;
    overflow: hidden;
}
.item__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* cursor: pointer; */
    transition: all .5s;
}
.item:hover > .item__img > img {
    transform: scale(1.08);
}
.item__info {
    width: 100%;
    min-height: 165.3px;
    height: auto;
}
.item__info h3 {
    font-size: 24px;
    font-weight: 500;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: rgb(33, 133, 94);
    margin: 0 !important;
    padding: 10px;
    letter-spacing: 1px;
}
.item__category {
    margin: 0;
    margin-left: 5px;
    font-size: 13px;
    color: #aaaaaa;
    text-align: left;
}
.item__price {
    font-size: 26px;
    font-weight: bold;
}
.item__price .dollars {
    margin-right: 1.5px;
}
.item__price sup {
    font-style: italic;
}
.item__price .currency {
    margin-left: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-style: italic;
    font-size: 22px;
    font-weight: 400 !important;
}
.item__desc {
    height: 82px;
    overflow: hidden;
    word-wrap: break-word;
    padding: 10px 15px;
    text-align: center;
}
.item__btns {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin: 15px 0;
}
.item__btns a {
    transition: all .4s;
    width: 40%;
    font-size: 18px;
    padding: 7px;
    border-radius: 5px;
    opacity: 0.8;
}
.item__btns .cart-btn {
    background-color: #1cb5e4;
}
.item__btns .buy-btn {
    background-color: #1ce480;
}
.item__btns a:hover {
    transform: scale(1.02);
    opacity: 1;
}
</style>