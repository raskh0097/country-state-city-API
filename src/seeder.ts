import fetch from "node-fetch";
import { Country } from "./entities/country.entity";
import { State } from "./entities/state.entity";
import { City } from "./entities/city.entity";
import dataSource from "./data-source";

const API_BASE = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/';

async function seedDatabase() {
    console.log('Seeding database started...');
    try {
        await dataSource.initialize();
        await seedCountries();
        await seedStates();
        await seedCities();
        console.log('Database seeding completed successfully.');
    } catch (error) {
        console.error('Error during database seeding:', error);
    } finally {
        await dataSource.destroy();
    }
};

async function fetchData<T>(endpoint: string): Promise<T[]> {
    const response = await fetch(`${API_BASE}${endpoint}.json`);
    return response.json() as Promise<T[]>;
}

async function seedCountries() {
    console.log('Seeding countries...');
    const countryRepo = dataSource.getRepository(Country);
    const countries = await fetchData<Country>('countries');

    const countryEntities = countries.map((c: Country) => {
        const country = new Country();
        country.id = parseInt(c.id.toString());
        country.name = c.name;
        country.iso3 = c.iso3;
        country.iso2 = c.iso2;
        country.numeric_code = c.numeric_code;
        country.phonecode = c.phonecode;
        country.capital = c.capital;
        country.currency = c.currency;
        country.currency_name = c.currency_name;
        country.currency_symbol = c.currency_symbol;
        country.native = c.native;
        country.region = c.region;
        country.nationality = c.nationality;
        country.latitude = c.latitude;
        country.longitude = c.longitude;
        country.emoji = c.emoji;
        return country;
    });

    await countryRepo.save(countryEntities);

    const totalCountries = await countryRepo.count();

    console.log(`Inserted ${totalCountries} of ${countries.length} countries.`);
}

async function seedStates() {
    console.log('Seeding states...');
    const stateRepo = dataSource.getRepository(State);
    const states = await fetchData<State>('states');

    const stateEntities = states.map((s) => {
        const state = new State();
        state.id = parseInt(s.id.toString());
        state.name = s.name;
        state.country_id = parseInt(s.country_id.toString());
        state.country_code = s.country_code;
        state.country_name = s.country_name;
        state.state_code = s.state_code;
        state.latitude = s.latitude;
        state.longitude = s.longitude;
        return state;
    });

    await stateRepo.save(stateEntities);

    const totalStates = await stateRepo.count();

    console.log(`Inserted ${totalStates} of ${states.length} states.`);
}

async function seedCities() {
    console.log('Seeding cities...');

    const cityRepo = dataSource.getRepository(City);
    const cities = await fetchData<City>('cities');

    const BATCH_SIZE = 1000;

    for (let i = 0; i < cities.length; i += BATCH_SIZE) {
        const batch = cities.slice(i, i + BATCH_SIZE);

        try {
            await cityRepo.insert(batch);
            console.log(`Inserted cities ${i + 1} to ${i + batch.length}`);
        } catch (error) {
            console.error(`Failed to insert cities ${i + 1} to ${i + batch.length}`, error);
        }
    }

    const totalCities = await cityRepo.count();

    console.log(`Inserted ${totalCities} of ${cities.length} cities.`);
}

seedDatabase();