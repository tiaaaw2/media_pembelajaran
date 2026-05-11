const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('login.db');

db.serialize(() => {
  // Buat tabel users
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'user'))
    )
  `);

  // Tambahkan user contoh dengan hash password
  const users = [
    { username: 'admin1', password: 'adminpass', role: 'admin' },
    { username: 'user1', password: 'userpass', role: 'user' },
  ];

  users.forEach(async user => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    db.run(
      `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
      [user.username, hashedPassword, user.role],
    );
  });
});

db.close();
console.log('Database siap!');
