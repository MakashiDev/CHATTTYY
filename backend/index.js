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

app.use(express.json());

const jwt = require("jsonwebtoken");
const { group } = require("console");
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
                res.status(409).send({ error: "Username already taken", status: 409 });
                return;
            } else {
                // check if email exists
                db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        if (row) {
                            res.send({ error: "Email already taken", status: 409 });
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
                                                    res.send({ error: err.message });
                                                } else {
                                                    const token = jwt.sign({
                                                            username: row.username,
                                                            user_id: row.user_id,
                                                        },
                                                        secretKey, {
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
                        }
                    }
                });
            }
        }
    });


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

// creating group chat
app.post("/api/v1/user/group/create", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const members = req.body.members;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            const user_id = decoded.user_id;
            const username = decoded.username;
            const timestamp = Date.now();
            let groupname = "";
            for (let i = 0; i < members.length; i++) {
                groupname += members[i].username + ", ";
            }
            // remove last comma
            groupname = groupname.substring(0, groupname.length - 2);
            if (groupname.length > 35) {
                groupname = groupname.substring(0, 35) + "...";
            }

            db.run(
                "INSERT INTO groups (group_name, created_by, created_at) VALUES (?, ?, ?)", [groupname, user_id, timestamp],
                (err) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        db.get(
                            "SELECT * FROM groups WHERE group_name = ? AND created_by = ? AND created_at = ?", [groupname, user_id, timestamp],
                            (err, row) => {
                                if (err) {
                                    res.send({ error: err.message });
                                } else {
                                    const group_id = row.group_id;
                                    for (let i = 0; i < members.length; i++) {
                                        // check if user is friends with creater
                                        db.get(
                                            "SELECT * FROM friends WHERE user_id = ? AND friend_id = ?", [user_id, members[i].user_id],
                                            (err, row) => {
                                                if (err) {
                                                    res.send({ error: err.message });
                                                } else {
                                                    if (row) {
                                                        // add user to group
                                                        console.log("adding " + members[i].username + " to group | ID: " + members[i].user_id + "");
                                                        db.run(
                                                            "INSERT INTO group_members (group_id, user_id, username, joined_at) VALUES (?, ?, ?, ?)", [group_id, members[i].user_id, members[i].username, timestamp],
                                                            (err) => {
                                                                if (err) {
                                                                    res.send({ error: err.message });
                                                                } else {
                                                                    res.send({ status: "success" });
                                                                }
                                                            }
                                                        );
                                                    } else {
                                                        res.status(401).send({ error: "You are not friends with " + members[i].username });
                                                    }
                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        );

                    }
                }
            );
        }
    });

});

// set group name
app.post("/api/v1/user/group/name/set", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const group_id = req.body.group_id;
    const group_name = req.body.group_name;

    console.log(group_id, group_name);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {

            // check if user is in group
            db.get(
                "SELECT * FROM group_members WHERE group_id = ? AND user_id = ?", [group_id, decoded.user_id],
                (err, row) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        if (row) {
                            // update group name
                            db.run(
                                "UPDATE groups SET group_name = ? WHERE group_id = ?", [group_name, group_id],
                                (err) => {
                                    if (err) {
                                        res.send({ error: err.message });
                                    } else {
                                        res.send({ status: "success" });
                                    }
                                }
                            );
                        } else {
                            res.status(401).send({ error: "You are not authorized to change this group name" });
                        }
                    }
                }
            );
        }
    });

});

// get group info
app.get("/api/v1/user/group/info/:group_id", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const group_id = req.params.group_id;

    console.log(group_id);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {

            // check if user is in group
            db.get(
                "SELECT * FROM group_members WHERE group_id = ? AND user_id = ?", [group_id, decoded.user_id],
                (err, row) => {
                    if (err) {
                        res.send({ error: err.message });
                    } else {
                        if (row) {
                            // get group info
                            db.get(
                                "SELECT * FROM groups WHERE group_id = ?", [group_id],
                                (err, row) => {
                                    if (err) {
                                        res.send({ error: err.message });
                                    } else {
                                        // get group members
                                        db.all(
                                            "SELECT * FROM group_members WHERE group_id = ?", [group_id],
                                            (err, rows) => {
                                                if (err) {
                                                    res.send({ error: err.message });
                                                } else {
                                                    res.send({
                                                        group: {
                                                            group_id: row.group_id,
                                                            group_name: row.group_name,
                                                            created_by: row.created_by,
                                                            created_at: row.created_at,
                                                            members: rows,
                                                        },
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        } else {
                            res.status(401).send({ error: "You are not authorized to view this group" });
                        }
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