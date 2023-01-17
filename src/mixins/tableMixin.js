export default {
  methods: {
		tableMixin_indexMethod(index) {
			const { page = 1, limit = 0, size = 0 } = this.listQuery
			return (page - 1) * (limit || size) + index + 1
		},
  }
}