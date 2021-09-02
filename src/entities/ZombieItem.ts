import { Item } from './Item';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Zombie } from './Zombie';

@Entity()
export class ZombieItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => Zombie, zombie => zombie.zombieItems, { onDelete: 'CASCADE' })
    zombie: Zombie;
    @ManyToOne(() => Item, item => item.zombieItems)
    item: Item;
}
