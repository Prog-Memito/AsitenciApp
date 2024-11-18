import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  FirebaseSvc = inject(FirebaseService)
  UtilsSvs = inject(UtilsService)


  ngOnInit() {
  }

  async submit(){
    /* console.log(this.form.value); */

    const loading = await this.UtilsSvs.loading();
    await loading.present();

    this.FirebaseSvc.singUp(this.form.value as User).then(async res=> {

      await this.FirebaseSvc.updateUser(this.form.value.name);

      let uid = res.user.uid;
      this.form.controls.uid.setValue(uid);

      this.setUserInfo(uid);

      /* console.log(res); */
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


  async setUserInfo(uid: string){
    /* console.log(this.form.value); */

    const loading = await this.UtilsSvs.loading();
    await loading.present();

    let path = 'users/${uid}'
    delete this.form.value.password;

    this.FirebaseSvc.setDocument(path, this.form.value).then(async res=> {

      this.UtilsSvs.saveInLocalStorage('user', this.form.value)
      this.UtilsSvs.routerLink('/main/home');
      this.form.reset();

      await this.FirebaseSvc.updateUser(this.form.value.name);

      console.log(res);
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
