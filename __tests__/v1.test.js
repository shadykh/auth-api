'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const request = supergoose(server);


describe('Food', () => {

  let id;


  it('should create ✔️ a new Food using POST', async () => {

    let food = {
      name: 'Banana',
      calories: '120',
      type:'FRUIT',
    };

    const response = await request.post('/api/v1/food').send(food);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('Banana');
    expect(response.body.calories).toEqual(120);
    expect(response.body.type).toEqual('FRUIT');
    expect(response.body._id).toBeDefined();

    id = response.body._id;
  });


  it('should read 📝 a list of Food using GET', async () => {


    const response = await request.get('/api/v1/food');

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should read 📝 a one of Food by id using GET', async () => {

    const response = await request.get(`/api/v1/food/${id}`);

    expect(response.status).toEqual(200);

  });

  it('should update ✔️ an Food using PUT', async () => {

    let updatedFood = {
      name: 'Watermelon',
      calories: '120',
      type:'FRUIT',
    };

    const response = await request.put(`/api/v1/food/${id}`)
      .send(updatedFood);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Watermelon');
    expect(response.body.calories).toEqual(120);
    expect(response.body.type).toEqual('FRUIT');
  });

  it('should destroy ❌ an Food using DELETE', async () => {

    const response = await request.put(`/api/v1/food/${id}`);

    expect(response.status).toEqual(200);
  });


  
});


describe('Clothes', () => {


  let id;

  it('should create ✔️ a new Clothes using POST', async () => {

    let clothes = {
      name: 'T-shirt',
      color: 'Black',
      size: 'L',
    };

    const response = await request.post('/api/v1/clothes').send(clothes);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('T-shirt');
    expect(response.body.color).toEqual('Black');
    expect(response.body.size).toEqual('L');
    expect(response.body._id).toBeDefined();

    id = response.body._id;
  });

  it('should read 📝 a list of Clothes using GET', async () => {

    const response = await request.get('/api/v1/clothes');

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should read 📝 a one of Clothes by id using GET', async () => {

    const response = await request.get(`/api/v1/clothes/${id}`);

    expect(response.status).toEqual(200);

  });

  it('should update ✔️ an Clothes using PUT', async () => {

    let updatedClothes = {
      name: 'T-shirt',
      color: 'White',
      size: 'S',
    };

    const response = await request.put(`/api/v1/clothes/${id}`)
      .send(updatedClothes);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('T-shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('S');

  });

  it('should destroy ❌ a Clothes using DELETE', async () => {

    const response = await request.put(`/api/v1/clothes/${id}`);

    expect(response.status).toEqual(200);
  });


  
});


describe('server 💻 ', ()=>{

  it('should get ⚠️404 status⚠️', async ()=>{
    const response = await request.get('/whereami');
    expect(response.status).toBe(404);
  });
  
});