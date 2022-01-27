import { Request, Response } from 'express'
import { isPalindrome } from '../../utils/general';
import Product from './products.model'

interface QueryData {
    q?:string;
    page?:number;
    limit?:number;
}

export const FindProduct = async (req:Request<any,any,any,QueryData>, res:Response) => {
    try {

        // If the q param has only digits
        if (/^[0-9]+$/.test(req.query.q!)) {
            // Find product by ID
            const pSolo = await Product.findOne({ id: parseInt(req.query.q!) });

            if (pSolo) {
                // If the word to search is a palindrome, reduce price of this product in 50%
                if(isPalindrome(req.query.q!))
                    pSolo.price = pSolo.price/2;
                
                return res.json({ msg: "Producto encontrado.", data: pSolo });
            } else
                return res.status(404).json({ msg: "Producto no existe."});
        }
        
        // If q param has less of 4 caracters, send error
        if (!req.query.q || req.query.q.length < 4)
            return res.status(400).json({ msg: "Ingresa al menos 4 caracteres. "});
        
        // Find the product with pattern and page/limit sizes
        //@ts-ignore paginate package has bug with ts
        const products = await Product.paginate({
            $or: [
                { description: new RegExp(req.query.q!,"i") },
                { brand: new RegExp(req.query.q!,"i") }
            ]
        },{
            page: req.query.page || 1,
            limit: req.query.limit || 10
        });

        // Make the discount if i search with a palindrome
        if(isPalindrome(req.query.q!))
            for (const prod of products.docs) {
                prod.price = prod.price / 2;
            }



        return res.json({ msg: 'Productos obtenidos.', data: products.docs });
    } catch (e:any) {
        console.log(e);
        return res.status(400).json({ msg: 'Error al buscar los productos.'});
    }
}