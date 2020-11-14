import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Product from './Product';

@Entity('products_tags_nfc')
class ProductTagNfc {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    product_id: string;

    @Column('varchar')
    tag_nfc: string;

    @Column('boolean')
    active: boolean;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}

export default ProductTagNfc;