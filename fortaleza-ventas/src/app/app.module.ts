import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { HomeComponent } from './pages/home/home.component';
import { SideNavabarComponent } from './shared/side-navabar/side-navabar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ColorsComponent } from './pages/colors/colors.component';
import { PresentationsComponent } from './pages/presentations/presentations.component';
import { environment } from '../environments/environment';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProvidersComponent } from './pages/providers/providers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavabarComponent,
    NavbarComponent,
    ColorsComponent,
    PresentationsComponent,
    CategoriesComponent,
    ProvidersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
