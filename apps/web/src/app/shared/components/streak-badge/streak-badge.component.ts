import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-streak-badge',
  standalone: true,
  template: `
    <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
         [style.backgroundColor]="bgColor"
         [style.color]="textColor">
      <span>🔥</span>
      <span>{{ streak }}</span>
    </div>
  `,
})
export class StreakBadgeComponent {
  @Input() streak = 0;

  get bgColor(): string {
    if (this.streak >= 30) return '#FEF3C7';
    if (this.streak >= 7) return '#DCFCE7';
    if (this.streak >= 3) return '#DBEAFE';
    return '#F3F4F6';
  }

  get textColor(): string {
    if (this.streak >= 30) return '#92400E';
    if (this.streak >= 7) return '#166534';
    if (this.streak >= 3) return '#1E40AF';
    return '#6B7280';
  }
}
