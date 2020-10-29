import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    title: string;

    @Column('varchar')
    nfc_id: string;

    @Column('varchar')
    subtitle: string;

    @Column('timestamp without time zone')
    validate: Date;

    @Column('varchar')
    avatar: string;

    @Column('varchar')
    background: string;

    @Column('varchar')
    description: string;

    @Column('uuid')
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}

export default Product;