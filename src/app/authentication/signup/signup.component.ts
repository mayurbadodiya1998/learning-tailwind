import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitted!: boolean;
  isOtpSent = false;
  userEmail = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  get f() {
    return this.signupForm.controls
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      return
    }

    this.authService.signup(this.signupForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.userEmail = this.signupForm.value.email;
          this.toastr.success(res.message)
          this.isOtpSent = true
        }
      }, error: err => {
        this.toastr.error(err.error.error.message)
      }
    })
  }
}
