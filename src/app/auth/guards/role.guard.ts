import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class RolesGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['roles'] as string[];

    if (!requiredRole || requiredRole.length === 0) {
      return false;
    }

    const hasAccess = this.authService.hasAnyRole(requiredRole);

    if (!hasAccess) {
      this.router.navigate(['/forbidden']); 
      return false;
    }

    return true;
  }
}