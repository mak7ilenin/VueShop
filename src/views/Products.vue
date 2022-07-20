<template>
    <h2>Product list</h2>
    <button class="add-product" @click="show = !show">Add product</button>
    <AddProduct
        v-if="show"
    />
    <p v-else></p>
    <div class="loader__container">
        <Loader v-if="loading"/>
    </div>
    <div class="products_check" v-if="!products_check">
        There are no products available ...
    </div>
    <div class="items__container">
        <ProductList
            v-bind:products="products"
        />
    </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import AddProduct from '@/components/AddProduct'
import Loader from '@/components/Loader'
import ProductItem from '@/components/ProductItem'

import { db } from '@/firebase/init'
import { collection, onSnapshot } from "firebase/firestore"; 

export default {
    data() {
        return {
            products: [],
            show: false,
            loading: true,
            products_check: true
        }
    },
    components: {
        ProductList,
        AddProduct,
        Loader,
        ProductItem
    },
    methods: {
        getProducts: async function() {
            onSnapshot(collection(db, 'products'), (querySnapshot) => {
                this.products = [];
                querySnapshot.forEach((doc) => {
                    const product = {
                        id: doc.id,
                        name: doc.data().name,
                        category: doc.data().category,
                        price: doc.data().price,
                        weight: doc.data().weight,
                        description: doc.data().description,
                        fileURL: doc.data().fileURL
                    }
                    this.products.push(product);
                });
                this.loading = false;
                $('.loader__container').hide();
                if(this.products.length === 0) {
                    this.products_check = false;
                } else {
                    this.products_check = true;
                    $('.items__container').addClass('animateItem')
                }
            });
        }
    },
    beforeMount() {
        this.getProducts();
    }
}
</script>

<style>
.add-product {
    width: 300px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: white;            

    margin: 30px auto;
    margin-bottom: 0;
    padding: 15px 45px;

    background-image: linear-gradient(to right, #1D976C 0%, #1f5734  51%, #1D976C  100%);
    background-size: 200% auto;
    box-shadow: 0 0 5px rgb(31, 255, 113);
    border-radius: 10px; 
    transition: ease all 0.4s;
}
.add-product:hover {
    background-position: right center; /* change the direction of the change here */
    text-decoration: none;
}
h2 {
    font-size: 48px;
    letter-spacing: 2px;
    font-style: italic;
    padding-top: 35px;
}
.loader__container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}
.items__container {
    width: 85%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 50px auto;
    margin-top: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
    transition: ease all 1s;

    position: relative;
    opacity: 0;
    top: 50px;
}
.animateItem {
    top: 0px !important;
    opacity: 1 !important;
}
.products_check {
    margin-top: 50px;
    font-size: 36px;
    color: #fff;
    animation: pulse 2s infinite;
    transition: all 1s;
}
@keyframes pulse {
    0% {
        transform: scale(0.9);
        color: #fff;
    }
    70% {
        transform: scale(1);
        color: rgb(178, 255, 159);
    }
    100% {
        transform: scale(0.9);
        color: #fff;
    }
}
</style>