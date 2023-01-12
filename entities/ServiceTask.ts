import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("seta_id_pk", ["setaId"], { unique: true })
@Index("service_task_seta_name_key", ["setaName"], { unique: true })
@Entity("service_task", { schema: "master" })
export class ServiceTask {
  @PrimaryGeneratedColumn({ type: "integer", name: "seta_id" })
  setaId: number;

  @Column("character varying", {
    name: "seta_name",
    nullable: true,
    unique: true,
    length: 85,
  })
  setaName: string | null;

  @Column("smallint", { name: "seta_seq", nullable: true })
  setaSeq: number | null;
}
