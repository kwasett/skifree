

/**
 * functions for level changes
 * 
 * @param {*} gameSetting 
 */
var levels = function(gameSetting){


    /**
     * Increase speed
     */
    var increaseSpeed=function(){

    }
    /**
     * checks of level changes based on the scores
     * @param {number} scores 
     * @param {number} speed 
     */
    var changeLevel = function (scores, speed) {
        //check if the level has changed
        var changes = checkLevelChange(scores, speed, gameSetting.skierLevel);
        //if changed set the new speed and level
        if (changes.level !== gameSetting.skierLevel) {
            gameSetting.skierLevel = changes.level;
            gameSetting.skierSpeed = changes.speed;
        }
    }


    /**
     * get the amount needed per level eg at level 1 its 4000 level 2 is 1.5*4000 which is 6000
     * @param {number} level 
     */
    var getLevelMaxAmount = function (level) {
        if (level === 1)
            return gameSetting.scorePerLevel;
        else
            return (Math.pow(1.5, level - 1) * gameSetting.scorePerLevel);

    }

   
    /**
     * checks if the level amount has been met
     * @param {number} score 
     * @param {number} speed 
     * @param {number} level 
     */
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