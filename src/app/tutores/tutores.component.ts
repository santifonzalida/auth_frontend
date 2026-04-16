import { Component } from '@angular/core';

@Component({
  selector: 'app-tutores',
  standalone: true,
  template: `
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow p-8 text-center">
        <div class="p-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Tutores</h2>
        <p class="text-gray-500">Este módulo está en construcción.</p>
      </div>
    </div>
  `,
})
export class TutoresComponent {}
