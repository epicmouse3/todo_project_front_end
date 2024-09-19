import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BrowserRouter, Outlet, Route, Routes, useNavigate, } from 'react-router-dom'
import { TodoContext } from './contexts/TodoContext';
import AddTodo from './pages/AddTodo';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import useLocalStorage from 'use-local-storage';
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthContext, AuthProvider } from './components/AuthContext';
import RequireAuth from './components/RequireAuth';
import EditTodo from './pages/EditTodo';
import { useContext } from 'react';

function Layout() {

  const logout = useContext(AuthContext).logout
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Todos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Shaun">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default function App() {
  // const [token, setToken] = useState(null);
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <AuthProvider>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <AuthContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="add" element={<AddTodo />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="todo/:id" element={<EditTodo />} />
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                  path="/dashboard"
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </TodoContext.Provider>
    </AuthProvider>
  )
}
