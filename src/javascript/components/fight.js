import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
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

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = Math.random() * (2 - 1) + 1;
    return defense * dodgeChance;
}

function criticalStrike(fighter) {
    const { attack } = fighter;
    return attack * 2;
}
