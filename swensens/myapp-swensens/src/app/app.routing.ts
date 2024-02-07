import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/auth-admin.guard';


export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, 
        children: [
            {
                path: 'login',
                loadChildren: () =>
                 import('./pages/login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'register',
                loadChildren: () =>
                 import('./pages/register/register.module').then(m => m.RegisterModule)
            },
            {
                path: '',
                loadChildren: () => 
                 import('./pages/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => 
                import('./pages/dashboard/dashboard.module').then
                (m => m.DashboardModule)
            },
            {
                path: 'products',
                canActivate: [AdminGuard],
                loadChildren: () =>
                import('./pages/products/products.module').then(m => m.ProductsModule)
            }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            initialNavigation: 'enabledBlocking',
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }