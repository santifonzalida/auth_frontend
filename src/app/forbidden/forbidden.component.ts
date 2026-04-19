import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'forbidden-component',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './forbidden.component.html'
})
export class ForbiddenComponent {}