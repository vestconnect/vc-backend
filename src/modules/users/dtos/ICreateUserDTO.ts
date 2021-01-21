export default interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    birth?: Date;
    type: string;
    nickname: string;
}