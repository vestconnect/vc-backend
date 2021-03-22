import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { format } from 'date-fns';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    @Exclude()
    password: string;

    @Column('date')
    @Exclude()
    birth: Date;

    @Column('varchar')
    avatar: string;

    @Column('varchar')
    background: string;

    @Column('varchar')
    type: string;

    @Column('varchar')
    nickname: string;

    @Column('boolean')
    confirm_email: boolean;

    @Column('boolean')
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'birth_user' })
    getBirthUser(): string | null {
        if (!this.birth) {
            return null;
        }

        const date = new Date(this.birth);

        return date.toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    @Expose({ name: 'created' })
    getCreatedAt(): string | null {
        if (!this.created_at) {
            return null;
        }

        return format(this.created_at, 'yyyy-MM-dd');
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

export default User;