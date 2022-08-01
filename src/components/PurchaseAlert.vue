<template>
    <div class="purchase__alert">
        <p>Purchase completed successfully!</p>
    </div>
</template>

<style>
.purchase__alert {
    width: 500px;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 100px;
    right: 0;

    background-color: rgba(9, 255, 0, 0.9);
    border-radius: 2px;

    transform: translateY(-100%);
    z-index: 10;
    opacity: 0;
    transition: ease all .5s;
    /* transition-timing-function: cubic-bezier(.46,-0.71,.47,.79); */
}
.active-purchase {
    transform: translateY(0%);
    opacity: 1;
}
.purchase__alert p {
    font-size: 24px;
    color: #000;
    font-weight: 500;
    font-family: 'Albert Sans', sans-serif;
}
</style>