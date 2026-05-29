import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  isMobileMenuOpen: boolean = false;
  cartCount: number = 2; // Mock variable state to test structural display bubble

  ngOnInit(): void {
    this.initializeThemeState();
  }

  /**
   * Evaluates native browser configuration settings or local storage states
   */
  private initializeThemeState(): void {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Check device's OS-level preferences
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateBodyTagClass();
  }

  /**
   * Reverses state values and commits update mutations to DOM and storage
   */
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
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}