import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Facilities } from "./Facilities";
import { BookingOrderDetailExtra } from "./BookingOrderDetailExtra";
import { SpecialOfferCoupons } from "./SpecialOfferCoupons";
import { UserBreakfeast } from "./UserBreakfeast";

@Index("pk_boor_borde_id", ["bordeId", "borderBoorId"], { unique: true })
@Index("booking_order_detail_borde_id_key", ["bordeId"], { unique: true })
@Index("booking_order_detail_border_boor_id_key", ["borderBoorId"], {
  unique: true,
})
@Entity("booking_order_detail", { schema: "booking" })
export class BookingOrderDetail {
  @Column("integer", { primary: true, name: "border_boor_id" })
  borderBoorId: number;

  @PrimaryGeneratedColumn({ type: "integer", name: "borde_id" })
  bordeId: number;

  @Column("timestamp without time zone", {
    name: "borde_checkin",
    nullable: true,
  })
  bordeCheckin: Date | null;

  @Column("timestamp without time zone", {
    name: "borde_checkout",
    nullable: true,
  })
  bordeCheckout: Date | null;

  @Column("integer", { name: "borde_adults", nullable: true })
  bordeAdults: number | null;

  @Column("integer", { name: "borde_kids", nullable: true })
  bordeKids: number | null;

  @Column("money", { name: "borde_price", nullable: true })
  bordePrice: string | null;

  @Column("money", { name: "borde_extra", nullable: true })
  bordeExtra: string | null;

  @Column("money", { name: "borde_discount", nullable: true })
  bordeDiscount: string | null;

  @Column("money", { name: "borde_tax", nullable: true })
  bordeTax: string | null;

  @Column("money", { name: "borde_subtotal", nullable: true })
  bordeSubtotal: string | null;

  @ManyToOne(() => Facilities, (facilities) => facilities.bookingOrderDetails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "borde_faci_id", referencedColumnName: "faciId" }])
  bordeFaci: Facilities;

  @OneToMany(
    () => BookingOrderDetailExtra,
    (bookingOrderDetailExtra) => bookingOrderDetailExtra.boexBorde
  )
  bookingOrderDetailExtras: BookingOrderDetailExtra[];

  @OneToMany(
    () => SpecialOfferCoupons,
    (specialOfferCoupons) => specialOfferCoupons.socoBorde
  )
  specialOfferCoupons: SpecialOfferCoupons[];

  @OneToMany(() => UserBreakfeast, (userBreakfeast) => userBreakfeast.usbrBorde)
  userBreakfeasts: UserBreakfeast[];
}
