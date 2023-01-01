```js
/*
 * @Author: 寻欢
 * @Date: 2020-10-21
 * @Last Modified by: 寻欢
 * @Last Modified time: 2020-10-21 10:48:21
*/
```

# MyUpload 上传组件

### Attributes

| 参数        | 说明                                                         | 类型             | 可选值                           | 默认值                                   |
| ----------- | ------------------------------------------------------------ | ---------------- | -------------------------------- | ---------------------------------------- |
| width       | 宽度                                                         | String \| Number | —                                | 146                                      |
| height      | 高度                                                         | String \| Number | —                                | 146                                      |
| limit       | 上传数量                                                     | Number           | —                                | 1                                        |
| multiple    | 是否开启多选文件                                             | Boolean          | true(开启) <br/>false(不开启)    | false                                    |
| fileSize    | 限制图片上传大小(默认10m,单位k)                               | Number           | —                                |  10240                                   |
| fileUrl     | 双向数据绑定的图片url, string 则默认为一个(*limit也要设置为1*), Array默认为多个 | String \| Array  | —                                | —                                        |
| disabled    | 是否禁用上传&&禁止删除                                       | Boolean          | true(禁止)<br/>false(不禁止)     | false                                    |
| isDownload  | 是否可以下载                                                 | Boolean          | true(可下载)<br/>false(不能下载) | true                                     |
| fileType    | 限制上传文件的格式                                           | Array            | —                                | ['image/jpeg', 'image/jpg', 'image/png'] |
| limitWidth  | 限制上传图片的宽度                                           | Number           | —                                | —                                        |
| limitHeight | 限制图片高度                                                 | Number           | —                                | —                                        |
| listType    | 文件列表的类型                                               | String           | text/picture/picture-card        | picture-card                             |
| apiUrl      | 上传的文件的api                                              | String           | —                                | /v2/car/upload                           |

### 

### Methods

| 方法名 | 说明           | 参数                   |
| ------ | -------------- | ---------------------- |
| change | 文件修改时触发 | url(对应 fileUrl 类型) |





### 使用模版

正常使用,  如果不需要下载则需要添加 `is-download` 属性

```vue
<template>
	<!-- 可上传可下载 -->
    <my-upload v-model="posterImage" />
	<!-- 可上传不可下载 -->
    <my-upload v-model="posterImage" :is-download="false" />
</template>

<script>
import MyUpload from '@/components/MyUpload' // 上传组件
export default {
	......
	data() {
		return {
			posterImage: ''
		}
	}
	......
}
</script>
```



使用  `change `  钩子函数对文件修改后执行自定义逻辑

```vue
<template>
    <my-upload v-model="posterImage" :is-download="false" @change="handleChange" />
</template>

<script>
import MyUpload from '@/components/MyUpload' // 上传组件
export default {
	......
	data() {
		return {
			posterImage: ''
		}
	},
    methods() {
        handleChange(url) {
            // 可以拿到修改后的文件参数, 此处可以执行自定义逻辑
        }
    }
	......
}
</script>
```
