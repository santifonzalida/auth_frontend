export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  dni: string;
  email: string | null;
  telefono: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePacienteDto {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  dni: string;
  email?: string;
  telefono?: string;
}
