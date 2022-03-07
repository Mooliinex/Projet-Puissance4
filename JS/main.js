class Power {

    constructor(elem, x, y, Player1, Player2) {
        if (x < 7) {
            x = 7;
        }
        if (y < 8) {
            y = 8;
        }
        this.row = x;
        this.col = y;
        this.player = Player1;
        this.player1 = Player1;
        this.player2 = Player2;
        this.elem = elem;
        this.playerplay = function () {
        };
        this.grid();
        this.event();
        this.finish = false;
        // this.round = 1;
    }
    grid() {
        const array = $(this.elem);
        array.empty();
        this.finish = false;
        this.player = this.player1;
        for (let x = 0; x < this.row; x++) {
            const $x = $('<div>')
                .addClass('x');
            for (let y = 0; y < this.col; y++) {
                const $y = $('<div>')
                    .addClass('gridColor empty')
                    .attr('data-y', y)
                    .attr('data-x', x);
                $x.append($y);
            }
            array.append($x);
        }
    }
    event() {
        const array = $(this.elem);
        const object = this;
        function search_cellule(y) {
            const cellule = $(`.gridColor[data-y ='${y}']`);
            for (let i = cellule.length - 1; i >= 0; i--) {
                const cell = $(cellule[i]);
                if (cell.hasClass('empty')) {
                    return cell;
                }
            }
            return null;
        }
        array.on('mouseenter', '.gridColor.empty', function () {
            if (object.finish) return;
            const y = $(this).data('y');
            const last_cellule = search_cellule(y);
            last_cellule.addClass(`player-${object.player}`);
        });
        array.on('mouseleave', '.gridColor', function () {
            $('.gridColor').removeClass(`player-${object.player}`);
        });
        array.on('click', '.gridColor.empty', function () {
            if (object.finish) return;
            const y = $(this).data('y');
            const last_cellule = search_cellule(y);
            last_cellule.addClass(object.player);
            last_cellule.removeClass(`empty player-${object.player}`);
            last_cellule.data('player', object.player);

            const gagnant = object.winner(
                last_cellule.data('x'),
                last_cellule.data('y'));
            if (gagnant) {
                alert(` ${object.player} WINNER !!! `);
                if (object.player === object.player1) {
                    $("#Player-1").html(parseInt($("#Player-1").html(), 10) + 1);
                } else {
                    $("#Player-2").html(parseInt($("#Player-2").html(), 10) + 1);
                }
                $('.gridColor.empty').removeClass('empty');
                return;
            }
            object.player = (object.player === object.player1) ? object.player2 : object.player1;
            // object.player = (object.round % 2) == 1 ? object.player2 : object.player1;
            object.playerPlay();
            // object.round++;
            $(this).trigger('mouseenter');



        });
    }
    winner(x, y) {
        const object = this;

        function $checkdir(i, j) {
            return $(`.gridColor[data-x = '${i}'][data-y = '${j}']`);
        }
        function checkdirection(direction) {
            let result = 0;
            let i = x + direction.i;
            let j = y + direction.j;
            let playerN = $checkdir(i, j);
            while (i >= 0 &&
                i < object.row &&
                j >= 0 && j < object.col &&
                playerN.data('player') === object.player) {
                result++;
                i += direction.i;
                j += direction.j;
                playerN = $checkdir(i, j);
            }
            return result;
        }
        function checkwin(directionA, directionB) {
            const result = 1 +
                checkdirection(directionA) +
                checkdirection(directionB);
            if (result >= 4) {
                return object.player;
            } else {
                return null;
            }
        }
        function vertical() {
            return checkwin({ i: -1, j: 0 }, { i: 1, j: 0 });
        }
        function horizontal() {
            return checkwin({ i: 0, j: -1 }, { i: 0, j: 1 });
        }
        function diagtop() {
            return checkwin({ i: 1, j: -1 }, { i: 1, j: 1 });
        }
        function diagdown() {
            return checkwin({ i: 1, j: 1 }, { i: -1, j: -1 });
        }
        return vertical() ||
            horizontal() ||
            diagtop() ||
            diagdown();
    }


    restart() {
        this.grid();
        this.playerplay();
    }
}