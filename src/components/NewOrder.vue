<template>
	<div class="padding-lg text-center">
		<div class="padding-md">
			<span class="fa fa-check fa-3x"></span>
		</div>
		<div>Pedido feito com sucesso</div>
		<br/>
		<div>{{ value.code }}</div>
	</div>
</template>

<script>

export default {
	name: "NewOrder",
	props: {
		"value": Object
	}
};
</script>

<style>
</style>