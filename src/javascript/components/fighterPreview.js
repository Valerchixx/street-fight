import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        const fighterImage = createFighterImage(fighter);
        const fighterName = createName(fighter.name);
        const fighterAttack = createLabel('attack', fighter.attack);
        fighterElement.append(fighterImage, fighterName, fighterAttack);
    }

    return fighterElement;
}

function createName(name) {
    const fighterName = createElement({ tagName: 'p', className: 'fighter-preview___name' });
    fighterName.innerText = name;
    return fighterName;
}

function createLabel(title, value) {
    const fighterLabel = createElement({ tagName: 'p', className: 'fighter-preview___label' });
    fighterLabel.innerText = `${title}: ${value}`;
    return fighterLabel;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
