import User from "./classes/class.user";
import fs from "fs";
import {v4} from 'uuid';



export function userFactory(name:string):User{
  const newUser=new User();
  newUser.name=name;
  newUser.money=20;
  newUser.id=v4();
  writeUser(newUser);

    return newUser
}

function writeUser(user:User):void{

    //specifies the directory name of folder where it compiles
    const dirName:string = __dirname;



   //Path takes the slice dir names and adds data and user data
    const path  = `${dirName}/data/user.json`;

    //StringIfy user data
    const stringUser=JSON.stringify(user)

    fs.appendFileSync(path,stringUser)

}