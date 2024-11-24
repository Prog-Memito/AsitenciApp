import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  FirebaseSvc = inject(FirebaseService);
  utilsSvs = inject(UtilsService);

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvs.getFromLocalStorage('user');
  }

  async takeImage() {

    let user = this.user();
    let path = `users/${user.uid}`

    const dataUrl = (await this.utilsSvs.takePicture('Imagen del perfil')).dataUrl;

    const loading = await this.utilsSvs.loading();
    await loading.present();

    let imagePath = `${user.uid}/profile`;
    user.image = await this.FirebaseSvc.uploadImage(imagePath, dataUrl);

    this.FirebaseSvc.updateDocument(path, {image: user.image}).then(async res => {

      this.utilsSvs.saveInLocalStorage('user', user);

      this.utilsSvs.presentToast({
        message: 'Imagen acutalizada correctamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })


    }).catch(error => {
      console.log(error);

      this.utilsSvs.presentToast({
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
