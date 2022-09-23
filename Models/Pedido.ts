import mongoose, { Schema, model, Model } from 'mongoose';
import { pedido } from '../interfaces';

const pedidoSchema = new Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    transactionId: { type: String},
    message: { type: String },
    images: [{ type: String }],
    videos: [{ type: String }],
}, {
    timestamps: true,
})

const Pedido: Model<pedido> = mongoose.models.Pedido || model('Pedido', pedidoSchema);

export default Pedido;