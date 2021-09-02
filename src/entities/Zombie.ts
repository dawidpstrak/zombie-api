import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ZombieItem } from './ZombieItem';

@Entity()
export class Zombie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => ZombieItem, zombieItem => zombieItem.zombie, { onDelete: 'CASCADE' })
    zombieItems: ZombieItem[];
}
