import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import uploadConfig from '@config/upload';
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

    @Expose({ name: 'file_url' })
    getFileUrl(): string | null {
        if (!this.file) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.file}`
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.file}`
            default:
                return null;
        }
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

export default ProductContentText;