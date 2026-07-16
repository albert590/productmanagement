"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { User } from "@/types/user";
import {
  loginUser,
  registerUser,
} from "@/services/auth";


interface AuthContextType {

  user: User | null;

  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => boolean;


  register: (
    user: User
  ) => boolean;


  logout: () => void;

}



const AuthContext =
createContext<AuthContextType | undefined>(
  undefined
);



export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [user, setUser] =
    useState<User | null>(null);



  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "currentUser"
      );


    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);





  function login(
    email: string,
    password: string
  ): boolean {


    const loggedUser =
      loginUser(
        email,
        password
      );


    if (!loggedUser) {

      return false;

    }


    setUser(loggedUser);


    localStorage.setItem(
      "currentUser",
      JSON.stringify(loggedUser)
    );


    return true;

  }





  function register(
    newUser: User
  ): boolean {


    try {

      registerUser(newUser);


      return true;


    } catch {

      return false;

    }

  }





  function logout() {


    setUser(null);


    localStorage.removeItem(
      "currentUser"
    );

  }





  return (

    <AuthContext.Provider

      value={{

        user,

        isAuthenticated:
          !!user,

        login,

        register,

        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}





export function useAuth() {


  const context =
    useContext(AuthContext);



  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;

}