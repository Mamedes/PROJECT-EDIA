import { Router } from 'express';
import {getRepository} from 'typeorm';
import Connection from '../models/Connections' 
import CreateConnectionService from '../services/CreateConnectionService';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const connectionsRouter = Router();



connectionsRouter.get('/',  async (request, response) => {

  const totalConnections = getRepository(Connection)
   let [ connectionsall, total] =  await totalConnections.findAndCount();

   return response.json({total});
  
  
});

connectionsRouter.post('/',  async (request, response) => {
const user_id = request.body

const createConnections = new CreateConnectionService();

const connections = createConnections.execute({user_id});
return response.json(connections)

});


export default connectionsRouter;