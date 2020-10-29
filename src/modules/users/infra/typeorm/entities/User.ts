import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum TypeUser {
    User,
    Brand,
    Admin
}

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    @Exclude()
    password: string;

    @Column('date')
    birth: Date;

    @Column('varchar')
    avatar: string;

    @Column('varchar')
    type: TypeUser

    @Column('varchar')
    nickname: string;

    @Column('boolean')
    confirm_email: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        return this.avatar ? `${process.env.APP_API_URL}/files/${this.avatar}` : null;
    }
}

export default User;