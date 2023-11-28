import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email:['', Validators.required],
    password: ['',Validators.required],
  });

  signupForm = this.formBuilder.group({ 
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private cookieService: CookieService,
    private messageService: MessageService
  ){ }

  //Funcionalidade de Login ao sistema
  onSubmiteLoginForm(): void{
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set('USER_INFOR', response?.token);
            this.loginForm.reset();

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem-vindo de volta ${response?.name}!`,
              life: 2000,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao efetuar o login!`,
            life: 2000,
          });
        }
      });
    }
  }

  
  //Criar novo usuário
  onSubmiteSignupForm(): void{
    if(this.signupForm.value && this.signupForm.valid){
      this.userService.sigupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if(response){
            this.signupForm.reset();
            this.loginCard = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário criado com sucesso!',
              life: 2000,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao criar usuário!`,
            life: 2000,
          });
          console.log(err);
        },
      });
    }
  }
}
