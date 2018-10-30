var assets = function(gameSetting,skierJumpingCount,jump){

    var assets = {
        'skierCrash': 'img/skier_crash.png',
        'skierLeft': 'img/skier_left.png',
        'skierLeftDown': 'img/skier_left_down.png',
        'skierDown': 'img/skier_down.png',
        'skierRightDown': 'img/skier_right_down.png',
        'skierRight': 'img/skier_right.png',

        'tree': 'img/tree_1.png',
        'treeCluster': 'img/tree_cluster.png',
        'rock1': 'img/rock_1.png',
        'rock2': 'img/rock_2.png',

        'rhino': 'img/rhino_default.png',
        'rhinoRunLeft': 'img/rhino_run_left.png',
        'rhinoRunLeft2': 'img/rhino_run_left_2.png',
        'rhinoLift': 'img/rhino_lift.png',
        'rhinoLiftMouthOpen': 'img/rhino_lift_mouth_open.png',
        'rhinoLiftEat1': 'img/rhino_lift_eat_1.png',
        'rhinoLiftEat2': 'img/rhino_lift_eat_2.png',
        'rhinoLiftEat3': 'img/rhino_lift_eat_3.png',
        'rhinoLiftEat4': 'img/rhino_lift_eat_4.png',


        'skierJump1': 'img/skier_jump_1.png',
        'skierJump2': 'img/skier_jump_2.png',
        'skierJump3': 'img/skier_jump_3.png',
        'skierJump4': 'img/skier_jump_4.png',
        'skierJump5': 'img/skier_jump_5.png'


    };

    var loadedAssets = {};

    var getSkierImage = function (skierDirection) {
        var skierAssetName = getSkierAsset(skierDirection);
        console.log("Skier loaded : "+ JSON.stringify(skierAssetName))
        return loadedAssets[skierAssetName];
    }

    var getSkierAsset = function (skierDirection) {
        var skierAssetName;
        switch (skierDirection) {
            case 0:
                skierAssetName = 'skierCrash';
                break;
            case 1:
                skierAssetName = 'skierLeft';
                break;
            case 2:
                skierAssetName = 'skierLeftDown';
                break;
            case 3:
                skierAssetName = 'skierDown';
                break;
            case 4:
                skierAssetName = 'skierRightDown';
                break;
            case 5:
                skierAssetName = 'skierRight';
                break;
            case 6:
                skierAssetName = "skierJump" + jump.jumpToShow(skierJumpingCount);
                break;
            default:
                console.log("None FOund : " + skierDirection);
                break;
        }

        return skierAssetName;
    };

    var getRhinoAsset = function (rhinoDirection) {
        var skierAssetName;

        console.log("Rhino Direction: "+rhinoDirection);
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
                skierAssetName = "rhinoLiftEat" + (gameSetting.rhinoDirection - 6);
                gameSetting.rhinoSkierCollide++;
                break;
            //Collide NO movement
        }
        console.log("rhino Skier : " + skierAssetName);

        return skierAssetName;
    };

    var loadAssets = function () {
        var assetPromises = [];

        _.each(assets, function (asset, assetName) {
            var assetImage = new Image();
            var assetDeferred = new $.Deferred();

            assetImage.onload = function () {
                assetImage.width /= 2;
                assetImage.height /= 2;
                loadedAssets[assetName] = assetImage;
                assetDeferred.resolve();
            };
            assetImage.src = asset;

            assetPromises.push(assetDeferred.promise());
        });

        return $.when.apply($, assetPromises);
    };
    return {getSkierAsset, getSkierImage, getRhinoAsset, loadAssets,loadedAssets};
}

