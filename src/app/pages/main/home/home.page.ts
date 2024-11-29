import { ScanResult, Barcode } from './../../../../../node_modules/@capacitor-mlkit/barcode-scanning/dist/esm/definitions.d';
import { Component, OnInit, inject } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';

import { Asistencia } from 'src/app/models/asistencia.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

  segment = 'scan';
  qrText = ''
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController
  ) { }

  ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Para usar la aplicación autorizar los permisos de cámara',
      buttons: ['OK'],
    });
    await alert.present();
  }

  /* Genera el codigo QR de forma aleatoria */
  generateRandomQR() {
    // Genera un código aleatorio usando caracteres alfanuméricos
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.qrText = Array.from({ length: 12 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  /* Marca la asistencia */

  
}
