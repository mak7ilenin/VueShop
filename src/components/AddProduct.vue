<template>
    <div class="form-group" id="productForm">
        <div class="close-form" @click="closeForm">&times;</div>
        <h3>New product</h3>
        <form class="add-product-form" @submit.prevent="sendProduct">
            <label for="product-name">Name</label>
            <input type="text" class="form-control" id="product-name" placeholder="Enter product name" v-model="name">

            <label for="product-category">Category</label>
            <select class="form-control" v-model="category" id="product-category">
                <option value="none">Choose category...</option>
                <option value="Food">Food</option>
                <option value="Clothes">Clothes</option>
                <option value="Home and garden">Home and garden</option>
                <option value="Books">Books</option>
                <option value="Video games">Video games</option>
            </select>

            <label for="product-price">Price</label>
            <input type="number" class="form-control" id="product-price" placeholder="Enter product price" min="0.01" step=".01" v-model="price">

            <label for="product-weight">Weight</label>
            <input type="number" class="form-control" id="product-weight" placeholder="Enter product weight" min="0.01" step=".01" v-model="weight">

            <label for="product-description">Description</label>
            <textarea class="form-control" id="product-description" rows="3" placeholder="Enter product description" v-model="description"></textarea>

            <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" @change="selectFile">
                <label class="custom-file-label" for="customFile" id="fileName">{{ fileName }}</label>
            </div>

            <div class="submit-button">
                <button type="submit" class="btn btn-primary mb-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { db, productsStorageRef } from '@/firebase/init';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from "firebase/firestore";

export default {
    data() {
        return {
            // Product info
            name: '',
            category: 'none',
            price: '',
            weight: '',
            description: '',
            
            // File
            fileData: null,
            fileName: 'Choose file',
            fileURL: ''
        }
    },
    methods: {
        sendProduct() {
            if(this.name.trim() || this.category.trim() || this.price !== 0 || this.weight !== 0) {     
                
                const productName = this.name;
                const productCategory = this.category;
                const productPrice = this.price;
                const productWeight = this.weight;
                const productDescription = this.description;

                // Push file to storage
                const storageRef = ref(productsStorageRef, this.fileName);
                const dateString = new Date();
                uploadBytes(storageRef, this.fileData)
                    .then(() => {
                        getDownloadURL(storageRef, this.fileName)
                            .then((url) => {
                                this.fileURL = url;
                                if(this.fileURL !== '') {
                                    const currentDateTime = 
                                        dateString.getFullYear() 
                                        + '/' + ((dateString.getDate()).toString().length === 1 ? + '0' : '') + dateString.getDate()
                                        + '/' + ((dateString.getMonth()).toString().length === 1 ? + '0' : '') + dateString.getMonth()
                                        + ' ' + ((dateString.getHours()).toString().length === 1 ? + '0' : '') + dateString.getHours()
                                        + ':' + ((dateString.getMinutes()).toString().length === 1 ? + '0' : '') + dateString.getMinutes()
                                        + ':' + dateString.getSeconds();
                                    addDoc(collection(db, 'products'), {
                                        date: currentDateTime,
                                        name: productName,
                                        category: productCategory,
                                        price: productPrice,
                                        weight: productWeight,
                                        description: productDescription,
                                        fileURL: this.fileURL
                                    });            
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    });

                // Clears all fields
                this.name = '';
                this.category = 'none';
                this.price = '';
                this.weight = '';
                this.description = '';
                this.fileName = 'Choose file';
            }
        },
        selectFile(event) {
            this.fileName = event.target.files[0].name;
            this.fileData = event.target.files[0];
        },
        closeForm() {
            $('#productForm').hide();
            this.show = false;
        },
    }
};
</script>

<style>
#productForm {
    position: fixed;
    top: 150px;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, 0)
}
.close-form {
    height: 40px;
    width: 40px;
    background-color: #ff0000;
    position: absolute;
    right: 0;
    font-size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.form-group {
    width: 50%;
    height: 680px;
    margin: 0 auto;
    margin-top: 35px;
    background-color: #f5f5f5;
    box-shadow: 0 0 30px 1px #7b92af;
    border-radius: 5px;
}
.form-group h3 {
    color: #000;
    font-weight: bold;
    padding-top: 25px;
}
.add-product-form {
    width: 100%;
}
.add-product-form label {
    width: 65%;
    margin-top: 15px;
    margin-bottom: 3px;
    color: #000;
    font-weight: bold;
    font-style: italic;
    font-size: 17px;
    text-align: left;
}
.add-product-form label:nth-child(1) {
    margin-top: 25px;
}
.add-product-form input, .add-product-form textarea, .add-product-form select {
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
