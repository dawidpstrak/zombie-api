import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

@Injectable()
export class CalculateZombieItemsTotalPriceHandler {
    constructor(private configService: ConfigService) {}

    async handle(zombieItems) {
        try {
            const { url } = this.configService.get('exhangeRatesApi');

            const {
                data: [{ rates }]
            } = await axios.get(url);

            const { bid: euroToPolishZlotyRate } = rates.find(rate => rate.code === 'EUR');
            const { bid: usdToPolishZlotyRate } = rates.find(rate => rate.code === 'USD');

            const totalItemsPriceInPolishZloty = zombieItems.length
                ? zombieItems.reduce((acc, curr) => acc + parseInt(curr.item_price), 0)
                : 0;
            const totalItemsPriceInEuro = parseInt((totalItemsPriceInPolishZloty / euroToPolishZlotyRate).toFixed(1));
            const totalItemsPriceInUsd = parseInt((totalItemsPriceInPolishZloty / usdToPolishZlotyRate).toFixed(1));

            return {
                PLN: totalItemsPriceInPolishZloty,
                EUR: totalItemsPriceInEuro,
                USD: totalItemsPriceInUsd
            };
        } catch (error) {
            console.error(error);
        }
    }
}
