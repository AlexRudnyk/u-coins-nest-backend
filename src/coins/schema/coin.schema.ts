import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CoinDocument = Coin & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Coin {
  @Prop()
  title: string;

  @Prop()
  year: string;

  @Prop()
  photoURL: string[];

  @Prop()
  spec: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] })
  comments: MongooseSchema.Types.ObjectId[];
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
