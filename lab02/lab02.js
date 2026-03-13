import dayjs from 'dayjs';
import sqllite3 from 'sqlite3';

class Film{

    constructor(id,title,favorite=false,wathchedDate=null, rating=null, userid=1){
        this.id=id;
        this.title=title;
        this.favorite=favorite;
        this.wathchedDate=wathchedDate;
        this.rating=rating;
        this.userid=userid;
    }
}

function FilmLibrary(){
    this.films=[];
    this.addNewFilm=function(film){
        this.films.push(film);
    }
    this.sortByDate=function(){
        this.films.sort((a,b)=>{
            if(a.wathchedDate===null) return 1;
            if(b.wathchedDate===null) return -1;
            if(a.wathchedDate.isBefore(b.wathchedDate)) return -1;
            if(a.wathchedDate.isAfter(b.wathchedDate)) return 1;
            return 0;
        });
    }
    this.deleteFilm=function(id){
        this.films=this.films.filter(film=>film.id!==id);
    }
    this.ratefilm=function(id,rating){
        const film=this.films.find(film=>film.id===id);
        if(film){
            film.rating=rating;
        }
    }
    this.retrievefilmsfromdb=function(){
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM films',(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    this.films=rows.map(row=>new Film(row.id,row.title,Boolean(row.isFavorite),row.watchDate,row.rating,row.userid));
                    resolve(this.films);
                }
            });
        });
    };

    this.retrievefavoritefilms=function(){
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM films WHERE isFavorite=1',(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    this.films=rows.map(row=>new Film(row.id,row.title,Boolean(row.isFavorite),row.watchDate,row.rating,row.userid));
                    resolve(this.films);
                }
            })
        })
    }

    this.retrievebeforedatefilms=function(date){
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM films WHERE watchDate<?',[date],(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    this.films=rows.map(row=>new Film(row.id,row.title,Boolean(row.isFavorite),row.watchDate,row.rating,row.userid));
                    resolve(this.films);
                }           
            })
        })
    }   

    this.retrievefilmsfromtitle=function(title){
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM films WHERE title=?',[title],(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    this.films=rows.map(row=>new Film(row.id,row.title,Boolean(row.isFavorite),row.watchDate,row.rating,row.userid));
                    resolve(this.films);
                }
            })
        })
    }
    this.addnewFilmtoDB=function(film){
        return new Promise((resolve,reject)=>{
            db.run('INSERT INTO films (id,title,isFavorite,watchDate,rating,userid) VALUES (?,?,?,?,?,?)',
                [film.id,film.title,Number(film.favorite),film.wathchedDate,film.rating,film.userid],
                function(err){
                    if(err){
                        reject(err);
                        console.error('Error adding film to database:',err);
                    }else{
                        resolve(this);
                        console.log('Film added to database with id:',this.lastID);
                    }
                }
            );
        });
    }
    this.deleteFilmfromDB=function(id){
        return new Promise((resolve,reject)=>{
            db.run('DELETE FROM films WHERE id=?',[id],function(err){
                if(err){
                    reject(err);
                    console.error('Error deleting film from database:',err);
                }else{
                    resolve(this);
                    console.log('Film deleted from database with id:',id);
                }
            })
        });
    }
    this.deletewatchDatefromDB=function(){
        return new Promise((resolve,reject)=>{
            db.run('UPDATE films SET watchDate=NULL', function(err){
                if(err){
                    reject(err);
                    console.error('Error deleting watchDate from database:',err);
                }
                else{
                    resolve(this);
                    console.log('watchDate deleted from database');
                }
            })
        });
    }       
}

const db=new sqllite3.Database('films.db',(err)=>{
    if(err){
        throw err;
    }
    console.log('Connected to the database.');
});

async function main(){
    const library=new FilmLibrary();
    await library.deletewatchDatefromDB();
}

main()
    .catch((err)=>{
        console.error('Error while loading films:',err);
    })
    .finally(()=>{
        db.close();
    });