import config from './src/config';

const { db: dbConfig } = config();

export default {
    ...dbConfig,
    seeds: ['src/seeders/**/*{.ts,.js}'],
    entities: ['src/entities/*.{ts,js}']
};
