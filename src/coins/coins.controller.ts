import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.coinsService.findOne(id);
  }
}
