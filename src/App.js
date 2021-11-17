import React from "react";
import Post from "./components/Post";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import User from "./components/User";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route exact path="/" element={<Post />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </Container>
    </Router>)
}

export default App;
