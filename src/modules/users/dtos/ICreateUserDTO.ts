enum TypeUser {
    User,
    Brand,
    Admin
}

export default interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    birth: Date;
    type: TypeUser;
    nickname: string;
}