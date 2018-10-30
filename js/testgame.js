
$(document).ready(function () {

    var settings = defaultSettings;

    var asset = assets(settings, 0, () => { });
    assetName = asset.getSkierAsset(1);
    var level = levels(settings);

    var rhinoCtl = rhinoActions(settings);
    var scores = scoreCal(settings, rhinoCtl, level);
    var itemKey = "tempsave";
    var highScore = higestScores(localStorage, itemKey);



    QUnit.test("Find Asserts", function (assert) {
        assert.ok(assetName == "skierLeft", "Passed!");
    });

    QUnit.test("Score Calculator Per move", function (assert) {

        settings.hasMoved = true;

        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        scores.addMoveScore("move");
        settings.hasMoved = false;
        assert.ok(settings.skierScore == 10*settings.skierSpeed, "Passed!");
    });




    QUnit.test("Score Collide", function (assert) {
        scores.addMoveScore("collide");
        assert.ok(settings.skierScore == 0, "Passed! " + settings.skierScore);
    });



    QUnit.test("Level Amount For Level 1", function (assert) {
        var levelAMount = level.getLevelMaxAmount(1);
        assert.ok(levelAMount == settings.scorePerLevel, "Passed! ");
    });

    QUnit.test("Level Amount For Level 3", function (assert) {
        var levelAMount = level.getLevelMaxAmount(3);
        assert.ok(levelAMount == 9000, "Passed! ");
    });

    QUnit.test("Rhino Can chase", function (assert) {
        rhinoCtl.rhinoChase(4000, 3000)
        assert.ok(settings.rhinoAttack == true, "Passed! ");
    });

    highScore.saveScore("kofi", "900")
    highScore.saveScore("ama", "500")
    var topScores = highScore.topRank();
    QUnit.test("Save Score", function (assert) {
        
        assert.ok(topScores.length == 2, "Passed! ");

        
    });


    QUnit.test("Highest Score on top", function (assert) {
        
        assert.ok(topScores[0].score == 900, "Passed! ");
        assert.ok(topScores[0].name == "kofi", "Passed! ");
        localStorage.removeItem(itemKey);
    });
})