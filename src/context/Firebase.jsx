
import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, collection, addDoc, query, where, getDocs, setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
const { v4: uuidv4 } = require('uuid');

const firebaseConfig = {
    apiKey: "AIzaSyCgx43mPL8U4CYJNMiREg-OkUFErbVSclQ",
    authDomain: "urlshortner-2e06f.firebaseapp.com",
    projectId: "urlshortner-2e06f",
    storageBucket: "urlshortner-2e06f.appspot.com",
    messagingSenderId: "907496100296",
    appId: "1:907496100296:web:4071b95dd4d58670a530fd",
    databaseURL: "https://urlshortner-2e06f-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);


export const ContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(user);
                setEmail(user.email);
            }
        });
    })
    const generateShortUUID = () => {
        const fullUUID = uuidv4(); // Generate a full UUID
        const shortUUID = fullUUID.substring(0, 6);
        return shortUUID;

    };
    const logoutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign-out successful")
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }
    const loginSignupWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                // alert("Login Successful")
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                alert(errorMessage);
            });
    }
    const signupWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                // alert("Account Created Successful")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                // console.log(errorMessage)
                alert(errorMessage)
            });
    }
    const loginWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                // alert("Login successful")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Wrong email or password");
            });
    }

    const putData = async (originalUrl) => {
        const shortUrl = generateShortUUID();
        await setDoc(doc(db, "urls", shortUrl), {
            originalUrl,
            shortUrl,
            clicks: 0,
            email,
        });
        return shortUrl;
    }
    const getUrl = async (id) => {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        console.log("snapdata", docSnap.data());
        const clicks = docSnap.data().clicks;
        const urlRef = doc(db, 'urls', id);
        await updateDoc(urlRef, {
            clicks: clicks + 1,
        });
        return docSnap.data().originalUrl;
    }
    const fetchLinksFromEmail = async (email) => {
        if (user == null) return null;
        const q = query(collection(db, "urls"), where("email", "==", email));

        const result = await getDocs(q);
        return result;
    }
    const fetchAllUrl = async () => {
        const q = (collection(db, "urls"))

        const querySnapshot = await getDocs(q);
        return querySnapshot;
    }
    return (

        <FirebaseContext.Provider value={{ generateShortUUID, logoutUser, loginSignupWithGoogle, user, signupWithEmailAndPassword, loginWithEmailAndPassword, fetchAllUrl, putData, getUrl, fetchLinksFromEmail }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}