import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/resgister", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="vh-100 vw-100 d-flex justify-content-center  align-items-center">
      <Form className="bg-warning p-4 rounded-4">
        <Form.Group className="mb-3" controlId="exampleInputName1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleInputEmail1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleInputPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Registration;
