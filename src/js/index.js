
import Styles from '../styles/main.scss';

import io from 'socket.io-client';

import Timeline from './Timeline';
import Common from './Common';
import Messages from './Messages';

// const ip = '192.168.14.64';
const ip = '192.168.1.32';
// const ip = '192.168.1.3';

const port = '3000';
const socket = io.connect(`http://${ip}:${port}`);

socket.on('connect', function() {
	socket.emit('join', 'Hello World from Water Table Virtual Controller');
});

socket.on('from-table', (message) => {
	const { event } = message;
	if (event === 'start') {
		document.querySelector('.start .button-label').innerText = 'Reset';
	} else if (event === 'tour-ended') {
		document.querySelector('.start .button-label').innerText = 'Seset';
	}
	update(message);
});

const DOM = document.querySelector('.start');

const TimelineComponent = Timeline(socket);
const CommonComponent = Common(socket);
const MessagesComponent = Messages();

function update(message) {
	TimelineComponent(message);
	CommonComponent(message);
	MessagesComponent(message);
}

const group = document.createElement('div');
const startBtn = document.createElement('button');
const startLabel = document.createElement('span');
startBtn.className = 'btn';
startLabel.innerText = 'Start';
startLabel.className = 'button-label';
group.className = 'button-group';
startBtn.addEventListener('click', () => {
	socket.emit('controller', {
		event: 'start',
	});
});

group.appendChild(startLabel);
group.appendChild(startBtn);
DOM.appendChild(group);