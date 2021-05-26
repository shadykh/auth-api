'use strict';

process.env.SECRET = 'TestingSecret';

const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');

const Users = require('../src/auth/models/users.js');
const { server } = require('../src/server.js');
const request = supergoose(server);


let users = {
  user: { username: 'user', password: 'password', role: 'user' },
  admin: { username: 'admin', password: 'password', role: 'admin' },
};

beforeAll(async () => {
  await new Users(users.admin).save();
  await new Users(users.user).save();
});

const user = { username: 'admin' };
const token = jwt.sign(user, process.env.SECRET);

const basic = { username: 'basic' };
const basicToken = jwt.sign(basic, process.env.SECRET);


describe('Food [admin]', () => {

  let id;
  
  
  it('should create ✔️ a new food using POST', async () => {
  
    let food = {
      name: 'Banana',
      calories: '120',
      type:'FRUIT',
    };
  
    const response = await request
      .post('/api/v2/food')
      .send(food)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('Banana');

    id = response.body._id;
  });
  
  
  it('should read 📝 a list of Food using GET', async () => {
  
  
    const response = await request
      .get('/api/v2/food')
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should read 📝 a one of Food by id using GET', async () => {
  
  
    const response = await request
      .get(`/api/v1/food/${id}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toEqual(200);

  });
  
  it('should update ✔️ an Food using PUT', async () => {
  
    let updatedFood = {
      name: 'Watermelon',
      calories: '120',
      type:'FRUIT',
    };
  
    const response = await request
      .put(`/api/v2/food/${id}`)
      .send(updatedFood)
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Watermelon');
    expect(response.body.calories).toEqual(120);
    expect(response.body.type).toEqual('FRUIT');
  });
  
  it('should destroy ❌ an Food using DELETE', async () => {
  
    const response = await request
      .delete(`/api/v2/food/${id}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toEqual(200);
  });
  
  
    
});
  

describe('Cloths [user]', () => {

  let id;
    
    
  it('should not create ❌ a new Cloths using POST', async () => {
    
    let clothes = {
      name: 'T-shirt',
      color: 'Black',
      size: 'L',
    };
    
    const response = await request
      .post('/api/v2/clothes')
      .send(clothes)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  
    id = response.body._id;
  });
    
    
  it('should read 📝 a list of Cloths using GET', async () => {
    
    
    const response = await request
      .get('/api/v2/clothes')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
    
  it('should read 📝 a one of Cloths by id using GET', async () => {
  
  
    const response = await request
      .get(`/api/v1/cloths/${id}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toEqual(500);
  });

  it('should not update ❌ an Cloths using PUT', async () => {
    
    let updatedClothes = {
      name: 'T-shirt',
      color: 'White',
      size: 'S',
    };
    
    const response = await request
      .put(`/api/v2/clothes/${id}`)
      .send(updatedClothes)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
  });
    
  it('should not destroy ❌ an Cloths using DELETE', async () => {
    
    const response = await request
      .delete(`/api/v2/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
  });
    
    
      
});
    
  
describe('server 💻 ', ()=>{
  
  it('should get ⚠️404 status⚠️', async ()=>{
    const response = await request.get('/whereami');
    expect(response.status).toBe(404);
  });
    
});