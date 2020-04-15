import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./feature/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: '', loadChildren: ()=> import('./feature/inner/inner.module').then(m=>m.InnerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
