

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {

  private storageKey = 'dataServiceData';
  private usuario: any;

  setData(data: T) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): T | null {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearData() {
    localStorage.removeItem(this.storageKey);
  }

  setUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): any {
    const storedUsuario = localStorage.getItem('usuario');
    return storedUsuario ? JSON.parse(storedUsuario) : null;
  }

  clearUsuario() {
    localStorage.removeItem('usuario');
  }
}
