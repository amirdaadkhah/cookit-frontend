import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private isShowing = false; // Prevent Duplicate Toast

  constructor(private toastController: ToastController) { }

  async show(
    message: string,
    options?: {
      duration?: number;
      color?: 'success' | 'danger' | 'warning';
      position?: 'top' | 'middle' | 'bottom';
    }
  ): Promise<void> {
    if (this.isShowing) return;
    this.isShowing = true;

    const toast = await this.toastController.create({
      message,
      duration: options?.duration ?? 3000,
      color: options?.color ?? 'success',
      position: options?.position ?? 'bottom',
    });

    toast.onDidDismiss().then(() => {
      this.isShowing = false;
    });
    
    await toast.present();
  }

  success(message: string, duration = 3000) {
    return this.show(message, { color: 'success', duration });
  }

  error(message: string, duration = 3000) {
    return this.show(message, { color: 'danger', duration });
  }

  warning(message: string, duration = 3000) {
    return this.show(message, { color: 'warning', duration });
  }
}