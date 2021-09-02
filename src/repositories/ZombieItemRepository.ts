import { EntityRepository, Repository } from 'typeorm';
import { ZombieItem } from '@/entities/ZombieItem';

@EntityRepository(ZombieItem)
export class ZombieItemRepository extends Repository<ZombieItem> {}
