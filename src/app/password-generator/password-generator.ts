import { Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Rule {
  description: string;
  checked: boolean;
}

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

@Component({
  selector: 'app-password-generator',
  imports: [NgClass, FormsModule],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.css',
})
export class PasswordGenerator {
  password = signal<string>('P4$5W0rD!');
  copied = signal<boolean>(false);

  charLength = signal<number>(0);

  rules = signal<Rule[]>([
    { description: 'Include Uppercase Letters', checked: false },
    { description: 'Include Lowercase Letters', checked: false },
    { description: 'Include Numbers', checked: false },
    { description: 'Include Symbols', checked: false },
  ]);

  checkedRules = computed(() => {
    const result = this.rules().filter((r) => r.checked);
    return result;
  });

  uncheckedRules = computed(() => {
    return this.rules().filter((r) => !r.checked);
  });

  strength = computed(() => {
    const level = this.checkedRules().length;
    if (level <= 2) return 'WEAK';
    if (level <= 3) return 'MEDIUM';
    return 'STRONG';
  });

  onCheckChange(event: Event, index: number) {
    const checkInput = event.target as HTMLInputElement;

    this.rules.update((rules) => {
      return rules.map((rule, i) =>
        i === index ? { ...rule, checked: checkInput.checked } : rule,
      );
    });
  }

  generateClick() {
    const newPassword = this.generatePassword();

    if (newPassword) {
      this.password.set(newPassword);
    }
  }

  private generatePassword(): string {
    const currentRules = this.rules();
    let characterPool = '';

    if (currentRules[0].checked) characterPool += CHARSETS.uppercase;
    if (currentRules[1].checked) characterPool += CHARSETS.lowercase;
    if (currentRules[2].checked) characterPool += CHARSETS.numbers;
    if (currentRules[3].checked) characterPool += CHARSETS.symbols;

    const length = this.charLength();
    if (!characterPool || length <= 0) {
      return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    return password;
  }

  async copyPassword(): Promise<void> {
    if (!this.password()) return;

    try {
      await navigator.clipboard.writeText(this.password());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy password: ', err);
    }
  }
}
