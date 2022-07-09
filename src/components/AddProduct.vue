<template>
    <div class="form-group" id="productForm">
        <div class="close-form" @click="closeForm">&times;</div>
        <h3>New product</h3>
        <form class="add-product" @submit.prevent="sendProduct">
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
            <!-- <div v-if="currentFile" class="progress">
                <div
                    class="progress-bar progress-bar-info progress-bar-striped"
                    role="progressbar"
                    :aria-valuenow="progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="{ width: progress + '%' }"
                >
                    {{ progress }}%
                </div>
            </div> -->

            <div class="submit-button">
                <button type="submit" class="btn btn-primary mb-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import UploadService from '@/services/UploadFilesService'
export default {
    data() {
        return {
            name: '',
            category: 'none',
            price: '',
            weight: '',
            description: '',
            // File
            selectedFile: undefined,
            currentFile: undefined,
            progress: 0,
            message: '',
            fileInfos: [],
            fileName: 'Choose file',
        }
    },
    methods: {
        sendProduct() {
            if(this.name.trim() && this.category.trim() && this.price !== 0 && this.weight !== 0) {

                // File
                this.progress = 0;
                this.currentFile = this.selectedFile;
                UploadService.upload(this.currentFilem, event => {
                    this.progress = Math.round((100 * event.loaded) / event.total);
                })
                .then(response => {
                    this.message = response.data.message;
                    return UploadService.getFiles();
                })
                .then(files => {
                    this.fileInfos = files.data;
                })
                .catch(() => {
                    this.progress = 0;
                    this.message = "Could not upload the file!";
                    this.currentFile = undefined;
                });
                this.selectedFile = undefined;

                // Product Object
                const newProduct = {
                    id: Date.now(),
                    name: this.name,
                    category: this.category,
                    price: this.price,
                    weight: this.weight,
                    description: this.description,
                    fileName: this.fileName,
                }
                this.$emit('loadProducts', newProduct);
                this.name = '',
                this.category = 'none',
                this.price = '',
                this.weight = '',
                this.description = ''
            }
        },
        closeForm() {
            $('#productForm').hide();
        },
        selectFile(event) {
            let fileData = event.target.files[0];
            this.fileName = fileData.name;
            this.selectedFile = fileData;
            console.log(this.fileName);
        },
    },
    mounted() {
        UploadService.getFiles().then(response => {
            this.fileInfos = response.data;
        });
    }
};
</script>

<style>
#productForm {
    position: absolute;
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
