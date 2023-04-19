import { def } from '@vue/shared';
import * as PIXI from 'pixi.js'

let elem;
if(document.getElementById('my-canvas-wrapper') != null)
{
	elem = document.getElementById('my-canvas-wrapper');
}
else
{
	elem = window;
}

const board = new PIXI.Application({
	resizeTo: window,
	})

export default board;