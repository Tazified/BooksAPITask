import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form: FormGroup;
  error = '';



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    
    this.form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }


  submit() {
  if (this.form.invalid) return;

  this.auth.login(this.form.value).subscribe({
    next: res => {
      localStorage.setItem('token', res.token);   // 🆕 save JWT
      alert('Success');
      this.router.navigate(['books']);
    },
    error: err => (this.error = err.error || 'Login failed')
  });
}

}
