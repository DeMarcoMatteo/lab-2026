import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const filters = [
    { key: 'all', label: 'All' },
    { key: 'favorites', label: 'Favorites' },
    { key: 'best', label: 'Best Rated' },
    { key: 'lastSeen', label: 'Seen Last Month' },
    { key: 'unseen', label: 'Unseen' },
];

function Filters({ activeFilter, onFilterChange }) {
    return (
        <div id="films-filters" className="col-md-3 bg-light">
            <div className="py-4">
                <h5 className="mb-3">Filters</h5>
                <ul className="nav nav-pills flex-column gap-2 mb-auto">
                    {filters.map((filter) => (
                        <li key={filter.key} className="nav-item">
                            <button
                                type="button"
                                className={`nav-link text-start w-100 ${activeFilter === filter.key ? 'active' : 'link-dark'}`}
                                aria-current={activeFilter === filter.key ? 'page' : undefined}
                                onClick={() => onFilterChange(filter.key)}
                            >
                                {filter.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Filters;