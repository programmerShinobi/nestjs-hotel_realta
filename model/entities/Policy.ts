import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryGroup } from "./CategoryGroup";

@Index("poli_id_pk", ["poliId"], { unique: true })
@Entity("policy", { schema: "master" })
export class Policy {
  @PrimaryGeneratedColumn({ type: "integer", name: "poli_id" })
  poliId: number;

  @Column("character varying", {
    name: "poli_name",
    nullable: true,
    length: 55,
  })
  poliName: string | null;

  @Column("character varying", {
    name: "poli_description",
    nullable: true,
    length: 255,
  })
  poliDescription: string | null;

  @ManyToMany(() => CategoryGroup, (categoryGroup) => categoryGroup.policies)
  categoryGroups: CategoryGroup[];
}
