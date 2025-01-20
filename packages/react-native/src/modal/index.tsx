import alert from './alert';
import confirm from './confirm';
import Modal from './Modal';
import ModalView from './Modal/ModalView';
import prompt from './prompt';
import show from './show';
import tip from './tip';

export default Object.assign(Modal, { alert, confirm, prompt, tip, show, Content: ModalView });
