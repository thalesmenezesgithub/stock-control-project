import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  //Método de criar novo usuário no sistema
  sigupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse>{

    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )
  };

  authUser(requestDatas: AuthRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`,requestDatas);
  }
}
