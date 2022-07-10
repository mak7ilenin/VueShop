<template>
    <div class="item">
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
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>