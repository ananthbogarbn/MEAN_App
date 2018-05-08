import {Routes} from '@angular/router'
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LogoutComponent } from './logout/logout.component';

 export const AuthRoutes: Routes=[
    { path:'' , redirectTo:'signup', pathMatch:'full' },
    { path:'signup' , component:SignupComponent },
    { path:'signin' , component:SigninComponent},
    { path: 'logout', component:LogoutComponent}
];
