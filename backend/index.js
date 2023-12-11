// Chatttyy the chat app backend

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 4001;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("main.db");

app.use(express.json());

const jwt = require("jsonwebtoken");
const secretKey =
	"ChatttyySecretKeyThatIsVerySecret/!@#$%^&*()_+asq324vsdwasd[]";

let currentUsers = [];

io.on("connection", (socket) => {
	console.log("New client connected");
	socket.on("disconnect", () => console.log("Client disconnected"));
});

app.get("/api/v1/", (req, res) => {
	res.send({ response: "I am alive" }).status(200);
});

app.post("/api/v1/user/login", (req, res) => {
	// Query database for user
	const username = req.body.username;
	const password = req.body.password;

	db.get(
		"SELECT * FROM users WHERE username = ? AND password = ?",
		[username, password],
		(err, row) => {
			if (err) {
				res.status(500).send({ error: err.message });
			} else {
				if (row) {
					const token = jwt.sign(
						{ username: row.username, user_id: row.user_id },
						secretKey,
						{
							expiresIn: "24h",
						}
					);
					res.send({ token: token, status: "success" });
				} else {
					res.status(401).send({
						error: "Invalid username or password",
						status: 401,
					});
				}
			}
		}
	);
});

app.post("/api/v1/user/register", (req, res) => {
	// Query database for user
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	const timestamp = Date.now();
	console.log(username, password, email, timestamp);

	// Check if user exists
	db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
		if (err) {
			res.status(500).send({ error: err.message });
		} else {
			if (row) {
				res.status(409).send({ error: "Username already taken" });
				return;
			}
		}
	});

	// check if email exists
	db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
		if (err) {
			res.send({ error: err.message });
		} else {
			if (row) {
				res.send({ error: "Email already taken", status: 409 });
				return;
			}
		}
	});

	db.run(
		"INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, ?)",
		[username, password, email, timestamp],
		(err) => {
			if (err) {
				res.send({ error: err.message });
			} else {
				// Get the newly created user
				db.get(
					"SELECT * FROM users WHERE username = ?",
					[username],
					(err, row) => {
						if (err) {
							res.send({ error: err.message });
						} else {
							const token = jwt.sign(
								{
									username: row.username,
									user_id: row.user_id,
								},
								secretKey,
								{
									expiresIn: "24h",
								}
							);
							res.send({ token: token, status: "success" });
						}
					}
				);
			}
		}
	);
});

app.get("/api/v1/user/info", (req, res) => {
	// get bearer token
	const token = req.headers.authorization.split(" ")[1];
	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			res.send({ error: err.message });
		} else {
			res.send({ user: decoded });
		}
	});
});

app.get("*", (req, res) => {
	res.send("Hello World!");
});

server.listen(port, () => console.log(`Listening on port ${port}`));
