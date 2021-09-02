import { InjectRepository } from '@nestjs/typeorm';
import { ZombieRepository } from '@/repositories/ZombieRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Zombie } from '@/entities/Zombie';
import { DeleteResult } from 'typeorm';
import { UpdateZombieDto } from '@/dto/zombie/UpdateZombieDto';
import { CreateZombieDto } from '@/dto/zombie/CreateZombieDto';

@Injectable()
export class ZombieService {
    constructor(
        @InjectRepository(ZombieRepository)
        private zombieRepository: ZombieRepository
    ) {}

    async create({ name }: CreateZombieDto): Promise<Zombie> {
        const zombie = this.zombieRepository.create({
            name
        });

        await this.zombieRepository.save(zombie);

        return zombie;
    }

    findAll(): Promise<Zombie[]> {
        return this.zombieRepository.find();
    }

    async findOne(id: string): Promise<Zombie> {
        const zombie = await this.zombieRepository.findOne(id);

        if (!zombie) {
            throw new NotFoundException();
        }

        return zombie;
    }

    async update(id: string, { name }: UpdateZombieDto): Promise<Zombie> {
        const zombie = await this.zombieRepository.findOne(id);

        if (!zombie) {
            throw new NotFoundException();
        }

        await this.zombieRepository.update(id, { name });

        return this.zombieRepository.findOne(id);
    }

    delete(id: string): void {
        this.zombieRepository.delete(id);
    }

    truncate(): Promise<DeleteResult> {
        return this.zombieRepository.delete({});
    }
}
