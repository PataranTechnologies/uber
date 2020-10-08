import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LogoutFragment.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });


export class LogoutFragment extends Component {
    render() {
        return (
            <div>
                <h3>You Want Logout From This Page</h3><br />
                <Form>
                    <Form.Row>
                        <Form.Group>
                            <Link >
                                <Button variant="primary" type="submit" size="md">
                                    Logout
                                </Button>

                            </Link>
                        </Form.Group>
                    </Form.Row>

                </Form>
            </div>
        )
    }
}

export default LogoutFragment;
