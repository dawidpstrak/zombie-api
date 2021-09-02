import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CreateController } from '@/controllers/Item/CreateController';
import { DeleteController } from '@/controllers/Item/DeleteController';
import { ItemService } from '@/services/ItemService';
import { ItemRepository } from '@/repositories/ItemRepository';
import { ZombieRepository } from '@/repositories/ZombieRepository';
import { CalculateZombieItemsTotalPriceHandler } from '@/providers/CalculateZombieItemstTotalPriceHandler';
import { ZombieItemRepository } from '@/repositories/ZombieItemRepository';
import { UpdateItemsPrices } from '@/schedules/UpdateItemsPrices';
import { IndexController } from '@/controllers/Item/IndexController';

@Module({
    imports: [TypeOrmModule.forFeature([ItemRepository, ZombieRepository, ZombieItemRepository])],
    controllers: [IndexController, CreateController, DeleteController],
    providers: [ItemService, CalculateZombieItemsTotalPriceHandler, UpdateItemsPrices]
})
export class ItemModule {}
