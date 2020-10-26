import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UserTokenReset from '../../models/UserTokenReset';
import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import aws from 'aws-sdk';
import configMail from '../../config/mail';

interface Request {
    email: string;
}

class SendForgotPasswordEmailServices {
    private client: Transporter;

    constructor() {
        if (configMail.driver === 'ethereal') {
            nodemailer.createTestAccount().then(account => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });

                this.client = transporter;
            });
        } else {
            this.client = nodemailer.createTransport({
                SES: new aws.SES({
                    apiVersion: '2010-12-01',
                    region: 'us-east-2'
                })
            })
        }
    }

    public async execute({ email }: Request): Promise<void> {
        const userRepository = getRepository(User);
        const userTokenResetRepository = getRepository(UserTokenReset);

        const user = await userRepository.findOne({
            email
        });

        if (!user) {
            throw new AppError('Usuário não encontrado', 401);
        }

        const userTokenReset = userTokenResetRepository.create({
            user_id: user.id
        });

        await userTokenResetRepository.save(userTokenReset);

        const templateForgot = path.resolve(__dirname, '..', '..', 'views', 'forgot_password.hbs');

        const templateForgotPassword = await fs.promises.readFile(templateForgot, {
            encoding: 'utf-8'
        });

        const parseTemplate = handlebars.compile(templateForgotPassword);

        const message = await this.client.sendMail({
            from: `${configMail.defaults.from.name}<${configMail.defaults.from.email}>`,
            to: `${user.name} <${user.email}>`,
            subject: 'Recuperação de senha',
            html: parseTemplate({
                name: user.name,
                link: `http://localhost:3000/reset_password?token=${userTokenReset.token}`
            })
        });

        if (configMail.driver === 'ethereal') {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
        }
    }
}

export default SendForgotPasswordEmailServices;