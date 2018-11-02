/**
 * Speed functions
 * @param {*} gameSetting 
 */
var speedSetting = function (gameSetting) {
    /**
     * Increase the speed for the skier
     */
    var increaseSpeed = function(){
        gameSetting.skierSpeed++;
    }

    /**
     * Decrease the speed of the skier. 
     */
    var decreaseSpeed = function(){
        gameSetting.skierSpeed--;
        //if reduced below the defaultspeed set to defaultspeed
        if(gameSetting.skierSpeed<gameSetting.defaultSpeed)
            gameSetting.skierSpeed= gameSetting.defaultSpeed;
    }

    return {increaseSpeed, decreaseSpeed}
}