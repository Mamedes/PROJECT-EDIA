import express, { response } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import {  getRepository } from 'typeorm';
import convertHourToMinutes from '../utils/convertHourToMinutes';

import Classes from '../models/Classes' 
import CreateClassesService from '../services/CreateClassesService';

const classesroutes = express.Router();



classesroutes.get('/', async (request, response) => {
  const classes = getRepository(Classes)
  .createQueryBuilder('class_schedule')
  .leftJoinAndSelect('classes.user', 'user')
  .getMany()
   return response.json({classes});
  
});
  

classesroutes.post('/', async (request, response)=>{
  const {
    name,
    email,
    password,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule

  } = request.body;
  const createClassesService = new CreateClassesService();
  const classesService = createClassesService.execute({name,email,password, avatar, whatsapp, bio, subject,cost,schedule});

  return response.json(classesService)
  
   
});




export default classesroutes;