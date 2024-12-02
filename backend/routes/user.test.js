const request = require('supertest')
const router = require('./user.api.js')
const express = require('express')
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model.js');

const app = express();
app.use(express.json())
app.use(router)

describe('Manage an user', () =>  {
    it('should create a new user', async () => {
        await request(app)
            .post('/add')
            .send({email : "hello@world.ch", password: "123"})
            .then(res => {
                expect(res.status).toEqual(200)
            })
    })
})