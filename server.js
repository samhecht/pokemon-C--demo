const express = require('express');
const app = express();
const port = 9000;
const mysql = require('mysql');
const puresql = require('puresql');
const cors = require('cors');


const dbPassword = 'whateverPassword'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : dbPassword,
	database : 'task_manager'
});

const adapter = puresql.adapters.mysql(connection);
const queries = puresql.loadQueries('user.sql');

app.get('/', (req, res) => {
	res.send('hello world');
});

app.get('/getTypes', (req, res) => {
    const poke_name = req.query.pokeName;
	async function getTypes() {
		try {
			const types = await queries.get_pokemon_types({poke_name: poke_name}, adapter);
			res.send(types);
		} catch {
			res.send('couldn\'t get types');
		}
	}
	getTypes();
});

app.get('/goodAgainst', (req, res) => {
    const poke_name = req_.query.pokeName;
    async function getGoodAgainst() {
        try {
            const types = await queries.get_pokemon_types({poke_name: poke_name}, adapter);
            const goodAgainstTypes = await queries.get_good_against_types({user_type: types}, adapter);
            const pokeIds = await queries.get_poke_ids_from_types({poke_type: goodAgainstTypes}, adapter);
            const names = await queries.get_names_from_ids({poke_id: pokeIds}, adapter);
            res.send(names);

        } catch {
            res.send("couldn't get pokemon")
        }
    }
});

app.listen(port, () => {
	console.log("listening on port 9000");
});
