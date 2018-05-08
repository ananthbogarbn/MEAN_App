import {Routes, RouterModule} from '@angular/router'
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { AuthRoutes } from './auth/auth.routes'
const AppRoutes: Routes=[
    {path:'' , redirectTo:'/messages' , pathMatch:'full'},
    {path:'messages' , component:MessagesComponent},
    {path:'auth' , component:AuthenticationComponent , children:AuthRoutes}
];

export const routing= RouterModule.forRoot(AppRoutes);