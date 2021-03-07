import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {LOGIN} from "./login.gql";
import "./Login.css";

export default function Login(){
    const [credentials, setCredentials] = useState({
        username:"",
        password:"",
    });

    const [loginMutation] = useMutation(LOGIN, {
        variables:{
            username: credentials.username,
            password: credentials.password
        }
    });

    const handleCredentialsChange = (event)=> {
        event.persist();
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    };

    const submitLogin = () => {
        loginMutation()
        .then(({data}) => {
            const {login} = data;
            localStorage.setItem("token", login.token);
            window.location.href="/home"
        })
        .catch( e => console.log(e));
    };

    if (localStorage.getItem("token")) return <Redirect to="/home"/>

    return (
        <div className="Login">
            {/* <header className="Login-header"/> */}
            <div className="Login-form">
                <h4>Username</h4>
                <input name="username" onChange={handleCredentialsChange}/>
                <h4>Password</h4>
                <input type="password" name="password" onChange={handleCredentialsChange}/>
                <button className="Login-submit" onClick={()=>submitLogin()}>Submit</button>
            </div>
      </div>
    );
}