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
const path = require("path");
const cors = require("cors");

app.use(cors());
// Allow cross origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


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

    console.log("User login attempt: ", username, password);

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?", [username, password],
        (err, row) => {
            if (err) {
                res.status(500).send({ error: err.message });
            } else {
                if (row) {
                    const token = jwt.sign({ username: row.username, user_id: row.user_id },
                        secretKey, {
                            expiresIn: "24h",
                        }
                    );
                    res.send({ token: token, status: "success" });
                } else {
                    if (!username.includes("@")) {
                        res.status(401).send({
                            error: "Invalid username or password",
                            status: 401,
                        });
                        return;
                    }
                    // check for email
                    db.get(
                        "SELECT * FROM users WHERE email = ? AND password = ?", [username, password],
                        (err, row) => {
                            if (err) {
                                res.status(500).send({ error: err.message });
                            } else {
                                if (row) {
                                    const token = jwt.sign({
                                            username: row.username,
                                            user_id: row.user_id,
                                        },
                                        secretKey, {
                                            expiresIn: "24h",
                                        }
                                    );
                                    res.send({
                                        token: token,
                                        status: "success",
                                    });
                                } else {
                                    res.status(401).send({
                                        error: "Invalid username or password",
                                        status: 401,
                                    });
                                }
                            }
                        }
                    );
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
                res.status(409).send({
                    error: "Username already taken",
                    status: 409,
                });
                return;
            } else {
                // check if email exists
                db.get(
                    "SELECT * FROM users WHERE email = ?", [email],
                    (err, row) => {
                        if (err) {
                            res.send({ error: err.message });
                        } else {
                            if (row) {
                                res.status(409).send({
                                    error: "Email already taken",
                                    status: 409,
                                });
                                return;
                            } else {
                                db.run(
                                    "INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, ?)", [username, password, email, timestamp],
                                    (err) => {
                                        if (err) {
                                            res.send({ error: err.message });
                                        } else {
                                            // Get the newly created user
                                            db.get(
                                                "SELECT * FROM users WHERE username = ?", [username],
                                                (err, row) => {
                                                    if (err) {
                                                        res.send({
                                                            error: err.message,
                                                        });
                                                    } else {
                                                        const token = jwt.sign({
                                                                username: row.username,
                                                                user_id: row.user_id,
                                                            },
                                                            secretKey, {
                                                                expiresIn: "24h",
                                                            }
                                                        );
                                                        res.send({
                                                            token: token,
                                                            status: "success",
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
        }
    });
});

app.post("/api/v1/user/username", (req, res) => {
    // Query database for user
    const username = req.body.username;

    console.log("Checking username: ", username);

    // Check if user exists
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            if (row) {
                res.status(409).send({
                    error: "Username already taken",
                    status: 409,
                });
                return;
            } else {
                res.send({ status: "success" });
            }
        }
    });
});

app.get("/api/v1/user/info", (req, res) => {
    // get bearer token

    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.send({ error: err.message, status: 401 });
        } else {
            console.log("Getting user info for token: ", decoded.username);
            res.send({ user: decoded, status: "success" });
        }
    });
});

// sending friend request
app.post("/api/v1/user/friend/request", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const user_id = decoded.user_id;
            const friend_id = req.body.friend_id;
            const timestamp = Date.now();

            console.log(`${user_id} sent a friend request to ${friend_id}`);

            db.run(
                "INSERT INTO friend_requests (sender_id, receiver_id, timestamp) VALUES (?, ?, ?)", [user_id, friend_id, timestamp],
                (err) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        res.send({ status: "success" });
                    }
                }
            );
        }
    });
});

// getting friend requests
app.get("/api/v1/user/friend/requests", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const user_id = decoded.user_id;

            db.all(
                "SELECT * FROM friend_requests WHERE receiver_id = ?", [user_id],
                (err, rows) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        res.send({ requests: rows });
                    }
                }
            );
        }
    });
});

// accepting friend request
app.post("/api/v1/user/friend/accept", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const user_id = decoded.user_id;
            const friend_request_id = req.body.friend_request_id;

            db.get(
                "SELECT * FROM friend_requests WHERE request_id = ?", [friend_request_id],
                (err, row) => {
                    if (err) {
                        res.status(500).send({ error: err.message });
                    } else {
                        if (row) {
                            const sender_id = row.sender_id;
                            const receiver_id = row.receiver_id;
                            const timestamp = Date.now();

                            if (receiver_id == user_id) {
                                db.run(
                                    "INSERT INTO friends (user_id, friend_id, timestamp) VALUES (?, ?, ?)", [sender_id, receiver_id, timestamp],
                                    (err) => {
                                        if (err) {
                                            res.status(500).send({
                                                error: err.message,
                                            });
                                        } else {
                                            db.run(
                                                "INSERT INTO friends (user_id, friend_id, timestamp) VALUES (?, ?, ?)", [
                                                    receiver_id,
                                                    sender_id,
                                                    timestamp,
                                                ],
                                                (err) => {
                                                    if (err) {
                                                        res.status(500).send({
                                                            error: err.message,
                                                        });
                                                    } else {
                                                        db.run(
                                                            "DELETE FROM friend_requests WHERE request_id = ?", [friend_request_id],
                                                            (err) => {
                                                                if (err) {
                                                                    res.send({
                                                                        error: err.message,
                                                                    });
                                                                } else {
                                                                    res.send({
                                                                        status: "success",
                                                                    });
                                                                }
                                                            }
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            } else {
                                res.status(401).send({
                                    error: "You are not authorized to accept this request",
                                });
                            }
                        } else {
                            res.status(404).send({
                                error: "Friend request not found",
                            });
                        }
                    }
                }
            );
        }
    });
});

// rejecting friend request
app.post("/api/v1/user/friend/reject", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const user_id = decoded.user_id;
            const friend_request_id = req.body.friend_request_id;

            db.get(
                "SELECT * FROM friend_requests WHERE request_id = ?", [friend_request_id],
                (err, row) => {
                    if (err) {
                        res.status(500).send({ error: err.message });
                    } else {
                        if (row) {
                            const sender_id = row.sender_id;
                            const receiver_id = row.receiver_id;

                            if (receiver_id == user_id) {
                                db.run(
                                    "DELETE FROM friend_requests WHERE request_id = ?", [friend_request_id],
                                    (err) => {
                                        if (err) {
                                            res.send({
                                                error: err.message,
                                            });
                                        } else {
                                            res.send({
                                                status: "success",
                                            });
                                        }
                                    }
                                );
                            } else {
                                res.status(401).send({
                                    error: "You are not authorized to reject this request",
                                });
                            }
                        } else {
                            res.status(404).send({
                                error: "Friend request not found",
                            });
                        }
                    }
                }
            );
        }
    });
});

// getting friends
app.get("/api/v1/user/friends", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const user_id = decoded.user_id;

            db.all(
                "SELECT * FROM friends WHERE user_id = ?", [user_id],
                (err, rows) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        res.send({ friends: rows });
                    }
                }
            );
        }
    });
});

// getting friend requests
app.get("/api/v1/user/friend/requests", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const user_id = decoded.user_id;

            db.all(
                "SELECT * FROM friend_requests WHERE receiver_id = ?", [user_id],
                (err, rows) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        res.send({ requests: rows });
                    }
                }
            );
        }
    });
});

// getting friend info
app.get("/api/v1/user/friend/info/:friend_id", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const friend_id = req.params.friend_id;

            db.get(
                "SELECT * FROM users WHERE user_id = ?", [friend_id],
                (err, row) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        res.send({
                            friend: {
                                friend_id: row.user_id,
                                username: row.username,
                                nickname: row.nickname,
                            },
                        });
                    }
                }
            );
        }
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));