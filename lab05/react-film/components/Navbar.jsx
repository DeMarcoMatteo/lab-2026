import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function AppNavbar() {
  return (
    <header class="py-3 border-bottom bg-primary">
    <div class="container-fluid gap-3 align-items-center">
        <div class="row">
            <div class="col-4">
                <a href="/" class="d-flex align-items-center link-light text-decoration-none">
                    <i class="bi bi-collection-play me-2 flex-shrink-0"></i>
                    <span class="h5 mb-0">Film Library</span>
                </a>
            </div>
            <div class="col-8 d-flex align-items-center justify-content-end">
                <form class="w-100 me-3">
                    <input type="search" class="form-control" placeholder="Search..." aria-label="Search"/>
                </form>

                <a href="#" class="d-block link-light text-decoration-none">
                    <i class="bi bi-person-circle"></i>
                </a>
            </div>
        </div>
    </div>
</header>
  );
}

export default AppNavbar;