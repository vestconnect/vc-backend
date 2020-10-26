import { Router } from 'express';

import SendForgotPasswordEmailServices from '../services/User/SendForgotPasswordEmailServices';
import ResetUserPassword from '../services/User/ResetUserPassword';

const passwordRoutes = Router();

const sendForgotPasswordEmailServices = new SendForgotPasswordEmailServices();

passwordRoutes.post('/forgot', async (request, response) => {
    const { email } = request.body;

    await sendForgotPasswordEmailServices.execute({ email });

    response.status(204).json();
});

passwordRoutes.post('/reset', async (request, response) => {
    const resetUserPasswordService = new ResetUserPassword();
    const { token, password } = request.body;

    await resetUserPasswordService.execute({ token, password });

    response.status(204).json();
});

export default passwordRoutes;