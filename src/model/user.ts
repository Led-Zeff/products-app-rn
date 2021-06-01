export interface LoginResponse {
  usuario: AppUser;
  token: string;
}

export interface AppUser {
  uid: string;
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  img?: string;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface SignUpRequest {
  nombre: string;
  correo: string;
  password: string;
}

export interface UserOverview {
  _id: string;
  nombre: string;
}
