import { Component, OnInit, HostListener } from '@angular/core'; // 1. Import HostListener
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  isMobileMenuOpen: boolean = false;
  isProfileDropdownOpen: boolean = false;
  cartCount: number = 2;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeThemeState();
  }

  // 2. NEW: Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-display-context')) {
      this.isProfileDropdownOpen = false;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('zari_token') !== null;
  }

  getUserEmail(): string {
    return localStorage.getItem('user_email') || '';
  }

  toggleProfileDropdown(event: Event): void {
    event.stopPropagation(); // Prevents HostListener from closing it immediately
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    this.isMobileMenuOpen = false; // Ensure mobile menu is closed
  }

  logout(): void {
    localStorage.removeItem('zari_token');
    localStorage.removeItem('user_email');
    this.isProfileDropdownOpen = false;
    this.router.navigate(['/']);
  }

  // ... (Keep your existing Theme and Mobile menu functions below)
  private initializeThemeState(): void {
    const savedTheme = localStorage.getItem('app-theme');
    this.isDarkMode = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.updateBodyTagClass();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('app-theme', this.isDarkMode ? 'dark' : 'light');
    this.updateBodyTagClass();
  }

  private updateBodyTagClass(): void {
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    document.body.classList.toggle('light-theme', !this.isDarkMode);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}