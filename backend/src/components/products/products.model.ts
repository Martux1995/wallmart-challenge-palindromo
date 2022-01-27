//import { PaginateModel, Document, Schema, model } from 'mongoose'

import { model, Schema, ObjectId } from 'mongoose';

const mongoosePaginate = require('mongoose-paginate-v2');

interface Product {
    id:number;
    brand:string;
    description:string;
    image:string;
    price:number;
}

const productSchema = new Schema({
    id: Number,
    brand: String,
    description: String,
    image: String,
    price: Number
},{
    timestamps: true,
    versionKey: false,
    id: false,
    _id: false
});

productSchema.plugin(mongoosePaginate);

export default model<Product>('Product', productSchema); 