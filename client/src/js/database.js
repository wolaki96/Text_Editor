import { openDB } from 'idb';

const initdb = async () =>
// creating a database called 'jate'
  openDB('jate', 1, {
    // adding db schema
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);

  const transaction = jateDb.transaction('jate', 'readwrite');

  const store = transaction.objectStore('jate');

  const request = store.put({ id: 1, jate: content });

  const result = await request;
  return result;
};



// Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('Get from the database');
const jateDb = await openDB('jate', 1);

const transaction = jateDb.transaction('jate', 'readonly');

const store = transaction.objectStore('jate');

const request = store.getAll();

const result = await request;
return result;
};


initdb();
