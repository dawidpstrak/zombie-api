import { ZombieModule } from './modules/ZombieModule';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/schema';
import config from './config';
import { ItemModule } from './modules/ItemModule';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            validationSchema: configValidationSchema,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const dbConfig = configService.get('db');

                return {
                    ...dbConfig,
                    entities: [__dirname + '/entities/*.{ts,js}'],
                    synchronize: true
                };
            }
        }),
        ScheduleModule.forRoot(),
        ZombieModule,
        ItemModule
    ]
})
export class AppModule {}
