import Socket from 'socket.io-client';
import settings from '../settings';

export default Socket.connect(settings.host);
