import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'travels',
    loadChildren: () => import('./pages/travels/travels.module').then( m => m.TravelsPageModule)
  },
  {
    path: 'wish-list',
    loadChildren: () => import('./pages/wish-list/wish-list.module').then( m => m.WishListPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'add-travel',
    loadChildren: () => import('./pages/add-travel/add-travel.module').then( m => m.AddTravelPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
