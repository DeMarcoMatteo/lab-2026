import dayjs from 'dayjs';
import sqllite3 from 'sqlite3';
import db from './db.js';
import Film from './Film.js';


const filters = {
    'filter-favorite': {label: 'Favorites', filterFunction: film => film.favorite},
    'filter-best': {label: 'Best Rated', filterFunction: film => film.rating >= 5},
    'filter-lastmonth': {label: 'Seen Last Month', filterFunction: film => isSeenLastMonth(film)},
    'filter-unseen': {label: 'Unseen', filterFunction: film => !film.watchDate}
};

export default function FilmDao() {
    this.getFilms = (filter) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films';
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const films = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId));
                    if (filters.hasOwnProperty(filter))
                        resolve(films.filter(filters[filter].filterFunction));
                    else  // if an invalid filter is specified, all the films are returned.
                        resolve(films);
                }
            });
        });
    };

    this.getFilm = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        resolve(new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId));
                    } else {
                        resolve(null);
                    }   
                }
            });
        });
    };

    this.addFilm = (film) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO films (title, isFavorite, watchDate, rating, userId) VALUES (?, ?, ?, ?, ?)';
            db.run(query, [film.title, film.isFavorite, film.watchDate, film.rating, film.userId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Return the ID of the newly inserted film
                }
            });
        });
    };

    this.deleteFilm = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM films WHERE id = ?';
            db.run(query, [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes); // Return the number of rows deleted
                }
            });
        });
    };

    this.updateFilm = (film) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE films SET title = ?, isFavorite = ?, watchDate = ?, rating = ?, userId = ? WHERE id = ?';
            db.run(query, [film.title, film.isFavorite, film.watchDate, film.rating, film.userId, film.id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes); // Return the number of rows updated
                }
            });
        });
    };

    function isSeenLastMonth(film) {
        if (!film.watchDate) return false;
        const watchDate = dayjs(film.watchDate);
        const now = dayjs();
        return watchDate.isAfter(now.subtract(1, 'month')) && watchDate.isBefore(now);
    }
}

