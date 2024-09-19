import { useContext, useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap"
import { TodoContext } from "../contexts/TodoContext";

export default function TodoCard({ todo }) {
    const completed = todo.completed
    const border = completed ? "success" : "danger"
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const setTodos = useContext(TodoContext).setTodos

    const [show, setShow] = useState(false);


    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1)
            }, 1000)
            setTimerInterval(intervalID)
        }
    }

    const pauseTimer = () => {
        clearInterval(timerInterval)
        setTimerInterval(null)
    }

    const resetTimer = () => {
        clearInterval(timerInterval)
        setTimerInterval(null)
        setTimer(0)
    }

    const deleteTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.filter((prevTodos) => prevTodos.id !== todo.id)
        )
        setShow(false)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        return () => {
            clearInterval(timerInterval)
        }
    }, [timerInterval])

    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                    <p>Timer: {timer} seconds</p>
                    <Button variant="success" onClick={startTimer}>
                        <i className="bi bi-play-fill"></i>
                    </Button>
                    <Button variant="warning" onClick={pauseTimer} className="mx-2">
                        <i className="bi bi-pause-circle"></i>
                    </Button>
                    <Button onClick={resetTimer}>
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`todo/${todo.id}`} className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={handleShow} className="ms-2">
                        <   i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={deleteTodo}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
