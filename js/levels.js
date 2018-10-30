var levels = function(gameSetting){

    var changeLevel = function (scores, speed) {
        var changes = checkLevelChange(scores, speed, gameSetting.skierLevel);
        if (changes.level !== gameSetting.skierLevel) {
            gameSetting.skierLevel = changes.level;
            gameSetting.skierSpeed = changes.speed;
        }
    }

    var getLevelMaxAmount = function (level) {
        if (level === 1)
            return gameSetting.scorePerLevel;
        else
            return (Math.pow(1.5, level - 1) * gameSetting.scorePerLevel);

    }

    var checkLevelChange = function (score, speed, level) {

        var levelAmt = getLevelMaxAmount(level);
        
        //Level change score is exponential by 1.5 exponent the level you are in
        if (score >= levelAmt) {
            level += 1;
            speed += 1;
        }
        return { level: level, speed: speed };
    }


    return {checkLevelChange,getLevelMaxAmount,changeLevel};
}