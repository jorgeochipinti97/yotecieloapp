import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { pedido } from '../../../interfaces/pedido';
import Pedido from '../../../Models/Pedido';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = | { message: string; }
    | pedido
    | pedido[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getPedido(req, res);
        case 'POST':
            return createPedido(req, res);
        case 'PUT':
            return updatePedido(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}
const createPedido = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connect();
        const newPedido = new Pedido({ ...req.body });
        await newPedido.save();
        await db.disconnect();

        return res.status(201).json(newPedido);

    } catch (err) {
        console.log(err)
    }
}


const updatePedido = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', images = [] } = req.body as pedido;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }
    try {

        await db.connect();
        const pedido = await Pedido.findById(_id);
        if (!pedido) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }


        pedido.images.forEach(async (image) => {
            if (!images.includes(image)) {
                // Borrar de cloudinary
                const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
                console.log({ image, fileId, extension });
                await cloudinary.uploader.destroy(fileId);
            }
        });

        await pedido.update(req.body);
        await db.disconnect();


        return res.status(200).json(pedido);

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const getPedido = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const pedido = await Pedido.find()
        .sort({ createdAt: 'desc' })
        .lean();
    await db.disconnect();

    return res.status(200).json(pedido)

}