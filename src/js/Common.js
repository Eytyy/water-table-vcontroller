const Data = (socket) => {
	const DOM = {
		main: document.querySelector('.common'),
		toggle: null,
	};

	const createControls = (id, callback, labelText) => {
		const group = document.createElement('div');
		const btn = document.createElement('button');
		const label = document.createElement('span');
		group.className = 'button-group';
		label.className = 'button-label';
		label.innerText = labelText;
		btn.className = 'btn';
		btn.addEventListener('click', callback);
		group.appendChild(label);
		group.appendChild(btn);
		DOM.main.appendChild(group);
		DOM[id] = btn;
	};

	createControls(
		'toggle-screen',
		() => {
			socket.emit('controller', {
				event: 'toggle-screen',
				payload: 1,
			});
		},
		'Data Visualization'
	);

	createControls(
		'svg1',
		() => {
			socket.emit('controller', {
				event: 'svg-1',
				payload: 1,
			});
		},
		'Landmarks'
	);

	createControls(
		'svg2',
		() => {
			socket.emit('controller', {
				event: 'svg-2',
				payload: 1,
			});
		},
		'Information'
	);


	
	const update = (message) => {
		const { event } = message;
		switch(event) {
			case 'start':
				DOM.main.style.opacity = 1;
				break;
			case 'tour-ended':
			case 'reset':
				DOM.main.style.opacity = 0;
				break;
			default:
				return;
		}
	};
	
	return update;
};
	
export default Data;
