
//where we build the class for users
class UserBuilder{
   BaseUser=User;
   private _instance:User;

    protected get instance():User{
        if(!this._instance){
            this._instance=new this.BaseUser();
        }
        return this._instance
    }
}


