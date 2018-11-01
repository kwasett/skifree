//higest scores
//save scores to localstoreage get scores
var higestScores = function(storage,scoresName){

    var GAME_SCORES =scoresName;
    if(!scoresName)
     GAME_SCORES = "GameScores";
    //get all scores stored 
    var getlocalScores = function () {
        const scores = storage.getItem(GAME_SCORES);
        if (!scores) {
            return [];
        } else
            return JSON.parse(scores)
    }

    //get the top 10 ranked scores
    var topRank = function () {
        var scores = getScores(10, true, "score", "desc");
        return scores;
    }

    //get scores sort based on what the user wants
    var getScores = function (limit, sortAble, sortByField, sortDirection) {
        const scores = getlocalScores();
        var list = _.orderBy(scores, [sortByField], [sortDirection]);
        return list.slice(0, limit);
    }

    //show top scores in html
    var showTopScores = function () {
        var topScores = topRank();
        $("#topscores ol").html("");
        var scoresLength = topScores.length;
        for (var i = 0; i < scoresLength; i++) {
            $(displaySingleScore(topScores[i])).appendTo("#topscores ol");
        }

    }
    
    //displays just one particular top score at a time
    var displaySingleScore = function (score) {
        return '<li>' + score.name + '   : <strong>' + score.score + '</li>';
    }

    //same the scores to the local storage
    var saveScore = function (name, score) {

        let oldScores = getlocalScores();
        oldScores.push({ name: name, score: score })
        let valueJson = JSON.stringify(oldScores);
        localStorage.setItem(GAME_SCORES, valueJson);

    }

    //same scores and return top scores
    var saveScores = function (name, score) {
            saveScore(name,score);
            return topRank();
    }

    return {saveScore,saveScores,displaySingleScore,showTopScores,getScores,topRank}
}