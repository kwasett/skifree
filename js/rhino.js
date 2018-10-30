let assets = require('./assets')
var rhino = function(){
    var changeLevel = function (scores, speed,oldLevel) {
        var skierLevel, skierSpeed=0;
        var changes = checkLevelChange(scores, speed, oldLevel);
        if (changes.level !== skierLevel) {
            skierLevel = changes.level;
            skierSpeed = changes.speed;
        }

        return {level:skierSpeed, level:skierLevel}
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


}

module.exports = rhino;