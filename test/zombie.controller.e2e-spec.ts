import { TestService } from './services/TestService';
import { HttpStatus } from '@nestjs/common';

const testService = new TestService();

describe('Zombie Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
    });

    it(`GET /api/zombies/`, async () => {
        await testService.createZombie('Test zombie');

        const { status, body: zombies } = await testService.api.get('/api/zombies');

        expect(status).toEqual(HttpStatus.OK);
        expect(zombies).toHaveLength(1);
    });

    it(`POST /api/zombies/`, async () => {
        const { status, body: newZombie } = await testService.api.post('/api/zombies').send({ name: 'Test Zombie' });

        expect(status).toEqual(HttpStatus.CREATED);
        expect(newZombie).toHaveProperty('id');
    });

    it(`GET /api/zombies/:id`, async () => {
        const newZombie = await testService.createZombie('Test zombie');

        const { status, body: zombie } = await testService.api.get(`/api/zombies/${newZombie.id}`);

        expect(status).toEqual(HttpStatus.OK);
        expect(newZombie.id).toEqual(zombie.id);
        expect(zombie).toHaveProperty('id');
    });

    it(`PATCH /api/zombies/:id`, async () => {
        const newZombie = await testService.createZombie('Test zombie');

        const { status, body: updatedZombie } = await testService.api
            .patch(`/api/zombies/${newZombie.id}`)
            .send({ name: 'Updated test zombie' });

        expect(status).toEqual(HttpStatus.OK);
        expect(updatedZombie.name).toEqual('Updated test zombie');
    });

    it(`DELETE /api/zombies/:id`, async () => {
        const newZombie = await testService.createZombie('Test zombie');

        const { status } = await testService.api.delete(`/api/zombies/${newZombie.id}`);

        expect(status).toEqual(HttpStatus.NO_CONTENT);

        const { status: statusAfterDelete } = await testService.api.get(`/api/zombies/${newZombie.id}`);

        expect(statusAfterDelete).toEqual(HttpStatus.NOT_FOUND);
    });
});
