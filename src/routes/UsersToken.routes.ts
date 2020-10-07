import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserTokenServices from '../services/UserToken/UserTokenServices';

const userTokenRouter = Router();

userTokenRouter.post('/', ensureAuthenticated, async (request, response) => {
    const userTokenServices = new UserTokenServices();
    const id = request.user.id;
    const { token } = request.body;

    const userToken = await userTokenServices.execute({
        id,
        token
    });

    response.json(userToken);
});

export default userTokenRouter;