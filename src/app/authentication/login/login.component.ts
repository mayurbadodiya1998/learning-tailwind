import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import CoreService from '../../../core/core.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted!: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private coreService: CoreService, private router: Router) { }

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
          this.coreService.toastrSuccess(res.message)
          this.router.navigate(['/home'])
        }
      }, error: err => {
        this.coreService.toastrError(err.error.error.message)
      }
    })

  }



}
