import showModal from './modal';

export default function showWinnerModal(fighter) {
    showModal({
        title: 'We have winner!',
        bodyElement: fighter.name,
        onClose: () => {
            document.location.href = '/';
        }
    });
}
