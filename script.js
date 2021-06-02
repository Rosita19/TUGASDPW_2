function play(){
    document.getElementById("hal2").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("namep1").innerHTML = disp_player1;
    document.getElementById("namep2").innerHTML = disp_player2;
}

/*
Kami menyimpan elemen status game kami di sini agar kami dapat lebih mudah
gunakan nanti
*/
const statusDisplay = document.querySelector('.game--status');
const statusDisplay_score = document.querySelector('.game--score');
const statusDisplay_name = document.querySelector('.game--name');
const statusDisplay_name2 = document.querySelector('.game--name2');
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
let player1 = 0
let player2 = 0
/*
Kami membuat display informasi player
*/
const display_name = () => `${disp_player1}'s`;
const display_name2 = () => `${disp_player2}'s`;

function klik() {
    disp_player1 = document.getElementById("plyname").value;
    disp_player2 = document.getElementById("plyname2").value;
    console.log(disp_player1,disp_player2)
}

var disp_player1 = ""
var disp_player2 = ""
/*
Di sini kami telah menyatakan beberapa pesan yang akan kami tampilkan kepada pengguna selama permainan.
Karena kami memiliki beberapa faktor dinamis dalam pesan tersebut, yaitu pemain saat ini,
kami telah mendeklarasikannya sebagai fungsi, sehingga pesan aktual dibuat dengan
data terkini setiap kali kita membutuhkannya.
*/
const winningMessage = () => `Pemenangnya ${currentPlayer}!`;
const drawMessage = () => `Game berakhir seri!`;
const currentPlayerTurn = () => `Giliran ${currentPlayer}`;  // Bisa direplace dengan nama
const score_Message = () => `${player1} : ${player2}`
/*
Kami mengatur pesan awal agar para pemain tahu giliran siapa
*/
statusDisplay.innerHTML = currentPlayerTurn();
statusDisplay_score.innerHTML = score_Message();
statusDisplay_name.innerHTML = display_name();
statusDisplay_name2.innerHTML = display_name2();


function handleCellPlayed(clickedCell, clickedCellIndex) {
    /*
    Kami memperbarui status permainan internal kami untuk mencerminkan gerakan yang dimainkan,
    serta memperbarui antarmuka pengguna untuk mencerminkan gerakan yang dimainkan
    */
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
        statusDisplay_score.innerHTML = score_Message();
        statusDisplay_name.innerHTML = display_name();
        statusDisplay_name2.innerHTML = display_name2();
        console.log(disp_player1,disp_player2)
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 1; i <= (gameState.length)-2; i += 4) { //horizontal checker
        // const winCondition = winningConditions[i];
        let a = gameState[i];
        let b = gameState[i+1];
        let c = gameState[i+2];
        let d = gameState[i+3];

        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }
        if (a === b && b === c && c === d) {
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
            roundWon = true;
            break
        }
    }

    for (let i = 1; i <= (gameState.length)-12; i += 4){ //diagonal checker right to left
        let a = gameState[i];
        let b = gameState[i+5];
        let c = gameState[i+10];
        let d = gameState[i+15]
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }
        if (a === b && b === c && c === d) {
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
