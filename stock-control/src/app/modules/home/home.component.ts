import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;
  signupForm = this.formBuilder.group({ 
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
})

  loginForm = this.formBuilder.group({
    email:['', Validators.required],
    password: ['',Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService){
  }

  onSubmiteLoginForm(): void{
    console.log('Dados do formulário de login', this.loginForm.value);
  }

  //Criar novo usuário
  onSubmiteSignupForm(): void{
    if(this.signupForm.value && this.signupForm.valid){
      this.userService.sigupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if(response){
            alert('Usuário criado com sucesso!');
          }
        },
        error: (err) => console.log(err)
      });
    }
  }
}
