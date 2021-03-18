import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Connections from '../models/Connections';


interface Request {
  user_id: string;
}

class CreateUserService {
  public async execute({ user_id}: Request): Promise<Connections>{
    const ConnectionsRepository = getRepository(Connections); 

     
    const user = ConnectionsRepository.create({
      user_id
    });
    await ConnectionsRepository.save(user);

    return user;
  }
}

export default CreateUserService;
