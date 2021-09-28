<script>
	import Text from "./Text.svelte";
	import Canvas from "./Canvas.svelte";
	import FPS from "./FPS.svelte";
	import Background from "./Background.svelte";
	import Cell from "./Cell.svelte";
	import { width, height } from './game.js';
</script>

<style>
	h1 {
		color: black;
		font-size: 2em;
		text-align: center;
	}
	
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>

<h1>Game Of Life</h1>

<Canvas>
	<Background color='black'>
		<Cell/>
	</Background>
	<FPS/>
	<Text 
		text='Game of Life, in memorian of John Conway'
		fontSize={15}
		color='white'
		align='right'
		baseline='bottom' 
		x={$width - 20}
		y={$height - 20} />
</Canvas>
