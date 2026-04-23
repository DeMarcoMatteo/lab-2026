import { useActionState } from "react";
import { Alert, Form } from "react-bootstrap";

function FilmForm(props){

    const initialState = {
        title: '',
        favorite: false,
        watchDate: null,
        rating: 0
    };

    const handleSubmit = async (prevState, formData) => {
        const film=Object.fromEntries(formData.entries());

        if(film.title.trim()==='') {
            film.error='Title is required';
            return film;
        }

        if(film.rating!=='' && (isNaN(film.rating) || film.rating<0 || film.rating>5)) {
            film.error='Rating must be a number between 0 and 5';
            return film;
        }

        props.addFilm(film);
        return initialState;
    }

    const [state, formAction]=useActionState(handleSubmit,initialState);
    
    return(
        <>
        {state.error && <Alert variant="secondary">{state.error}</Alert>}
        <Form action={formAction} className="film-form">
            <Form.Group className="mb-2">    
                <Form.Label>Title</Form.Label>
                <Form.Control size="sm" name="title" type="text"  placeholder="Enter title">   
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Favorite</Form.Label>
                <Form.Check name="favorite" type="checkbox" label="Mark as favorite"/>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Watch date</Form.Label>
                <Form.Control size="sm" name="watchDate" type="date"/>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Rating</Form.Label>
                <Form.Control size="sm" name="rating" type="number"/>
            </Form.Group>
            <button type="submit" className="btn btn-primary">Add</button>
        </Form>
        </>
    );
}

export default FilmForm;