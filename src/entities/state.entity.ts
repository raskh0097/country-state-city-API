import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn, Unique } from 'typeorm';
import { Country } from './country.entity';
import { City } from './city.entity';

@Entity('states')
@Unique(['id'])
export class State {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country_id: number;

    @ManyToOne(() => Country, (country) => country.states, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @Column({ length: 2, nullable: true })
    country_code: string;

    @Column({ nullable: true })
    country_name: string;

    @Column({ nullable: true })
    state_code: string;

    @Column({ nullable: true })
    latitude: string;

    @Column({ nullable: true })
    longitude: string;

    @OneToMany(() => City, (city) => city.state)
    cities: City[];
}
