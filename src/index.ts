import fs from 'fs';
import {User} from'./classes/class.user'
export default class LoggedInUser {

    private static instance: LoggedInUser

    constructor() {
        if (LoggedInUser.instance = null) {
            return new LoggedInUser();
        }
        return LoggedInUser.instance;
    }

    public connection(users:User) {
        const path = `${__dirname}/users.json`;

        fs.writeFile(path, JSON.stringify(users), 'utf8', (err)=> {
            if (err) throw err;
        })
    }
};

const user = new User()
user.id = 2;
user.money = 200;
user.name = "alshahoud"
 
const trying = new LoggedInUser()
const last = trying.connection(user)
 console.log(user)




