import Utils from "../Utils/Utils";
/**
 * 
 * Main page class containing all methods used on invKeep main page
 * @class
 * 
 */
class MainPage {

    visitPage(pageUrl: string){
        Utils.visitPage(pageUrl);
    }
}

export default new MainPage();
