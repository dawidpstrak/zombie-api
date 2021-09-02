import { Item } from '@/entities/Item';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {}
