import * as mongoose from 'mongoose';
import { Document, Schema, Model} from "mongoose";

mongoose.connect('mongodb://localhost:27017/oms', { useNewUrlParser: true });

export interface OrderEvent  {
    type: 'newProductOrder';
    userId: string;
}

export type OrderEventDocument = NewProductOrderEventDocument

export interface NewProductOrderEventDocument extends Document {
    type: 'newProductOrder';
    articleId: string;
    userId: string;
    categoryId: string;
    quantity: number;
    orderId: string;
}

const schema = new Schema({
    type: { type: String, required: true },
    userId:  { type: String, required: true },
    articleId:  { type: String, required: false },
    orderId:  { type: String, required: false },
    createdAt: { type: Date, required: true, default: () => new Date()}
})

export const OrderEventModel: Model<OrderEventDocument> = mongoose.model('OrderEvent', schema);