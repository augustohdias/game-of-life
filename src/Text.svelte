<script>
	import { renderable } from './game.js';
	
	export let color = 'black';
	export let align = 'center';
	export let baseline = 'middle';
	export let text = '';
    
	export let x = 0;
	export let y = 0;
	
	export let fontSize = 16;
	export let fontFamily = 'Roboto, Helvetica';
	

	renderable(props => {
		const { context } = props;
		if (text) {
			context.fillStyle = color;
			context.font = `${fontSize}px ${fontFamily}`;
			context.textAlign = align;
			context.textBaseline = baseline;
            context.strokeStyle = '#0F0F0F';
			context.strokeText(text, x, y);
            context.fillText(text, x, y);
		}
	});
</script>

<slot></slot>