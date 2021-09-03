import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
    NODE_ENV: Joi.string().required(),

    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_ROOT_PASSWORD: Joi.string().required(),

    ITEMS_API_URL: Joi.string().required(),
    EXCHANGES_RATES_API_URL: Joi.string().required()
});
