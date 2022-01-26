import { Router } from 'express';
import { FindProduct } from './products.controller';
import { FindProductValidator, VerifyValidation } from './products.validator';

const productRouter = Router();

productRouter.get('/', FindProductValidator, VerifyValidation, FindProduct);

export default productRouter;