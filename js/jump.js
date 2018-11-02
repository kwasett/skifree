/**
 * function to enable the skier jump
 * @param {*} gameSetting 
 */
var jumper = function (gameSetting) {

    
    /**
     * starts the whole jump process set skierJumpingCount to 1 and skierJumping to true
     */
    var start = function () {
        gameSetting.skierJumpingCount = 1;
        gameSetting.skierJumping = true;
        gameSetting.oldDirection = gameSetting.skierDirection;
        gameSetting.skierDirection = 6;
    }

    
    /**
     * stops the jump process
     * set skierJumpingCount to 0 and skierJumping to false
     * reset old direction
     */
    var stop = function () {
        gameSetting.skierJumpingCount = 0;
        gameSetting.skierJumping = false;
        gameSetting.skierDirection = gameSetting.oldDirection;

    }


    //gets the cordinate of a jump given the jump count the width of the jump image and the x coordinate
    /**
     * 
     * @param {number} jumpCount 
     * @param {number} width 
     * @param {number} x 
     * @param {number} y 
     */
    var coordinate = function (jumpCount, width, x, y) {

        var jumpCountToShow = jumpToShow(jumpCount);

        //Greater than 3  start falling off or returning from fall
        if (jumpCountToShow > 3) {
            y -= ((5 - jumpCountToShow) * gameSetting.skierSpeed)
        } else if (jumpCountToShow <= 3) {
            //going up 
            y += ((jumpCountToShow) * gameSetting.skierSpeed)
        }
        gameSetting.skierJumpingCount++;
        return { x: x, y: y };

    }


    /**
     * determines the jump image index to show its generally mod 20 of the jump count
     * @param {number} jumpCount 
     */
    var jumpToShow = function (jumpCount) {
        var jump = Math.floor(jumpCount / 20) + 1;

        //if jump count is more than 100 stop jumping
        if (jumpCount >= 100) {
            jump = 5;
            stop();
        }
        return jump;

    }

    return { start, stop, coordinate, jumpToShow };
}