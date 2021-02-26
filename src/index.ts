// import  {ArticleBuilder, ArticleDirector} from './classes/articles';
// import {userFactory} from "./class.userBuilder";
const freeArticles = new ArticleDirector(ArticleBuilder)
const SuperArticle = freeArticles.freeArticle("The legendary superman", "Did you know superman could bake pies really quickly. That's because he is Superman. (it's not specific to pies.");
SuperArticle.createArticle("The Super Man's Article");



const ElephantFacts = freeArticles.guestPaidArticle("Super Elephant,", "The great stories of a really awesome Elephant");
ElephantFacts.createArticle("The Elephant that could.")



const user1=userFactory("Danielle");
console.log(user1)