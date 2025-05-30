import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Country } from './country.entity';
import { State } from './state.entity';

@Entity('cities')
@Unique(['id'])
export class City {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    state_id: number;

    @ManyToOne(() => State, (state) => state.cities, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'state_id' })
    state: State;

    @Column({ nullable: true })
    state_code: string;

    @Column({ nullable: true })
    state_name: string;

    @Column()
    country_id: number;

    @ManyToOne(() => Country, (country) => country.cities, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @Column({ nullable: true })
    country_code: string;

    @Column({ nullable: true })
    country_name: string;

    @Column({ nullable: true })
    latitude: string;

    @Column({ nullable: true })
    longitude: string;
}
