<template>
    <h2 class="add-product-heading">Product adding</h2>
    <div class="form-group">
        <h3>New product</h3>
        <form class="add-product" @submit.prevent="addProduct">
            <label for="product-name">Name</label>
            <input type="text" class="form-control" id="product-name" placeholder="Enter product name">

            <label for="product-category">Category</label>
            <select class="form-control" id="product-category">
                <option>Choose category...</option>
                <option>Food</option>
                <option>Clothes</option>
                <option>Home and garden</option>
                <option>Books</option>
                <option>Video games</option>
            </select>

            <label for="product-price">Price</label>
            <input type="number" class="form-control" id="product-price" placeholder="Enter product price" min="0.01" step=".01">

            <label for="product-weight">Weight</label>
            <input type="number" class="form-control" id="product-weight" placeholder="Enter product weight" min="0.01" step=".01">

            <label for="product-description">Description</label>
            <textarea class="form-control" id="product-description" rows="3" placeholder="Enter product description"></textarea>

            <!-- <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile">Choose file</label>
            </div> -->

            <div class="submit-button">
                <button type="submit" class="btn btn-primary mb-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.form-group {
    width: 50%;
    height: 680px;
    margin: 0 auto;
    margin-top: 35px;
    background-color: #f5f5f5;
    box-shadow: 0 0 30px 1px #7b92af;
    border-radius: 5px;
}
.add-product-heading {
    font-size: 48px;
    padding-top: 20px;
    font-style: italic;
    letter-spacing: 2px;
}
.form-group h3 {
    color: #000;
    font-weight: bold;
    padding-top: 25px;
}
.add-product {
    width: 100%;
}
.add-product label {
    width: 65%;
    margin-top: 15px;
    margin-bottom: 3px;
    color: #000;
    font-weight: bold;
    font-style: italic;
    font-size: 17px;
    text-align: left;
}
.add-product label:nth-child(1) {
    margin-top: 25px;
}
.add-product input, .add-product textarea, .add-product select {
    width: 70%;
    margin: 0 auto;
}
.custom-file {
    width: 70%;
    margin: 5px auto;
    margin-bottom: 20px;
}
.custom-file input, .custom-file label{
    width: 100%;
}
.custom-file-label, .custom-file-input{
    cursor: pointer;
}
.submit-button {
    width: 70%;
    margin: 20px auto;
}
.submit-button button {
    width: 100%;
}
</style>