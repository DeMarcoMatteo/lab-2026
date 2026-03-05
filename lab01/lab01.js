import dayjs from 'dayjs';

class Film{
    static id=0;
    constructor(title,favorite=false,wathchedDate=null, rating=null, userid=1){
        this.id=Film.id++;
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
}

const FilmL = new FilmLibrary();

FilmL.addNewFilm(new Film("Pulp Fiction", true, dayjs('2023-04-20'), 5));
FilmL.addNewFilm(new Film("21 Grams", true, dayjs('2023-04-17'), 4));
FilmL.addNewFilm(new Film("Star Wars", false));
FilmL.addNewFilm(new Film("Matrix", false));

FilmL.sortByDate();
for (const film of FilmL.films) {
    console.log(`Id: ${film.id}, Title: ${film.title}, Favorite: ${film.favorite}, Watched Date: ${film.wathchedDate ? film.wathchedDate.format('YYYY-MM-DD') : 'null'}, Rating: ${film.rating}`);
}

FilmL.deleteFilm(2);
console.log("After deletion:");
for (const film of FilmL.films) {
    console.log(`Id: ${film.id}, Title: ${film.title}, Favorite: ${film.favorite}, Watched Date: ${film.wathchedDate ? film.wathchedDate.format('YYYY-MM-DD') : 'null'}, Rating: ${film.rating}`);
}

FilmL.ratefilm(3, 4);
console.log("After rating:");
for (const film of FilmL.films) {
    console.log(`Id: ${film.id}, Title: ${film.title}, Favorite: ${film.favorite}, Watched Date: ${film.wathchedDate ? film.wathchedDate.format('YYYY-MM-DD') : 'null'}, Rating: ${film.rating}`);
}