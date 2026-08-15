/* =========================================
   DAVI Z
   CONTROLE DAS TELAS
========================================= */


/* =========================================
   PERSONAGENS ESCOLHIDOS
========================================= */

let playerCharacter = null;

let enemyCharacter = null;


/* =========================================
   TELAS
========================================= */

const menu =
    document.getElementById("menu");

const playerSelection =
    document.getElementById("playerSelection");

const enemySelection =
    document.getElementById("enemySelection");

const battle =
    document.getElementById("battle");


/* =========================================
   TROCAR DE TELA
========================================= */

function showScreen(screen) {

    menu.classList.remove("active");

    playerSelection.classList.remove("active");

    enemySelection.classList.remove("active");

    battle.classList.remove("active");


    screen.classList.add("active");
}


/* =========================================
   BOTÃO VERSUS
========================================= */

document
    .getElementById("versusButton")
    .addEventListener("click", function () {

        showScreen(playerSelection);

    });


/* =========================================
   ESCOLHER JOGADOR
========================================= */

const playerButtons =
    document.querySelectorAll(
        ".character-button"
    );


playerButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            playerCharacter =
                button.dataset.character;


            showScreen(
                enemySelection
            );

        }
    );

});


/* =========================================
   ESCOLHER RIVAL
========================================= */

const enemyButtons =
    document.querySelectorAll(
        ".enemy-button"
    );


enemyButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            enemyCharacter =
                button.dataset.character;


            startBattle();

        }
    );

});


/* =========================================
   INICIAR PARTIDA
========================================= */

function startBattle() {

    document.getElementById(
        "battlePlayer"
    ).textContent =
        playerCharacter;


    document.getElementById(
        "battleEnemy"
    ).textContent =
        enemyCharacter;


    showScreen(battle);

}


/* =========================================
   TESTE
========================================= */

console.log(
    "DAVI Z: sistema de telas carregado."
);
