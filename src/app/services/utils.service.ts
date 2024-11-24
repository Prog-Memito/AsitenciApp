import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);


  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'selecciona una imagen',
      promptLabelPicture: 'toma un foto'
    });
  };

  /* Loading */
  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }

  /* Toast */
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  /* Enruta cualquier pagina disponible */
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  /* Guarda en el localStorage */
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  /* Obtiene un elemento desde localStorage */
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }
}
