
$(document).ready(function () {

    var settings = defaultSettings;

    var asset = assets(settings, 0, () => { });
    assetName = asset.getSkierAsset(1);
    var level = levels(settings);

    var rhinoCtl = rhinoActions(settings);
    var scores = scoreCal(settings, rhinoCtl, level);



    QUnit.test("Find Asserts", function (assert) {
        assert.ok(assetName == "skierLeft", "Passed!");
    });

    QUnit.test("Score Calculator Per move", function (assert) {


        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        assert.ok(settings.skierScore == 70, "Passed!");
    });




    QUnit.test("Score Collide", function (assert) {
        scores.addMoveScore("collide");
        assert.ok(settings.skierScore == 20, "Passed! "+settings.skierScore);
    });



    QUnit.test("Level Amount For Level 1", function (assert) {
        var levelAMount  = level.getLevelMaxAmount(1);
        assert.ok(levelAMount == settings.scorePerLevel, "Passed! ");
    });
    
    QUnit.test("Level Amount For Level 3", function (assert) {
        var levelAMount  = level.getLevelMaxAmount(3);
        assert.ok(levelAMount == 9000, "Passed! ");
    });

    QUnit.test("Rhino Can chase", function (assert) {
       rhinoCtl.rhinoChase(4000,3000)
        assert.ok(settings.rhinoAttack == true, "Passed! ");
    });
})