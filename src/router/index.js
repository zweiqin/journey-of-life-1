import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */

import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path*',
				component: () => import('@/views/redirect/index')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/dashboardBig',
		component: () => import('@/views/dashboardBig/index'),
		hidden: true
	},
	{
		path: '/paintingshow_out',
		alwaysShow: true,
		name: 'paintingshow_out',
		component: () => import('@/views/painting/show'),
		hidden: true
	},
	{
		path: '/pictureShow_out',
		alwaysShow: true,
		name: 'pictureShow_out',
		component: () => import('@/views/painting/pictureShow'),
		hidden: true
	},
	{
		path: '/auth-redirect',
		component: () => import('@/views/login/authredirect'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/errorPage/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/errorPage/401'),
		hidden: true
	},
	{
		path: '/homepageBig',
		component: () => import('@/views/homepage/bigImage'),
		name: 'homepageBig',
		hidden: true
	},
	{
		path: '',
		component: Layout,
		redirect: 'dashboard',
		children: [
			{
				path: 'dashboard',
				// component: () => import('@/views/dashboard/index'),
				component: () => import('@/views/homepage/index'),
				name: 'Dashboard',
				meta: { title: 'dashboard', icon: 'home', noCache: true }
			}
		]
	},
	{
		path: '/dashboard_out',
		alwaysShow: true,
		name: 'dashboard_out',
		component: () => import('@/views/dashboard/index'),
		hidden: true
	}
	// {
	//   path: '/dataStatisticsDashboard',
	//   component: Layout,
	//   // component: () => import('@/views/dataStatisticsDashboard'),
	//   children: [
	//     {
	//       path: 'dashboard',
	//       component: () => import('@/views/dataStatisticsDashboard'),
	//       name: 'dataStatisticsDashboard',
	//       meta: { title: '数据看板', icon: 'table', noCache: true }
	//     }
	//   ]
	// }
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
})

export const asyncRouterMap = [
	{
		path: '/memberSystem',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '会员系统',
			icon: 'member',
			noCache: true
		},
		children: [
			{
				path: 'userManagement',
				component: () => import('@/views/children'),
				redirect: 'noredirect',
				alwaysShow: true,
				name: 'userManagement',
				meta: {
					title: '用户管理'
				},
				children: [
					{
						path: 'memberList',
						component: () => import('@/views/userManagement/memberList'),
						name: 'user',
						meta: {
							perms: [ 'GET /admin/user/list' ],
							title: '会员管理',
							noCache: true
						}
					},
					{
						path: 'partnerApply',
						component: () => import('@/views/userManagement/partnerApply'),
						name: 'PartnerApply',
						_ROLES: [ 'ADMIN' ],
						meta: {
							title: '合伙人申请'
						}
					}
				]
			},
			{
				path: 'commission',
				component: () => import('@/views/children'),
				redirect: 'noredirect',
				alwaysShow: true,
				meta: {
					title: '佣金管理',
					noCache: true
				},
				children: [
					{
						path: 'commissionRecordList',
						component: () => import('@/views/brand/commissionRecordList'),
						name: 'CommissionRecordList',
						_ROLES: [ 'ADMIN' ],
						meta: {
							perms: [ 'GET /admin/commission/recordList' ],
							title: '佣金报表',
							noCache: true
						}
					},
					{
						path: 'commissionList',
						component: () => import('@/views/brand/commissionList'),
						name: 'CommissionList',
						_ROLES: [ 'ADMIN' ],
						meta: {
							perms: [ 'GET /admin/commission/list' ],
							title: '佣金提现',
							noCache: true
						}
					},
					{
						path: 'commissionSetting',
						component: () => import('@/views/brand/commissionSetting'),
						name: 'CommissionSetting',
						meta: {
							perms: [ 'GET /admin/comModule/list' ],
							title: '佣金板块',
							noCache: true
						}
					},
					{
						path: 'commissionView',
						component: () => import('@/views/brand/commissionView'),
						name: 'CommissionView',
						meta: {
							perms: [ 'GET /admin/comModule/moduleList' ],
							title: '佣金查看',
							noCache: true
						}
					}
				]
			},
			{
				path: 'brand',
				component: () => import('@/views/children'),
				redirect: 'noredirect',
				alwaysShow: true,
				_ROLES: [ 'ADMIN' ],
				meta: {
					title: '门店管理',
					noCache: true
				},
				children: [
					{
						path: 'brandList',
						component: () => import('@/views/brand/brandList'),
						name: 'BrandList',
						_ROLES: [ 'ADMIN' ],
						meta: {
							perms: [ 'GET /admin/brand/list' ],
							title: '门店列表',
							noCache: true
						}
					},
					{
						path: 'brandGoods',
						component: () => import('@/views/brand/brandGoods'),
						name: 'BrandGoods',
						meta: {
							perms: [ 'GET /admin/goods/list' ],
							title: '门店-商品',
							noCache: true
						},
						hidden: true
					},
					{
						path: 'brandStyle',
						component: () => import('@/views/brand/brandStyle'),
						name: 'BrandStyle',
						_ROLES: [ 'ADMIN' ],
						meta: {
							perms: [ 'GET /admin/brandStyle/list' ],
							title: '门店风格',
							noCache: true
						}
					},
					{
						path: 'brandApply',
						component: () => import('@/views/brand/brandApply'),
						name: 'BrandApply',
						_ROLES: [ 'ADMIN' ],
						meta: {
							perms: [ 'GET /admin/brand/list' ],
							title: '门店申请',
							noCache: true
						}
					}
				]
			},
			{
				path: 'memberConfig',
				component: () => import('@/views/children'),
				redirect: 'noredirect',
				alwaysShow: true,
				meta: {
					title: '会员配置',
					noCache: true
				},
				children: [
					{
						path: 'brandLevel',
						component: () => import('@/views/brand/brandLevel'),
						name: 'BrandLevel',
						meta: {
							perms: [ 'GET /admin/brandLevel/list' ],
							title: '等级列表',
							noCache: true
						}
					}
				]
			}
		]
	},
	{
		path: '/orderManagement',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '订单管理',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'orderList',
				component: () => import('@/views/orderManagement/orderList'),
				name: 'OrderList',
				meta: {
					perms: [ 'GET /admin/order/list' ],
					title: '订单列表',
					noCache: true
				}
			},
			{
				path: 'orderDetail',
				component: () => import('@/views/orderManagement/orderDetail'),
				name: 'OrderDetail',
				meta: {
					title: '订单详情',
					noCache: true
				},
				hidden: true
			}
		]
	},
	{
		path: '/goods',
		component: Layout,
		redirect: 'noredirect',
		alwaysShow: true,
		name: 'goodsManage',
		meta: {
			title: '商品管理',
			icon: 'goods'
		},
		children: [
			{
				path: 'list',
				component: () => import('@/views/goods/list'),
				name: 'GoodsList',
				_ROLES: [ 'USER' ],
				meta: {
					perms: [ 'GET /admin/goods/list' ],
					title: '商品列表',
					noCache: true
				}
			},
			{
				path: 'create',
				component: () => import('@/views/goods/create/index'),
				name: 'GoodsCreate',
				meta: {
					perms: [ 'POST /admin/goods/create' ],
					title: '商品上架',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'edit',
				component: () => import('@/views/goods/edit/index'),
				name: 'GoodsEdit',
				meta: {
					perms: [ 'POST /admin/goods/update' ],
					title: '商品编辑',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'brandListShow',
				component: () => import('@/views/goods/brandListShow'),
				name: 'brandGoodsListShow',
				meta: {
					perms: [ 'GET /admin/goods/list' ],
					title: '门店-商品展示',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'category',
				component: () => import('@/views/goods/category'),
				name: 'Category',
				_ROLES: [ 'ADMIN' ],
				meta: {
					perms: [ 'GET /admin/category/list' ],
					title: '商品类目',
					noCache: true
				}
			},
			{
				path: 'issue',
				component: () => import('@/views/goods/issue'),
				name: 'Issue',
				meta: {
					perms: [ 'GET /admin/issue/list' ],
					title: '通用问题',
					noCache: true
				}
			},
			{
				path: 'keyword',
				component: () => import('@/views/goods/keyword'),
				name: 'Keyword',
				meta: {
					perms: [ 'GET /admin/keyword/list' ],
					title: '搜索关键字',
					noCache: true
				}
			},
			// {
			//   path: 'painting',
			//   component: () => import('@/views/errorPage/developing'),
			//   name: 'painting',
			//   meta: {
			//     // perms: [],
			//     title: '智能画册',
			//     noCache: true
			//   }
			// },
			{
				path: 'goodsTag',
				component: () => import('@/views/goods/goodsTag/index'),
				name: 'GoodsTag',
				_ROLES: [ 'ADMIN' ],
				meta: {
					perms: [ 'GET /admin/goodsTag/list' ],
					title: '大类标签',
					noCache: true
				}
			},
			{
				path: 'goodsStyle',
				component: () => import('@/views/goods/goodsStyle/index'),
				name: 'GoodsStyle',
				_ROLES: [ 'ADMIN' ],
				meta: {
					perms: [ 'GET /admin/goodsStyle/list' ],
					title: '商品风格',
					noCache: true
				}
			},
			{
				path: 'comment',
				component: () => import('@/views/goods/comment/index'),
				name: 'CommentList',
				meta: {
					perms: [ 'GET /admin/comment/list' ],
					title: '商品评论',
					noCache: true
				}
			}
		]
	},
	{
		path: '/dataStatisticsDashboard',
		component: Layout,
		redirect: 'noredirect',
		// alwaysShow: true,
		name: 'dataStatisticsDashboard',
		meta: {
			title: '情报数据看板',
			icon: 'server'
		},
		hidden: true,
		children: [
			// {
			//   path: '',
			//   component: () => import('@/views/digitalDashboard/informationSentry'),
			//   name: 'informationSentry',
			//   meta: {
			//     perms: ['POST /admin/messagesentry/queryMsgSentryList'],
			//     title: '信息哨兵',
			//     noCache: true
			//   }
			// },
			{
				path: '/performanceControlDashboard',
				component: () => import('@/views/digitalDashboard/performanceControlDashboard'),
				name: 'performanceControlDashboard',
				meta: {
					title: '业绩看板'
				}
			},
			{
				path: '/marketingToolsDashboard',
				component: () => import('@/views/digitalDashboard/marketingToolsDashboard'),
				name: 'marketingToolsDashboard',
				meta: {
					title: '营销看板'
				}
			},
			{
				path: '/userPortraitDashboard',
				component: () => import('@/views/digitalDashboard/userPortraitDashboard'),
				name: 'userPortraitDashboard',
				meta: {
					title: '用户看板'
				}
			},
			{
				path: 'stat',
				component: () => import('@/views/children'),
				redirect: 'noredirect',
				alwaysShow: true,
				name: 'statManage',
				meta: {
					title: '统计'
				},
				children: [
					{
						path: 'user',
						component: () => import('@/views/stat/user'),
						name: 'statUser',
						meta: {
							perms: [ 'GET /admin/stat/user' ],
							title: '用户统计',
							noCache: true
						}
					},
					{
						path: 'order',
						component: () => import('@/views/stat/order'),
						name: 'statOrder',
						meta: {
							perms: [ 'GET /admin/stat/order' ],
							title: '订单统计',
							noCache: true
						}
					},
					{
						path: 'goods',
						component: () => import('@/views/stat/goods'),
						name: 'statGoods',
						meta: {
							perms: [ 'GET /admin/stat/goods' ],
							title: '商品统计',
							noCache: true
						}
					}
				]
			}
		]
	},
	{
		path: '/promotion',
		component: Layout,
		redirect: 'noredirect',
		alwaysShow: true,
		name: 'promotionManage',
		meta: {
			title: '品牌推广',
			icon: 'guide'
		},
		children: [
			{
				path: 'teachArticleList',
				component: () => import('@/views/articleManagement/articleList'),
				name: 'teachArticleList',
				meta: {
					perms: ['POST /admin/richText/update', 'POST /admin/richText/delete', 'POST /admin/richText/create', 'GET /admin/richText/list', 'GET /admin/richText/detail'],
					title: '文章列表',
					noCache: true
				}
			},
			{
				path: 'teachArticleCreate',
				component: () => import('@/views/articleManagement/articleCreate'),
				name: 'teachArticleCreate',
				meta: {
					perms: ['POST /admin/richText/update', 'POST /admin/richText/delete', 'POST /admin/richText/create', 'GET /admin/richText/list', 'GET /admin/richText/detail'],
					title: '发布文章',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'teachArticleEdit',
				component: () => import('@/views/articleManagement/articleEdit'),
				name: 'teachArticleEdit',
				meta: {
					perms: ['POST /admin/richText/update', 'POST /admin/richText/delete', 'POST /admin/richText/create', 'GET /admin/richText/list', 'GET /admin/richText/detail'],
					title: '文章编辑',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'articleList',
				component: () => import('@/views/promotion/articleList'),
				name: 'articleList',
				meta: {
					perms: ['POST /admin/article/update', 'POST /admin/article/delete', 'POST /admin/article/create', 'GET /admin/article/list', 'GET /admin/article/detail'],
					title: '公告列表',
					noCache: true
				}
			},
			{
				path: 'articleCreate',
				component: () => import('@/views/promotion/articleCreate'),
				name: 'articleCreate',
				meta: {
					perms: ['POST /admin/article/update', 'POST /admin/article/delete', 'POST /admin/article/create', 'GET /admin/article/list', 'GET /admin/article/detail'],
					title: '发布公告',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'articleEdit',
				component: () => import('@/views/promotion/articleEdit'),
				name: 'articleEdit',
				meta: {
					perms: ['POST /admin/article/update', 'POST /admin/article/delete', 'POST /admin/article/create', 'GET /admin/article/list', 'GET /admin/article/detail'],
					title: '公告通知编辑',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'ad',
				component: () => import('@/views/promotion/ad'),
				name: 'ad',
				meta: {
					perms: ['POST /admin/ad/update', 'POST /admin/ad/delete', 'GET /admin/ad/read', 'POST /admin/ad/create', 'GET /admin/ad/list'],
					title: '广告管理',
					noCache: true
				}
			},
			{
				path: 'video',
				component: () => import('@/views/errorPage/developing'),
				name: 'video',
				meta: {
					// perms: [],
					title: '视频列表',
					noCache: true
				}
			}
		]
	},
	// {
	//   path: 'external-link',
	//   // component: Layout,
	//   redirect: 'noredirect',
	//   alwaysShow: true,
	//   name: 'externalLink',
	//   hidden: true,
	//   meta: {
	//     title: '外链',
	//     icon: 'link'
	//   },
	//   children: [
	//     {
	//       path: 'https://cloud.tencent.com/product/cos',
	//       meta: {
	//         title: '腾讯云存储',
	//         // perms: []
	//       }
	//     },
	//     {
	//       path: 'https://cloud.tencent.com/product/sms',
	//       meta: {
	//         title: '腾讯云短信',
	//         // perms: []
	//       }
	//     },
	//     {
	//       path: 'https://pay.weixin.qq.com/index.php/core/home/login',
	//       meta: {
	//         title: '微信支付',
	//         // perms: []
	//       }
	//     },
	//     {
	//       path: 'https://mpkf.weixin.qq.com/',
	//       meta: {
	//         title: '小程序客服',
	//         // perms: []
	//       }
	//     },
	//     {
	//       path: 'https://www.alibabacloud.com/zh/product/oss',
	//       meta: {
	//         title: '阿里云存储',
	//         // perms: []
	//       }
	//     },
	//     {
	//       path: 'https://www.qiniu.com/products/kodo',
	//       meta: {
	//         title: '七牛云存储',
	//         // perms: []
	//       }
	//     },
	//     {
	//       path: 'http://www.kdniao.com/api-track',
	//       meta: {
	//         title: '快递鸟',
	//         // perms: []
	//       }
	//     }
	//   ]
	// },
	{
		path: '/profile',
		component: Layout,
		redirect: 'noredirect',
		alwaysShow: true,
		children: [
			{
				path: 'password',
				component: () => import('@/views/profile/password'),
				name: 'password',
				meta: { title: '修改密码', noCache: true }
			},
			{
				name: 'userInfo',
				path: 'userInfo',
				component: () => import('@/views/errorPage/developing'),
				meta: { title: '个人中心', noCache: true }
			}
		],
		hidden: true
	},
	{
		path: '/enterprise',
		component: Layout,
		redirect: 'noredirect',
		alwaysShow: true,
		meta: {
			title: '企业管理',
			icon: 'enterprise',
			noCache: true
		},
		children: [
			{
				path: 'baseInfo',
				component: () => import('@/views/enterprise/baseInfo'),
				name: 'BaseInfo',
				_ROLES: [ 'USER' ],
				meta: {
					perms: [ 'GET /admin/brand/read' ],
					title: '基本信息',
					noCache: true
				}
			},
			{
				path: 'roles',
				component: () => import('@/views/enterprise/roles'),
				name: 'Roles',
				meta: {
					title: '部门管理',
					noCache: true
				}
			},
			{
				path: 'staff',
				component: () => import('@/views/enterprise/staff'),
				name: 'Staff',
				meta: {
					title: '员工管理',
					noCache: true
				}
			}
		]
	},
	{
		path: '/marketingManagement',
		component: Layout,
		redirect: 'noredirect',
		meta: {
			title: '营销管理',
			icon: 'marketing',
			noCache: true
		},
		children: [
			{
				path: 'voucherManagement',
				alwaysShow: true,
				component: () => import('@/views/children'),
				redirect: 'noredirect',
				meta: { title: '代金券管理', noCache: true },
				children: [
					{
						path: 'voucherManagementGive',
						component: () => import('@/views/voucherManagement/give'),
						name: 'voucherManagementGive',
						meta: {
							perms: ['GET /admin/circula/list', 'POST /admin/circula/circula'],
							title: '转赠记录',
							noCache: true
						}
					},
					{
						path: 'voucherManagementOrder',
						component: () => import('@/views/voucherManagement/order'),
						name: 'voucherManagementOrder',
						meta: {
							perms: [ 'GET /admin/voucherRecord/list' ],
							title: '订单记录',
							noCache: true
						}
					},
					{
						path: 'voucherManagementPossess',
						component: () => import('@/views/voucherManagement/possess'),
						name: 'voucherManagementPossess',
						meta: {
							perms: [ 'GET /admin/hold/list' ],
							title: '持有管理',
							noCache: true
						}
					},
					{
						path: 'voucherManagementGiveCreate',
						component: () => import('@/views/voucherManagement/giveCreate'),
						name: 'voucherManagementGiveCreate',
						meta: {
							// perms: [],
							title: '转赠创建',
							noCache: true
						},
						hidden: true
					}
				]
			},
			{
				path: 'groupBooking',
				alwaysShow: true,
				component: () => import('@/views/errorPage/developing'),
				name: 'groupBooking',
				meta: {
					// perms: [],
					title: '拼团',
					noCache: true
				},
				children: [
					{
						path: 'normal',
						component: () => import('@/views/errorPage/developing'),
						name: 'groupBookingNormal',
						meta: {
							// perms: [],
							title: '正常拼团',
							noCache: true
						}
					},
					{
						path: 'draw',
						component: () => import('@/views/errorPage/developing'),
						name: 'groupBookingDraw',
						meta: {
							// perms: [],
							title: '抽奖拼团',
							noCache: true
						}
					},
					{
						path: 'host',
						component: () => import('@/views/errorPage/developing'),
						name: 'groupBookingHost',
						meta: {
							// perms: [],
							title: '团长拼团',
							noCache: true
						}
					}
				]
			},
			{
				path: 'CrosstownAllianceCard',
				alwaysShow: true,
				component: () => import('@/views/errorPage/developing'),
				name: 'CrosstownAllianceCard',
				meta: {
					// perms: [],
					title: '同城联盟卡',
					noCache: true
				}
			},
			{
				path: 'tkb',
				component: () => import('@/views/errorPage/developing'),
				name: 'tkb',
				meta: {
					// perms: [],
					title: '拓客宝',
					noCache: true
				}
			},
			{
				path: 'flashSale',
				alwaysShow: true,
				component: () => import('@/views/errorPage/developing'),
				name: 'flashSale',
				meta: {
					// perms: [],
					title: '限时抢购',
					noCache: true
				}
			},
			{
				path: 'coupon',
				component: () => import('@/views/marketingManagement/coupon/coupon'),
				name: 'coupon',
				meta: {
					perms: ['POST /admin/coupon/update', 'POST /admin/coupon/delete', 'GET /admin/coupon/read', 'POST /admin/coupon/create', 'GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
					title: '优惠券',
					noCache: true
				}
			},
			{
				path: 'couponDetail',
				component: () => import('@/views/marketingManagement/couponDetail/couponDetail'),
				name: 'couponDetail',
				meta: {
					perms: ['POST /admin/coupon/update', 'POST /admin/coupon/delete', 'GET /admin/coupon/read', 'POST /admin/coupon/create', 'GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
					title: '优惠券详情',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'couponCard',
				component: () => import('@/views/errorPage/developing'),
				name: 'couponCard',
				meta: {
					perms: ['POST /admin/coupon/update', 'POST /admin/coupon/delete', 'GET /admin/coupon/read', 'POST /admin/coupon/create', 'GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
					title: '核销券',
					noCache: true
				}
			}
		]
	},
	{
		path: '/businessManagement',
		component: Layout,
		redirect: 'noredirect',
		meta: {
			title: '业务管理',
			icon: 'business',
			noCache: true
		},
		children: [
			{
				path: 'informationSentry',
				component: () => import('@/views/businessManagement/informationSentry'),
				name: 'InformationSentry',
				meta: {
					perms: [ 'POST /admin/messagesentry/queryMsgSentryList' ],
					title: '信息哨兵',
					noCache: true
				}
			},
			// {
			//   path: 'resultsSentry',
			//   component: () => import('@/views/errorPage/developing'),
			//   name: 'resultsSentry',
			//   meta: {
			//     // perms: [],
			//     title: '业绩哨兵',
			//     noCache: true
			//   }
			// },
			{
				path: 'scriptSetting',
				component: () => import('@/views/businessManagement/scriptSetting'),
				name: 'ScriptSetting',
				meta: {
					perms: [ 'POST /admin/msgsay/msgSayList' ],
					title: '话术设置',
					noCache: true
				}
			},
			{
				path: 'marketingPortrait',
				component: () => import('@/views/businessManagement/marketingPortrait'),
				name: 'MarketingPortrait',
				meta: {
					perms: [ 'GET /admin/statistical/home' ],
					title: '营销画像',
					noCache: true
				}
			}
		]
	},
	{
		path: '/materialManagement',
		component: Layout,
		redirect: 'noredirect',
		alwaysShow: true,
		name: 'materialManagement',
		meta: {
			title: '材料管理',
			icon: 'material'
		},
		children: [
			{
				path: 'priceIndices',
				component: () => import('@/views/materialManagement/priceIndices'),
				name: 'priceIndices',
				// perms: [],
				meta: {
					title: '价格指数图表'
				}
			},
			{
				path: 'priceIndicesInfo',
				component: () => import('@/views/materialManagement/priceIndicesInfo'),
				name: 'priceIndicesInfo',
				// perms: [],
				meta: {
					title: '价格指数'
				}
			},
			{
				path: 'tradeLeads',
				component: () => import('@/views/materialManagement/tradeLeads'),
				name: 'tradeLeads',
				// perms: [],
				meta: {
					title: '供求信息'
				}
			}
		]
	},
	{
		path: '/community',
		component: Layout,
		redirect: 'noredirect',
		alwaysShow: true,
		name: 'community',
		meta: {
			perms: ['POST /admin/community/richText/update', 'POST /admin/community/richText/delete', 'POST /admin/community/richText/create', 'GET /admin/community/richText/list', 'GET /admin/community/richText/detail'],
			title: '社区管理',
			icon: 'community'
		},
		children: [
			{
				path: 'communityArticleList',
				component: () => import('@/views/communityManagement/communityArticleList'),
				name: 'communityArticleList',
				// perms: [],
				meta: {
					title: '文章列表'
				}
			},
			{
				path: 'communityArticleCreate',
				component: () => import('@/views/communityManagement/communityArticleCreate'),
				name: 'communityArticleCreate',
				// perms: [],
				meta: {
					title: '发布文章'
				}
			},
			{
				path: 'communityArticleEdit',
				component: () => import('@/views/communityManagement/communityArticleEdit'),
				name: 'communityArticleEdit',
				meta: {
					// perms: [],
					title: '文章编辑',
					noCache: true
				},
				hidden: true
			},
			{
				path: 'serviceType',
				component: () => import('@/views/errorPage/developing'),
				name: 'serviceType',
				// perms: [],
				meta: {
					title: '服务类型'
				}
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
]
