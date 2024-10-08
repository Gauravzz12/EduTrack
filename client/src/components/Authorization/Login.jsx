import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader/Loader";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to left, #ddf0ed, #abb0b6, #b4cfff);
  position: relative;
`;

const FormContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  min-height: 300px;
  display: flex;
  img {
    max-width: 300px;
    object-fit: contain;
  }
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #12376e;
`;

const Paragraph = styled.p`
  font-size: 22px;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'comic sans ms';
  font-style: italic;
  color: brown;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

const Button = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const GuestButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const LoginLink = styled(NavLink)`
  display: block;
  text-align: center;
  font-size: 14px;
  color: #007bff;
  margin-top: 10px;
`;

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('https://edu-track-dusky.vercel.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.status === 400 || !data) {
      window.alert('Invalid Credentials');
    } else {
      sessionStorage.setItem('name', data.name);
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('clg_id', data.clg_id);
      sessionStorage.setItem('year', data.year);

      setLoggedIn(true);
      navigate('/');
    }
  };

  const loginAsGuest = () => {
    setEmail("gaurav1234thakurgt@gmail.com");
    setPassword("1234");
  };

  return (
    <Container>
      {loading && (
        <LoaderOverlay>
          <Loader />
        </LoaderOverlay>
      )}
      <Heading>EDUTRACK+</Heading>
      <Paragraph>
        Precision for Progress, Insight for Impact. Track your academic journey with efficiency, unlock potential, and inspire a future of achievements
      </Paragraph>
      <FormContainer>
        <Form onSubmit={loginUser}>
          <FormGroup>
            <Label htmlFor="email">Email ID</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
          </FormGroup>
          <Button type="submit" value="Log In" />
          <GuestButton type="button" onClick={loginAsGuest}>
            Log in as Guest
          </GuestButton>
          <LoginLink to="/Register">
            Do not have an account? Sign Up
          </LoginLink>
        </Form>
        <img src="/assets/Logo.jpeg" alt="Logo" />
      </FormContainer>
    </Container>
  );
};

export default Login;
