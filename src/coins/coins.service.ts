import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coin, CoinDocument } from './schema/coin.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class CoinsService {
  constructor(@InjectModel(Coin.name) private coinModel: Model<CoinDocument>) {}

  async findAll(
    fromPrice?: number,
    toPrice?: number,
    q?: string,
  ): Promise<Coin[]> {
    const filter: Partial<Record<keyof Coin, unknown>> = {};

    if (fromPrice) filter.price = { $gte: fromPrice };
    if (toPrice) {
      filter.price = {
        ...(typeof filter.price === 'object' ? filter.price : {}),
        $lte: toPrice,
      };
    }
    if (q) filter.title = { $regex: q, $options: 'i' };

    return await this.coinModel.find(Object.keys(filter).length ? filter : {});
  }

  async findOne(id: string): Promise<Coin> {
    if (!isValidObjectId(id))
      throw new BadRequestException(`Invalid ID format: ${id}`);

    const coin = await this.coinModel.findById(id);
    if (!coin) throw new NotFoundException(`Coin with ${id} not found`);

    return coin;
  }
}
