import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalCase',
  standalone: true,
})
export class PascalCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Convert the value to a string
    const str = value.toString();

    // Split the string into words based on spaces or underscores
    const words = str.split(/[\s_]+/);

    // Capitalize the first letter of each word and join them
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
