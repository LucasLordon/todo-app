const request = require('supertest')
const router = require('./user.api.js')
const express = require('express')
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model.js');
const jsonwebtoken = require('jsonwebtoken')
const { key } = require('../env/keys');

const app = express();
app.use(express.json())
app.use(router)


describe('Manage an user', () => {
    it('should create a new user', async () => {
        await request(app)
            .post('/add')
            .send({ email: "hello@world.ch", password: "123" })
            .then(res => {
                expect(res.status).toEqual(200)
            })
    })
    it('should give an already created error', async () => {
        const user = new UserModel({
            email: "hello@world.ch",
            password: await bcrypt.hash("123", 8),
        });
        await user.save()
        await request(app)
            .post('/add')
            .send({ email: "hello@world.ch", password: "123" })
            .then(res => {
                expect(res.body).toEqual("Un compte avec cet email exist déjà!")
            })
    })
    // TODO (not working)
    it('should delete an user', async () => {
        const user = new UserModel({
            email: "hello@world.ch",
            password: await bcrypt.hash("123", 8),
        });
        await user.save()

        const token = jsonwebtoken.sign({}, key, {
            subject: user._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        });
        request(app)
            .post('/delete')
            .set('Accept-Language', 'en')
            .set('Cookie', ["token=" + token])
            .expect(200)
    })

})