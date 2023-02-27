<!-- --------------------------------------------------------------------------------
  about：拖拽列
  --------------------------------------------------------------------------------- -->

<template>
  <div :class="{ 'erp-tml-draggable-column': !level }">
    <Draggable v-model="listData" filter=".disabled" animation="300" :move="onMove" @change="draggableChange">
      <transition-group>
        <div
          v-for="element in listData" v-show="element.selectFlag !== 1" :key="element.field" class="erp-tml-drag-item"
          :class="{ disabled: !!element.fixed }" :style="{ paddingLeft: level > 0 ? '8px' : 0 }"
          @click.stop.prevent="element.fixed ? () => { } : expand(element)"
        >
          <div class="drag-content">
            <div style="display:flex;flex:1;">
              <i class="el-icon-s-unfold drag-content__icon"></i>
              <span
                class="drag-content__label" :title="element.alias || element.title" :style="{
                  width: level === 1 ? '140px' : ''
                }"
              >
                {{ element.alias || element.title }}
              </span>
            </div>
            <i
              v-if="!element.fixed" :size="14" class="el-icon-circle-close drag-content__icon del"
              @click="deleteTarget(element)"
            ></i>
            <img v-else src="../image/thumbtack.png" class="drag-content__icon thumbtack-img" />
          </div>

          <CollapseTransition v-if="element.children && element.children.length">
            <draggable-column
              v-show="element.isActive" :key="element.id" v-model="element.children"
              :level="element.level" @change="onChange(element)" @delete="deleteTarget"
            />
          </CollapseTransition>

        </div>
      </transition-group>
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import CollapseTransition from './collapseTransition'

export default {
  name: 'DraggableColumn',
  components: {
    Draggable,
    CollapseTransition
  },
  props: {
    value: { default: () => [] },
    level: { default: 0 }
  },
  data() {
    return {}
  },
  computed: {
    listData: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    /* ----------------------------------------- 绑定方法 ----------------------------------------- */

    deleteTarget(item) {
      item.selectFlag = 1
      if (item.children.length) {
        this.deepChange(item.children, 1)
      }
      this.$emit('change')
      this.$emit('delete', item)
    },
    // 向下传递
    deepChange(data, flag) {
      for (const i of data) {
        i.selectFlag = flag
        if (i.children.length) {
          this.deepChange(i.children, flag)
        }
      }
    },
    draggableChange() {
      this.$emit('change')
    },
    onChange(val) {
      let count = 0
      for (const i of val.children) {
        if (i.selectFlag === 2) {
          count += 1
        }
      }
      val.selectFlag = count === val.children.length ? 2 : count ? 3 : 1
      this.$emit('input', this.value)
      this.$emit('change')
    },
    onMove(e) {
      const contextEl = e.relatedContext.element
      const draggedContextEl = e.draggedContext.element
      // console.log(e.relatedContext, e.draggedContext)
      if (!!contextEl.fixed || contextEl.fixed !== draggedContextEl.fixed) return false
      return true
    },
    expand(element) {
      if (element.children && element.children.length) {
        this.$set(element, 'isActive', !element.isActive)
      }
      this.$emit('change')
    },
    switchChange(item, checked) {
      this.reversIndexOf(item, checked)
      item.fixed = checked ? 'left' : false
    },

    /* ----------------------------------------- 自定义方法 ----------------------------------------- */

    reversIndexOf(row) {
      const item = this.listData.splice(this.listData.findIndex((item) => item.field === row.field), 1)[0]
      const index = this.listData.map((i) => i.fixed).lastIndexOf('left') + 1
      this.listData.splice(index, 0, item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.erp-tml-draggable-column {
	height: 320px;
	padding: 16px 0 0 16px;
	overflow: hidden;

	&:hover {
		overflow-y: auto;
		padding-right: 0px;
	}
}

.flex {
	display: flex;
}

.erp-tml-drag-item {

	// padding: 6px 0px;
	.drag-content {
		margin-bottom: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;

		&__label {
			width: 100px;
			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 12px;
			line-height: 16px;
		}

		&__switch {
			.text {
				color: rgba(0, 0, 0, 0.45);
				margin-right: 6px;
			}
		}

		&__icon {
			margin-right: 8px;

			&.del {
				display: none;
			}
		}

		&:hover .drag-content__icon {
			color: var(--color-primary);
			cursor: move;
		}

		&:hover .drag-content__label {
			color: var(--color-primary);
			cursor: pointer;
		}

		&:hover .del {
			cursor: pointer;
			display: block;
		}

		.thumbtack-img {
			width: 14px;
			height: 14px;
		}
	}

	&.disabled {
		.drag-content {

			&:hover .drag-content__icon,
			.drag-content__label,
			.del {
				color: rgba(0, 0, 0, .25);
				cursor: not-allowed;
			}

			&:hover .del {
				display: none;
			}

			.drag-content__icon {
				color: rgba(0, 0, 0, .25);
			}
		}
	}
}
</style>
