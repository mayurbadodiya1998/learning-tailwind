import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',

})
export class ForgetPasswordComponent implements OnInit {

  @Input() type!: 'LOGIN' | 'SIGNUP';
  @Input() email!: string;
  otpForm!: FormGroup;
  isSubmitted!: boolean;
  otp!: number;
  isEmailSubmitted = false;
  otpConfig: NgOtpInputConfig = {
    length: 6,
    inputStyles: {
      width: '50px',
      height: '45px',
      margin: '4px',
      fontSize: '18px',
      borderRadius: '0.375rem', // Equivalent to Tailwind `rounded-md`
      border: '1px solid #D1D5DB', // Tailwind `border-gray-300`
    },
    allowNumbersOnly: true,
    disableAutoFocus: true,
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      email: ['', Validators.required],
      otp: ['', Validators.required]
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.otpForm.controls;
  }
  otpFormSubmit() {
    this.isSubmitted = true
    if (!this.otpForm.valid) {
      return
    }
    console.log("inside login submit", this.otpForm.value)
  }

  sendOtp() {
    this.isEmailSubmitted = true;
  }
}
