export interface User {
    sub: string;
    email: string;
    nombre: string;
    apellido: string;
    roles: string[];
    permissions: string[];
  }