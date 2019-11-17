import axios from 'axios'

const state = {
	todos: []
}

const getters = {
	allTodos: (state) => state.todos
}

const actions = {
	async fetchTodos({ commit }) {
		const todos = await axios.get('https://jsonplaceholder.typicode.com/todos')
		const { data } = await todos
		commit('setTodos', data)
	},

	async addTodo({commit}, title) {
		const todo = await axios.post('https://jsonplaceholder.typicode.com/todos', {
			title,
			completed: false
		})
		const { data } = todo
		commit('newTodo', data)
	},

	async deleteTodo({commit}, id) {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

		commit('removeTodo', id)
	},

	async filterTodos({commit}, event) {
		const todos = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${event.target.value}`)
		const { data } = await todos 
		commit('setTodos', data)
	},

	async updateTodo({commit}, updTodo) {
		const todo = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
		const { data } = await todo

		commit('updateTodo', data)
	}
}

const mutations = {
	setTodos: (state, todos) => (state.todos = todos),
	newTodo: (state, todo) => state.todos.unshift(todo),
	removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
	updateTodo: (state, updTodo) => {
		const index = state.todos.findIndex(todo => todo.id == updTodo.id)
		if(index !== -1) {
			state.todos.splice(index, 1, updTodo)
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}