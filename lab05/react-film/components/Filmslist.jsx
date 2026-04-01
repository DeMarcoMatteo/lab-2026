import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Filmlist() {
    return (
        <div className="col-md-9 pt-3">
            <h1><span id="filter-title">All</span> films</h1>
            <ul id="films-list" className="list-group list-group-flush">
            </ul>
        </div>
    );
}

export default Filmlist;