import { Injectable } from '@angular/core';
import { ToastAlertsAbstractService, ToastData } from '@dataclouder/core-components';
import { ToastController } from '@ionic/angular';
// import { ToastAlertsAbstractService, ToastData } from '@dataclouder/conversation-system';

@Injectable({
  providedIn: 'root',
})
export class ToastAlertService extends ToastAlertsAbstractService {
  constructor(private toastController: ToastController) {
    super();
  }

  private async presentToast(data: ToastData, color: string, duration: number) {
    const toast = await this.toastController.create({
      message: `${data.title}: ${data.subtitle}`,
      color: color,
      duration: duration,
      position: 'top',
    });
    toast.present();
  }

  public success(data: ToastData) {
    this.presentToast(data, 'success', 4000);
  }

  info(data: ToastData): void {
    this.presentToast(data, 'primary', 4000);
  }

  warn(data: ToastData): void {
    this.presentToast(data, 'warning', 4500);
  }

  error(data: ToastData): void {
    this.presentToast(data, 'danger', 4000);
  }
}
