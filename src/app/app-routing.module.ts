import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooselistComponent } from './components/chooselist/chooselist.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProfildetailComponent } from './components/profildetail/profildetail.component';

const routes: Routes = [
{path: 'home', component: ProfildetailComponent},
//{path: 'profileDetail', component: ProfildetailComponent},
{path: 'chooseList', component: ChooselistComponent},
{path: 'profil', component:ProfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
