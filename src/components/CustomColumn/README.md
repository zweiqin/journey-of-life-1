### 表格自定义列组件（支持tree结构 拖拽）

```
<template>
  <!-- 自定义列 -->
    <custom-column ref="customColumn" @update-fields="updateFields" @submit="submitFields" @setting="getFields" :isRequest="false" />
</template>

import CustomColumn from '@/components/CustomColumn'
export default {
  components: {
    CustomColumn
  }
}
</script>
```

#### props
> title

> bodyStyle 弹窗样式

> isRequest  默认true ， 是否需要自定义列组件完成内部请求逻辑， (⚠️  注意: 如需要内置请求，需要把API注入到 CustomColumn/index.vue 的 TODO: 内自行实现）


isRequest
#### methods
1. createFields 接受一个对象 <IFields>

interface IFields{
  localKey?: string
  columns: vxeTableColumns[]
  defaultFields: string[]
  sourceColumns: any[]
}



createFields(fieldsConfig: IFields)
> localKey 则执行读取本地配置 (有择执行本地缓存)
> columns 表格数据的列字段集合(⚠️系统默认字段不能修改需要disabled的样式必须加上  [system: true] )
> defaultFields 默认字段由前端维护 默认字段格式，columns 中的 field 字段  const defaultFields = ['field', 'field1'] 
> sourceColumns 需显示的字段数据，sourceColumns格式与提交的格式一致， sourceColumns若为空，将会读取默认字段 defaultFields


#### event
1. update-fields 点击提交之后会触发返回最新的columns， 可通过此回调重新更新视图columns

2. submit 返回 提交的字段格式，改回调默认生成参数，可以提交到服务端亦或是存在本地


@params as any
const list = [
  {field: "sku", sort: 0, selectFlag: 2, fixed: 'left},
  {field: "future_average_sales", sort: 1, selectFlag: 2},
  {field: "local_warehouse", sort: 4, selectFlag: 3},
  {field: "local_warehouse_pending", sort: 2, selectFlag: 2},
  {field: "local_warehouse_purchase_onway", sort: 3, selectFlag: 2},
  {field: "fba_suggest_num", sort: 5, selectFlag: 2},
  {field: "fba", sort: 6, selectFlag: 3},
  {field: "fba_unsellable_quantity", sort: 0, selectFlag: 2},
  {field: "future_available_days", sort: 9, selectFlag: 2},
  {field: "pre_delivery_inventory", sort: 10, selectFlag: 2}
]

3. setting 激活弹窗，可以通过该方法拿取用户之前保存的columns，做视图渲染


### 关于组件示例
[example](@views/test/CustomColumn)



