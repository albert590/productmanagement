"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import { User } from "@/types/user";


export default function AdminUsersPage(){

  const [users,setUsers] =
    useState<User[]>([]);



  useEffect(()=>{

    setUsers(getUsers());

  },[]);



  return (

    <main>

      <h1 className="text-3xl font-bold mb-6">
        Users Management
      </h1>


      <div className="bg-white rounded shadow">

        {users.length === 0 ? (

          <p className="p-5">
            No users found
          </p>

        ) : (

          users.map((user)=>(

            <div
              key={user.id}
              className="border-b p-4 flex justify-between"
            >

              <div>

                <h2 className="font-bold">
                  {user.name}
                </h2>


                <p className="text-sm text-gray-500">
                  {user.email}
                </p>

              </div>



              <span className="bg-teal-100 px-3 py-1 rounded">
                {user.role}
              </span>


            </div>

          ))

        )}

      </div>

    </main>

  );

}