<template>
    <h2>Product list</h2>
    <button class="add-product" @click="show =! show">Add product</button>
    <AddProduct
        v-if="show"
    />
    <p v-else></p>
    <div class="items__container">
        <Loader v-if="loading"/>
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

import { storage } from '@/firebase/init'
import { collection, onSnapshot } from "firebase/firestore"; 

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
        Loader,
        ProductItem
    },
    methods: {
        getProducts: async function() {

            // const productsCollectionRef = await getDocs(collection(storage, 'products'));

            onSnapshot(collection(storage, 'products'), (querySnapshot) => {
                this.products = [];
                querySnapshot.forEach((doc) => {
                    const product = {
                        id: doc.id,
                        name: doc.data().name,
                        category: doc.data().category,
                        price: doc.data().price,
                        weight: doc.data().weight,
                        description: doc.data().description
                    }
                    this.products.push(product);
                    this.loading = false;
                });
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
</style>