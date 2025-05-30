import { Entity, Column, PrimaryColumn, OneToMany, Unique } from 'typeorm';
import { State } from './state.entity';
import { City } from './city.entity';

@Entity('countries')
@Unique(['id'])
export class Country {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({ length: 3, nullable: true })
    iso3: string;

    @Column({ length: 2, nullable: true })
    iso2: string;

    @Column({ length: 3, nullable: true })
    numeric_code: string;

    @Column({ nullable: true })
    phonecode: string;

    @Column({ nullable: true })
    capital: string;

    @Column({ nullable: true })
    currency: string;

    @Column({ nullable: true })
    currency_name: string;

    @Column({ nullable: true })
    currency_symbol: string;

    @Column({ nullable: true })
    native: string;

    @Column({ nullable: true })
    region: string;

    @Column({ nullable: true })
    nationality: string;

    @Column({ nullable: true })
    latitude: string;

    @Column({ nullable: true })
    longitude: string;

    @Column({ length: 4, nullable: true })
    emoji: string;

    @OneToMany(() => State, (state) => state.country)
    states: State[];

    @OneToMany(() => City, (city) => city.country)
    cities: City[];
}
