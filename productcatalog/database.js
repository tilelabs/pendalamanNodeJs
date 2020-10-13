import sqlite from 'sqlite3'


//export.initDatabase
export function initDatabase(){
    return new sqlite.Database('data', (err) => {
        if (err){
            throw err
        }

        console.log('Init DB Success')
    })
}

/**
 * 
 * @param {sqlite.Database} db 
 * @param {string} name
 * @param {number} price
 * @param {string} photo
 */

export function insertProduct(dbConnection, name, price, photo) {
    dbConnection.query('INSERT INTO product SET ?', { name, price, photo }, (err) => {
      if(err) {
        console.log(err)
        throw err
      }
    })
  }

 //init database
export function initDatabase(db){
    db.run(`CREATE TABLE IF NOT EXISTS product(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        photo TEXT NOT null,
        name VARCHAR(56 NOT NULL),
        price INTEGER NOT NULL
    );`)

})

/**
 * 
 * @param {sqlite.Connection} dbConnection 
 */
export function getProduct(dbConnection) {
    dbConnection.query('SELECT * FROM product', (err, result) => {
      if(err) {
        console.log(err)
        throw err
      }
      console.log(result)
      return result
    })
  }

}