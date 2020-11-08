import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import { format } from 'date-fns';

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

    @Column('boolean')
    active: boolean;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Expose({ name: 'validate_br' })
    getValidate(): string | null {
        if (!this.validate) {
            return null;
        }

        return format(this.validate, 'yyyy-MM-dd');
    }

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`
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

export default Product;