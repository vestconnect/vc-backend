import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { format, parseISO } from 'date-fns';
enum TypeUser {
    User,
    Brand,
    Admin
}
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
    type: TypeUser

    @Column('varchar')
    nickname: string;

    @Column('boolean')
    confirm_email: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'birth_user' })
    getBirthUser(): string | null {
        if (!this.birth) {
            return null;
        }

        return format(new Date(this.birth), 'yyyy-MM-dd');
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
}

export default User;