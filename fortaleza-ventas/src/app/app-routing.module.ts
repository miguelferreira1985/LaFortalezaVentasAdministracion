import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ColorsComponent } from './pages/colors/colors.component';
import { PresentationsComponent } from './pages/presentations/presentations.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProvidersComponent } from './pages/providers/providers.component';

const routes: Routes = [
  { path: 'providers', component: ProvidersComponent},
  { path: 'categories', component: CategoriesComponent },
  { path: 'presentations', component: PresentationsComponent},
  { path: 'colors', component: ColorsComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
