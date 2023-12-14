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
        const fighterDefense = createLabel('defense', fighter.defense);
        const fighterHealth = createLabel('health', fighter.health);
        const infoWrap = createElement({ tagName: 'div', className: 'fighter-preview__info' });
        infoWrap.append(fighterName, fighterAttack, fighterDefense, fighterHealth);
        const imageWrap = createElement({ tagName: 'div' });
        imageWrap.append(fighterImage);
        const wrapper = createElement({ tagName: 'div', className: 'fighter-preview__wrap' });
        wrapper.append(infoWrap, imageWrap);
        fighterElement.append(wrapper);
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
