import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import ProductContent from './ProductContent';

@Entity('products_content_texts')
class ProductContentText {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    title: string;

    @Column('varchar')
    description: string;

    @Column('uuid')
    content_id: string;

    @Column('varchar')
    background: string;

    @Column('varchar')
    file: string;

    @OneToOne(() => ProductContent)
    @JoinColumn({ name: 'content_id' })
    product_content: ProductContent;
}

export default ProductContentText;