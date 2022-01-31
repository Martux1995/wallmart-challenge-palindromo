import { NextFunction, Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator'

export const VerifyValidation = (req:Request, res:Response, next:NextFunction) =>{
    const errors = validationResult(req);

    const err:any = {};

    for (const x of errors.array()) {
        err[x.param] = x.msg;
    }

    if (!errors.isEmpty())
        return res.status(400).json({
            msg: 'Corrija los errores del formulario.',
            err: err
        });
    else next();
}

export const FindProductValidator = checkSchema({
    q: {
        in: ['query'],
        exists: {
            options: { checkFalsy: true },
            errorMessage: 'Ingrese el campo de búsqueda,',
            bail: true
        }
    }, 
    limit: {
        in: ['query'],
        optional: true,
        isInt: {
            options: { min: 1, max: 100 },
            errorMessage: "Ingrese un número entre 0 a 100"
        },
        toInt: true
    },
    page: {
        in: ['query'],
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "Ingrese un número mayor o igual a 1"
        },
        toInt: true
    }
});