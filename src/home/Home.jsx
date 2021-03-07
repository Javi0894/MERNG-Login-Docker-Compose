import React from "react";
import {Redirect} from "react-router-dom";
import "./Home.css";

export default function Home(){
    
    if (!localStorage.getItem("token")) return <Redirect to="/login"/>

    return (
        <div className="Home">
            <header className="Home-header">
            <p>
                <code>Home Frontend</code>
            </p>
            </header>
      </div>
    );
}