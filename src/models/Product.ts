import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Brand from './Brand';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    brand_id: string;

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

    @OneToOne(() => Brand)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;
}

export default Product;