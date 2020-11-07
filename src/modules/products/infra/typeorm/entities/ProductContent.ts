import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Product from './Product';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

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

    @Expose({ name: 'type_text' })
    getTypeText(): string | null {
        if (!this.type) {
            return null;
        }

        if (this.type === 'P') {
            return 'Fotos';
        }

        return 'Videos';
    }

    @Expose({ name: 'background_url' })
    getBackgroundUrl(): string | null {
        if (!this.background) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.background}`
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.background}`
            default:
                return null;
        }
    }
}

export default ProductContent;