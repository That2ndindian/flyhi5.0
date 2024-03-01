import YourComponent from "./flights";
import React from "react";
import "./Home.css";

function Home() {
    return (
        <div className="home">
            <h1>Welcome to FlyHi</h1>
            <YourComponent/>

            <h2>Login</h2>

            <form action="/login">
                <div className="imgcontainer">

                </div>

                <div className="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>

                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember"/> Remember me
                    </label>
                </div>
            </form>

        </div>
    )
}
export default Home;
