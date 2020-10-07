import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Product from './Product';

@Entity('products_tags')
class ProductTag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    description: string;

    @Column('uuid')
    product_id: string;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}

export default ProductTag;