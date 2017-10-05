
import Styles from '../styles/main.scss';

import io from 'socket.io-client';

// const ip = '192.168.1.2';
const ip = '192.168.1.3';

const port = '3000';
const socket = io.connect(`http://${ip}:${port}`);

socket.on('connect', function() {
	socket.emit('join', 'Hello World from Water Table Virtual Controller');
});

socket.on('event', function(data) {
	console.log(data);
});

const controller = document.getElementById('controller');

const ControllerSet = (btns, id) => {
	const temp = document.createElement('div');
	const label = document.createElement('span');
	label.className = 'label';
	label.innerText = `#${id}`;
	temp.id = id;
	temp.className = 'controller-set';
	temp.appendChild(label);
	
	btns.forEach(({ id, text, callback}) => {
		let btn = document.createElement('button');
		btn.id = id;
		btn.innerText = text;
		btn.className = 'btn';
		btn.addEventListener('click', callback);
		temp.appendChild(btn);
	});
	
	return temp;
};


// universal buttons
const toggle = [
	{
		id: 'toggle-dataviz',
		name: 'toggle data layer',
		text: 'off',
		callback(e) {
			socket.emit('controller', {
				event: 'toggle-screen'
			});
			e.currentTarget.innerText = e.currentTarget.innerText === 'off' ? 'on' : 'off';
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
		id: 'seek-video-start',
		name: 'seek video to start',
		text: '1960',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 0,
			});
		}
	},
	{
		id: 'seek-video-middle',
		name: 'seek video to 1950',
		text: '1980',
		callback() {
			socket.emit('controller', {
				event: 'seek-video',
				payload: 3,
			});
		}
	},
	{
		id: 'seek-video-end',
		name: 'seek video to 2000',
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
		id: 'svg-topography',
		name: 'show topography layer',
		text: 'topography',
		callback() {
			socket.emit('controller', {
				event: 'svg-1',
				payload: 1,
			});
		}
	},
	{
		id: 'svg-labels',
		name: 'show labels layer',
		text: 'info',
		callback() {
			socket.emit('controller', {
				event: 'svg-2',
				payload: 2,
			});
		}
	}
];
const misc = [
	{
		id: 'resize-dashboard',
		name: 'resize dashboard',
		text: 'resize',
		callback() {
			socket.emit('controller', {
				event: 'resize-dashboard',
			});
		}
	}
];

controller.appendChild(ControllerSet(toggle, 'visualization-controls'));
controller.appendChild(ControllerSet(video, 'video-controls'));
controller.appendChild(ControllerSet(svgs, 'svg-controls'));
controller.appendChild(ControllerSet(misc, 'misc-controls'));
