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

app.get('/allUsers', (req, res) => {
	async function getAllUsers() {
		try {
			const users = await queries.get_all_users({}, adapter);
			res.send(users);
		} catch {
			res.send('couldn\'t get users');
		}
	}
	getAllUsers();
});

app.listen(port, () => {
	console.log("listening on port 9000");
});
