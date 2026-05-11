import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MediaPembelajaranDB.db',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('DB Error:', error);
  },
);

export const createTables = () => {
  db.transaction(tx => {
    // TABLE USERS
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id_user INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('user','admin')) NOT NULL,
        nama TEXT,
        foto TEXT
      );`,
    );

    // INSERT ADMIN DEFAULT
    tx.executeSql(
      `INSERT OR IGNORE INTO users (username, password, role, nama)
       VALUES ('admin', 'admin', 'admin', 'Administrator')`,
      [],
      () => console.log('Admin default ready'),
      err => console.log('Insert admin error', err),
    );
  });
};

export default db;
