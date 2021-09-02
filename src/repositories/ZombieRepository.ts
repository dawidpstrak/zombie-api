import { EntityRepository, Repository } from 'typeorm';
import { Zombie } from '@/entities/Zombie';

@EntityRepository(Zombie)
export class ZombieRepository extends Repository<Zombie> {}
