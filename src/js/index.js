
import Styles from '../styles/main.scss';

import io from 'socket.io-client';

// const ip = '192.168.1.2';
// const ip = '192.168.1.4';
const ip = '192.168.1.7';
// const ip = '10.152.98.106';
const port = '3000';
const socket = io.connect(`http://${ip}:${port}`);

socket.on('connect', function() {
	socket.emit('join', 'Hello World from Water Table Virtual Controller');
});

const controller = document.getElementById('controller');

const ControllerSet = (btns, id) => {
	const temp = document.createElement('div');
	const label = document.createElement('span');
	label.className = 'label';
	label.innerText = `${id}`;
	temp.id = id;
	temp.className = 'controller-set';
	temp.appendChild(label);
	
	btns.forEach(({ id, text, callback}) => {
		let group = document.createElement('div');
		let btn = document.createElement('button');
		let label = document.createElement('div');
		btn.id = id;
		label.innerText = text;
		btn.className = 'btn';
		group.className = 'button-group';
		label.className = 'button-label';
		btn.addEventListener('click', callback);
		group.appendChild(label);
		group.appendChild(btn);
		temp.appendChild(group);
	});
	
	return temp;
};


// universal buttons
const toggle = [
	{
		id: 'toggle-dataviz',
		name: 'toggle data layer',
		text: 'Toggle',
		callback() {
			socket.emit('controller', {
				event: 'toggle-screen'
			});
		}
	},
	{
		id: 'change-data-layer-all',
		name: 'data-layer-info',
		text: 'All',
		callback() {
			socket.emit('controller', {
				event: 'change-data-layer',
				payload: 0,
			});
		}
	},
	{
		id: 'change-data-layer-rivers',
		name: 'data-layer-info',
		text: 'Rivers',
		callback() {
			socket.emit('controller', {
				event: 'change-data-layer',
				payload: 3,
			});
		}
	},
	{
		id: 'change-data-layer-population',
		name: 'data-layer-landscape',
		text: 'Population',
		callback() {
			socket.emit('controller', {
				event: 'change-data-layer',
				payload: 6,
			});
		}
	},
];

// video buttons
const video = [
	{
		id: 'start',
		name: 'start',
		text: 'start',
		callback() {
			socket.emit('controller', {
				event: 'start',
				payload: 0,
			});
		}
	},
	
	{
		id: 'seek-video-60',
		name: 'seek video to 1960',
		text: '1960',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 0,
			});
		}
	},
	{
		id: 'seek-video-70',
		name: 'seek video to 1970',
		text: '1970',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 3,
			});
		}
	},
	{
		id: 'seek-video-80',
		name: 'seek video to 1980',
		text: '1980',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 6,
			});
		}
	},
	{
		id: 'seek-video-90',
		name: 'seek video to 1990',
		text: '1990',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 9,
			});
		}
	},
	{
		id: 'seek-video-00',
		name: 'seek video to 2000',
		text: '2000',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 12,
			});
		}
	},
	{
		id: 'seek-video-10',
		name: 'seek video to 1990',
		text: '2010',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 15,
			});
		}
	},
	
];
// svg buttons
const svgs = [
	{
		id: 'svg-landscape',
		name: 'show landscape layer',
		text: 'Landscape',
		callback() {
			socket.emit('controller', {
				event: 'svg-1',
				payload: 1,
			});
		}
	},
	{
		id: 'svg-info',
		name: 'show information layer',
		text: 'Information',
		callback() {
			socket.emit('controller', {
				event: 'svg-2',
				payload: 2,
			});
		}
	}
];

controller.appendChild(ControllerSet(toggle, 'Data Visualization Controls'));
controller.appendChild(ControllerSet(video, 'Timeline'));
controller.appendChild(ControllerSet(svgs, 'Info'));
