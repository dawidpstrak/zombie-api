import { ZombieService } from '@/services/ZombieService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ZombieRepository } from '@/repositories/ZombieRepository';
import { IndexController } from '@/controllers/Zombie/IndexController';
import { ShowController } from '@/controllers/Zombie/ShowController';
import { UpdateController } from '@/controllers/Zombie/UpdateController';
import { DeleteController } from '@/controllers/Zombie/DeleteController';
import { CreateController } from '@/controllers/Zombie/CreateController';

@Module({
    imports: [TypeOrmModule.forFeature([ZombieRepository])],
    controllers: [IndexController, CreateController, ShowController, UpdateController, DeleteController],
    providers: [ZombieService]
})
export class ZombieModule {}
