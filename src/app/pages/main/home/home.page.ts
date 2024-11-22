import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  FirebaseSvc = inject(FirebaseService);
  utilsSvs = inject(UtilsService);

  ngOnInit() {
  }

  /* Cerrar sesión */
  singOut() {
    this.FirebaseSvc.singOut();
  }
}
