import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum TypeUser {
    User,
    Brand,
    Admin
}

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;

    @Column('date')
    birth: Date;

    @Column('varchar')
    avatar: string;

    @Column('varchar')
    type: TypeUser

    @Column('varchar')
    nickname: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;