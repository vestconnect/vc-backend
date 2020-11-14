import ISendNotificationDTO from '../dtos/ISendNotificationDTO';

export default interface IOneSignalProvider {
    sendNotification(dto: ISendNotificationDTO): void;
    sendNotificationIos(dto: ISendNotificationDTO): void;
}