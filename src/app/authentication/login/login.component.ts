import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted!: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  loginFormSubmit() {

    this.isSubmitted = true

    if (!this.loginForm.valid) {
      return
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        if (res) {
          console.log("login res ", res)
          this.toastr.success(res.message)
        }
      }, error: err => {
        console.log(err)
        this.toastr.error(err.error.error.message)
      }
    })

  }



}
