import { inject, injectable } from "tsyringe";
import IOneSignalProvider from "@shared/container/providers/OneSignal/models/IOneSignalProvider";
import IProductsRepository from "../repositories/IProductsRepository";
import AppError from "@shared/errors/AppError";
import IProductsUserRepository from "../repositories/IProductsUserRepository";
import IUsersTokenRepository from "@modules/users/repositories/IUsersTokenRepository";
import IProductsUserNotificationsRepository from "../repositories/IProductsUserNotificationsRepository";
import ISelectedProductsUserNotificationsRepository from "../repositories/ISelectedProductsUserNotificationsRepository";

interface IRequest {
  product_id?: string;
  message: string;
  url?: string;
}

@injectable()
class SendNotificationProductServices {
  constructor(
    @inject("OneSignalProvider")
    private oneSignal: IOneSignalProvider,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("ProductsUserRepository")
    private productsUserRepository: IProductsUserRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("ProductsUserNotificationsRepository")
    private productsUserNotificationsRepository: IProductsUserNotificationsRepository,
    @inject("SelectedProductsUserNotificationsRepository")
    private selectedProductsUserNotificationsRepository: ISelectedProductsUserNotificationsRepository
  ) { }

  public async execute({ product_id, message, url }: IRequest): Promise<void> {
    let tokens: string[] = [];

    if (product_id) {
      const product = await this.productsRepository.findById(product_id);

      if (!product) {
        throw new AppError("Produto não encontrado", 400);
      }

      const productsUser = await this.productsUserRepository.findUsersByProduct(
        product.id,
        []
      );

      for (const user of productsUser) {
        const userTokens = await this.usersTokenRepository.findByUserId(
          user.user_id
        );

        userTokens.forEach((userToken) => {
          tokens.push(userToken.token);
        });
      }

      for (const users of productsUser) {
        await this.productsUserNotificationsRepository.create({
          product_id,
          user_id: users.user_id,
          message,
          url
        });
      }
    } else {
      const userTokens = await this.usersTokenRepository.find();

      userTokens.forEach((userToken) => {
        tokens.push(userToken.token);
      });

      for (const users of userTokens) {
        await this.productsUserNotificationsRepository.create({
          product_id,
          user_id: users.user_id,
          message,
          url
        });
      }
    }

    this.oneSignal.sendNotification({
      headings: "VestConnect",
      contents: message,
      players_id: tokens,
    });
  }
}

export default SendNotificationProductServices;
