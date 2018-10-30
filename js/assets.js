var assets = function(){

    var getRhinoAsset = function (rhinoDirection) {
        var skierAssetName;

        switch (rhinoDirection) {
            case 0:
                skierAssetName = 'rhino';
                break;
            case 1:
                skierAssetName = 'rhinoRunLeft';
                break;
            case 2:
            case 3:
            case 4:
                skierAssetName = 'rhinoRunLeft2';
                break;
            case 5:
                skierAssetName = 'rhinoLift';
                break;
            case 6:
                skierAssetName = 'rhinoLiftMouthOpen';
                break;
            case 7:
            case 8:
            case 9:
            case 10:
                skierAssetName = "rhinoLiftEat" + (rhinoDirection - 6);
                rhinoSkierCollide++;
                break;
            //Collide NO movement
        }
        console.log("rhino Skier : " + skierAssetName);

        return skierAssetName;
    };


    return {rhinoAssets : getRhinoAsset}
}