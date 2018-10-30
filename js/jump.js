var jumper = function (gameSetting) {
    var start = function () {
        gameSetting.skierJumpingCount = 1;
        gameSetting.skierJumping = true;
        gameSetting.oldDirection = gameSetting.skierDirection;
        gameSetting.skierDirection = 6;
    }

    var stop = function () {
        gameSetting.skierJumpingCount = 0;
        gameSetting.skierJumping = false;
        gameSetting.skierDirection = gameSetting.oldDirection;

    }

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

    var jumpToShow = function (jumpCount) {
        var jump = Math.floor(jumpCount / 20) + 1;

        if (jumpCount >= 100) {
            jump = 5;
            stop();
        }
        return jump;

    }

    return { start, stop, coordinate, jumpToShow };
}