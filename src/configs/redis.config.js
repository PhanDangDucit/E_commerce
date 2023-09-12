const redis = require('redis');

const client = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});

client.on('error', err => 
    console.error('Connect redis failed!')
);


client.on('connect', () => 
    console.log(`Connect database ::redis successfully!`)
);

client.on('ready', () => 
    console.log(`Connect database ::redis :: ready!`)
);

async function connectRedis() {
    await client.connect();
}

module.exports = { connectRedis };