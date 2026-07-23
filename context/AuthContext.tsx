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
  ) => Promise<boolean>;

  register: (
    user: {
      name: string;
      email: string;
      password: string;
    }
  ) => Promise<boolean>;

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



  // Restore login after refresh
  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "currentUser"
      );


    const token =
      localStorage.getItem(
        "token"
      );


    if (savedUser && token) {

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);




  async function login(
    email: string,
    password: string
  ): Promise<boolean> {


    try {


      const data =
        await loginUser({
          email,
          password,
        });



      const token =
        data.access_token;



      localStorage.setItem(
        "token",
        token
      );



      // Read JWT payload
      const payload =
        JSON.parse(
          atob(
            token.split(".")[1]
          )
        );



      const loggedUser: User = {

        _id: payload.id,

        email: payload.email,

        role: payload.role,

      };



      setUser(
        loggedUser
      );



      localStorage.setItem(
        "currentUser",
        JSON.stringify(loggedUser)
      );



      return true;



    } catch(error) {


      console.error(
        "Login error:",
        error
      );


      return false;

    }

  }






  async function register(
    newUser: {
      name: string;
      email: string;
      password: string;
    }
  ): Promise<boolean> {


    try {


      await registerUser(
        newUser
      );


      return true;



    } catch(error) {


      console.error(
        "Registration error:",
        error
      );


      return false;

    }

  }






  function logout() {


    setUser(null);


    localStorage.removeItem(
      "currentUser"
    );


    localStorage.removeItem(
      "token"
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
    useContext(
      AuthContext
    );



  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }



  return context;

}