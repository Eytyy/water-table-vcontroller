const Messages = () => {
	const container = document.querySelector('.messages');
	let timer;

	const resetTimer = () => {
		clearTimeout(timer);
	};

	const render = (content = '') => {
		resetTimer();
		container.innerHTML = content;
		if (content !== '') {
			timer = setTimeout(() => {
				container.innerHTML = '';
			}, 3000);
		}
	};
	
	const update = (msg) => {
		const { payload, event } = msg;
		switch(event) {
		case 'start':
			container.style.opacity = 1;
			break;
		case 'tour-ended':
		case 'reset':
			container.style.opacity = 0;
			break;
		case 'interface-message':
			render(payload.message);
			break;
		default:
			return;
		}
	};

	return update;
};

export default Messages;