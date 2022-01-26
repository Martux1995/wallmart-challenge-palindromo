import { NextFunction, Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator'

export const VerifyValidation = (req:Request, res:Response, next:NextFunction) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            msg: 'Corrija los errores del formulario.',
            err: errors.array()
        });
    else next();
}

export const FindProductValidator = checkSchema({
    q: {
        in: ['query'],
        isAlphanumeric: {
            errorMessage: 'Ingrese un texto válido.',
            bail: true
        },
        exists: {
            options: { checkFalsy: true },
            errorMessage: 'Ingrese el campo de búsqueda,',
            bail: true
        },
        isLength: { 
            options: { min: 4 }, 
            errorMessage: 'Debes ingresar al menos 3 caracteres.',
            bail: true
        },
    }
});