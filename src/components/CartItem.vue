<template>
    <div class="choose__alert" v-if="methodWindow">
        <div class="close__choose__alert" @click="closeChooseAlert()">&times;</div>
        <p>Choose the buy method:</p>
        <div class="methods__container">
            <a @click="buyMultipleProductsBtn()">Buy {{ thisCart.quantity }} pieces <span>({{ truncate((thisCart.price * thisCart.quantity), 2) }})$</span></a>
            <a @click="buyOneProductBtn()">Buy one piece <span>({{ thisCart.price }}$)</span></a>
        </div>
    </div>
    <div class="delete_alert" v-if="removeWindow">
        <div class="close__choose__alert" @click="closeRemoveAlert()">&times;</div>
        <p>Choose the remove method</p>
        <!-- <input type="number" min="1"> -->
        <div class="buttons_container">
            <a @click="deleteAllCarts()">
                Remove all
            </a>
            <a @click="deleteOneCart()">
                Remove one
            </a>
        </div>
    </div>
    <div class="cart">
        <div class="delete__cart" @click="deleteFromCart()">
            <p>&times;</p>
        </div>
        <div class="cart__decoration1"></div>
        <div class="cart__decoration2"></div>

        <div class="cart__name">
            <p>{{ cartItem.name }}</p>
        </div>
        <div class="cart__price">
            <div>
                <p>{{ cartItem.price }}$</p>
            </div>
            <p class="cart__final__sum" v-if="multipleProduct !== null">Final sum: {{ multipleProduct }}$</p>
        </div>
        <div class="cart__btn">
            <p>Количество: {{ cartItem.quantity }}</p>
            <a @click="buyFromCart()">To pay</a>
        </div>
        <div class="cart__image">
            <img :src="cartItem.fileURL" :alt="cartItem.name">
        </div>
    </div>
</template>

<script>
import { db } from '@/firebase/init';
import { updateDoc, doc } from 'firebase/firestore';
export default {
    data() {
        return {
            multipleProduct: null,
            methodWindow: false,
            removeWindow: false,
            thisCart: null,
            buyOne: false,
            buyMany: false,
            deleteOne: false,
            deleteMany: false
        }
    },
    props: {
        cartItem: {
            type: Object,
            required: true
        },
        authUser: {
            type: Object
        }
    },
    methods: {
        truncate(number, index = 2) {
            return +number.toString().slice(0, (number.toString().indexOf(".")) + (index + 1));
        },
        buyMultipleProductsBtn() {
            this.buyMany = true;
            this.buyFromCart();
            this.buyMany = false;
        },
        buyOneProductBtn() {
            this.buyOne = true;
            this.buyFromCart();
            this.buyOne = false;
        },
        deleteAllCarts() {
            this.deleteMany = true;
            this.deleteFromCart();
            this.deleteMany = false;
        },
        deleteOneCart() {
            this.deleteOne = true;
            this.deleteFromCart();
            this.deleteOne = false;
        },
        buyFromCart() {
            this.thisCart = this.cartItem;

            if(this.authUser.money >= this.cartItem.price) {
                this.methodWindow = true;
                $('.non-active-screen').css('display', 'unset');

                if(this.buyOne) {
                    var buyAlert = confirm('Are you sure you want to buy this *' + this.cartItem.name + '* ?');
                    var moneyAfterPurchase = this.authUser.money - this.cartItem.price;
                }
                if(this.buyMany) {
                    var buyAlert = confirm('Are you sure you want to buy this *' + this.cartItem.name + '(' + this.cartItem.quantity + ' pieces)' + '* ?');
                    var moneyAfterPurchase = this.authUser.money - (this.cartItem.price * this.cartItem.quantity);
                }
                if(!this.buyOne && !this.buyMany) {
                    return;
                }

                updateUserMoney(buyAlert, moneyAfterPurchase, this.authUser, this.buyMany, this.buyOne, this.cartItem, this.methodWindow);
                function updateUserMoney(buyAlert, moneyAfterPurchase, thisUser, buyMany, buyOne, thisCart, methodWindow) {
                    if(buyAlert == true && moneyAfterPurchase !== thisUser.money) {
                        const thisUserId = thisUser.id;

                        // Function to convert the number
                        function truncate(number, index = 2) {
                            return +number.toString().slice(0, (number.toString().indexOf(".")) + (index + 1));
                        }
                        const userMoney = truncate(moneyAfterPurchase, 2);

                        // Change quantity
                        if(buyOne) {
                            thisCart.quantity -= 1;
                        }
                        if(buyMany) {
                            thisCart.quantity = 0;
                            methodWindow = false;
                        }

                        // Delete cart from list if quantity is zero
                        if(thisCart.quantity === 0) {
                            let thisCartIndex = thisUser.cartItems.indexOf(cart => cart.id === thisCart.id);
                            thisUser.cartItems.splice(thisCartIndex, 1);
                        }
                        
                        // Edit database data
                        updateDoc(doc(db, 'users', thisUserId), {
                            money: userMoney,
                            cartItems: thisUser.cartItems
                        }).then(() => {
                            methodWindow = false;
                            $('.non-active-screen').removeAttr('style');
    
                            $('.purchase__alert').show();
                            $('.purchase__alert').addClass('active-purchase');
                            setTimeout(() => {
                                $('.purchase__alert').removeClass('active-purchase');
                                setTimeout(() => {
                                    $('.purchase__alert').hide();
                                }, 500)
                            }, 4500);
                        })
                    } else {
                        methodWindow = false;
                        $('.non-active-screen').removeAttr('style');
                        return;
                    }
                }
            } else {
                $('.no-money-alert').css('display', 'flex');
                $('.no-money-alert').addClass('active-no-money-alert');
                setTimeout(() => {
                    $('.no-money-alert').removeClass('active-no-money-alert');
                    setTimeout(() => {
                        $('.no-money-alert').removeAttr('style');
                    }, 500)
                }, 4500);
            }
        },
        deleteFromCart() {
            this.removeWindow = true;
            const thisCartIndex = this.authUser.cartItems.findIndex(cart => cart.id == this.cartItem.id);
            
            $('.non-active-screen').css('display', 'unset');
            if(this.deleteOne) {
                this.cartItem.quantity -= 1;  
                if(this.cartItem.quantity === 0) {
                    this.authUser.cartItems.splice(thisCartIndex, 1);
                    console.log(this.authUser.cartItem);
                }
                updateDoc(doc(db, 'users', this.authUser.id), {
                    cartItems: this.authUser.cartItems
                });
                this.removeWindow = false;
                $('.non-active-screen').removeAttr('style');
            }
            if(this.deleteMany) {
                this.authUser.cartItems.splice(thisCartIndex, 1);
                updateDoc(doc(db, 'users', this.authUser.id), {
                    cartItems: this.authUser.cartItems
                });
                this.removeWindow = false;
                $('.non-active-screen').removeAttr('style');
            }
        },
        closeChooseAlert() {
            $('.non-active-screen').removeAttr('style');
            this.methodWindow = false;
        },
        closeRemoveAlert() {
            $('.non-active-screen').removeAttr('style');
            this.removeWindow = false;
        }
    },
    created: async function() {   
        $('.delete__cart').mouseover(function() {
            $(this).parent().css({boxShadow: '0 0 20px 0 rgb(255, 55, 55)', borderColor: 'rgb(255, 0, 0)'});
        });
        $('.delete__cart').mouseout(function() {
            $(this).parent().removeAttr('style');
        });
    },
    beforeMount() {
        if(this.cartItem.quantity > 1) {
            this.multipleProduct = this.truncate((this.cartItem.price * this.cartItem.quantity), 2);
        } 
        if(this.cartItem.quantity === 0) {
            let thisCartIndex = this.authUser.cartItems.indexOf(cart => cart.id === thisCart.id);
            this.authUser.cartItems.splice(thisCartIndex, 1);
            updateDoc(doc(db, 'users', this.authUser.id), {
                cartItems: this.authUser.cartItems
            });
        }
    }
}
</script>

<style>
.choose__alert {
    width: 550px;
    height: 200px;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    background-color: #fff;
    border-radius: 5px;
    /* box-shadow: 0 0 999px 0 #000; */

    position: fixed;
    left: calc((50vw - 50%) * -1);
    top: calc((50vh - 50%) * -1);
    transform: translate(calc(50vw - 50%), calc(50vh - 50%));
    z-index: 25;
}
.close__choose__alert {
    width: 35px; 
    height: 35px;

    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgb(255, 118, 118);
    font-size: 30px;
    cursor: pointer;
}
.choose__alert p {
    width: 100%;
    color: #000;
    font-size: 30px;
}
.methods__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 15px;
}
.methods__container a {
    width: 35%;
    height: 72px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    text-align: center;
    color: #000 !important;
    font-weight: bold;

    padding: 12px 10px;
    border-radius: 5px;

    cursor: pointer;
    transition: ease all .3s;
}
.methods__container a:nth-child(1) {
    background-color: #4ed4fd;
}
.methods__container a:nth-child(2) {
    background-color: #55ff7f;
}
.methods__container a span {
    width: 100%;
}
.methods__container a:hover {
    transform: scaleX(1.02)
}


.cart {
    width: 100%;
    height: 115px;
    margin: 20px;
    box-shadow: 0 0 10px 0 rgb(118, 255, 55);
    border-radius: 5px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
    border: 1px solid;
    background-color: rgb(255, 255, 255);
    transition: ease all .3s;
    overflow: hidden;
}
.cart:hover {
    /* transform: scaleY(1.04); */
    box-shadow: 0 0 20px 0 rgb(118, 255, 55);
}
.delete__cart {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 32px;
    background-color: rgb(255, 0, 0);
    box-shadow: 0 0 5px 0 #000;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
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
    justify-content: center;
    align-items: center;
    /* padding-left: 70px; */
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
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
}
.cart__price div {
    width: 100%;
}
.cart__price p {
    color: #000;
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
}
.cart__final__sum {
    font-size: 16px !important;
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
    margin-bottom: 3px;
    color: #000;
    font-size: 20px;
    font-weight: bold;
}
.cart__btn a {
    width: 80%;
    height: 45px;
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
    height: 100%;
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

.delete_alert {
    width: 450px;
    height: 150px;
    display: flex;
    /* align-items: center; */
    flex-wrap: wrap;
    justify-content: center;
    background-color: #90eeb9;
    border-radius: 5px;
    padding: 20px 15px;
    z-index: 25;
    position: fixed;
    left: calc((50vw - 50%) * -1);
    top: calc((50vh - 50%) * -1);
    transform: translate(calc(50vw - 50%), calc(50vh - 50%));
}
.delete_alert p {
    color: #000;
    font-size: 24px;
    font-weight: 700;
}
.delete_alert input {
    height: 40px;
    border-color: #a8a8a8;
    border-radius: 5px;
}
.buttons_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.buttons_container a {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    background-color: #000;
    margin: 0 20px;
}
</style>