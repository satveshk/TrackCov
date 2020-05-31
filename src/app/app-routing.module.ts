import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndComponent } from './ind/ind.component';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : '.ind', component: IndComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
