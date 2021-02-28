$(document).ready(function () {
    let a = 3
    let symbol = ""
    let playerName = ''
    let tableName = ''
    let concurentName = ''
    let block = 1
    let concurentI = 0
    let concurentJ = 0
    let move = 0
    let i = 0
    let j = 0
    let enemySymbol = ''
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();

    hubConnection.start();

    //приём клика с сервера
    hubConnection.on("CellClick", function (ConcurentName, i, j) {
        concurentI = i
        concurentJ = j
        if (symbol == '') {
            enemySymbol = 'X'
            $('#mySymbol').html('Your symbol is ' + 'O  ')
            symbol = 'O'
            concurentName = ConcurentName
        }
        $('#moveTurn').html('You can move)');
        $("#cell-" + i + "-" + j).addClass('lastMove')
        $("#cell-" + i + "-" + j).html("<div class='internalPoint'>" + enemySymbol + "</div>");
        
        let a = highlight();
        if (a==0) {
            $('#moveTurn').html('You can move)');
        }
        else {
            $('#moveTurn').text('')
        }
        //if (checkWin2(a, enemySymbol)) {
        //    $('#winnerName').text('Winner is ' + ConcurentName +', who was playing with '+ enemySymbol)
        //    breakEvent()
        //}
        block = 0
    });

    hubConnection.on("Restart", function () {
        block = 0
        startGame()
    });
    $('#restart').click(function () {
        block = 0
        hubConnection.invoke("Restart", tableName, playerName)
        startGame()
    })


    hubConnection.on("RightArrow", function () {
        
        if (a <= 9) {
            a += 1
            $('#gridSide').text(a)
            block = 0
            startGame()
        }
        
    });
    $('#rightArr').click(function () {
        hubConnection.invoke("RightArrow", tableName, playerName)
        if (a <= 9) {
            a += 1
            $('#gridSide').text(a)
            block = 0
            startGame()
        }
    })


    hubConnection.on("LeftArrow", function () {
        if (a >= 4) {
            a -= 1
            $('#gridSide').text(a)
            block = 0
            startGame()
        }
        
    });
    $('#leftArr').click(function () {
        hubConnection.invoke("LeftArrow", tableName, playerName)
        if (a>=4) {
            a -= 1
            $('#gridSide').text(a)
            block = 0
            startGame()
        }
    })

    hubConnection.on("ping", function (coucurentName) {
        block = 0
        $('#concurentName').text(`Your opponent is: ${coucurentName}`)
        hubConnection.invoke("pong", tableName, playerName)

    });
    hubConnection.on("pong", function (coucurentName) {
        $('#concurentName').text(`Your opponent is: ${coucurentName}`)
        block = 0
    });

    $("#name").keyup(function (event) {
        if (event.keyCode == 13) {
            if ($('#name').val().replace(/ /g, '') != '') {
                playerName = $('#name').val()
                $.ajax({
                    url: '/api/game/freetables',
                    method: 'GET',
                    success: function (data) {
                        if (data != null) {
                            $('#tableBox').empty()
                            for (var i = 0; i < data.length; i++) {
                                $('#tableBox').append(`<div id="${data[i]}" class="btn inlineBlock table">${data[i]}</div>`)
                            }
                            $('.table').click(function () {
                                tableName = $(this).attr('id')
                                hubConnection.invoke("Register", tableName, playerName)

                                $('#tableNumber').text("You're playing at " + tableName)

                                hubConnection.invoke("ping", tableName, playerName)
                                showPage(3)
                            })
                        }
                    },
                    error: function (err) {

                    },
                    contentType: 'application/json'
                })

                showPage(2)
            }
        }
    });
    $('#btnName').click(function () {
        if ($('#name').val().replace(/ /g, '') != '') {
            playerName = $('#name').val()
            $.ajax({
                url: '/api/game/freetables',
                method: 'GET',
                success: function (data) {
                    if (data != null) {
                        $('#tableBox').empty()
                        for (var i = 0; i < data.length; i++) {
                            $('#tableBox').append(`<div id="${data[i]}" class="btn inlineBlock table">${data[i]}</div>`)
                        }
                        $('.table').click(function () {
                            tableName = $(this).attr('id')
                            hubConnection.invoke("Register", tableName, playerName)

                            $('#tableNumber').text("You're playing at " + tableName)

                            hubConnection.invoke("ping", tableName, playerName)
                            showPage(3)
                        })
                    }
                },
                error: function (err) {

                },
                contentType: 'application/json'
            })

            showPage(2)
        }
    })
    
    
    
    startGame();
    
    function startGame() {
        $('#gridSide').text(a)
        $("#root").empty()
        $("#winnerName").empty()
        $("#mySymbol").empty()
        $("#moveTurn").empty()
        for (var i = 0; i < a; i++) {   
            $("#root").append("<div>")
            for (var j = 0; j < a; j++) {

                $("#root").append("<div class='cell' id='cell-" + i + "-" + j + "'></div>")
                $("#cell-" + i + "-" + j).click(function () {
                    if (block == 0 && $(this).html() == "") {

                        block = 1
                        $("#cell-" + concurentI + "-" + concurentJ).removeClass('lastMove')

                        if (symbol == '') {
                            symbol = "X"
                            $('#mySymbol').html('Your symbol is ' + 'X')
                            enemySymbol = "O"
                        }
                        
                        if ($(this).html() == "") {
                            $(this).html("<div class='internalPoint'>" + symbol + "</div>");

                        }

                        highlight();
                        i = parseInt($(this).attr("id").split('-')[1])
                        j = parseInt($(this).attr("id").split('-')[2])

                        //отправка на хаб данных
                        hubConnection.invoke("CellClick", tableName, playerName, i, j, symbol)
                        let a = highlight();
                        if (a == 0) {
                            $('#moveTurn').html('Your opponent is thinking')
                        }
                        else {
                            $('#moveTurn').text('')
                        }
                        
                    }
                    
                })
                $("#root").append("</div>")

            }
        }

    }

    //get line with winning number of cells
    //function getLine(i, j, a) {
    //    //let half = Math.floor(a / 2)
    //    if (a<=5) {
    //        let max = a
    //    }
    //    else {
    //        let max = 5
    //    }
    //    let currValue = getCellContent(i, j);
    //    let counter = 0
    //    let ret = []
    //    //left and right
    //    for (var b = 0; b < a; b++) {
    //        for (var c = 0; c < a; c++) {
    //            if (getCellContent(i, j + c) != null && getCellContent(i, j + c) == ){

    //            }
    //        }
    //    }

    //        if (getCellContent(i, j - y) != null && getCellContent(i, j + y) != null
    //            && getCellContent(i, j - y) == currValue && currValue == getCellContent(i, j + y)) {
    //            x += 1
    //        }
        
    //    if (x == half) {
    //        for (var y = half; y >= 1; y++) {
    //            ret += [i, j - y]
    //        }
    //        ret+=array(i, j)
    //        for (var y = 1; y <= half; y++) {
    //            ret += [i, j+1]
    //        }
    //        return ret
    //    }

    //    //up and down
    //    x = 0
    //    if (getCellContent(i - 1, j) != null && getCellContent(i + 1, j) != null
    //        && getCellContent(i - 1, j) == currValue && currValue == getCellContent(i + 1, j)) {
    //        return [[i - 1, j], array(i, j), [i + 1, j]];
    //    }

    //    //left up and right down
    //    x = 0
    //    if (getCellContent(i - 1, j - 1) != null && getCellContent(i + 1, j + 1) != null
    //        && getCellContent(i - 1, j - 1) == currValue && currValue == getCellContent(i + 1, j + 1)) {
    //        return [[i - 1, j - 1], array(i, j), [i + 1, j + 1]];
    //    }

    //    //left down and right up
    //    x = 0
    //    if (getCellContent(i - 1, j + 1) != null && getCellContent(i + 1, j - 1) != null
    //        && getCellContent(i - 1, j + 1) == currValue && currValue == getCellContent(i + 1, j - 1)) {
    //        return [[i - 1, j + 1], array(i, j), [i + 1, j - 1]];
    //    }
    //    return null
        
            
    //}

    function checkDiagonal(symb, square, x, y) {
        let torightDown = true;
        let toleftDown = true;
        ret1 = []
        ret2 = []
        for (var i = 0; i < square; i++) {
            torightDown = torightDown && (getCellContent(x + i, y + i) == symb)
            cor1 = [x + i, y + i]
            ret1.push(cor1)
        }
        for (var i = 0; i < square; i++) {
            toleftDown = toleftDown && (getCellContent(square - 1 + x - i, y + i) == symb)
            cor2 = [square - 1 + x - i, y+i]
            ret2.push(cor2)
        }
        if (torightDown) {
            return ret1
        }
        else if (toleftDown) {
            return ret2
        }
        else {
            return false
        }
    }

    function checkLines(symb, square, x, y) {
        let rows = true
        let col = true
        ret1 = []
        ret2 = []
        for (var i = x; i < square + x; i++) {
            rows = true
            col = true
            for (var j = y; j < square+y; j++) {
                rows = rows && getCellContent(i, j) == symb
                cor1 = [i, j]
                ret1.push(cor1)
                col = col && getCellContent(j, i) == symb
                cor2 = [j, i]
                ret2.push(cor2)
            }
            if (rows) {
                return ret1
            }
            else if (col) {
                return ret2
            }
            else {
                ret1 = []
                ret2 = []
            }
        }
        
        
        return false        
        
    }
    function highlight() {
        let arr = null
        let square = 0
        if (a == 3 || a == 4) {
            square = 3
        }
        else if (a == 5 || a == 6) {
            square = 4
        }
        else if (a > 6) {
            square = 5
        }
        if (checkWin2(a, symbol) != false) {
            $('#winnerName').text("Congratulations! You're the winer")
            arr = checkWin2(a, symbol)
            breakEvent();
        }
        else if (checkWin2(a, enemySymbol) != false) {
            $('#winnerName').html('Your opponent (' + concurentName + ') has won, <br>but do not be sad😀')
            arr = checkWin2(a, enemySymbol)
            breakEvent();
        }
        if (arr != null) {
            for (var i = 0; i < square; i++) {
                $("#cell-" + arr[i][0] + "-" + arr[i][1]).addClass('highlightWinner')
            }
            breakEvent();
        }
        else {
                return 0
        }
    }
    function checkWin2(a, symb) {
        let square = 0
        if (a == 3 || a ==4) {
            square = 3
        }
        else if (a == 5 || a == 6) {
            square = 4
        }
        else if (a>6) {
            square = 5
        }

        for (var i = 0; i < a - square+1; i++) {
            for (var j = 0; j < a - square + 1; j++) {
                if (checkLines(symb, square, i, j) !=false) {
                    return checkLines(symb, square, i, j)
                }
                else if (checkDiagonal(symb, square, i, j)!=false) {
                    return checkDiagonal(symb, square, i, j)
                }
            }
        }
        return false
    }


    //function checkWin(a) {
    //    for (var i = 0; i < a; i++) {
    //        for (var j = 0; j < a; j++) {
    //            let a1 = getLine(i, j, a)
    //            let a2 = getCellContent(i, j)
    //            if (a1 != null && a2!=null) {
    //                return a1
    //            }
    //        }
    //    }
    //    return null
    //}


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
    //cancel putting symbols into cells
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
