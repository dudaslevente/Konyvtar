require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var mysql = require('mysql');
var pool = mysql.createPool({
  host     : process.env.DBHOST,
  user     : process.env.DBUSER,
  password : process.env.DBPASS,
  database : process.env.DBNAME
});

app.get('/books', (req, res) => {
    pool.query(`SELECT * FROM books`, (err, results) => {
      if (err){
        res.status(500).send('Hiba történt az adatbázis lekérés közben!');
        return;
      }
      res.status(200).send(results);
      return;
    });
});

app.post('/books', (req, res) => {
  if (!req.body.title || !req.body.publication_year || !req.body.isbn || !req.body.authorID) {
      res.status(400).send('Nem adtál meg minden kötelező adatot!');
      return;
  }

  pool.query(`INSERT INTO books (title, publication_year, isbn, authorID) VALUES (?, ?, ?, ?)`, 
             [req.body.title, req.body.publication_year, req.body.isbn, req.body.authorID], 
             (err, results) => {
      if (err) {
          res.status(500).send('Hiba történt az adatbázis lekérés közben!');
          return;
      }
      res.status(200).send(results);
      return;
  });
});


app.patch('/books/:ID', (req, res) => {
    if (!req.params.ID) {
        res.status(203).send('Hiányzó azonosító!');
        return;
    }

    if (!req.body.cim || !req.body.kiadas_ev || !req.body.ISBM){
        res.status(203).send('Nem adtál meg minden kötelező adatot!');
        return;
    }

    pool.query(`UPDATE books SET cim=${req.body.cim}, kiadas_ev=${req.body.kiadas_ev}, ISBM=${req.body.ISBM} WHERE ID='${req.params.ID}'`, (err, results) => {
        if (err){
          res.status(500).send('Hiba történt az adatbázis művelet közben!');
          return;
        }
    
        if (results.affectedRows == 0){
          res.status(203).send('Nincs ilyen adat!');
          return;
        }
    
        res.status(200).send('A könyv adatai módosítva!');
        return;
      });
});

app.delete('/books/:ID', (req, res) => {
    if (!req.params.ID) {
        res.status(203).send('Hiányzó azonosító!');
        return;
    }

    pool.query(`DELETE FROM books WHERE ID='${req.params.ID}'`, (err, results) => {
        if (err){
          res.status(500).send('Hiba történt az adatbázis művelet közben!');
          return;
        }
    
        if (results.affectedRows == 0){
          res.status(203).send('Nincs ilyen adat!');
          return;
        }
    
        res.status(200).send(`A könyv törölve!`);
        return;
      });   
});
// Szerzők listázása
app.get('/authors', (req, res) => {
  pool.query('SELECT * FROM authors', (err, results) => { // Itt cserélj db-re pool-t
      if (err) {
          console.error(err); // Hiba naplózása
          return res.status(500).json({ message: 'Hiba történt a szerzők lekérésekor.' });
      }
      res.json(results);
  });
});

// Szerzők feltöltése
app.post('/authors', (req, res) => {
  const { name, szul_datum } = req.body;

  // Egyszerű ellenőrzés
  if (!name || !szul_datum) {
      return res.status(400).json({ error: 'Név és születési dátum kötelező!' });
  }

  // Adatok mentése az adatbázisba
  pool.query(`INSERT INTO authors (name, szul_datum) VALUES (?, ?)`, [name, szul_datum], (err, results) => {
      if (err) {
          console.error(err); // Hiba naplózása
          return res.status(500).json({ error: 'Hiba történt a szerző mentésekor.' });
      }
      res.status(201).json({ message: 'Szerző sikeresen mentve!', author: { name, szul_datum } });
  });
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});