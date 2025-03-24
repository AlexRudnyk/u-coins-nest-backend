import { Controller, Get, Query } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  findAll(
    @Query('fromPrice') fromPrice?: string,
    @Query('toPrice') toPrice?: string,
    @Query('q') q?: string,
  ) {
    const fromPriceNum = fromPrice ? Number(fromPrice) : 1;
    const toPriceNum = toPrice ? Number(toPrice) : 1000;

    return this.coinsService.findAll(fromPriceNum, toPriceNum, q);
  }
}
