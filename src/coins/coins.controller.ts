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
    const fromPriceNum = Number(fromPrice);
    const toPriceNum = Number(toPrice);

    return this.coinsService.findAll(fromPriceNum, toPriceNum, q);
  }
}
