import fs from 'fs';
import { stringify } from 'querystring';

type Constructor = new (...args: any[]) => {};



function fill<articleBase extends Constructor>(articlePlus: articleBase, name:string, content:string) {
    return class memberArticle extends articlePlus {
        name:string = name;
        content:string = content;

    };
}



function member<articleBase extends Constructor>(articlePlus: articleBase) {
    return class memberArticle extends articlePlus {
        isRestricted = true;
    };
}

function paid<articleBase extends Constructor>(articlePlus: articleBase, costM: number, costG: number) {
    return class paidArticle extends articlePlus {
        moneyRequiredMember: number = costM;
        moneyRequiredGuest: number = costG;
    };
}

function free<articleBase extends Constructor>(articlePlus: articleBase) {
    return class freeArticle extends articlePlus {
        isFree = true;
    };
}

function guest<articleBase extends Constructor>(articlePlus: articleBase) {
    return class guestArticle extends articlePlus {
        isRestricted = false;
    };
}



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Builder
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

class Article { }

export class ArticleBuilder {

    articleInstance: ArticleBuilder | null

    newArticle = Article;


    createArticle(nom:string) {
       
        const dirName:string = __dirname;
        const slicedDirName = dirName.slice(0,-7);
        const path  = `${slicedDirName}/data/${nom}.json`;
        
        const jsonExists = fs.existsSync(path)
        
//!jsonExists == checks inside of variable

        if (jsonExists == true){

            console.log("Woopsy doo, this file already exists 😂😂😂😂😂😂😂😂😂😂")
            // const fileExist = fs.readFileSync(path)
            // const nomus = nom + '1'
            // console.log(nomus);
            // const newPath = `${slicedDirName}/data/${nomus}.json`
            // console.log(newPath);

            // const createdArticle = new this.newArticle
            // const data:string = JSON.stringify(createdArticle)
          
            // fs.appendFileSync(newPath, `${data}`);            

        }

        else{
            console.log("Now for something completly different")
            const createdArticle = new this.newArticle
            const data:string = JSON.stringify(createdArticle)

            console.log(data)
            const dirName:string = __dirname;
            const slicedDirName = dirName.slice(0,-7);
            const path  = `${slicedDirName}/data/article.json`;
          

            fs.appendFileSync(path, `${data}`);         
        }


              
    }

    fill(name:string, content:string) {
        this.newArticle = fill(this.newArticle, name, content);
    }

    plusMember() {
        this.newArticle = member(this.newArticle);
    }

    plusGuest() {
        this.newArticle = guest(this.newArticle);
    }

    plusPaid(costM: number, costG: number) {
        this.newArticle = paid(this.newArticle, costM, costG);
    }
    plusFree() {
        this.newArticle = free(this.newArticle);
    }

}

//member only
//member only paid
//member only free
//guest free
//guest paid

//member + paid, member + free, member 
// guest + paid, guest + free




//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Director.
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


export class ArticleDirector {

    // private _shipyard:submarineBuilder

    constructor(private articleDirection: typeof ArticleBuilder) {

    }

//freeforall
    freeArticle (name:string, content:string) {
        const builder = new this.articleDirection();
        builder.fill(name,content);
        builder.plusFree();
        builder.plusGuest();
        //free for everyone
        return builder;

    }

//free for members
    memberFreeArticle(name:string, content:string) {
        const builder = new this.articleDirection();
        builder.fill(name,content);
        builder.plusGuest();
        builder.plusFree(); //it becomes paid for both or free for both
        return builder;

    }

//paid for members    
    memberPaidArticle(name:string, content:string) {
        const builder = new this.articleDirection();
        builder.fill(name,content);
        builder.plusMember();
        builder.plusPaid(10,10);
        return builder;

    }

//paid for all
    guestPaidArticle(name:string, content:string) {
        const builder = new this.articleDirection();
        builder.fill(name,content);
        builder.plusMember();
        builder.plusPaid(10,10);
        return builder;
    }

}


