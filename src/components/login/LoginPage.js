import React, {useState, useEffect} from 'react'
import "../../styles/LoginPage.css"
import { Button} from "@material-ui/core"
import db, { auth, provider } from "../../firebase"
import { useStateValue } from '../../StateProvider'
import { actionTypes } from "../../reducer"

function LoginPage() {
const [ state, dispatch ] = useStateValue();
const [ loginName, setLoginName] = useState(null);
const [ userName, setUserName ] = useState(null);

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            if (result.additionalUserInfo.profile.hd === "jessup.edu") {
                //dispatch the user indo into the reducer
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                    
                })

                if (result.additionalUserInfo.isNewUser === true) {
                    //adding username for customization
                    db.collection("users").doc(result.user.displayName).set({
                        userName: result.user.displayName
                    })
                }

            } else {
                alert("You can only sign in with Jessup email");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className = "login">
            <div className = "container">
                <h2>This is a online forum.</h2>
                <Button onClick = {signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default LoginPage
