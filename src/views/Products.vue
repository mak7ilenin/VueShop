<template>
    <h2>Product list</h2>
    <button class="add-product" @click="show =! show">Add product</button>
    <AddProduct
        v-if="show"
    />
    <p v-else></p>
    <div class="items__container">
        <Loader v-if="loading"/>
        <!-- <div class="item">
            <div class="item__img">
                <img src="@/assets/products/tomatoes-1296x728-feature.jpg" alt="">
            </div>
            <div class="item__info">
                <h3>Tomatoes, 1kg</h3>
                <p class="item__category">Food</p>
                <p class="item__price">
                    <span class="dollars">2.64</span><span class="currency">$</span>
                </p>
                <p class="item__desc">
                    Lorem ipsum dolor, sit amet consecte
                    hic cumque.Lorem ipsum dolor, sit amet consecte
                    Lorem ipsum dolor, sit amet consecte
                    Lorem ipsum dolor, sit amet consecte
                    Lorem ipsum dolor, sit amet consecte
                    Lorem ipsum dolor, sit amet consecte
                </p>
            </div>
            <div class="item__btns">
                <a href="" class="cart-btn">Add to cart</a>
                <a href="" class="buy-btn">Buy</a>
            </div>
        </div> -->
        <ProductList
            v-bind:products="products"
        />
    </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import AddProduct from '@/components/AddProduct'
import Loader from '@/components/Loader'

import { storage } from '@/firebase/init'
import { collection, getDocs, onSnapshot } from "firebase/firestore"; 

export default {
    data() {
        return {
            products: [],
            show: false,
            loading: true
        }
    },
    components: {
        ProductList,
        AddProduct,
        Loader
    },
    methods: {
        getProducts: async function() {

            const productsCollectionRef = await getDocs(collection(storage, "products"));

            onSnapshot(collection(storage, 'products'), (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const product = {
                        id: doc.id,
                        name: doc.data().name,
                        category: doc.data().category,
                        price: doc.data().price,
                        weight: doc.data().weight,
                        description: doc.data().description,
                    }
                    this.products.push(product)
                    this.loading = false
                })
            });
        }
    },
    beforeMount() {
        this.getProducts()
    }
}
</script>

<style>
.add-product {
    width: 300px;
    border: none;
    border-radius: 5px;
    padding: 2px 15px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
}
h2 {
    font-size: 48px;
    letter-spacing: 2px;
    font-style: italic;
    padding-top: 35px;
}
.items__container {
    width: 85%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 50px auto;
    margin-top: 90px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
}
.item {
    width: 350px;
    height: auto;
    margin: 30px 0;
    border: 2px solid #88f3bd;
    box-shadow: 0 0 25px 0 #88f3be7c;
    border-radius: 4px;
    /* display: flex; */
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
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