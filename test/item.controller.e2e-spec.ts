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

    it(`GET /api/items/`, async () => {
        const zombie = await testService.createZombie('Test zombie');

        await testService.createZombieItem(zombie.id);

        const {
            status,
            body: { items }
        } = await testService.api.get('/api/items').send({ zombieId: zombie.id });

        expect(status).toEqual(HttpStatus.OK);
        expect(items).toHaveLength(1);
    });

    it(`POST /api/items/`, async () => {
        const zombie = await testService.createZombie('Test zombie');

        const { status, body: item } = await testService.api.post('/api/items').send({ zombieId: zombie.id });

        expect(status).toEqual(HttpStatus.CREATED);
        expect(item).toHaveProperty('id');
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
        } = await testService.api.get('/api/items').send({ zombieId: zombie.id });

        expect(items).toHaveLength(0);
    });
});
