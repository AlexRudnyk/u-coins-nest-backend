import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';
// import {
//   CartItem,
//   CartItemSchema,
// } from 'src/cart-item/schemas/cart-item.schema';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  //   @Prop()
  //   phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'USER' })
  role: 'USER' | 'ADMIN';

  @Prop({ default: null })
  accessToken: string;

  //   @Prop({ type: [CartItemSchema], default: [] })
  //   productsInCart: CartItem[];

  setPassword(password: string): void {
    this.password = hashSync(password, genSaltSync(10));
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.setPassword = function (
  this: UserDocument,
  password: string,
): void {
  this.password = hashSync(password, genSaltSync(10));
};

UserSchema.methods.comparePassword = function (
  this: UserDocument,
  password: string,
): boolean {
  return compareSync(password, this.password);
};
