import { ItemRepository } from '@/repositories/ItemRepository';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

import axios from 'axios';

@Injectable()
export class UpdateItemsPrices {
    constructor(
        @InjectRepository(ItemRepository)
        private itemRepository: ItemRepository,
        private configService: ConfigService
    ) {}

    @Cron('0 01 00 * * *')
    async updateItemsPrices() {
        const { url: itemsApiUrl } = this.configService.get('itemsApi');

        const {
            data: { items }
        } = await axios.get(itemsApiUrl);

        const currentItems = await this.itemRepository.find();

        const updatePromises = currentItems.map(currentItem =>
            this.itemRepository.update(currentItem.id, { ...items.find(item => item.id === currentItem.id) })
        );

        await Promise.all(updatePromises);

        new Logger().verbose('Updated items prices');
    }
}
