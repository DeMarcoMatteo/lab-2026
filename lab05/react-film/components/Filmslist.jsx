import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Filmslist({ films, filterLabel }) {
    return (
        <div className="col-md-9 pt-3">
            <h1><span id="filter-title">{filterLabel}</span> films</h1>
            <ul id="films-list" className="list-group list-group-flush">
                {renderFilmRows2(films)}
            </ul>
        </div>
    );
}

export default Filmslist;

function renderFilmRows(films) {
    return films.map(film => {
        return (
            <li key={film.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{film.title}</div>
                    {film.watchDate ? `Watched on ${film.watchDate.format('YYYY-MM-DD')}` : "Not watched yet"}
                </div>
                <span className="badge bg-primary rounded-pill">{film.rating ?? '-'}</span>
            </li>
        );
    });
}

function renderFilmRows2(films) {
    return films.map(film => {
        return (
            <li key={film.id} className="list-group-item">
                <div className="row align-items-center">
                    <div className="col-1 text-center">
                        {film.favorite ? <i className="bi bi-suit-heart-fill text-danger"></i> : <i className="bi bi-suit-heart"></i>}
                    </div>
                    <div className="col-4 fw-bold">{film.title}</div>
                    <div className="col-5">{film.watchDate ? `Watched on ${film.watchDate.format('YYYY-MM-DD')}` : "Not watched yet"}</div>
                    <div className="col-2 text-end">{renderRatingStars(film.rating)}</div>
                </div>
            </li>
        );
    });
}

function renderRatingStars(rating) {
    const safeRating = Number.isInteger(rating) ? Math.max(0, Math.min(5, rating)) : 0;

    return [...Array(5)].map((_, index) => (
        <i
            key={index}
            className={`bi ${index < safeRating ? 'bi-star-fill text-warning' : 'bi-star '} me-1`}
        ></i>
    ));
}
