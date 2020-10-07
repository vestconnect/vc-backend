import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    description: string;

    @Column('varchar')
    avatar: string;
}

export default Brand;