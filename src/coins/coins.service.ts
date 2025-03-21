import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coin, CoinDocument } from './schema/coin.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoinsService {
  constructor(@InjectModel(Coin.name) private coinModel: Model<CoinDocument>) {}

  async findAll(): Promise<Coin[]> {
    return await this.coinModel.find().exec();
  }
}
