import { User } from "@/types/user";

const USERS_KEY = "users";


export function getUsers(): User[] {

  if (typeof window === "undefined") {
    return [];
  }


  const users =
    localStorage.getItem(USERS_KEY);


  return users
    ? JSON.parse(users)
    : [];

}



export function saveUser(user: User) {

  if (typeof window === "undefined") {
    return;
  }


  const users = getUsers();


  users.push(user);


  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

}



export function deleteUser(id: string) {

  const users = getUsers();


  const filteredUsers =
    users.filter(
      (user)=>user.id !== id
    );


  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(filteredUsers)
  );

}