import { Pipe, PipeTransform } from '@angular/core';
import {CATEGORY_LABELS, RING_LABELS} from '../constants/tech-radar.constatns';

@Pipe({
  name: 'techLabel',
  standalone: true
})
export class TechLabelPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    return RING_LABELS[value] || CATEGORY_LABELS[value] || value;
  }
}
