import { db } from ".";
import { pedido } from "../interfaces";
import Pedido from "../Models/Pedido";

export const getPedidoById = async (_id: string): Promise<pedido | null> => {
    try {

        await db.connect();
        const pedido = await Pedido.findOne({ _id }).lean();
        await db.disconnect();

        if (!pedido) {
            return null;
        }

        pedido.images = pedido.images.map((image: string) => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        });

        return JSON.parse(JSON.stringify(pedido));
    } catch (err) {
        console.log(err)
        return null
    }
}
export const getAllPedidos = async (): Promise<pedido | null> => {
    try {

        await db.connect();
        const pedido = await Pedido.find().sort({ "createdAt": -1 })
        await db.disconnect();
        if (!pedido) {
            return null;
        }
        return JSON.parse(JSON.stringify(pedido));
    } catch (err) {
        console.log(err)
        return null
    }
}
