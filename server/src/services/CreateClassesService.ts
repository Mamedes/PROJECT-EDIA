import { getRepository, ConnectionOptions, getConnection, getManager } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';


import Classes from '../models/Classes';
import User from '../models/User';
import ClassesSchedule from '../models/ClassesSchedule';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { response } from 'express';


interface Request {
  name: string;
  email:string;
  avatar: string;
  password:string;
  whatsapp: string;
  bio: string;
  subject: string;
  schedule: [];
  cost: number

}
interface ScheduleItem {
  week_day: number,
  from: string,
  to: string,
}

class CreateClassesService {
  public async execute({ name,email,password, avatar, whatsapp,bio,subject,cost, schedule }: Request) {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email  },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }
    const checkWhatsappExists = await usersRepository.findOne({
      where: { whatsapp  },
    });

    if (checkUserExists) {
      throw new AppError('Whatsapp address already used.');
    }
    
  const hashedPassword = await hash(password, 8);
  await getManager().transaction(async transactionalEntityManager => {
    
    
    const insertResultUser = await transactionalEntityManager.createQueryBuilder()
      .insert()
      .into(User)
      .values({name:name, avatar:avatar,email:email,password:hashedPassword, whatsapp:whatsapp, bio:bio})
      .execute();     
      
      const id = insertResultUser.identifiers[0].id;

     const insertResultClasses = await transactionalEntityManager.createQueryBuilder()
      .insert()
      .into(Classes)
      .values({subject:subject, cost:cost, user_id: id})
      .execute(); 

      const class_id = insertResultClasses.identifiers[0].id;
      const classSchedule:{class_id:string,week_day:string,from:string,to:string} = schedule.map((scheduleItem: ScheduleItem) => ({
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      }));
       
     
      const insertResultClassesSchedule = await transactionalEntityManager.createQueryBuilder()
      .insert()
      .into(ClassesSchedule)
      .values(classSchedule)
      .execute();   
        

     
  }
  )}
 
   
}

export default CreateClassesService;


