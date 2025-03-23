import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coin, CoinDocument } from './schema/coin.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoinsService {
  constructor(@InjectModel(Coin.name) private coinModel: Model<CoinDocument>) {}

  async findAll(fromPrice?: number, toPrice?: number): Promise<Coin[]> {
    if (!fromPrice && !toPrice) return [];
    return await this.coinModel
      .find({ price: { $gte: fromPrice, $lte: toPrice } })
      .exec();
  }
}
