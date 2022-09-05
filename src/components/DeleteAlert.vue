<template>
    <div class="delete_alert">
        <p>Choose the remove method</p>
        <input type="number" min="1">
        <div class="buttons_container">
            <div>
                Remove all
            </div>
            <div>
                Remove
            </div>
        </div>
    </div>
</template>

<style>     
.delete_alert {
    width: 450px;
    height: 200px;
    display: flex;
    /* align-items: center; */
    flex-wrap: wrap;
    justify-content: center;
    background-color: #90eeb9;
    border-radius: 5px;
    padding: 20px 15px;
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
.buttons_container div {
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