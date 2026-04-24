import { useActionState } from "react";
import { Alert, Form } from "react-bootstrap";
import dayjs from "dayjs";

function FilmForm(props){

    const initialState = {
        title: props.initialFilm?.title ?? '',
        favorite: props.initialFilm?.favorite ?? false,
        watchDate: props.initialFilm?.watchDate ? props.initialFilm.watchDate.format('YYYY-MM-DD') : '',
        rating: props.initialFilm?.rating ?? ''
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

       
        if(film.watchDate && dayjs(film.watchDate).isAfter(dayjs())) {
            film.error='You don\'t have a time machine, watch date must be in the past';
            return film;
        }

        if (props.editFilm) {
            props.editFilm({ ...film, id: props.initialFilm?.id });
        } else {
            props.addFilm(film);
        }
        return initialState;
    }

    const [state, formAction]=useActionState(handleSubmit,initialState);
    
    return(
        <>
        {state.error && <Alert variant="secondary">{state.error}</Alert>}
        <Form action={formAction} className="film-form">
            <Form.Group className="mb-2">    
                <Form.Label>Title</Form.Label>
                <Form.Control size="sm" name="title" type="text" defaultValue={state.title} placeholder="Enter title">   
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Favorite</Form.Label>
                <Form.Check name="favorite" type="checkbox" defaultChecked={state.favorite} label="Mark as favorite"/>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Watch date</Form.Label>
                <Form.Control size="sm" name="watchDate" type="date" defaultValue={state.watchDate}/>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Rating</Form.Label>
                <Form.Control size="sm" name="rating" type="number" defaultValue={state.rating}/>
            </Form.Group>
            {props.editFilm && <button type="submit" className="btn btn-success">Save</button>}
            {!props.editFilm && <button type="submit" className="btn btn-primary">Add</button>}

        </Form>
        </>
    );
}

export default FilmForm;