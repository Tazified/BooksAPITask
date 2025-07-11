import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  message = '';
  error = '';

  form:FormGroup

  

  constructor(private fb: FormBuilder, private auth: AuthService)
   {
    this.form = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  }

  submit() {
    if (this.form.invalid) return;
    this.auth.register(this.form.value).subscribe({
      next: res => (this.message = res),
      error: err => (this.error = err.error || 'Register failed')
    });
  }
}
