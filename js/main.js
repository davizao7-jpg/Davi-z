/* ==================================================
   DAVI Z
   SISTEMA PRINCIPAL DE TELAS
================================================== */


/* =========================
   ESTADO DO JOGO
========================= */

let playerCharacter = null;

let enemyCharacter = null;


/* =========================
   REFERÊNCIAS DAS TELAS
========================= */

const menu =
    document.getElementById("menu");

const playerSelection =
    document.getElementById("playerSelection");

const enemySelection =
    document.getElementById("enemySelection");

const battle =
    document.getElementById("battle");


/* =========================
   FUNÇÃO PARA TROCAR DE TELA
========================= */

function showScreen(screen) {

    menu.classList.remove("active");

    playerSelection.classList.remove("active");

    enemySelection.classList.remove("active");

    battle.classList.remove("active");


    screen.classList.add("active");
}


/* =========================
   BOTÃO VERSUS
========================= */

const versusButton =
    document.getElementById("versusButton");


versusButton.addEventListener(
    "click",
    function () {

        showScreen(playerSelection);

    }
);


/* =========================
   ESCOLHA DO JOGADOR
========================= */

const characterButtons =
    document.querySelectorAll(
        ".character-button"
    );


characterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                playerCharacter =
                    button.dataset.character;


                /*
                 Depois de escolher
                 o personagem do jogador,
                 vamos para a escolha
                 do adversário.
                */

                showScreen(enemySelection);

            }
        );

    }
);


/* =========================
   ESCOLHA DO OPONENTE
========================= */

const enemyButtons =
    document.querySelectorAll(
        ".enemy-button"
    );


enemyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                enemyCharacter =
                    button.dataset.character;


                /*
                 OS DOIS PERSONAGENS
                 JÁ FORAM ESCOLHIDOS.

                 AGORA ENTRA DIRETAMENTE
                 NA PARTIDA.
                */

                startBattle();

            }
        );

    }
);


/* =========================
   INICIAR PARTIDA
========================= */

function startBattle() {

    /*
     Mostra os nomes escolhidos.
    */

    document.getElementById(
        "playerName"
    ).textContent =
        playerCharacter;


    document.getElementById(
        "enemyName"
    ).textContent =
        enemyCharacter;


    document.getElementById(
        "battlePlayer"
    ).textContent =
        playerCharacter;


    document.getElementById(
        "battleEnemy"
    ).textContent =
        enemyCharacter;


    /*
     Aqui NÃO voltamos para o menu.

     A tela de batalha é aberta
     imediatamente.
    */

    showScreen(battle);

}


/* =========================
   TESTE INICIAL
========================= */

console.log(
    "Davi Z carregado corretamente."
);
