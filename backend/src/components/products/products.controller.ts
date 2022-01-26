import { Request, Response } from "express";


export const FindProduct = async (req:Request, res:Response) => {
    try {

        return res.json({ msg: 'Productos obtenidos.', data: [] });
    } catch (e:any) {
        return res.status(400).json({ msg: 'Error al buscar los productos.'});
    }
}