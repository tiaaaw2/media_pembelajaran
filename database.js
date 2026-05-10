import SQLite from 'react-native-sqlite-storage';

// open database
const db = SQLite.openDatabase(
  {
    name: 'MediaPembelajaranDB.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error('Error opening database:', error);
  },
);

// CREATE TABLE PENGGUNA
const createUserTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pengguna (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          gambar TEXT,
          username TEXT,
          password TEXT,
          role TEXT,
          bio TEXT,
          nama TEXT,
          tgl_lahir TEXT
      );`,
      [],
      () => {

        console.log('Tabel pengguna berhasil dibuat');

        // INSERT ADMIN DEFAULT
        tx.executeSql(
          `INSERT INTO pengguna 
          (username, password, role, nama)
          SELECT 'admin', '123', 'admin', 'Administrator'
          WHERE NOT EXISTS (
            SELECT 1 FROM pengguna WHERE username='admin'
          );`,
          [],
          () => {
            console.log('Admin default berhasil dibuat');
          },
          error => {
            console.log('Error insert admin:', error);
          }
        );

      },
      error => {
        console.error('Error creating tables:', error);
      },
    );
  });
};

// GET ALL PENGGUNA
const getAllPengguna = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM pengguna;',
      [],
      (txObj, resultSet) => {

        const rows = resultSet.rows;
        const penggunaList = [];

        for (let i = 0; i < rows.length; i++) {
          penggunaList.push(rows.item(i));
        }

        console.log('Data pengguna:', penggunaList);

      },
      (txObj, error) => {
        console.error('Error fetching pengguna:', error);
      }
    );
  });
};

// CREATE TABLE MATERI
const createMateriTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS materi (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        judul TEXT,
        deskripsi TEXT,
        gambar TEXT,
        tgl_deskripsi TEXT,
        tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
      [],
      () => {
        console.log('Tabel materi berhasil dibuat');
      },
      error => {
        console.error('Error creating materi table:', error);
      },
    );
  });
};

// INITIALIZE DATABASE
createUserTables();
createMateriTables();

export default db;