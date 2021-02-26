import fs from 'fs';

type Constructor = new (...args: any[]) => {};



    // const createdArticle = { isFree: true, isRestricted: false }
    // const data:string = JSON.stringify(createdArticle)
    // const path  = `${​​__dirname}​/data/article.json`;
    // console.log(​​__dirname);
    // console.log(createdArticle);
    // console.log(data);
    // console.log(path);
    // fs.writeFileSync(path, data, 'utf8');


    fs.writeFileSync(`${​​__dirname}​/data/article.json`, 'Hello', 'utf8');






// //member only paid
// //member only free
// //guest free
// //guest paid

// //member + paid, member + free, member 
// // guest + paid, guest + free

// //could also be guest paid. member free...

// function member<articleBase extends Constructor>(articlePlus: articleBase) {
//     return class memberArticle extends articlePlus {
//         isRestricted = true;
//     };
// }

// function paid<articleBase extends Constructor>(articlePlus: articleBase, costM: number, costG: number) {
//     return class paidArticle extends articlePlus {
//         isFree: boolean = false;
//         moneyRequiredMember: number = costM;
//         moneyRequiredGuest: number = costG;
//     };
// }

// function free<articleBase extends Constructor>(articlePlus: articleBase) {
//     return class freeArticle extends articlePlus {
//         isFree: boolean = true;
//     };
// }

// function guest<articleBase extends Constructor>(articlePlus: articleBase) {
//     return class guestArticle extends articlePlus {
//         isRestricted = false;
//     };
// }


// //--------------------------------------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------------------------------------
// // Builder
// //--------------------------------------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------------------------------------

// class Article { };

// class ArticleBuilder {

//     articleInstance: ArticleBuilder | null

//     newArticle = Article;

//     get createArticle() {
//         if (this.articleInstance == null) {
//             const createdArticle = new this.newArticle
//             console.log(createdArticle)
//             const data:string = JSON.stringify(createdArticle)
//             console.log(data)
//             const path  = `${​​__dirname}​/article.json`;
//             console.log(path);

//             fs.writeFileSync(path, data, 'utf8');
//         }
//         return this.articleInstance
//     }

//     plusMember() {
//         this.newArticle = member(this.newArticle);
//     }

//     plusGuest() {
//         this.newArticle = guest(this.newArticle);
//     }

//     plusPaid(costM: number, costG: number) {
//         this.newArticle = paid(this.newArticle, costM, costG);
//     }
//     plusFree() {
//         this.newArticle = free(this.newArticle);
//     }

// }



// //--------------------------------------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------------------------------------
// // Director.
// //--------------------------------------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------------------------------------


// class articleDirector {

//     // private _shipyard:submarineBuilder

//     constructor(private articleDirection: typeof ArticleBuilder) {

//     }

//     freeArticle() {
//         const builder = new this.articleDirection();
//         builder.plusFree();
//         builder.plusGuest();
//         //free for everyone
//         return builder;

//     }

//     // paidArticle() {
//     //     const builder = new this.articleDirection();
//     //     paidArticleBuilder.plusGuest();
//     //     paidArticleBuilder.plusPaid(10, 10); //it becomes paid for both or free for both        
//     //     return builder;

//     // }

//     memberFreeArticle() {
//         const builder = new this.articleDirection();
//         builder.plusGuest();
//         builder.plusFree(); //it becomes paid for both or free for both
//         return builder;

//     }

//     memberPaidArticle() {
//         const builder = new this.articleDirection();
//         builder.plusMember();
//         builder.plusPaid(10,10);
//         return builder;

//     }

//     guestPaidArticle() {
//         const builder = new this.articleDirection();
//         builder.plusMember();
//         builder.plusPaid(10,10);
//         return builder;
//     }

// }



// const freeArticles = new articleDirector(ArticleBuilder)
// const SuperArticle = freeArticles.freeArticle();
// console.log(SuperArticle.createArticle);

