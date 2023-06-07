import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { EditarPublicacionComponent } from './editar-publicacion/editar-publicacion.component';



const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'pagina-validacion',
    loadChildren: () => import('./pagina-validacion/pagina-validacion.module').then( m => m.PaginaValidacionPageModule)
  },
  {
    path: 'publicacion/:id',
    loadChildren: () => import('./publicacion/publicacion.module').then( m => m.PublicacionPageModule)
  },
  {
    path: 'editar-perfil/:id',
    component: EditarPerfilComponent
  },
  { path: 'editar-publicacion/:id', component: EditarPublicacionComponent }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
