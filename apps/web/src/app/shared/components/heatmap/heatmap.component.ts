import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="overflow-x-auto">
      <div class="flex gap-1">
        <div *ngFor="let day of data" class="w-3 h-3 rounded-sm"
             [style.backgroundColor]="getColor(day.count)"
             [title]="day.date + ': ' + day.count + ' done'">
        </div>
      </div>
    </div>
  `,
})
export class HeatmapComponent implements OnInit {
  @Input() data: any[] = [];

  ngOnInit() {}

  getColor(count: number): string {
    if (count === 0) return 'var(--border)';
    if (count <= 2) return '#BBF7D0';
    if (count <= 4) return '#86EFAC';
    if (count <= 6) return '#22C55E';
    return '#15803D';
  }
}
