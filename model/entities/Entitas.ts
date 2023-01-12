import {
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bank } from "./Bank";
import { PaymentGateaway } from "./PaymentGateaway";
import { UserAccounts } from "./UserAccounts";

@Index("entitas_pkey", ["entitasId"], { unique: true })
@Entity("entitas", { schema: "payment" })
export class Entitas {
  @PrimaryGeneratedColumn({ type: "integer", name: "entitas_id" })
  entitasId: number;

  @OneToOne(() => Bank, (bank) => bank.bankEntitas)
  bank: Bank;

  @OneToOne(
    () => PaymentGateaway,
    (paymentGateaway) => paymentGateaway.pagaEntitas
  )
  paymentGateaway: PaymentGateaway;

  @OneToMany(() => UserAccounts, (userAccounts) => userAccounts.usacEntitas)
  userAccounts: UserAccounts[];
}
