const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

/*     Scope
  *     Boots
        Dagger
        Sword
        Pewpew
        Golden Gun
        Shield
        Barrier
  */

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Cookie', cost: 1000 }),
		CurrencyShop.upsert({ name: 'Scope', cost: 25 }),
		CurrencyShop.upsert({ name: 'Boots', cost: 25 }),
		CurrencyShop.upsert({ name: 'Dagger', cost: 50 }),
		CurrencyShop.upsert({ name: 'Sword', cost: 100 }),
		CurrencyShop.upsert({ name: 'Pewpew', cost: 150 }),
		CurrencyShop.upsert({ name: 'Golden Gun', cost: 300 }),
		CurrencyShop.upsert({ name: 'Shield', cost: 75 }),
		CurrencyShop.upsert({ name: 'Barrier', cost: 125 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);