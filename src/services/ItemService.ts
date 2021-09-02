import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from '@/repositories/ItemRepository';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateItemDto } from '@/dto/item/CreateItemDto';
import { Item } from '@/entities/Item';
import { ZombieRepository } from '@/repositories/ZombieRepository';
import { DeleteItemDto } from '@/dto/item/DeleteItemDto';
import { CalculateZombieItemsTotalPriceHandler } from '@/providers/CalculateZombieItemstTotalPriceHandler';
import ZombieItemsWithPrice from '@/interfaces/ZombieItemsWithPrice';
import { ZombieItemRepository } from '@/repositories/ZombieItemRepository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemRepository)
        @InjectRepository(ZombieRepository)
        @InjectRepository(ZombieItemRepository)
        private itemRepository: ItemRepository,
        private zombieRepository: ZombieRepository,
        private zombieItemRepository: ZombieItemRepository,
        private calculateZombieItemsTotalPriceHandler: CalculateZombieItemsTotalPriceHandler
    ) {}

    async findAll(zombieId: string): Promise<ZombieItemsWithPrice> {
        const zombie = await this.zombieRepository.findOne(zombieId);

        if (!zombie) {
            throw new NotFoundException();
        }

        const zombieItems = await this.zombieItemRepository.find({ where: { zombie } });

        const rawZombieItems = zombieItems.map(zombieItem => zombieItem.item);

        const itemsTotalPrice = await this.calculateZombieItemsTotalPriceHandler.handle(rawZombieItems);

        return { totalPrice: itemsTotalPrice, items: rawZombieItems };
    }

    async create({ zombieId, itemId }: CreateItemDto): Promise<Item> {
        const zombie = await this.zombieRepository.findOne(zombieId);
        const item = await this.itemRepository.findOne(itemId);

        if (!zombie || !item) {
            throw new NotFoundException('Zombie or item does not exist');
        }

        const { items } = await this.findAll(zombieId);

        if (items.length >= 5) {
            throw new UnprocessableEntityException('Zombie reached maximum number of 5 items');
        }

        const zombieItem = this.zombieItemRepository.create({ zombie, item });

        await this.zombieItemRepository.save(zombieItem);

        return item;
    }

    async delete({ zombieId, itemId }: DeleteItemDto): Promise<void> {
        const zombie = await this.zombieRepository.findOne(zombieId);
        const item = await this.itemRepository.findOne(itemId);

        if (!zombie || !item) {
            throw new NotFoundException('Zombie or item does not exist');
        }

        const zombieItem = await this.zombieItemRepository.findOne({ item, zombie });

        await this.zombieItemRepository.delete(zombieItem);
    }

    truncate(): Promise<DeleteResult> {
        return this.itemRepository.delete({});
    }
}
