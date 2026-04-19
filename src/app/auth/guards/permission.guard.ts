import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermissions = route.data['permissions'] as string[];

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const hasAccess = this.authService.hasAnyPermission(requiredPermissions);

    if (!hasAccess) {
      this.router.navigate(['/forbidden']); // o donde quieras
      return false;
    }

    return true;
  }
}