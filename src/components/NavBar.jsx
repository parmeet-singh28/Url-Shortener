import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/logo.jpeg'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom'

function MyNavbar() {
  const [login, setLogin] = useState(false);
  const [signin, setSignUp] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [name, setName] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.user != null) {
      setLogin(false)
      setSignUp(false)
      setIsLoggedin(true);
      if (firebase.user.displayName != null) {
        setName(firebase.user.displayName);
      }
      else {
        setName(firebase.user.email)
      }
    }
  }, [firebase.user])
  const handelLogout = () => {
    firebase.logoutUser()
    setIsLoggedin(false);
    setName("")
    navigate('/')
  }
  return (
    <Navbar style={{ backgroundColor: '#284243', }} expand="lg">
      <Container>
        <Image height="45px" className='mx-3 google-fonts-ubuntu' src={logo} rounded />
        <Navbar.Brand style={{ color: 'white', fontSize: '23px', }} href="">iLinkShort</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " style={{ background: 'white' }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-3">
            <Nav.Link href="/" style={{ fontSize: "18px", color: "white" }}>Home</Nav.Link>
            {isLoggedin === true ? (<Nav.Link style={{ fontSize: "18px", color: "white" }} href="/links">Links</Nav.Link>) : (null)}
            <Nav.Link style={{ fontSize: "18px", color: "white" }} href="/about">About Us</Nav.Link>
            <Nav.Link style={{ fontSize: "18px", color: "white" }} href="/contact">Contact Us</Nav.Link>
          </Nav>
          {isLoggedin === true ? (
            <>
              <Navbar.Text className='google-fonts-ubuntu' style={{ color: "white" }}>
                {name}
              </Navbar.Text>
              <Button variant="danger" className="mx-3" onClick={handelLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="light" className="mx-3" onClick={() => setLogin(true)}>
                Login
              </Button>

              <LoginPage
                show={login}
                onHide={() => setLogin(false)}
              />
              <Button variant="primary" className="mx-3" onClick={() => setSignUp(true)}>
                Sign Up
              </Button>

              <SignupPage
                show={signin}
                onHide={() => setSignUp(false)}
              />
            </>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
