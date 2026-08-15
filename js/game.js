/* ==================================================
   DAVI Z
   SISTEMA BÁSICO DE COMBATE
================================================== */


/* ==================================================
   ESTADO DA PARTIDA
================================================== */

let gameActive = false;


/* ==================================================
   DADOS DO JOGADOR
================================================== */

let player = {

    hp: 90,

    maxHp: 90,

    atk: 1,

    energy: 100,

    maxEnergy: 100,

    defense: 100,

    x: 0,

    direction: 1,

    jumping: false,

    attackCooldown: 0,

    dashCooldown: 0

};


/* ==================================================
   DADOS DO INIMIGO
================================================== */

let enemy = {

    hp: 85,

    maxHp: 85,

    atk: 1,

    x: 0

};


/* ==================================================
   TECLAS
================================================== */

const keys = {};


/* ==================================================
   INICIAR SISTEMA
================================================== */

function initializeBattleSystem() {

    /*
     O main.js já definiu os personagens.

     Aqui pegamos os nomes escolhidos
     e iniciamos os valores básicos.
    */

    player.hp = 90;
    player.maxHp = 90;

    player.atk = 1;

    player.energy = 100;
    player.maxEnergy = 100;

    player.defense = 100;


    enemy.hp = 85;
    enemy.maxHp = 85;

    enemy.atk = 1;


    player.x =
        window.innerWidth * 0.25;

    enemy.x =
        window.innerWidth * 0.70;


    player.direction = 1;

    player.jumping = false;

    player.attackCooldown = 0;

    player.dashCooldown = 0;


    gameActive = true;


    updateBattleUI();

    positionCharacters();

    requestAnimationFrame(
        gameLoop
    );
}


/* ==================================================
   LOOP
================================================== */

function gameLoop() {

    if (!gameActive) {
        return;
    }


    updateMovement();

    regenerateEnergy();

    updateCooldowns();

    positionCharacters();

    updateBattleUI();


    requestAnimationFrame(
        gameLoop
    );
}


/* ==================================================
   MOVIMENTO
================================================== */

function updateMovement() {

    let direction = 0;


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        direction = -1;

    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        direction = 1;

    }


    if (direction !== 0) {

        player.x +=
            direction * 4;

        player.direction =
            direction;

    }


    /*
     Impede sair da arena.
    */

    const maxX =
        window.innerWidth - 80;


    if (player.x < 20) {

        player.x = 20;

    }


    if (player.x > maxX) {

        player.x = maxX;

    }

}


/* ==================================================
   POSICIONAR PERSONAGENS
================================================== */

function positionCharacters() {

    const playerElement =
        document.getElementById(
            "playerCharacter"
        );


    const enemyElement =
        document.getElementById(
            "enemyCharacter"
        );


    if (!playerElement ||
        !enemyElement) {

        return;

    }


    playerElement.style.left =
        player.x + "px";


    enemyElement.style.left =
        enemy.x + "px";

}


/* ==================================================
   ENERGIA
================================================== */

function regenerateEnergy() {

    /*
     Recupera 2 de energia
     por segundo.

     O loop roda aproximadamente
     60 vezes por segundo.
    */

    player.energy +=
        2 / 60;


    if (
        player.energy >
        player.maxEnergy
    ) {

        player.energy =
            player.maxEnergy;

    }


    updateDefense();

}


/* ==================================================
   DEFESA
================================================== */

function updateDefense() {

    const percentage =
        player.energy /
        player.maxEnergy;


    /*
     Energia abaixo de 70%
     = -20% defesa
    */

    if (percentage < 0.70) {

        player.defense = 80;

    }


    /*
     Energia abaixo de 50%
     = -40% defesa
    */

    if (percentage < 0.50) {

        player.defense = 60;

    }


    /*
     Energia abaixo de 30%
     = -100% defesa
    */

    if (percentage < 0.30) {

        player.defense = 0;

    }


    /*
     Acima de 70%
     defesa normal.
    */

    if (percentage >= 0.70) {

        player.defense = 100;

    }

}


/* ==================================================
   GASTAR ENERGIA
================================================== */

function spendEnergy(amount) {

    if (
        player.energy <
        amount
    ) {

        return false;

    }


    player.energy -= amount;

    updateDefense();

    return true;

}


/* ==================================================
   ATAQUE BÁSICO
================================================== */

function basicAttack() {

    if (!gameActive) {
        return;
    }


    if (
        player.attackCooldown >
        0
    ) {

        return;

    }


    /*
     Ataque básico custa 1 energia.
    */

    if (
        !spendEnergy(1)
    ) {

        return;

    }


    player.attackCooldown = 20;


    createAttackEffect();


    const distance =
        Math.abs(
            player.x -
            enemy.x
        );


    /*
     Alcance do ataque básico.
    */

    if (distance < 115) {

        damageEnemy(
            player.atk
        );

    }

}


/* ==================================================
   ATAQUE DE KI
================================================== */

function kiAttack() {

    if (!gameActive) {
        return;
    }


    if (
        player.attackCooldown >
        0
    ) {

        return;

    }


    /*
     Ataque de energia
     custa 2 energia.
    */

    if (
        !spendEnergy(2)
    ) {

        return;

    }


    player.attackCooldown = 30;


    createKiEffect();


    const distance =
        Math.abs(
            player.x -
            enemy.x
        );


    /*
     Ataque de KI possui
     alcance maior.
    */

    if (distance < 350) {

        damageEnemy(
            player.atk
        );

    }

}


/* ==================================================
   DASH
================================================== */

function dash() {

    if (!gameActive) {
        return;
    }


    if (
        player.dashCooldown >
        0
    ) {

        return;

    }


    /*
     Dash custa 2 energia.
    */

    if (
        !spendEnergy(2)
    ) {

        return;

    }


    player.dashCooldown = 25;


    /*
     O dash atravessa
     o inimigo.

     Não existe colisão
     entre os personagens.
    */

    player.x +=
        player.direction * 150;


    /*
     Limites.
    */

    if (player.x < 20) {

        player.x = 20;

    }


    if (
        player.x >
        window.innerWidth - 80
    ) {

        player.x =
            window.innerWidth - 80;

    }

}


/* ==================================================
   PULO
================================================== */

function jump() {

    if (!gameActive) {
        return;
    }


    if (player.jumping) {
        return;
    }


    player.jumping = true;


    const fighter =
        document.getElementById(
            "playerCharacter"
        );


    fighter.style.bottom =
        "240px";


    setTimeout(
        function () {

            if (!gameActive) {
                return;
            }

            fighter.style.bottom =
                "110px";


            player.jumping =
                false;

        },
        500
    );

}


/* ==================================================
   DANO NO INIMIGO
================================================== */

function damageEnemy(amount) {

    enemy.hp -= amount;


    if (enemy.hp < 0) {

        enemy.hp = 0;

    }


    updateBattleUI();


    if (
        enemy.hp <= 0
    ) {

        winBattle();

    }

}


/* ==================================================
   VITÓRIA
================================================== */

function winBattle() {

    gameActive = false;


    const message =
        document.getElementById(
            "battleMessage"
        );


    message.textContent =
        "VITÓRIA!";


}


/* ==================================================
   COOLDOWNS
================================================== */

function updateCooldowns() {

    if (
        player.attackCooldown >
        0
    ) {

        player.attackCooldown--;

    }


    if (
        player.dashCooldown >
        0
    ) {

        player.dashCooldown--;

    }

}


/* ==================================================
   INTERFACE
================================================== */

function updateBattleUI() {

    const hpBar =
        document.getElementById(
            "playerHpBar"
        );


    const energyBar =
        document.getElementById(
            "playerEnergyBar"
        );


    const enemyHpBar =
        document.getElementById(
            "enemyHpBar"
        );


    if (!hpBar ||
        !energyBar ||
        !enemyHpBar) {

        return;

    }


    /*
     HP.
    */

    hpBar.style.width =
        (
            player.hp /
            player.maxHp *
            100
        ) + "%";


    /*
     Energia.
    */

    energyBar.style.width =
        (
            player.energy /
            player.maxEnergy *
            100
        ) + "%";


    /*
     HP inimigo.
    */

    enemyHpBar.style.width =
        (
            enemy.hp /
            enemy.maxHp *
            100
        ) + "%";


    document.getElementById(
        "playerHp"
    ).textContent =
        Math.ceil(
            player.hp
        );


    document.getElementById(
        "playerEnergy"
    ).textContent =
        Math.floor(
            player.energy
        );


    document.getElementById(
        "playerAtk"
    ).textContent =
        player.atk;


    document.getElementById(
        "enemyHp"
    ).textContent =
        Math.ceil(
            enemy.hp
        );


    document.getElementById(
        "enemyAtk"
    ).textContent =
        enemy.atk;

}


/* ==================================================
   EFEITO ATAQUE
================================================== */

function createAttackEffect() {

    const effect =
        document.createElement(
            "div"
        );


    effect.className =
        "attack-effect";


    effect.style.left =
        (
            player.x +
            player.direction * 55
        ) + "px";


    effect.style.bottom =
        "150px";


    if (
        player.direction < 0
    ) {

        effect.style.transform =
            "scaleX(-1)";

    }


    document
        .getElementById("arena")
        .appendChild(effect);


    setTimeout(
        function () {

            effect.remove();

        },
        150
    );

}


/* ==================================================
   EFEITO KI
================================================== */

function createKiEffect() {

    const effect =
        document.createElement(
            "div"
        );


    effect.className =
        "ki-effect";


    effect.style.left =
        (
            player.x +
            player.direction * 60
        ) + "px";


    effect.style.bottom =
        "150px";


    if (
        player.direction < 0
    ) {

        effect.style.transform =
            "scaleX(-1)";

    }


    document
        .getElementById("arena")
        .appendChild(effect);


    setTimeout(
        function () {

            effect.remove();

        },
        350
    );

}


/* ==================================================
   TECLADO
================================================== */

window.addEventListener(
    "keydown",
    function (event) {

        keys[
            event.key.toLowerCase()
        ] = true;


        if (
            event.key === " "
        ) {

            jump();

        }


        if (
            event.key.toLowerCase()
            === "j"
        ) {

            basicAttack();

        }


        if (
            event.key.toLowerCase()
            === "k"
        ) {

            kiAttack();

        }


        if (
            event.key.toLowerCase()
            === "l"
        ) {

            dash();

        }

    }
);


window.addEventListener(
    "keyup",
    function (event) {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


/* ==================================================
   BOTÕES
================================================== */

document
    .getElementById("attackButton")
    .addEventListener(
        "pointerdown",
        function (event) {

            event.preventDefault();

            basicAttack();

        }
    );


document
    .getElementById("kiButton")
    .addEventListener(
        "pointerdown",
        function (event) {

            event.preventDefault();

            kiAttack();

        }
    );


document
    .getElementById("dashButton")
    .addEventListener(
        "pointerdown",
        function (event) {

            event.preventDefault();

            dash();

        }
    );


document
    .getElementById("jumpButton")
    .addEventListener(
        "pointerdown",
        function (event) {

            event.preventDefault();

            jump();

        }
    );


/* ==================================================
   ANALÓGICO
================================================== */

const joystick =
    document.getElementById(
        "joystick"
    );

const stick =
    document.getElementById(
        "stick"
    );


let joystickActive = false;


joystick.addEventListener(
    "pointerdown",
    function (event) {

        joystickActive = true;

        joystick.setPointerCapture(
            event.pointerId
        );

        moveJoystick(
            event.clientX
        );

    }
);


joystick.addEventListener(
    "pointermove",
    function (event) {

        if (!joystickActive) {
            return;
        }

        moveJoystick(
            event.clientX
        );

    }
);


joystick.addEventListener(
    "pointerup",
    resetJoystick
);


joystick.addEventListener(
    "pointercancel",
    resetJoystick
);


function moveJoystick(x) {

    const rect =
        joystick.getBoundingClientRect();


    const center =
        rect.left +
        rect.width / 2;


    const difference =
        x - center;


    if (
        difference > 15
    ) {

        player.x += 4;

        player.direction = 1;

    }


    if (
        difference < -15
    ) {

        player.x -= 4;

        player.direction = -1;

    }


    if (player.x < 20) {

        player.x = 20;

    }


    if (
        player.x >
        window.innerWidth - 80
    ) {

        player.x =
            window.innerWidth - 80;

    }


    const visual =
        Math.max(
            -35,
            Math.min(
                35,
                difference
            )
        );


    stick.style.left =
        (
            50 + visual
        ) + "%";


    positionCharacters();

}


function resetJoystick() {

    joystickActive = false;

    stick.style.left = "50%";

}


/* ==================================================
   FINALIZAÇÃO
================================================== */

console.log(
    "Sistema de combate carregado."
);
