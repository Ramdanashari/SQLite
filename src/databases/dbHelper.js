import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'books.db', location: 'default' });

export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Books (
                id TEXT PRIMARY KEY,
                title TEXT,
                genre TEXT,
                director TEXT,
                status TEXT,
                image TEXT,
                description TEXT,
                rating REAL,
                releaseYear TEXT
            );`
        );
    });
};

export const saveBooks = (books) => {
    db.transaction((tx) => {
        books.forEach((book) => {
            tx.executeSql(
                `INSERT OR REPLACE INTO Books (id, title, genre, director, status, image, description, rating, releaseYear)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [book.id, book.title, book.genre, book.director, book.status, book.image, book.description, book.rating, book.releaseYear]
            );
        });
    });
};

export const getBooks = (callback) => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM Books;', [], (_, results) => {
            const rows = results.rows;
            let books = [];
            for (let i = 0; i < rows.length; i++) {
                books.push(rows.item(i));
            }
            callback(books);
        });
    });
};

export const checkBooksInDatabase = () => {
    getBooks((books) => {
        console.log('Books in Database:', books);
    });
};

