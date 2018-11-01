
$(document).ready(function () {

    var settings = defaultSettings;

    var asset = assets(settings, 0, () => { });
    var assetName = asset.getSkierAsset(1);
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
        //move 10 times
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

        //collide to see if the calculation is done
        scores.addMoveScore("collide");
        assert.ok(settings.skierScore == 0, "Passed! " + settings.skierScore);
    });



    QUnit.test("Level Amount For Level 1", function (assert) {
        //test level amount for level 1
        var levelAMount = level.getLevelMaxAmount(1);
        assert.ok(levelAMount == settings.scorePerLevel, "Passed! ");
    });

    QUnit.test("Level Amount For Level 3", function (assert) {

        //test level 3 amount
        var levelAMount = level.getLevelMaxAmount(3);
        assert.ok(levelAMount == 9000, "Passed! ");
    });

    QUnit.test("Rhino Can chase", function (assert) {
        //check if chase time is due
        rhinoCtl.rhinoChase(4000, 3000)
        assert.ok(settings.rhinoAttack == true, "Passed! ");
    });

    highScore.saveScore("kofi", "900")
    highScore.saveScore("ama", "500")
    var topScores = highScore.topRank();
    QUnit.test("Save Score", function (assert) {
        
        //save highest rank
        assert.ok(topScores.length == 2, "Passed! ");

        
    });


    QUnit.test("Highest Score on top", function (assert) {
        
        //check topmost score
        assert.ok(topScores[0].score == 900, "Passed! ");
        assert.ok(topScores[0].name == "kofi", "Passed! ");
        localStorage.removeItem(itemKey);
    });
})