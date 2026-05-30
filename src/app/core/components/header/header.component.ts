import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  isMobileMenuOpen: boolean = false;
  cartCount: number = 2; // Dynamic basket tracking marker element

  ngOnInit(): void {
    this.initializeThemeState();
  }

  private initializeThemeState(): void {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateBodyTagClass();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('app-theme', this.isDarkMode ? 'dark' : 'light');
    this.updateBodyTagClass();
  }

  private updateBodyTagClass(): void {
    const bodyElement = document.body;
    if (this.isDarkMode) {
      bodyElement.classList.add('dark-theme');
      bodyElement.classList.remove('light-theme');
    } else {
      bodyElement.classList.add('light-theme');
      bodyElement.classList.remove('dark-theme');
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.manageViewportScrolling();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.manageViewportScrolling();
  }

  private manageViewportScrolling(): void {
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}