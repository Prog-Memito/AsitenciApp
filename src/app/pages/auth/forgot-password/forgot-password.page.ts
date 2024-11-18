import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  FirebaseSvc = inject(FirebaseService)
  UtilsSvs = inject(UtilsService)


  ngOnInit() {
  }

  async submit(){
    if (this.form.valid) {
      /* console.log(this.form.value); */

    const loading = await this.UtilsSvs.loading();
    await loading.present();

    this.FirebaseSvc.sendRecoveryEmail(this.form.value.email).then(res=> {
      /* console.log(res); */

      this.UtilsSvs.presentToast({
        message: 'Correo enviado con exito',
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'mail-outline'
      })
      
      this.UtilsSvs.routerLink('/auth');
      this.form.reset();

    }).catch(error => {
      console.log(error);

      this.UtilsSvs.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })
      
    }).finally(() => {
      loading.dismiss();
    })
    }
  }

}
