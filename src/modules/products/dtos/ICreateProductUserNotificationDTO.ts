export default interface ICreateProductUserNotificationDTO {
    product_id?: string;
    user_id: string;
    message: string;
    url?: string;
}