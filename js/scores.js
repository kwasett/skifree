var higestScores = function(storage,scoresName){

    var GAME_SCORES =scoresName;
    if(!scoresName)
     GAME_SCORES = "GameScores";
    var getlocalScores = function () {
        const scores = storage.getItem(GAME_SCORES);
        if (!scores) {
            return [];
        } else
            return JSON.parse(scores)
    }

    var topRank = function () {
        var scores = getScores(10, true, "score", "desc");
        return scores;
    }

    var getScores = function (limit, sortAble, sortByField, sortDirection) {
        const scores = getlocalScores();
        console.log("Localstrore : "+JSON.stringify(scores));
        var list = _.orderBy(scores, [sortByField], [sortDirection]);
        return list.slice(0, limit);
    }
    var showTopScores = function () {
        var topScores = topRank();
        $("#topscores ol").html("");
        var scoresLength = topScores.length;
        for (var i = 0; i < scoresLength; i++) {
            $(displaySingleScore(topScores[i])).appendTo("#topscores ol");
        }

    }
    
    var displaySingleScore = function (score) {
        return '<li>' + score.name + '   : <strong>' + score.score + '</li>';
    }
    var saveScore = function (name, score) {

        let oldScores = getlocalScores();
        oldScores.push({ name: name, score: score })
        let valueJson = JSON.stringify(oldScores);
        localStorage.setItem(GAME_SCORES, valueJson);

    }

    var saveScores = function (name, score) {
            saveScore(name,score);
            return topRank();
    }

    return {saveScore,saveScores,displaySingleScore,showTopScores,getScores,topRank}
}