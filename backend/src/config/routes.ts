import { Request, Response, Router } from 'express';
import productRouter from '../components/products/products.routes';

const routes = Router();

// Import Routers
routes.use('/products', productRouter);

// Generic Routes
routes.all('/', (req:Request, res:Response) => {
    res.json({msg: 'Welcome!'});
});

routes.all('*', (req:Request, res:Response) => {
    res.status(404).json({msg: 'Not Found!'});
});

export default routes;