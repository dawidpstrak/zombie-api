import { INestApplication } from '@nestjs/common';
import { ZombieService } from '@/services/ZombieService';
import { AppModule } from '@/AppModule';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import axios from 'axios';
import config from '@/config';
import { ItemRepository } from '@/repositories/ItemRepository';
import { Item } from '@/entities/Item';
import { ItemService } from '@/services/ItemService';

export class TestService {
    private app: INestApplication;
    private testModule;
    private zombieService: ZombieService;
    private itemService: ItemService;
    api;

    initializeTestingEnvironment = async () => {
        this.testModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        this.app = this.testModule.createNestApplication();

        this.zombieService = this.app.get<ZombieService>(ZombieService);
        this.itemService = this.app.get<ItemService>(ItemService);

        await this.app.init();

        this.api = request(this.app.getHttpServer());
    };

    seedItems = async () => {
        try {
            const {
                itemsApi: { url: itemsApiUrl }
            } = config();

            const {
                data: { items }
            } = await axios.get(itemsApiUrl);

            const itemRepository = this.app.get(ItemRepository);

            await itemRepository.createQueryBuilder().insert().into(Item).values(items).execute();
        } catch (error) {
            console.error(error);
        }
    };

    createZombie = name => {
        return this.zombieService.create({ name });
    };

    createZombieItem = zombieId => {
        return this.itemService.create({ zombieId, itemId: '1' });
    };

    truncateDatabase = async () => {
        await this.zombieService.truncate();
        await this.itemService.truncate();
    };
}
