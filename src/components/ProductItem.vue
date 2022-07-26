<template>
    <div class="item" :id="product.id">
        <div class="item__delete__btn" @click="deleteProduct()">&times;</div>
        <div class="item__img">
            <img :src=product.fileURL :alt=product.name>
        </div>
        <div class="item__info">
            <h3>{{ product.name }}</h3>
            <h4>{{ product.weight }} kg</h4>
            <p class="item__category">{{ product.category }}</p>
            <p class="item__price">
                <span class="dollars">{{ product.price }}</span><span class="currency">$</span>
            </p>
            <div class="item__desc__container">
                <p class="item__desc" v-if="product.description !== ''">{{ product.description }}</p>
                <p class="item__desc empty__desc" v-if="product.description === ''">No description . . .</p>
            </div>
        </div>
        <div class="item__btns">
            <a class="cart-btn" @click="addToCart()">Add to cart</a>
            <a class="buy-btn" @click="buyProduct()">Buy</a>
        </div>
    </div>
</template>

<script>
import CartAlert from '@/components/CartAlert'

import { db, auth, productsStorageRef } from '@/firebase/init';
import { updateDoc, deleteDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';

export default {
    data() {
        return {
            users: [],
            product_name: ''
        }
    },
    components: {
        CartAlert
    },
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

            // Second option => delete all products
            function deleteAllProducts() {
                onSnapshot(collection(db, 'products'), (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        deleteDoc(doc.ref)
                    });
                });
            }

            // Delete particular product image from storage
            const thisProductFileName = this.product.fileName;
            const deleteRef = ref(productsStorageRef, thisProductFileName);
            deleteObject(deleteRef).catch((err) => {
                console.error('Product image error ' + err.message);
            });
            // Delete particular product info
            onSnapshot(doc(db, "products", id), (doc) => {
                deleteDoc(doc.ref).catch((err) => {
                    console.error('Product error ' + err.message);
                });
            });
        },
        buyProduct() {
            const currentUser = auth.currentUser;
            onSnapshot(collection(db, 'users'), (querySnapshot) => {
                this.users = [];
                querySnapshot.forEach((doc) => {
                    const user = {
                        id: doc.id,
                        userId: doc.data().userId,
                        username: doc.data().username,
                        money: doc.data().money
                    }
                    this.users.push(user);
                });
            });
            const currentArrayUser = this.users.find(user => user.userId === currentUser.uid)
                if(currentArrayUser.money >= this.product.price) {
                    let confirmPurchase = 'Are you sure you want to buy this product?';
                    if(confirm(confirmPurchase)) {
                        try {
                            // Function to convert the number
                            function truncate(number, index = 2) {
                                return +number.toString().slice(0, (number.toString().indexOf(".")) + (index + 1));
                            }
                            const userMoney = truncate((currentArrayUser.money - this.product.price), 2);
                            
                            updateDoc(doc(db, 'users', currentArrayUser.id), {
                                money: userMoney
                            });
                        } catch(e) {
                            alert('Something went wrong ...');
                        }
                    } else {
                        return;
                    }
                } else {
                    alert('Not enough money!');
                }
        },
        addToCart() {
            let id = this.product.id;
            if(!$('.cart_alert').hasClass('active_alert')) {
                const currentUser = auth.currentUser;
                onSnapshot(collection(db, 'users'), (querySnapshot) => {
                    this.users = [];
                    querySnapshot.forEach((doc) => {
                        const user = {
                            id: doc.id,
                            cartItems: doc.data().cartItems
                        }
                        this.users.push(user);
                    });
                });
                const currentArrayUser = this.users.find(user => user.userId === currentUser.uid);
                let cartItems = currentArrayUser.cartItems;
                cartItems.push(id);

                console.log(cartItems);

                setDoc(doc(db, 'users', currentArrayUser.id), {
                    money: currentArrayUser.money,
                    userId: currentArrayUser.userId,
                    username: currentArrayUser.username,
                    cartItems: cartItems
                });

                $('.cart_alert').show();
                $('.cart_alert').addClass('active_alert');
                setTimeout(() => {
                    $('.cart_alert').removeClass('active_alert');
                    setTimeout(() => {
                        $('.cart_alert').hide();
                    }, 500);
                }, 3000);
            } else {
                return;
            }
        }
    },
    beforeMount() {
        onSnapshot(collection(db, 'users'), (querySnapshot) => {
            this.users = [];
            querySnapshot.forEach((doc) => {
                const user = {
                    id: doc.id,
                    userId: doc.data().userId,
                    username: doc.data().username,
                    money: doc.data().money,
                    cartItems: doc.data().cartItems
                }
                this.users.push(user);
            });
        });
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
.item__delete__btn {
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
.item__delete__btn:hover {
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
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.377);
    overflow: hidden;
    font-size: 24px;
    font-weight: 500;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: rgb(33, 133, 94);
    margin: 0 !important;
    padding: 10px;
    letter-spacing: 1px;
}
.item__info h4 {
    height: 34px;
    overflow: hidden;
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: rgb(17, 85, 59);
    margin: 0 !important;
    padding: 5px;
    letter-spacing: 1px;
    border-bottom: 1px solid;
    box-shadow: 0 1px 10px 0 rgba(255, 255, 255, 0.534);
}
.item__category {
    margin: 0;
    margin-left: 5px;
    font-size: 13px;
    font-weight: 600;
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
    /* font-style: italic; */
    /* font-size: 22px; */
    font-size: 28px;
    font-weight: 400 !important;
}
.item__desc__container {
    height: 82px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.item__desc {
    width: 100%;
    padding: 10px 15px;
    word-wrap: break-word;
    text-align: center;
}
.empty__desc {
    font-style: italic;
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
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
}
.item__btns .cart-btn {
    background-color: hsla(194, 79%, 50%, 0.655);
}
.item__btns .buy-btn {
    background-color: hsla(150, 79%, 50%, 0.655);
}
.item__btns a:hover {
    transform: scale(1.02);
    color: #fff !important;
}
.item__btns .cart-btn:hover {
    background-color: hsl(194, 79%, 50%);
}
.item__btns .buy-btn:hover {
    background-color: hsl(150, 79%, 50%);
}
</style>