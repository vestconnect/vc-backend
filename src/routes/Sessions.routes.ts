import { Router } from 'express';
import AuthenticateUserServices from '../services/auth/AuthenticateUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;    

    const authenticateUser = new AuthenticateUserServices();

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ user, token });
});

export default sessionsRouter;