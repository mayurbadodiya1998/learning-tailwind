import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputConfig } from 'ng-otp-input';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',

})
export class ForgetPasswordComponent implements OnInit {

  @Input() type!: 'LOGIN' | 'SIGNUP';
  @Input() getSignupMail!: string;
  otpForm!: FormGroup;
  isSubmitted!: boolean;
  otp!: number;
  isOtpAlreadySent = false;
  isEmailSubmitted = false;
  otpConfig: NgOtpInputConfig = {
    length: 4,
    inputStyles: {
      width: '45px',
      height: '45px',
      margin: '4px',
      fontSize: '18px',
      borderRadius: '0.375rem', // Equivalent to Tailwind `rounded-md`
      border: '1px solid #D1D5DB', // Tailwind `border-gray-300`
    },
    allowNumbersOnly: true,
    disableAutoFocus: true,
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private coreService: CoreService) { }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      email: ['', Validators.required],
      otp: ['', Validators.required]
    })
    if (this.getSignupMail) {
      this.isOtpAlreadySent = true
      this.otpForm.patchValue({ email: this.getSignupMail })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.otpForm.controls;
  }

  otpFormSubmit() {
    this.isSubmitted = true
    if (!this.otpForm.valid) {
      return
    }
    this.authService.verifyOtp(this.otpForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.coreService.successMessage(res.message);
          this.router.navigate(['/auth/login'])
        }
      }, error: err => {
        this.coreService.errorMessage(err.error.error.message)
      }
    })
  }

  sendOtp() {
    this.isEmailSubmitted = true;
    if (!this.otpForm.value.email) {
      return
    }
    let params = {
      email: this.otpForm.value.email
    }
    this.authService.sendOtp(params).subscribe({
      next: res => {
        if (res.success) {
          this.isOtpAlreadySent = true;
          this.coreService.successMessage(res.message)
        }
      }, error: err => {
        this.coreService.errorMessage(err.error.error.message)
      }
    })
  }
}
