import fs from 'fs';

export default class LoggedInUser {

    private static instance: LoggedInUser

    constructor() {
        if (LoggedInUser.instance = null) {
            return new LoggedInUser();
        }
        return LoggedInUser.instance;
    }

    public connection() {
        const path = `${__dirname}/users.json`;

        fs.writeFile(path,'{}', function (err) {
            if (err) {
                return console.log(err);
        }
        })
    }
};

const testing = new LoggedInUser();
const user = testing.connection();

console.log(user)



