import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("pk_role_id", ["roleId"], { unique: true })
@Entity("roles", { schema: "users" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_id" })
  roleId: number;

  @Column("character varying", {
    name: "role_name",
    nullable: true,
    length: 35,
  })
  roleName: string | null;

  @ManyToMany(() => Users, (users) => users.roles)
  @JoinTable({
    name: "user_roles",
    joinColumns: [{ name: "usro_role_id", referencedColumnName: "roleId" }],
    inverseJoinColumns: [
      { name: "usro_user_id", referencedColumnName: "userId" },
    ],
    schema: "users",
  })
  users: Users[];
}
