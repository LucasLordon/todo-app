const request = require('supertest')
const router = require('./todo.api.js')
const express = require('express')
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model.js');
const jsonwebtoken = require('jsonwebtoken')
const { key } = require('../env/keys');

const app = express();
app.use(express.json())
app.use(router);


describe('Manage a todo', () => {
  it('should create a todo', async () => {
    const user = new UserModel({
      email: "hello@world.ch",
      password: await bcrypt.hash("12345678", 8),
    });
    await user.save()

    const token = jsonwebtoken.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: 60 * 60 * 24 * 30 * 6,
      algorithm: 'RS256',
    });

    request(app)
      .post('/add')
      .set('Cookie', ["token=" + token])
      .send({ text: "My first todo" })
      .then(res => {
        expect(res.status).toEqual(200)
      })
  })

  it('should find all todo', async () => {
    const user = new UserModel({
      email: "hello@world.ch",
      password: await bcrypt.hash("12345678", 8),
    });
    await user.save()

    const token = jsonwebtoken.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: 60 * 60 * 24 * 30 * 6,
      algorithm: 'RS256',
    });

    request(app)
      .post('/add')
      .set('Cookie', ["token=" + token])
      .send({ text: "My first todo" })
      .then(res => {
        expect(res.status).toEqual(200)
      })

    request(app)
      .get('/')
      .set('Cookie', ["token=" + token])
      .then(res => {
        expect(res.status).toEqual(200)
      })
  })

  it('should delete a todo', async () => {
    const user = new UserModel({
      email: "hello@world.ch",
      password: await bcrypt.hash("12345678", 8),
    });
    await user.save()

    const token = jsonwebtoken.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: 60 * 60 * 24 * 30 * 6,
      algorithm: 'RS256',
    });
    // Adds a new todo
    request(app)
      .post('/add')
      .set('Cookie', ["token=" + token])
      .send({ text: "My first todo" })
      .then(res => {
        expect(res.status).toEqual(200)
      })

    // Finds
    request(app)
      .get('/')
      .set('Cookie', ["token=" + token])
      .then(res => {
        expect(res.status).toEqual(200)
        // deletes
        request(app)
          .post('/' + res.body[0]._id)
          .set('Cookie', ["token=" + token])
          .then(res => {
            expect(res.status).toEqual(200)
          })
      })
  })
})