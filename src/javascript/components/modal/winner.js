import { createFighterImage } from '../fighterPreview';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    showModal({
        title: 'We have winner!',
        bodyElement: createFighterImage(fighter),
        onClose: () => {
            document.location.href = '/';
        }
    });
}
