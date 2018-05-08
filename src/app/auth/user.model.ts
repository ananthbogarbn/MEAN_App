export class User{
    constructor(public email:string, 
                public password:string , 
                public firstName?:string , //optional field so i put ?
                public lastName?:string ){} //optional field so i put ?
}