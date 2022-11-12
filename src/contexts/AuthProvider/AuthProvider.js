import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser === null || currentUser?.emailVerified) {
                setUser(currentUser);
            }
        });
        setLoading(false)
        return () => {
            unsubscribe()
        }
    }, [user])
    // google auth 
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const providerLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // email register 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // email verification
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }

    // signIN 
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // update profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    // logout 
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const authInfo = { loading,setLoading, user, createUser, verifyEmail, providerLogin, signIn, updateUserProfile, logOut }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;