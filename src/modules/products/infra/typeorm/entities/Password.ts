import User from "@modules/users/infra/typeorm/entities/User";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity("passwords")
class ProductTagNfc {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  pass: string;

  @Column("boolean")
  active: boolean;

  @Column("uuid")
  user_id: string;

  @Column("uuid")
  client_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToOne(() => User)
  @JoinColumn({ name: "client_id" })
  client: User;
}

export default ProductTagNfc;
