/*
Kami menyimpan elemen status game kami di sini agar kami dapat lebih mudah
gunakan nanti
*/
const statusDisplay = document.querySelector('.game--status');
const statusDisplay_score = document.querySelector('.game--score');
const statusDisplay_difficult = document.querySelector('.game--diff');
/*
Di sini kami mendeklarasikan beberapa variabel yang akan kami gunakan untuk melacak
keadaan game melalui game.
*/
/*
Kami akan menggunakan gameActive untuk menjeda game jika terjadi skenario akhir
*/
let gameActive = true;
/*
Kami akan menyimpan pemain kami saat ini di sini, jadi kami tahu siapa yang berbalik
*/
let currentPlayer = "X";
/*
Kami akan menyimpan status permainan kami saat ini di sini, berupa string kosong dalam sebuah array
 akan memungkinkan kami melacak sel yang dimainkan dengan mudah dan memvalidasi status game nanti
*/
let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let player1 = 3
let player2 = 0
let bot_choice = 0
let p = 0
let difficult = "Easy"
let q = [] /* botchoice hard*/
let saklar = false
let z = [] /*pembanding choice*/

/*
Di sini kami telah menyatakan beberapa pesan yang akan kami tampilkan kepada pengguna selama permainan.
Karena kami memiliki beberapa faktor dinamis dalam pesan tersebut, yaitu pemain saat ini,
kami telah mendeklarasikannya sebagai fungsi, sehingga pesan aktual dibuat dengan
data terkini setiap kali kita membutuhkannya.
*/
const winningMessage = () => `Pemenangnya ${currentPlayer}!`;
const drawMessage = () => `Game berakhir seri!`;
const currentPlayerTurn = () => `Giliran ${currentPlayer}`;  // Bisa direplace dengan nama
const score_Message = () => `${player1} : ${player2}`;

/*
Kami mengatur pesan awal agar para pemain tahu giliran siapa
*/
statusDisplay.innerHTML = currentPlayerTurn();
statusDisplay_score.innerHTML = score_Message();
statusDisplay_difficult.innerHTML = difficult;

function medium_logic(){
    let temp = []
    let n = q.length
    for (let i = 1; i <= (gameState.length)-3; i += 4) { //horizontal checker
        // const winCondition = winningConditions[i];
        let a = gameState[i];
        let b = gameState[i+1];
        let c = gameState[i+2];
        let d = gameState[i+3];
        
        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+3)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+2)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+1)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }
    }

    for (let i = 1; i <= (gameState.length)-12; i++){ //vertical checker
        let a = gameState[i];
        let b = gameState[i+4];
        let c = gameState[i+8];
        let d = gameState[i+12];
        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+12)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+8)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+4)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }
    }

    for (let i = 1; i <= (gameState.length)-12; i += 4){ //diagonal checker right to left
        let a = gameState[i];
        let b = gameState[i+5];
        let c = gameState[i+10];
        let d = gameState[i+15];
        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+15)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+10)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+5)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }
    }

    for (let i = 4; i <= (gameState.length)-12; i += 4){ //diagonal checker left to right
        let a = gameState[i];
        let b = gameState[i+3];
        let c = gameState[i+6];
        let d = gameState[i+9];
        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+9)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+6)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+3)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }
    }

    if(temp.length >= 0){
        if (n != temp.length) {
            saklar = true
            console.log(saklar)
        }
    }

    console.log(temp)
    q = temp /* mengganti isi dari q dengan temp*/
}

function hard_logic(){
    let temp = []
    let n = q.length
    for (let i = 1; i <= (gameState.length)-3; i += 4) { //horizontal checker
        // const winCondition = winningConditions[i];
        let a = gameState[i];
        let b = gameState[i+1];
        let c = gameState[i+2];
        let d = gameState[i+3];
        
        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+3)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+2)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+1)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }

        if (a===b && (a,b != '') && (a,b != 'O')){
            temp.push(i+2)
        }

        if (b===c && (b,c != '') && (b,c != 'O')){
            temp.push(i)
        }

    }
    for (let i = 1; i <= (gameState.length)-12; i++){ //vertical checker
        let a = gameState[i];
        let b = gameState[i+4];
        let c = gameState[i+8];
        let d = gameState[i+12];
        
        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+12)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+8)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+4)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }

        if (a===b && (a,b != '') && (a,b != 'O')){
            temp.push(i+8)
        }

        if (b===c && (b,c != '') && (b,c != 'O')){
            temp.push(i)
        }

    }
    for (let i = 1; i <= (gameState.length)-12; i += 4){ //diagonal checker right to left
        let a = gameState[i];
        let b = gameState[i+5];
        let c = gameState[i+10];
        let d = gameState[i+15];

        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+15)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+10)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+5)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }

        if (a===b && (a,b != '') && (a,b != 'O')){
            temp.push(i+10)
        }

        if (b===c && (b,c != '') && (b,c != 'O')){
            temp.push(i)
        }
    }
    for (let i = 4; i <= (gameState.length)-12; i += 4){ //diagonal checker left to right
        let a = gameState[i];
        let b = gameState[i+3];
        let c = gameState[i+6];
        let d = gameState[i+9];

        if (a === b && b === c && (a,b,c != '')) {
            temp.push(i+9)
        }

        if (a === b && b === d && (a,b,d != '')) {
            temp.push(i+6)
        }

        if (a === c && c === d && (a,c,d != '')) {
            temp.push(i+3)
        }

        if (b === c && c === d && (b,c,d != '')) {
            temp.push(i)
        }

        if (a===b && (a,b != '') && (a,b != 'O')){
            temp.push(i+6)
        }

        if (b===c && (b,c != '') && (b,c != 'O')){
            temp.push(i)
        }
    }
    if(temp.length >= 0){
        if (n != temp.length) {
            saklar = true
            console.log(saklar)
        }
    }

    console.log(temp)
    q = temp /* mengganti isi dari q dengan temp*/
}

function bot_Turn() {
    console.log(difficult)
    if (player1 < 3) {
        //Easy
        bot_choice = Math.floor((Math.random() * (gameState.length)-2) + 1);
        console.log(bot_choice)
        //#
        while (bot_choice <= 0){
            bot_choice = Math.floor((Math.random() * (gameState.length)-2) + 1);
            console.log(bot_choice)
        }
    }else if (player1 < 6 && player1 >= 3) {
        //Medium
        difficult = "Medium"
        medium_logic()
        console.log(q)
        console.log(z)
        if(p < 5){
            bot_choice = Math.floor((Math.random() * (p+5)) + 1);
            console.log(bot_choice)
        } else if (p <= 28 && p > 5){
            bot_choice = Math.floor((Math.random() * (p+5)) + (p-5));
            if (bot_choice > 28){
                for (let i = 1 ; i <= 28 ;i++){
                    if (gameState[i] == ''){
                        bot_choice == i;
                        break
                    }
                }
            } else {
                bot_choice = bot_choice
            }
            console.log(bot_choice)
        } else {
            for (let i = 1 ; i <= 28 ;i++){
                if (gameState[i] == ''){
                    bot_choice == i;
                    break
                }
            }
        }
        if (q.length != 0 && saklar == true) {
            let choice = q
            let n = q.length
            let val = 0
            for (let i = 0 ; i < n ; i++){
                if (!(z.includes(choice[i]))){
                    val = choice[i];
                    z = q;
                }
            }
            bot_choice = val
            saklar = false
            console.log(saklar)
            console.log(bot_choice)
        }

    }else if (player1 < 9 && player1 >= 6 ) {
        difficult = "Hard"
        console.log(q)
        hard_logic()
        if(p < 3){
            bot_choice = Math.floor((Math.random() * (p+3)) + 1);
            console.log(bot_choice)
        } else if (p <= 28 && p > 3) {
            bot_choice = Math.floor((Math.random() * (p+3)) + (p-3));
            console.log(bot_choice)
        } else {
            for (let i = 1 ; i <= 28 ;i++){
                if (gameState[i] == ''){
                    bot_choice == i;
                    break
                }
            }
        }
        if (q.length != 0 && saklar == true) {
            let choice = q
            let n = q.length
            let val = 0
            for (let i = 0 ; i < n ; i++){
                if (!(z.includes(choice[i]))){
                    val = choice[i];
                    z = q;
                }
            }
            bot_choice = val
            saklar = false
            console.log(saklar)
            console.log(bot_choice)
        }
    }
    

    //Logika bot
    if (gameState[bot_choice] != "X" && gameState[bot_choice] != "O"){
        gameState[bot_choice] = "O";
        if (bot_choice != 0) {
            document.getElementById(`${bot_choice}`).innerHTML = "O";
        }
    } else { bot_Turn();}
    statusDisplay.innerHTML = currentPlayerTurn();
    statusDisplay_difficult.innerHTML = difficult;
    
}


function handleCellPlayed(clickedCell, clickedCellIndex) {
    /*
    Kami memperbarui status permainan internal kami untuk mencerminkan gerakan yang dimainkan,
    serta memperbarui antarmuka pengguna untuk mencerminkan gerakan yang dimainkan
    */
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        p = parseInt(clickedCellIndex)
}

function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
        statusDisplay_score.innerHTML = score_Message();
        statusDisplay_difficult.innerHTML = difficult;
        if (currentPlayer === "O"){
            currentPlayer = "O"
            statusDisplay.innerHTML = currentPlayerTurn();
            bot_Turn();
            handleResultValidation()
        }

}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 1; i <= (gameState.length)-3; i += 4) { //horizontal checker
        // const winCondition = winningConditions[i];
        let a = gameState[i];
        let b = gameState[i+1];
        let c = gameState[i+2];
        let d = gameState[i+3];

        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }
        if (a === b && b === c && c === d) {
            console.log(i,i+1,i+2,i+3)
            roundWon = true;
            break
        }
    }

    for (let i = 1; i <= (gameState.length)-12; i++){ //vertical checker
        let a = gameState[i];
        let b = gameState[i+4];
        let c = gameState[i+8];
        let d = gameState[i+12];
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }
        if (a === b && b === c && c === d) {
            console.log(i,i+4,i+8,i+12)
            roundWon = true;
            break
        }
    }

    for (let i = 1; i <= (gameState.length)-12; i += 4){ //diagonal checker right to left
        let a = gameState[i];
        let b = gameState[i+5];
        let c = gameState[i+10];
        let d = gameState[i+15];
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }
        if (a === b && b === c && c === d) {
            console.log(i,i+5,i+10,i+15)
            roundWon = true;
            break
        }
    }

    for (let i = 4; i <= (gameState.length)-12; i += 4){ //diagonal checker left to right
        let a = gameState[i];
        let b = gameState[i+3];
        let c = gameState[i+6];
        let d = gameState[i+9];
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }

        if (a === b && b === c && c === d) {
            console.log(i,i+3,i+6,i+9)
            roundWon = true;
            break
        }
    }


    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        statusDisplay_score.innerHTML = score_Message();
        if (currentPlayer === "X" && roundWon === true){
            player1 += 1
        } else if (currentPlayer === "O" && roundWon === true) {
            player2 += 1
        }
        console.log(player1,player2)
        gameActive = false;
        return;
    }
/* 
Kami akan memeriksa cell apakah ada nilai dalam larik status permainan kami
yang masih belum diisi dengan tanda pemain
*/
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        statusDisplay_score.innerHTML = score_Message();
        gameActive = false;
        return;
    }
/*
Jika kita sampai di sini kita tahu bahwa belum ada yang memenangkan permainan,
dan masih ada gerakan yang harus dimainkan, jadi kami melanjutkan dengan mengubah pemain saat ini.
*/
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    /*
    Kami akan menyimpan elemen html yang diklik dalam variabel agar lebih mudah digunakan lebih lanjut
    */    
        const clickedCell = clickedCellEvent.target;
    /*
    Di sini kita akan mengambil atribut 'data-cell-index' dari sel yang diklik untuk mengidentifikasi di mana sel itu berada di grid kita.
    Harap dicatat bahwa getAttribute akan mengembalikan nilai string. Karena kita membutuhkan nomor aktual, kita akan menguraikannya menjadi
    integer(bilangan)
    */
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );
    /* 
    Selanjutnya kita perlu memeriksa apakah panggilan telah dimainkan,
    atau jika permainan dihentikan sementara. Jika salah satu dari itu benar, kami hanya akan mengabaikan klik.
    */
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
    /* 
    Jika semuanya jika dalam urutan kami akan melanjutkan dengan alur permainan
    */    
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];;
    q = []
    z = []
    statusDisplay.innerHTML = currentPlayerTurn();
    statusDisplay_score.innerHTML = score_Message();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}
/*
Dan akhirnya kami menambahkan pendengar acara kami ke sel game yang sebenarnya, serta kami
tombol restart
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
