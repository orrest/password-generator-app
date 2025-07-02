import { Component, computed, signal } from '@angular/core';

interface Rule {
  description: string;
  checked: boolean;
}

@Component({
  selector: 'app-password-generator',
  imports: [],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.css',
})
export class PasswordGenerator {
  rules = signal<Rule[]>([
    { description: 'Include Uppercase Letters', checked: false },
    { description: 'Include Lowercase Letters', checked: false },
    { description: 'Include Numbers', checked: false },
    { description: 'Include Symbols', checked: false },
  ]);

  checkedRules = computed(() => {
    const result = this.rules().filter((r) => r.checked);
    console.log('checkedRules ' + result);
    return result;
  });

  uncheckedRules = computed(() => {
    return this.rules().filter((r) => !r.checked);
  });

  onCheckChange(event: Event, index: number) {
    const checkInput = event.target as HTMLInputElement;

    this.rules.update((rules) => {
      return rules.map((rule, i) =>
        i === index ? { ...rule, checked: checkInput.checked } : rule,
      );
    });
  }
}
