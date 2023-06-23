import { def } from '@vue/shared';
import * as PIXI from 'pixi.js'

let elem;
if(document.getElementById('pong-canvas') != null)
{
	elem = document.getElementById('pong-canvas');
}
else
{
	elem = window;
}

const PongApp = new PIXI.Application({
	resizeTo: window,
	})

export default PongApp;