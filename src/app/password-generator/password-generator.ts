import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-password-generator',
  imports: [NgOptimizedImage],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.css',
})
export class PasswordGenerator {
  rules = [
    'Include Uppercase Letters',
    'Include Uppercase Letters',
    'Include Uppercase Letters',
    'Include Uppercase Letters',
  ];
}
