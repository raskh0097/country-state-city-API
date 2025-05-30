import { createServer } from 'http';
import app from './app';
import config from './configs';
import dataSource from './data-source';

const server = createServer(app);

server.listen(config.port, async () => {
    console.log(`Server is running -- PORT: ${config.port} | ENV: ${config.node_env}`)
})

dataSource.initialize()
    .then(() => {
        console.log('Database connection established successfully');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });