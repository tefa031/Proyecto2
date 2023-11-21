import { IUserRegister } from '../models/user.model';

export const ROLES = ['Administrador', 'Participante'];
export const USERS_REGISTERS: IUserRegister[] = [
  {
    nombre: 'Yuli Esmeralda Sinza Diaz',
    email: 'admin',
    contrasena: '1234',
    rol: ROLES[0],
  },
  {
    nombre: 'Jennyfer Estefania Iliva Caipe',
    email: 'jennyfer@udenar.com',
    contrasena: '123456',
    rol: ROLES[1],
  },
  {
    nombre: 'Prueba',
    email: '',
    contrasena: '',
    rol: ROLES[0],
  },
];
