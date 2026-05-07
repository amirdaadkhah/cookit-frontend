import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from './login/login.component';
import { RecipeManagerComponent } from './recipe-manager/recipe-manager.component';
import { IngredientBlockComponent } from './recipe-manager/ingredient-block/ingredient-block.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'demo', component: DemoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipes-manager', component: RecipeManagerComponent },
    { path: 'test', component: IngredientBlockComponent }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
