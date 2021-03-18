import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import classesRouter from './classes.routes'
import connectionsRouter from './connections.routes'

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/classes', classesRouter);


routes.use('/connections', connectionsRouter);



export default routes;
