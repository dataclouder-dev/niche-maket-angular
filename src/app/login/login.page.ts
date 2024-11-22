import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RouteNames } from '../core/enums';

import { FirebaseAuthService, SharedLoginComponent } from '@dataclouder/app-auth';
import { IonItem, IonButton, IonIcon, IonContent, IonInput, IonToolbar, IonFooter, Platform } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth-component',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonToolbar,
    IonInput,
    IonContent,
    IonIcon,
    IonButton,
    IonItem,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedLoginComponent,
  ],
})
export class LoginComponent implements OnInit {
  screen: any = 'signin';
  formData: FormGroup = this.fb.group({
    name: ['', []],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  isLoading: boolean = false;
  constructor(
    private platform: Platform,
    private fb: FormBuilder,
    private auth: AuthService,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {}

  public user: any;

  public envName = environment.envName;

  async ngOnInit() {
    this.platform.ready().then(() => {
      console.log('READY!');

      GoogleAuth.initialize({
        clientId: environment.iosClientId,
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    });
  }

  change(event: 'signup' | 'forget' | 'signin') {
    this.screen = event;
  }

  async login() {
    console.log('Login');
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      // formData.append('email', this.formData.get('email')?.value);
      // formData.append('password', this.formData.get('password')?.value);

      console.log(this.formData);
      const email = this.formData.get('email')?.value;
      const password = this.formData.get('password')?.value;
      console.log(email, password);
      try {
        const auth = await this.firebaseAuthService.signWithEmailPassword(email, password);
        console.log('El usuario es', auth);
        this.router.navigateByUrl('/' + RouteNames.Home);
      } catch (err: any) {
        console.log('Ocurrió un error al registrar el usuario', err);
        // throw new Error(err.message);
      }

      // this.auth.userLogin(formData).subscribe((data:any)=>{
      //   console.log(data);
      // });
    }
  }

  register() {
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      formData.append('name', this.formData.get('name')?.value);
      formData.append('email', this.formData.get('email')?.value);
      formData.append('password', this.formData.get('password')?.value);
      console.log(this.formData);

      this.auth.userRegister(formData).subscribe((data: any) => {
        console.log(data);
      });
    }
  }

  public test() {
    console.log('Test');
    debugger;
    console.log('Test', environment.iosClientId);
  }

  async signInGoogle() {
    debugger;
    console.log('Credenciales');

    // await GoogleAuth.initialize({
    //   clientId: environment.iosClientId,
    //   scopes: ['profile', 'email'],
    // });
    debugger;

    console.log('Sign in google mostrando credenciales');
    const user: User = await GoogleAuth.signIn();
    console.log('Sign in google mostrando credenciales', user);
    debugger;

    this.user = await this.firebaseAuthService.signInWithCredential(GoogleAuthProvider.credential(user.authentication.idToken));
    console.log('Sign in google mostrando credenciales', this.user);

    this.router.navigateByUrl('/' + RouteNames.Home);

    // Registrar con Firebase.
  }

  public working() {
    console.log('Working');
  }
}
