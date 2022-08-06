<template>
    <div class="no-money-alert">
        <p>Not enough money to buy this product!</p>
    </div>
</template>

<style>
.no-money-alert {
    width: 450px;
    height: 200px;

    position: fixed;
    left: calc((50vw - 50%) * -1);
    top: calc((50vh - 50%) * -1);
    transform: translate(calc(50vw - 50%), calc(50vh - 50%));
    z-index: 25;

    background-color: #fff;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
}
.no-money-alert p {
    color: #000;
    font-size: 26px;
}
</style>