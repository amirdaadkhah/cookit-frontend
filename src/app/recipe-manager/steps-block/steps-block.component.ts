import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-steps-block',
  templateUrl: './steps-block.component.html',
  styleUrls: ['./steps-block.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class StepsBlockComponent {
  @Input({ required: true }) stepsArray!: FormArray;
  readonly stepInput = new FormControl('', { nonNullable: true });

  constructor() { }

  addStep(): void {
    const value = this.stepInput.value.trim();
    if (!value) return;
    this.stepsArray.push(new FormControl(value, Validators.required));
    this.stepInput.setValue('');
  }

  removeStep(index: number): void {
    this.stepsArray.removeAt(index);
  }

  moveStepUp(index: number): void {
    if (index === 0) return;
    const current = this.stepsArray.at(index).value;
    const previous = this.stepsArray.at(index - 1).value;
    this.stepsArray.at(index - 1).setValue(current);
    this.stepsArray.at(index).setValue(previous);
  }

  moveStepDown(index: number): void {
    if (index >= this.stepsArray.length - 1) return;
    const current = this.stepsArray.at(index).value;
    const next = this.stepsArray.at(index + 1).value;
    this.stepsArray.at(index + 1).setValue(current);
    this.stepsArray.at(index).setValue(next);
  }

  trackByIndex(index: number): number {
    return index;
  }
}