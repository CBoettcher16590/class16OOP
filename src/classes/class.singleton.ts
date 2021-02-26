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

        fs.appendFileSync(path, JSON.stringify([users], null, 2))
    }
};

const user = new User()
user.id = 2;
user.money = 200;
user.name = "alshahoud"
 
// const user = new User()
// user.id = 1;
// user.money = 100;
// user.name = "angham"
const login = new LoggedInUser()
const signin = login.connection(user)
 console.log(user)

