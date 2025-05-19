import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinner,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  loading:boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.form = fb.group({
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^u[0-9]{9}@(upc.edu.pe)")]],
    })
  }
  ingresar(){
    console.log(this.form.value.email, this.form.value.password);
    console.log(this.form.status);
    const nickname = this.form.value.nickname;
    const password = this.form.value.password;
    const email = this.form.value.email;
    if (email == 'u202311064@upc.edu.pe' && password == '123456') {
      this.loading = true;
      this.success()
      setTimeout(() => { this.router.navigateByUrl('/dashboard'); }, 500);
    } else{
      this.error();
    }
  };
  success(){
    this._snackBar.open('Credenciales_validas', '',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }
  error(){
    this._snackBar.open('Credenciales_Incorrectas', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }
}
