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
    if (!req.body.cim || !req.body.kiadas_ev || !req.body.ISBM){
        res.status(203).send('Nem adtál meg minden kötelező adatot!');
        return;
     }

    pool.query(`INSERT INTO books VALUES('${req.body.cim}', ${req.body.kiadas_ev}, ${req.body.ISBM}')`, (err, results)=>{
      if (err){
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

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});