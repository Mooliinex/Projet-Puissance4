(function ($) {
    $.fn.Power = function () {
    }
}(jQuery));
$(document).ready(function () {
    $('#body').Power();
    let instance;
    $("#start-game").click(function (e) {
        e.preventDefault();
        $("#form").hide();
        let color1 = $('#color1').val();
        let color2 = $('#color2').val();
        $("#result-P1").html($("#player1").val());
        $("#result-P1").css("color", color1);
        $("#result-P2").html($("#player2").val());
        $("#result-P2").css("color", color2);
        instance = new Power('#play',
            prompt("Combien de lignes ?"),
            prompt("Combien de colonnes ?"), color1, color2);
        $("#hide").removeClass("hide");
    });
    $('#restart-game').click(function () {
        instance.restart();
    });
    $('#new-game').click(function () {
        location.reload();
    });
    $('#play').click(function () {
    });
});
