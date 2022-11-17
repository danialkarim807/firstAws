import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalInfo',
})
export class PersonalInfoPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const info = args[0];

    if (info == 'weight') {
      return value + 'kg';
    } else if (info == 'height') {
      return value + 'cm';
    } else {
      return value;
    }
    // return null;
  }
}
