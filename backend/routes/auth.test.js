const request = require('supertest')
const router = require('./auth.api.js')
const express = require('express')
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model');

const app = express();
app.use(express.json())
app.use(router)

describe('Authentication of an user', () =>  {
    it('should return a user not found error', async () => {
        await request(app)
            .post('/')
            .send({email : "hello@world.ch", password: "123"})
            .then(res => {
                expect(res.body).toEqual("Utilisateur non trouvé")
            })
    })
    it('should return a user logged in', async () => {
        const user = new UserModel({
            email: "hello@world.ch",
            password: await bcrypt.hash("12345678", 8),
          });
          user.save()
        await request(app)
            .post('/')
            .send({email: user.email, password: "12345678"})
            .then(res => {
                expect(res.body.email).toEqual(user.email)
            })
    })
})