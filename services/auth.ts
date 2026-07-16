import { User } from "@/types/user";


const USERS_KEY = "users";



export function getUsers(): User[] {

  if (typeof window === "undefined") {
    return [];
  }


  const data =
    localStorage.getItem(USERS_KEY);


  return data
    ? JSON.parse(data)
    : [];

}




export function registerUser(
  user: User
): boolean {


  const users = getUsers();



  const exists =
    users.some(
      (item)=>
        item.email === user.email ||
        item.username === user.username
    );



  if (exists) {

    return false;

  }



  users.push(user);



  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );



  return true;

}





export function loginUser(
  emailOrUsername: string,
  password: string
): User | null {


  const users = getUsers();



  const user =
    users.find(
      (item)=>

        (
          item.email === emailOrUsername ||
          item.username === emailOrUsername
        )

        &&

        item.password === password

    );



  return user || null;

}