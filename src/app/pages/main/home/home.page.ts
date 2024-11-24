import { ScanResult, Barcode } from './../../../../../node_modules/@capacitor-mlkit/barcode-scanning/dist/esm/definitions.d';
import { Component, OnInit, inject } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

  segment = 'scan';
  qrText = ''

  scanResult = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back
     }
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data) {
      this.scanResult = data?.Barcode?.displayValue;
    }
  
  }
}
