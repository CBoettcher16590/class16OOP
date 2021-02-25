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
    return class basedSubmarine extends articlePlus {
        isRestricted = true;
    };
}

function paid<articleBase extends Constructor>(articlePlus: articleBase, costM: number, costG: number) {
    return class basedSubmarine extends articlePlus {
        moneyRequiredMember: number = costM;
        moneyRequiredGuest: number = costG;
    };
}

function free<articleBase extends Constructor>(articlePlus: articleBase) {
    return class basedSubmarine extends articlePlus {
        isFree: boolean = true;
    };
}

function guest<articleBase extends Constructor>(articlePlus: articleBase) {
    return class basedSubmarine extends articlePlus {
        isRestricted = false;
    };
}


//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Builder
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

class Article { };

class ArticleBuilder {

    articleInstance: ArticleBuilder | null

    newArticle = Article;

    get createArticle() {
        if (this.articleInstance == null) {

            // const data = new this.newArticle
            // fs.writeFile('message.txt', `${data}`, 'utf8', (err)=> {
            //     if(err) throw err;
            // });


            return new this.newArticle
        }
        return this.articleInstance
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



//guests+members+free
const freeArticleBuilder = new ArticleBuilder;
freeArticleBuilder.plusFree;
freeArticleBuilder.plusGuest;
//free for everyone

//guests+members+paid
const paidArticleBuilder = new ArticleBuilder;
paidArticleBuilder.plusGuest();
paidArticleBuilder.plusPaid(10, 10); //it becomes paid for both or free for both

//free+everyone
const freeEveryoneArticleBuilder = new ArticleBuilder;
freeEveryoneArticleBuilder.plusGuest();
freeEveryoneArticleBuilder.plusFree(); //it becomes paid for both or free for both

//member+paid
const paidMemberOnlyBuilder = new ArticleBuilder;
paidMemberOnlyBuilder.plusMember();
paidMemberOnlyBuilder.plusPaid(10, 10); //it becomes paid for both or free for both

//member+free
const freeMemberOnlyBuilder = new ArticleBuilder;
freeMemberOnlyBuilder.plusMember();
freeMemberOnlyBuilder.plusFree();




//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Director.
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


class articleDirector {

    // private _shipyard:submarineBuilder

    constructor(private articleDirection: typeof ArticleBuilder) {

    }

    freeArticle() {
        const builder = new this.articleDirection();
        freeArticleBuilder.plusFree;
        freeArticleBuilder.plusGuest;
        //free for everyone
        return builder;

    }

    paidArticle() {
        const builder = new this.articleDirection();
        paidArticleBuilder.plusGuest();
        paidArticleBuilder.plusPaid(10, 10); //it becomes paid for both or free for both        
        return builder;

    }

    memberFreeArticle() {
        const builder = new this.articleDirection();
        freeEveryoneArticleBuilder.plusGuest();
        freeEveryoneArticleBuilder.plusFree(); //it becomes paid for both or free for both
        return builder;

    }

    memberPaidArticle() {
        const builder = new this.articleDirection();


        return builder;

    }

    guestPaidArticle() {
        const builder = new this.articleDirection();
        freeMemberOnlyBuilder.plusMember();
        freeMemberOnlyBuilder.plusFree();
        return builder;
    }

}



const freeArticles = new articleDirector(ArticleBuilder)
const SuperArticle = freeArticles.freeArticle();
console.log(SuperArticle);

const Cats = freeArticles.freeArticle();
const Dogs = freeArticles.freeArticle();
const Rogues = freeArticles.freeArticle();
const Logs = freeArticles.freeArticle();
const Tongs = freeArticles.freeArticle();
