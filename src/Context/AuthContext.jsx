import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "../firebaseConfig";
import {doc,setDoc} from 'firebase/firestore';


const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    
    const[user,setUser]=useState({});

    const signUp=(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password);

        setDoc(doc(db,'users',email),{
            saveShow:[]
        })

    }

    const signIn=(email,password)=>signInWithEmailAndPassword(auth,email,password);

    const signout=()=>signOut(auth);

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>setUser(currentUser));

        return ()=>unsubscribe();
    },[])


    return(
    <AuthContext.Provider value={{user,signIn,signUp,signout}}>
        {children}
    </AuthContext.Provider>
    )
}

export const UserAuth=()=>useContext(AuthContext);