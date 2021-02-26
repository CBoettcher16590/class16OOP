import fs from 'fs';

type Constructor = new (...args: any[]) => {};
//member only
//member only paid
//member only free
//guest free
//guest paid

//member + paid, member + free, member 
// guest + paid, guest + free

//could also be guest paid. member free...

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
        isFree: boolean = true;
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

class Article { };

export class ArticleBuilder {

    articleInstance: ArticleBuilder | null

    newArticle = Article;

    createArticle() {

            const createdArticle = new this.newArticle
            console.log(createdArticle)
            const data:string = JSON.stringify(createdArticle)
            console.log(data)
            const dirName:string = __dirname;
            const slicedDirName = dirName.slice(0,41);
            const path  = `${slicedDirName}/data/article.json`;
          

            fs.appendFileSync(path, `${data}`);

            // fs.appendFileSync("data/article.json", data);
            
      
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

    freeArticle() {
        const builder = new this.articleDirection();
        builder.plusFree();
        builder.plusGuest();
        //free for everyone
        return builder;

    }

    // paidArticle() {
    //     const builder = new this.articleDirection();
    //     paidArticleBuilder.plusGuest();
    //     paidArticleBuilder.plusPaid(10, 10); //it becomes paid for both or free for both        
    //     return builder;

    // }

    memberFreeArticle() {
        const builder = new this.articleDirection();
        builder.plusGuest();
        builder.plusFree(); //it becomes paid for both or free for both
        return builder;

    }

    memberPaidArticle() {
        const builder = new this.articleDirection();
        builder.plusMember();
        builder.plusPaid(10,10);
        return builder;

    }

    guestPaidArticle() {
        const builder = new this.articleDirection();
        builder.plusMember();
        builder.plusPaid(10,10);
        return builder;
    }

}


