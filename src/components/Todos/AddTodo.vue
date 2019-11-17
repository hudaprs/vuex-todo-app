<template>
	<div>
		<h3>Add Todo</h3>
		<form @submit.prevent="onSubmit">
			<input type="text" v-model="title" placeholder="What needs to be done">
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'AddTodo',
		data() {
			return {
				title: null
			}
		},
		methods: {
			...mapActions(['addTodo']),
			onSubmit() {
				if(this.title == null) {
					alert('Title cannot be blank')
					return false
				}
				this.addTodo(this.title)
				this.title = null
			}
		}
	}
</script>

<style>
	form {
		display: flex;
	}

	input[type="text"] {
		flex: 10;
		padding: 10px;
		border: 1px solid #41b883;
		outline: 0;
	}

	button[type="submit"] {
		flex: 2;
		background: #41b883;
		color: #fff;
		border: 1px #41b883 solid;
		cursor: pointer;
	}
</style>