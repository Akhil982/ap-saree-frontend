import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ap-saree-frontend';

  isUserLoggedIn(): boolean {
    return localStorage.getItem('zari_token') !== null;
  }

  // 💡 NEW: Determines if the overlay modal wrapper layer should show up
  shouldShowAuthOverlay(): boolean {
    const isLoggedIn = this.isUserLoggedIn();
    const isGuestSession = sessionStorage.getItem('guest_skipped_auth') === 'true';
    
    // Show the auth overlay modal ONLY if they aren't logged in AND haven't clicked the close icon
    return !isLoggedIn && !isGuestSession;
  }
}