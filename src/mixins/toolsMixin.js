export default {
	methods: {
		toolsMixin_exportMethod(ref, filename) {
			console.log(ref, filename)
			ref && ref.handleVxeTableMethod('exportData', {
				type: 'csv',
				filename,
				columnFilterMethod({ column }) {
					return !['$index', 'operate'].includes(column.property)
				}
			})
		}
	}
}
