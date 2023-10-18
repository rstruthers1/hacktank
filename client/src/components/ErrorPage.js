import {Container} from "react-bootstrap";


function ErrorPage({errorMessage}) {
    return (<Container id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{errorMessage}</i>

        </p>
    </Container>);
}

export default ErrorPage;