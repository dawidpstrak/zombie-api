import { HttpStatus } from '@nestjs/common';
import { TestService } from './services/TestService';

const testService = new TestService();

describe('Item Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
        await testService.seedItems();
    });

    it(`POST /api/items/`, async () => {
        const zombie = await testService.createZombie('Test zombie');

        const { status, body: item } = await testService.api.post('/api/items').send({ zombieId: zombie.id });

        expect(status).toEqual(HttpStatus.CREATED);
        expect(item).toHaveProperty('id');
    });

    it(`GET /api/items/zombie/:id`, async () => {
        const zombie = await testService.createZombie('Test zombie');

        await testService.createZombieItem(zombie.id);

        const {
            status,
            body: { items, totalPrice }
        } = await testService.api.get(`/api/items/zombie/${zombie.id}`);

        expect(status).toEqual(HttpStatus.OK);
        expect(items).toHaveLength(1);
        expect(totalPrice).toHaveProperty('PLN');
        expect(totalPrice).toHaveProperty('EUR');
        expect(totalPrice).toHaveProperty('USD');
    });

    it(`DELETE /api/items/`, async () => {
        const zombie = await testService.createZombie('Test zombie');
        const zombieItem = await testService.createZombieItem(zombie.id);

        const { status } = await testService.api
            .delete('/api/items')
            .send({ zombieId: zombie.id, itemId: zombieItem.id });

        expect(status).toEqual(HttpStatus.NO_CONTENT);

        const {
            body: { items }
        } = await testService.api.get(`/api/items/zombie/${zombie.id}`);

        expect(items).toHaveLength(0);
    });
});
