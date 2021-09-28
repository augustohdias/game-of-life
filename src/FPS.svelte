<script>
	import Text from './Text.svelte';
	import { renderable } from './game.js';
	
	let text = '';
	let frames = 0;
	let prevTime = performance.now();
	renderable((state, dt) => {
		let time = performance.now();
		frames++;
		if ( time >= prevTime + 1000 ) {
			const fps = ((frames * 1000) / (time - prevTime));
			text = `${fps.toFixed(0)} FPS`;
			prevTime = time;
			frames = 0;
		}
	});
</script>

<Text
	{text}
	fontSize=15
	fontFamily='Helvetica'
	align='left'
    color='white'
	baseline='top'
	x={20}
	y={20} />

<slot></slot>