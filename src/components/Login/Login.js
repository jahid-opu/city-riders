import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.css';
import Form from 'react-bootstrap/Form'
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)

}


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [pass, setPass] = useState();
    const [newUser, setNewUser] = useState(true);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
        success: false,
        photo: ""
    });
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // Google sign in
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                alert(errorMessage);
            });
    }

    // handle Login with email password
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            const name = user.name;
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    updateUserName(name);
                    const { displayName, email } = user;
                    const signedInUser = { name: name, email }
                    setLoggedInUser(signedInUser);
                    console.log(displayName, email);
                    history.replace(from);

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    alert(errorMessage);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const signedInUser = { name: displayName, email }
                    setLoggedInUser(signedInUser);
                    history.replace(from);

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    alert(errorMessage);
                });
        }
        history.replace(from);
    }

    // Update user name
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            // Update successful.
            console.log("update successful", name)
        }).catch(function (error) {
            // An error happened.
            console.log("An error happened")
        });

    }
    // Input field handle
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = (isPasswordValid && passwordHasNumber);
            if (!isFieldValid) {
                alert("password must be greater than 6 character and should have at least one digit")
            }
            else {
                setPass(e.target.value);
            }
        }

        if (e.target.name === 'confirmPassword') {
            if (pass === e.target.value) {
                isFieldValid = true;
            }
            else {
                alert("Password did not match")
            }
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            console.log("state", e.target.name, e.target.value)
            setUser(newUserInfo);
        }
    }


    return (
        <div className="form-section">
            {/* Sign Up Form */}
            { newUser && <form className="form-group" onSubmit={handleSubmit}>
                <h3 style={{marginBottom:"20px"}}>Create an account</h3>
                <input onBlur={handleBlur} type="text" name="name" placeholder="Name" className="form-control" required /> <br />
                <input onBlur={handleBlur} type="text" name="email" placeholder="Email" className="form-control" required /> <br />
                <input onBlur={handleBlur} type="password" name="password" name="password" id="" placeholder="Password" className="form-control" required /> <br />
                <input onBlur={handleBlur} type="password" name="confirmPassword" id="" placeholder="Confirm Password" className="form-control" required /> <br />
                <input className="form-control btn btn-primary" type="submit" value="Sign up" /><br />
            </form>} <br />

            {/* Login Form */}
            { !newUser && <form className="form-group" onSubmit={handleSubmit}>
            <h3 style={{marginBottom:"20px"}}>Login</h3>

                <input onBlur={handleBlur} name="email" type="text" placeholder="Email" class="form-control" /> <br />
                <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Password" className="form-control" required /> <br />
                <input className="form-control btn btn-primary" type="submit" value="Sign in" /><br />
            </form>} <br />

            {
                message && <p>errorMessage: {message}</p>
                
            }
            { console.log("error MEssage:",message)}
            <p>{newUser ?
                <span>Already have an account? </span>
                : <span>Don't have an account? </span>}
                {newUser ? <span className="link" onClick={() => setNewUser(!newUser)}>Log in</span>
                    : <span className="link" onClick={() => setNewUser(!newUser)}>Create an account</span>} </p>
            <button className="btn btn-primary"onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;