import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Entitas } from "./Entitas";

@Index("payment_gateaway_paga_code_key", ["pagaCode"], { unique: true })
@Index("payment_gateaway_pkey", ["pagaEntitasId"], { unique: true })
@Index("payment_gateaway_paga_name_key", ["pagaName"], { unique: true })
@Entity("payment_gateaway", { schema: "payment" })
export class PaymentGateaway {
  @Column("integer", { primary: true, name: "paga_entitas_id" })
  pagaEntitasId: number;

  @Column("character varying", {
    name: "paga_code",
    nullable: true,
    unique: true,
    length: 10,
  })
  pagaCode: string | null;

  @Column("character varying", {
    name: "paga_name",
    nullable: true,
    unique: true,
    length: 55,
  })
  pagaName: string | null;

  @Column("timestamp without time zone", {
    name: "paga_modified_date",
    nullable: true,
  })
  pagaModifiedDate: Date | null;

  @OneToOne(() => Entitas, (entitas) => entitas.paymentGateaway, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "paga_entitas_id", referencedColumnName: "entitasId" }])
  pagaEntitas: Entitas;
}
