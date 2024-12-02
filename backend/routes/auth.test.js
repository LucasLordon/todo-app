const request = require('supertest')
const router = require('./auth.api.js')
const express = require('express')
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
})