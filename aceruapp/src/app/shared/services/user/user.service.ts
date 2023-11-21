import { Injectable } from '@angular/core';
import { USERS_REGISTERS } from '../../constants/constants-auth';
import { IUserLogin, IUserRegister } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  listRegisterUser: IUserRegister[] = USERS_REGISTERS;
  constructor() { }

   hiddenForRol()
   {

    const rol =  this.getRegisterUserLogged()?.rol;
    let elemtsHidden= document.getElementsByClassName('hidden'+rol);
   if(elemtsHidden)
   {
     for(let item of elemtsHidden as any)
     {
      item.style.display='none';
     }

      }
   }
  setUserLocalStorage(dataUser: IUserLogin) {
    localStorage.setItem("user", JSON.stringify(dataUser))
  }
  getUserLocalStorage() {
    if (this.islogIn())
      return JSON.parse(localStorage.getItem("user") || "");
  }
  logout() {
    localStorage.removeItem('user');
  }
  islogIn(): boolean {
    return (localStorage.getItem('user') !== null);
  }

  setRegisterUser(newUser: IUserRegister) {
    this.listRegisterUser.push(newUser);
  }

  
  getRegisterUserLogged() {
    let actualuser = this.getUserLocalStorage();
    if (actualuser)
      return this.listRegisterUser.filter(user => user.email === actualuser.email && user.contrasena === actualuser.password)[0];
    return null
  }


  getExistUserInRecord({ email, password }: any) {
    return this.listRegisterUser.find(user => user.email === email && user.contrasena === password)
  }
}
