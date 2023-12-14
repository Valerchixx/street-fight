import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const firstHealthBar = document.getElementById('left-fighter-indicator');
        let firstHealthProgress = 100;
        const secondHealthBar = document.getElementById('right-fighter-indicator');
        let secondHealthProgress = 100;

        const playerOneState = { isBlocking: false, lastCriticalHitTime: 0 };
        const playerTwoState = { isBlocking: false, lastCriticalHitTime: 0 };

        const onKeyDown = event => {
            switch (event.code) {
                case controls.PlayerOneAttack:
                    if (!playerOneState.isBlocking && !playerTwoState.isBlocking) {
                        secondHealthProgress -= (getDamage(firstFighter, secondFighter) / secondFighter.health) * 100;
                        secondHealthProgress = secondHealthProgress > 0 ? secondHealthProgress : 0;
                        secondHealthBar.style.width = `${secondHealthProgress}%`;
                    }
                    break;
                case controls.PlayerTwoAttack:
                    if (!playerTwoState.isBlocking && !playerOneState.isBlocking) {
                        firstHealthProgress -= (getDamage(secondFighter, firstFighter) / firstFighter.health) * 100;
                        firstHealthProgress = firstHealthProgress > 0 ? firstHealthProgress : 0;
                        firstHealthBar.style.width = `${firstHealthProgress}%`;
                    }
                    break;
                case controls.PlayerOneBlock:
                    playerOneState.isBlocking = true;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwoState.isBlocking = true;
                    break;
                case controls.PlayerOneCriticalHitCombination[0] &&
                    controls.PlayerOneCriticalHitCombination[1] &&
                    controls.PlayerOneCriticalHitCombination[2]:
                    if (canPerformCriticalStrike(playerOneState)) {
                        secondHealthProgress -= (criticalStrike(firstFighter) / secondFighter.health) * 100;
                        secondHealthProgress = secondHealthProgress > 0 ? secondHealthProgress : 0;
                        secondHealthBar.style.width = `${secondHealthProgress}%`;
                        playerOneState.lastCriticalHitTime = Date.now();
                    }
                    break;
                case controls.PlayerTwoCriticalHitCombination[0] &&
                    controls.PlayerTwoCriticalHitCombination[1] &&
                    controls.PlayerTwoCriticalHitCombination[2]:
                    if (canPerformCriticalStrike(playerTwoState)) {
                        firstHealthProgress -= (criticalStrike(secondFighter) / firstFighter.health) * 100;
                        firstHealthProgress = firstHealthProgress > 0 ? firstHealthProgress : 0;
                        firstHealthBar.style.width = `${firstHealthProgress}%`;
                        playerTwoState.lastCriticalHitTime = Date.now();
                    }
                    break;
                default:
                    break;
            }

            if (firstHealthProgress <= 0) {
                resolve(secondFighter);
            } else if (secondHealthProgress <= 0) {
                resolve(firstFighter);
            }
        };

        const onKeyUp = event => {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    playerOneState.isBlocking = false;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwoState.isBlocking = false;
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    });
}

export function getDamage(attacker, defender) {
    const damage = Math.max(0, getHitPower(attacker) - getBlockPower(defender));
    return damage;
}

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = Math.random() * (2 - 1) + 1;
    return attack * criticalHitChance;
}

function canPerformCriticalStrike(playerState) {
    const currentTime = Date.now();
    const timeSinceLastCriticalHit = currentTime - playerState.lastCriticalHitTime;
    return timeSinceLastCriticalHit >= 10000;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = Math.random() * (2 - 1) + 1;
    return defense * dodgeChance;
}

function criticalStrike(fighter) {
    const { attack } = fighter;
    return attack * 2;
}
