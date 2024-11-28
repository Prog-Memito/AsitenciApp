import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  FirebaseSvc = inject(FirebaseService);
  UtilsSvs = inject(UtilsService)


  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      /* console.log(this.form.value); */

      const loading = await this.UtilsSvs.loading();
      await loading.present();

      this.FirebaseSvc.singIn(this.form.value as User).then(res => {
        /* console.log(res); */

        this.getUserInfo(res.user.uid);

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


  async getUserInfo(uid: string) {
    if (this.form.valid) {
      /* console.log(this.form.value); */

      const loading = await this.UtilsSvs.loading();
      await loading.present();

      let path = `users/${uid}`

      this.FirebaseSvc.getDocument(path).then((user: User) => {

        this.UtilsSvs.saveInLocalStorage('user', user)
        this.UtilsSvs.routerLink('/main/home');
        this.form.reset();

        this.UtilsSvs.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        })

        /* console.log(user); */
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
