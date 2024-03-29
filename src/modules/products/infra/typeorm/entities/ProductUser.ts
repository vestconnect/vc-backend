import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Product from './Product';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('products_user')
class ProductUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    product_id: string;

    @Column('uuid')
    user_id: string;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}

export default ProductUser;