import { Component } from '@angular/core';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  authenticating = false;
  error: string | null = null;

  constructor(private readonly auth: AuthService) {}

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }

  get accountName(): string {
    return this.auth.currentAccount?.name ?? '';
  }

  get accountEmail(): string {
    return this.auth.currentAccount?.username ?? '';
  }

  loginWithMicrosoft(): void {
    if (this.authenticating) {
      return;
    }

    this.authenticating = true;
    this.error = null;

    this.auth.loginWithMicrosoft().subscribe({
      next: () => {
        this.authenticating = false;
      },
      error: (err: unknown) => {
        this.authenticating = false;
        this.error = this.resolveError(err);
      },
    });
  }

  logout(): void {
    this.auth.logout().subscribe({
      error: (err: unknown) => {
        this.error = this.resolveError(err);
      },
    });
  }

  private resolveError(err: unknown): string {
    if (err instanceof Error && err.message && err.message.includes('AADSTS')) {
      return err.message;
    }
    if (
      err instanceof Error &&
      (err.message.includes('clientId') ||
        err.message.includes('No account in silent request'))
    ) {
      return err.message;
    }
    return 'No se pudo iniciar sesión. Verifica tu conexión o la configuración de Azure.';
  }
}