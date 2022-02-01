import app, { server } from '../src/config/app'
import mongoose from 'mongoose'
import request from 'supertest'
import { text } from 'express';

describe('Check route GET /products', () => {
    
    describe('Without query params', () => {

        test('Should respond with a 400 status code', async () => {
            const res = await request(app).get('/products').send();
            expect(res.statusCode).toBe(404);
        });

        test('Should respond with a content-type of application/json in header', async () => {
            const res = await request(app).get('/products').send();
            expect(res.headers['content-type']).toEqual(
                expect.stringContaining("json")
            );
        });

        test('Should return an object body with all parameters determinated', async () => {
            const res = await request(app).get('/products').send();
            expect(res.body).toMatchObject({
                msg: 'Corrija los errores del formulario.',
                err: { q: 'Ingrese el campo de búsqueda.' }
            });
        });

    });

    describe('With "q" query param as a Number', () => {
        const query = { q: 10 }

        test('Should respond with a 200 status code', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.statusCode).toBe(200);
        });

        test('Should respond with a content-type of application/json in header', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.headers['content-type']).toEqual(
                expect.stringContaining("json")
            );
        });

        test('Should return a successful response object body', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.body).toMatchObject({msg: 'Producto encontrado.', data: expect.any(Array)});
        });

        test('Should return a 1 product only', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.body.data).toHaveLength(1);
        });

        test('The product should had all its parameters', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.body.data[0]).toMatchObject({
                _id: expect.any(String),
                brand: expect.any(String),
                description: expect.any(String),
                id: expect.any(Number),
                image: expect.any(String),
                price: expect.any(Number)
            })
        })

        test('Should return the product with the same ID', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.body.data[0].id).toEqual(query.q);
        })
    });

    describe('With "q" query param as a String', () => {
        const query = { q: "adda" };

        test('Should respond with a 200 status code', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.statusCode).toBe(200);
        });

        test('Should respond with a content-type of application/json in header', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.headers['content-type']).toEqual(
                expect.stringContaining("json")
            );
        });

        test('Should return a successful response object body', async () => {
            const res = await request(app).get('/products').query(query).send();
            expect(res.body).toMatchObject({msg: 'Productos obtenidos.', data: expect.any(Array)});
        });

        test('The returned products should had all its parameters', async () => {
            const res = await request(app).get('/products').query(query).send();
            for (const x of res.body.data) {                
                expect(x).toMatchObject({
                    _id: expect.any(String),
                    brand: expect.any(String),
                    description: expect.any(String),
                    id: expect.any(Number),
                    image: expect.any(String),
                    price: expect.any(Number)
                });
            }
        })

        // TODO: Check OR function on Jest
        // test('All returned products should contain the search string', async () => {
        //     const res = await request(app).get('/products').query(query).send();
        //     for (const x of res.body.data) {   
        //         expect(res.body.data.description).toMatch(new RegExp(`/${query.q}/`))
        //         expect(res.body.data.brand).toMatch(new RegExp(`/${query.q}/`))
        //     }
        // })
    });

    describe('With an invalid "limit" query param', () => {
        const queryArray = [
            { q: 'abba', limit: "a" },
            { q: 'abba', limit: 0 },
            { q: 'abba', limit: -1 },
            { q: 'abba', limit: 101 },
            { q: 'abba', limit: true }
        ];

        test('Should respond with a 404 status code', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.statusCode).toBe(404);
            }
        });

        test('Should respond with a content-type of application/json in header', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.headers['content-type']).toEqual(
                    expect.stringContaining("json")
                );
            }
        });

        test('Should return an user invalid response object body', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.body).toMatchObject({
                    msg: 'Corrija los errores del formulario.',
                    err: expect.any(Object)
                });
            }
        });

        test('Should return the "limit" error', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.body.err.limit).toMatch("Ingrese un número entre 0 a 100.");
            }
        });
    });

    describe('Whit a valid "limit" query param', () => {
        const queryArray = [1,2,3,4,5,6,7,8,9,10].map(r => {
            return { q: 'abba', limit: r}
        });

        test('Should respond with a 200 status code', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.statusCode).toBe(200);
            }
        });

        test('Should respond with a content-type of application/json in header', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.headers['content-type']).toEqual(
                    expect.stringContaining("json")
                );
            }
        });

        test('Should return a successful response object body', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.body).toMatchObject({msg: 'Productos obtenidos.', data: expect.any(Array)});
            }
        });

        test('The limit provided has match with the product array length', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.body.data.length).toBeLessThanOrEqual(query.limit);
            }
        })

        test('The returned products should had all its parameters', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                for (const x of res.body.data) {                
                    expect(x).toMatchObject({
                        _id: expect.any(String),
                        brand: expect.any(String),
                        description: expect.any(String),
                        id: expect.any(Number),
                        image: expect.any(String),
                        price: expect.any(Number)
                    });
                }
            }
        });
    });

    describe('With an invalid "page" query param', () => {
        const queryArray = [
            { q: 'abba', page: "a" },
            { q: 'abba', page: 0 },
            { q: 'abba', page: -1 },
            { q: 'abba', page: true }
        ];

        test('Should respond with a 404 status code', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.statusCode).toBe(404);
            }
        });

        test('Should respond with a content-type of application/json in header', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.headers['content-type']).toEqual(
                    expect.stringContaining("json")
                );
            }
        });

        test('Should return an user invalid response object body', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.body).toMatchObject({
                    msg: 'Corrija los errores del formulario.',
                    err: expect.any(Object)
                });
            }
        });

        test('Should return the "page" error', async () => {
            for (const query of queryArray) {
                const res = await request(app).get('/products').query(query).send();
                expect(res.body.err.page).toMatch("Ingrese un número mayor o igual a 1.");
            }
        });
    });


    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

});