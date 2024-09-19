import { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    function login() {
        const isCorrectUsername = username === "shaun@sigmaschool.com"
        const isCorrectPassword = password === "password"
        if (isCorrectUsername && isCorrectPassword) {
            authContext.setToken("1234")
            navigate("/dashboard")
        } else {
            alert("Incorrect username or password")
        }
    }

    return (
        <Container>
            <h1 className="my-3">Login to view todos</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={login}>Login</Button>
            </Form>
        </Container>
    )
}
