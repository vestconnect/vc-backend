import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Product from './Product';

enum Type {
    Photos = "P",
    Videos = "V",
    Texts = "T"
}

@Entity('products_content')
class ProductContent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    description: string;

    @Column('varchar')
    type: Type;

    @Column('varchar')
    background: string;

    @Column('uuid')
    product_id: string;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}

export default ProductContent;