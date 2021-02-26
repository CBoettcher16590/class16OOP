import  {ArticleBuilder, ArticleDirector} from './classes/articles'

const freeArticles = new ArticleDirector(ArticleBuilder)
const SuperArticle = freeArticles.freeArticle();

const ElephantFacts = freeArticles.guestPaidArticle();
const KnowYourNeighbor = freeArticles.memberFreeArticle();
const ArticleNumber1 = freeArticles.memberPaidArticle();

SuperArticle.createArticle()
// console.log(SuperArticle.createArticle());

