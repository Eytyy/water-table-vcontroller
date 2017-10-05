const Timeline = (socket) => {
	const DOM = {
		main: document.querySelector('.timeline'),
		group: document.querySelector('.timeline-group')
	};

	const state = {
		timeLength: 324, // second
	};

	const stops = [
		{ id: 1, label: 'Early Days', start: 0, end: 40 },
		{ id: 2, label: '1960s', start: 40, end: 80 },
		{ id: 4, label: '1970s', start: 80, end: 120 },
		{ id: 6, label: '1980s', start: 120, end: 160 },
		{ id: 7, label: '1990s', start: 160, end: 200 },
		{ id: 8, label: '2000s', start: 200, end: 240 },
		{ id: 9, label: '2010', start: 240, end: 260 },
		{ id: 10, label: 'Future', start: 300, end: 324 },
	];

	let passedStopsLength = null;

	const fillPassedStops = (currentTime) => {
		const passed = stops.filter(({ start }) => {
			return currentTime > start;
		});
		if (passed.length === passedStopsLength) {
			return;
		}
		document.querySelectorAll('.timeline-stop')
			.forEach((el) => el.classList.remove('active'));

		passed.forEach(({ id }) => {
			document.getElementById(`stop-${id}`).classList.add('active');
		});

		passedStopsLength = passed.length;
	};

	const moveOnProgress = (currentTime) => {
		const stop = stops.find(({ start, end }) => {
			return currentTime >= start && currentTime <= end;
		});
		fillPassedStops(currentTime);
	};

	const reset = () => {
	};

	const update = (msg) => {
		const { payload, event } = msg;
		switch(event) {
		case 'start':
			DOM.main.style.opacity = 1;
			break;
		case 'tour-ended':
		case 'reset':
			DOM.main.style.opacity = 0;
			break;
		case 'video-progress':
			moveOnProgress(payload.time);
			break;
		default:
			return;
		}
	};

	function init() {
		const frag = document.createDocumentFragment();
		stops.forEach(({ label, start, id }, index) => {
			let el = document.createElement('div');
			let dot = document.createElement('div');
			let text = document.createElement('span');
			el.className = 'timeline-stop';
			el.id = `stop-${id}`;
			dot.className= 'timeline-dot';
			text.innerText = label;
			text.className = 'timeline-stop__label';
			el.addEventListener('click', () => {
				if (index === 0) {
					return;
				}
				socket.emit('controller', {
					event: 'seek-video',
					payload: index - 1,
				});
			});
			el.appendChild(dot);
			el.appendChild(text);
			frag.appendChild(el);
		});
		DOM.group.appendChild(frag);
	}

	init();
	return update;
};

export default Timeline;