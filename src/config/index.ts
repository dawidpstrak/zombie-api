import { config } from 'dotenv';

config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const env = (key, defaultValue = null) => process.env[key] || defaultValue;

export default () => ({
    app: {
        env: env('NODE_ENV')
    },
    itemsApi: {
        url: env('ITEMS_API_URL')
    },
    exhangeRatesApi: {
        url: env('EXCHANGES_RATES_API_URL')
    },
    db: {
        type: env('DATABASE_DIALECT', 'mysql'),
        url:
            env('DATABASE_DIALECT', 'mysql') +
            '://' +
            env('DATABASE_USERNAME', 'guest') +
            ':' +
            env('DATABASE_PASSWORD', 'guest') +
            '@' +
            env('DATABASE_HOST', 'localhost') +
            ':' +
            env('DATABASE_PORT', 3306) +
            '/' +
            env('DATABASE_NAME', 'db'),
        host: env('DATABASE_HOST', 'localhost'),
        name: env('DATABASE_NAME'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        dialect: env('DATABASE_DIALECT', 'mysql'),
        port: parseInt(env('DATABASE_PORT', 3306)),

        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: true
        }
    }
});
