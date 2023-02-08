import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userProfile,userLogout } from "../redux";
import AlertShow from "../Components/AlertShow";
import { browserName } from "react-device-detect";
import Loader from "../Components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { userInfo } = state.userLogin;
  const { loading, user, error } = state.userDetails;
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo ) {
      navigate("../signin", { replace: true });
    } 
    else {
      if (!user.name) {
        //First time open the page this condition will be executed
        dispatch(userProfile());
      } else {
        //Second time open the page this condition will be executed
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, navigate, userInfo]);


  //logout without
  useEffect(()=>{
    if(userInfo && (browserName!=='Chrome'&& browserName!=='Safari')){
        dispatch(userLogout());
        navigate("/", {
          state:{
            loggedOut:1
          }
        });
        
    }
  },[])
  
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          {loading && <Loader />}
          {error && <AlertShow variant="danger" message={error} />}
          {message && <AlertShow variant="danger" message={message} />}
          <Col md={5}>
            <h1>User Information</h1>
            <h6>Hi {name}! You are logged in {browserName} browser</h6>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  disabled
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  disabled
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
