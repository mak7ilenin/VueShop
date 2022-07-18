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
            <a class="cart-btn">Add to cart</a>
            <a class="buy-btn" @click="buyProduct()">Buy</a>
        </div>
    </div>
</template>

<script>
import { storage, auth } from '@/firebase/init'
import { updateDoc, deleteDoc, collection, doc, deleteField, onSnapshot } from 'firebase/firestore'

export default {
    data() {
        return {
            users: []
        }
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

            // Works, but there is another way to do this.

            function clearAllFields() {
                const productRef = doc(storage, 'products', id);
                updateDoc(productRef, {
                    id: deleteField(),
                    date: deleteField(),
                    name: deleteField(),
                    category: deleteField(),
                    price: deleteField(),
                    weight: deleteField(),
                    description: deleteField()
                });
            }


            // Second option => delete all products

            function deleteAllProducts() {
                onSnapshot(collection(storage, 'products'), (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        deleteDoc(doc.ref)
                    });
                });
            }


            // Delete particular product

            onSnapshot(doc(storage, "products", id), (doc) => {
                deleteDoc(doc.ref);
            });
        },
        buyProduct() {
            const currentUser = auth.currentUser;
            onSnapshot(collection(storage, 'users'), (querySnapshot) => {
                this.users = [];
                querySnapshot.forEach((doc) => {
                    var user = {
                        id: doc.id,
                        userId: doc.data().userId,
                        username: doc.data().username,
                        money: doc.data().money
                    }
                    this.users.push(user);
                });
                // function getUser(user) {
                //     return user.userId === currentUser.uid;
                // }

                // const currentArrayUser = this.users.find(getUser);

                // if(currentArrayUser.userId === currentUser.uid) {
                //     console.log(currentArrayUser.money);
                //     console.log(this.product.price);
                //     if(currentArrayUser.money >= this.product.price) {
                //         var userMoney = currentArrayUser.money - this.product.price;
                //         updateDoc(doc(storage, 'users', currentArrayUser.id), {
                //             money: userMoney
                //         });
                //     }else {
                //         alert('Not enough money!');
                //     }
                // }else {
                //     alert('Something went wrong!');
                // }
            })
            try {
                function getUser(user) {
                    return user.userId === currentUser.uid;
                }
    
                const currentArrayUser = this.users.find(getUser);
    
                if(currentArrayUser.userId === currentUser.uid) {
                    console.log(currentArrayUser.money);
                    console.log(this.product.price);
                    if(currentArrayUser.money >= this.product.price) {
                        var userMoney = currentArrayUser.money - this.product.price;
                        updateDoc(doc(storage, 'users', currentArrayUser.id), {
                            money: userMoney
                        });
                    } else {
                        alert('Not enough money!');
                    }
                } else {
                    alert('Something went wrong!');
                }
            } catch(e) {
                alert(e.message);
            }
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