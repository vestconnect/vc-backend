import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('users_token')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    token: string;

    @Column('varchar')
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}

export default UserToken;