import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/firebase.init';

const auth = getAuth(app);


const Main = () => {

    const [user, setUser] = useState({});
    console.log(user);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleLogin = () =>{
        // console.log('clicked the function');
        signInWithPopup(auth, googleProvider)
        .then(result =>{
            const user = result.user;
            setUser(user)
            console.log(user);
        })
        .catch(error => console.log("Firebase Error :", error))
    }

    const handleGitHubLogin = () =>{
        // console.log('GitHud Login');
        signInWithPopup(auth, githubProvider)
        .then(result =>{
            const user = result.user;
            setUser(user)
            console.log(user);
        })
        .catch(error => console.log("GitHub Error :", error))

    }

    const handleSignOut=()=>{
        // console.log("clicked");
        signOut(auth)
        .then(()=>{
            setUser("")
        })
        .catch((error)=>{
            "Error",error
        })
    }

    return (
        <div>
            <h1>Hello Firebase Are You Ready?</h1>

            {
                user.uid? <button onClick={handleSignOut}>Sign Out</button> : <>
                    <button onClick={handleGoogleLogin}>Login with Google</button>
                    <button onClick={handleGitHubLogin}>Login with GitHub</button>
                </>
            }
            {
                user.uid && <div>
                    <h3>Name : {user?.displayName}</h3>
                    <h3>Email : {user?.email}</h3>
                    <img src={user?.photoURL} alt="" />
                </div>
            }
            
            
        </div>
    );
};

export default Main;