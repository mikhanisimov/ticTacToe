$(document).ready(function () {
    let a = 3
    let symbol = "X"
    let playerName = ''
    let tableName = ''

    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();
    hubConnection.start();

    startGame();

    $('#leftArr').click(function () {
        if (a>=4) {
            a -= 1
            $('#gridSide').text(a)
            startGame()
        }
    })

    $('#rightArr').click(function () {
        if (a <=9) {
            a += 1
            $('#gridSide').text(a)
            startGame()
        }
    })

    $('#restart').click(function () {
        startGame()
    })

    $('#btnName').click(function () {
        playerName = $('#name').val()
        showPage(2)
    })

    $('.table').click(function () {
        tableName = $(this).attr('id')
        hubConnection.invoke("Register", tableName, playerName)
        showPage(3)
    })

    function startGame() {
        $('#gridSide').text(a)
        $("#root").empty()
        $("#winnerName").empty()
        symbol = "X"
        for (var i = 0; i < a; i++) {
            $("#root").append("<div>")
            for (var j = 0; j < a; j++) {

                $("#root").append("<div class='cell' id='cell-" + i + "-" + j + "'></div>")
                $("#cell-" + i + "-" + j).click(function () {

                    if ($(this).html() == "") {
                        $(this).html("<div class='internalPoint'>" + symbol + "</div>");

                        if (symbol == "O") {
                            symbol = "X"
                        }
                        else {
                            symbol = "O"
                        }
                    }

                    let arr = checkWin(a)
                    if (arr != null) {
                        $("#cell-" + arr[0][0] + "-" + arr[0][1]).addClass('highlightWinner')
                        $("#cell-" + arr[1][0] + "-" + arr[1][1]).addClass('highlightWinner')
                        $("#cell-" + arr[2][0] + "-" + arr[2][1]).addClass('highlightWinner')
                        $('#winnerName').text('Winner is ' + $("#cell-" + arr[0][0] + "-" + arr[0][1]).text())
                        breakEvent();
                    }

                    hubConnection.invoke("CellClick", tableName, playerName, i, j, symbol)
                })

                $("#root").append("</div>")

            }
        }
    }

    function getLine(i, j) {
        let currValue = getCellContent(i, j);

        if (getCellContent(i, j - 1) != null && getCellContent(i, j + 1) != null
            && getCellContent(i, j - 1) == currValue && currValue == getCellContent(i, j + 1)) {
            return [[i, j - 1], [i, j], [i, j + 1]];
        }

        if (getCellContent(i-1, j) != null && getCellContent(i+1, j) != null
            && getCellContent(i - 1, j) == currValue && currValue == getCellContent(i + 1, j)) {
            return [[i - 1, j], [i, j], [i + 1, j]];
        }

        if (getCellContent(i - 1, j-1) != null && getCellContent(i + 1, j+1) != null
            && getCellContent(i - 1, j-1) == currValue && currValue == getCellContent(i + 1, j+1)) {
            return [[i - 1, j-1], [i, j], [i + 1, j+1]];
        }

        if (getCellContent(i - 1, j + 1) != null && getCellContent(i + 1, j - 1) != null
            && getCellContent(i - 1, j + 1) == currValue && currValue == getCellContent(i + 1, j - 1)) {
            return [[i - 1, j + 1], [i, j], [i + 1, j - 1]];
        }
        return null
    }

    function getCellContent(i, j) {
        try {
            let a = $("#cell-" + i + "-" + j).text()
            if (a == '') {
                return null;
            }
            return a
        } catch (e) {
            return null
        }
    }

    function checkWin(a) {
        for (var i = 0; i < a; i++) {
            for (var j = 0; j < a; j++) {
                let a1 = getLine(i, j)
                let a2 = getCellContent(i, j)
                if (getLine(i, j) != null && getCellContent(i, j) == 'X') {
                    return a1
                }
                if (getLine(i, j) != null && getCellContent(i, j) == 'O') {
                    return a1
                }
            }
        }
        return null
    }

    function breakEvent() {
        for (var i = 0; i < a; i++) {
            for (var j = 0; j < a; j++) {
                $("#cell-" + i + "-" + j).off("click");
            }
        }
    }

    function showPage(n){
        for (var i = 0; i < 2; i++) {
            $(`#page${i + 1}`).hide()
        }

        $(`#page${n}`).show()
    }

});
