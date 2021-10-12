import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';


const routes: Routes = [
  {

  path:'admin',
  component: AdminComponent,
  canActivateChild:[AdminGuard],
  children: [
    {
      path: ``, loadChildren: () =>
        import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: `users`, loadChildren: () =>
        import('./users/users.module').then(m => m.UsersModule)
    },
    {
      path: `products`, loadChildren: () =>
        import('./products/products.module').then(m => m.ProductsModule)
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
