import { sleep } from 'k6';
import { Options } from 'k6/options';
import sql from 'k6/x/sql';

const db = sql.open("sqlite3", "./data/test.db");

export let options: Options = {
    vus: 5,
    duration: '10s'
};

export function setup() {
    db.exec(`CREATE TABLE IF NOT EXISTS keyvalues (
             id integer PRIMARY KEY AUTOINCREMENT,
             key varchar NOT NULL,
             value varchar);`);
}

export function teardown() {
    db.close();
}


export default (): void => {
    db.exec("INSERT INTO keyvalues (key, value) VALUES('plugin-name', 'k6-plugin-sql');");

    let results = sql.query(db, "SELECT * FROM keyvalues;");
    for (const row of results) {
        console.log(`key: ${row.key}, value: ${row.value}`);
    }
    sleep(1);
};