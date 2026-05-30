import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  // Directly targeting your local Spring Boot Auth REST Controller
  private apiUrl = 'http://ap-saree-store.onrender.com/ap-saree-store/api/auth';

  email: string = '';
  otp: string = '';
  
  isOtpSent: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Component handles instant entry interceptor mapping on render execution
  }

  // Phase 1: Dispatches user identity email layout to Spring Boot SMTP Engine
  requestOtp(): void {
    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post<any>(`${this.apiUrl}/generate-otp`, { email: this.email })
      .subscribe(
        response => {
          this.isLoading = false;
          this.isOtpSent = true;
          this.successMessage = response.message || 'Verification passcode dispatched to your email!';
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error.error?.error || 'Failed to send OTP. Please try again.';
        }
      );
  }

  // Phase 2: Matches the 6-digit credential structure token block to authorize user session
  verifyOtp(): void {
    if (!this.otp || this.otp.length !== 6) {
      this.errorMessage = 'Please enter a valid 6-digit authentication code.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      email: this.email,
      otp: this.otp
    };

    this.http.post<any>(`${this.apiUrl}/verify-otp`, payload)
      .subscribe(
        response => {
          this.isLoading = false;
          this.successMessage = response.message || 'Login successful!';
          
          // Securely write the JWT session string key to memory storage layers
          localStorage.setItem('zari_token', response.token);
          
          // Re-trigger the application matrix state view frame after a smooth delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error.error?.error || 'Invalid or expired passcode sequence.';
        }
      );
  }
}