<template>

	<div class="goods-detail-container">
		<div class="carousel-wrapper">
			<div class="" style="height:100%;width:100%;">
				<el-carousel v-if="formData.gallery && formData.gallery.length" trigger="click" height="390px">
					<el-carousel-item v-for="item in formData.gallery" :key="item.uid">
						<div class="carousel-wrapper-images"><el-image :src="item.resData || item" fit="contain"></el-image></div>
					</el-carousel-item>
				</el-carousel>
				<el-image v-else :src="img" fit="fill" style="height:100%;width:100%;"></el-image>
			</div>
			<div class="header-top">
				<div></div>
				<div></div>
			</div>
		</div>
		<div class="goods-info">
			<div class="detail-price">￥<span>{{ formData.counterPrice || 8888 }}</span>起</div>
			<div class="goods-name">{{ formData.name || '商品名称' }}</div>
			<div class="salsed">
				<span>月销999+</span>
				<i class="el-icon-share"></i>
			</div>
			<div class="sub-info">
				<div class="item">
					<i class="el-icon-film"></i>
					<span>材质</span>
					<span>无</span>
				</div>
				<div class="item">

					<i class="el-icon-house"></i>
					<span>风格</span>
					<span>无</span>
				</div>
				<div class="item">

					<i class="el-icon-news"></i>
					<span>源头好货</span>
					<span>工厂直销</span>
				</div>
			</div>
			<div class="buy-info">
				<div class="item">
					<i class="el-icon-truck"></i>
					<div>
						<div>广东佛山</div>
						<div>快递：免运费</div>
					</div>
				</div>
				<div class="item">
					<i class="el-icon-help"></i>
					<div>
						<div>七天无理由退货·1次破损补寄</div>
					</div>
				</div>
				<div class="item">
					<i class="el-icon-menu"></i>
					<div>
						<div>规格·颜色·尺寸选择...</div>
					</div>
				</div>
			</div>
			<div class="eval">
				<span>评价（99999）</span>
				<i class="el-icon-question"></i>
			</div>
		</div>
		<div class="goods-detail">
			<span>宝贝详情</span>
		</div>
		<div v-if="formData.detail" style="width:100%" v-html="formData.detail"></div>
		<div v-else class="goods-parse"></div>
		<div class="goods-footer">
			<div class="icon-wrapper">
				<div class="item">
					<i class="el-icon-shopping-cart-2"></i>
					<span>购物车</span>
				</div>
				<div class="item">
					<i class="el-icon-service"></i>
					<span>客服</span>
				</div>
				<div class="item">
					<i class="el-icon-star-off"></i>
					<span>收藏</span>
				</div>
			</div>
			<div class="buttons">
				<div>加入购物车</div>
				<div>立即购买</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GoodsDetail',
	props: {
		formData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			img: require('@/assets/image/tuanfeng.png')
		}
	}
}
</script>

<style lang="scss" scoped>
.goods-detail-container {
	// flex:1;
	// width:0;
	width: 375px;
	font-size: 14px;
	padding-bottom: 50px;
	position: relative;
	display: inline-block;
	border: 2px solid #000;
	vertical-align: top;

	.carousel-wrapper {
		position: relative;
		width: 100%;
		height: 390px;

		.carousel-wrapper-images {
			height: 100%;
			display: flex;
			align-items: center;
		}

		.banner {
			height: 390px;
			border-radius: 0px;
			margin-top: 0px;
			width: 100%;
			overflow: hidden;
			background-image: url('~@/assets/image/tuanfeng.png');
			background-size: cover;
		}

		.header-top {
			display: flex;
			justify-content: space-between;
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			padding: 17px 10px;
			box-sizing: border-box;
			opacity: 1;
		}
	}

	.goods-info {
		padding: 8px 15px;
		box-sizing: border-box;

		.detail-price {
			color: #fa5151;

			span {
				font-weight: 700;
				font-size: 24px;
				margin: 0 2px;
			}
		}

		.goods-name {
			font-weight: 700;
			color: #000;
			font-size: 16px;
			margin-top: 5px;
		}

		.salsed {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #999;
			margin-top: 5px;

			i {
				width: 20px;
				height: 20px;
				object-fit: cover;
			}
		}

		.sub-info {
			display: flex;
			justify-content: space-around;
			margin-top: 15px;
			font-size: 12px;
			color: #3d3d3d;
			padding: 17px 0;
			background-color: #f9f9f9;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				i {
					display: inline-block;
					overflow: hidden;
					position: relative;
					width: 24px;
					height: 24px;
					object-fit: cover;
					font-size: 24px;
				}

				span:nth-of-type(1) {
					margin: 4px 0 9px 0;
				}

				span:nth-of-type(2) {
					font-weight: 700;
					font-size: 14px;
					margin: 0;
				}
			}
		}

		.buy-info {
			padding: 20px 14px;
			box-sizing: border-box;
			margin-top: 10px;
			background-color: #f9f9f9;

			.item {
				display: flex;
				align-items: flex-start;
				color: #3d3d3d;
				margin-bottom: 33px;

				i {
					display: inline-block;
					overflow: hidden;
					position: relative;
					width: 24px;
					height: 24px;
					object-fit: cover;
					margin-right: 10px;
					font-size: 24px;
				}
			}

			.item:last-child {
				margin-bottom: 0;
			}
		}

		.eval {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 13px;
			box-sizing: border-box;
			background-color: #f9f9f9;
			margin-top: 12px;

			i {
				display: inline-block;
				overflow: hidden;
				position: relative;
				width: 16px;
				height: 16px;
				object-fit: cover;
			}
		}
	}

	.goods-detail {
		position: relative;
		width: 100%;
		height: 32px;
		background-color: #f1f2f6;
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			position: relative;
			z-index: 2;
			background-color: #f1f2f6;
			padding: 0 4px;
		}

		&::after {
			content: "";
			position: absolute;
			width: 200px;
			height: 0.5px;
			background-color: #d8d8d8;
			top: 50%;
			z-index: 1;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.goods-parse {
		height: 390px;
		border-radius: 0px;
		margin-top: 0px;
		width: 100%;
		background-image: url('~@/assets/image/tuanfeng.png');
		background-size: cover;
	}

	.goods-footer {
		left: 0;
		bottom: 0;
		position: absolute;
		width: 100%;
		height: 50px;
		background-color: #fff;
		padding: 0 10px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		z-index: 10000000;

		.icon-wrapper {
			display: flex;
			flex: 1;
			justify-content: space-between;

			.item {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				margin-right: 20px;
				font-size: 12px;
				white-space: nowrap;

				i {
					display: inline-block;
					overflow: hidden;
					position: relative;
					width: 20px;
					height: 20px;
					object-fit: cover;
					font-size: 20px;
				}
			}
		}

		.buttons {
			width: 220px;
			display: flex;
			align-items: center;
			background: linear-gradient(90deg, #ffd100, #fe753f);
			border-radius: 100px;
			overflow: hidden;

			div {
				width: 110px;
				font-size: 14px;
				color: #fff;
				font-weight: 700;
				height: 40px;
				text-align: center;
				line-height: 40px;
			}
		}
	}
}
</style>
