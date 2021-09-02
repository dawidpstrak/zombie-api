import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import axios from 'axios';
import { Item } from '../entities/Item';
import config from '../config';

const {
    itemsApi: { url: itemsApiUrl }
} = config();

export default class CreateItems implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        try {
            const {
                data: { items }
            } = await axios.get(itemsApiUrl);

            await connection.createQueryBuilder().insert().into(Item).values(items).execute();
        } catch (error) {
            console.error(error);
        }
    }
}
