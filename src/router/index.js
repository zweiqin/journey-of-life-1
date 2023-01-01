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
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
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
    meta: { title: '会员系统', icon: 'peoples', noCache: true },
    children: [
      {
        path: 'user',
        component: () => import('@/views/children'),
        redirect: 'noredirect',
        alwaysShow: true,
        name: 'userManage',
        meta: {
          title: '用户管理',
          icon: 'peoples'
        },
        children: [
          {
            path: 'user',
            component: () => import('@/views/user/user'),
            name: 'user',
            meta: {
              perms: ['GET /admin/user/list', 'POST /admin/user/approveAgency', 'GET /admin/user/detailApprove', 'GET /admin/user/levelList'],
              title: '会员管理',
              icon: 'user',
              noCache: true
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
          title: '佣金管理', icon: 'money', noCache: true
        },
        children: [
          {
            path: 'account',
            component: () => import('@/views/user/account'),
            name: 'account',
            meta: {
              perms: ['GET /admin/brokerage/list', 'POST /admin/brokerage/approve'],
              title: '佣金管理',
              icon: 'money',
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
        meta: {
          title: '门店管理', icon: 'shopping', noCache: true
        },
        children: [
          {
            path: 'brandSetting',
            component: () => import('@/views/configurationTable/brandSetting'),
            name: 'brandSetting',
            meta: {
              perms: ['POST /admin/brand/update', 'GET /admin/brand/list'],
              title: '门店列表',
              icon: 'validCode',
              noCache: true
            }
          },
          {
            path: 'salesmanApplication',
            component: () => import('@/views/applicationManagement/salesmanApplication'),
            name: 'salesmanApplication',
            meta: {
              // perms: [],
              title: '门店申请管理',
              icon: 'validCode',
              noCache: true
            }
          }
        ]
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
      perms: ['POST /admin/goods/update', 'POST /admin/goods/delete', 'POST /admin/goods/create', 'GET /admin/goods/list', 'GET /admin/goods/detail'],
      title: '商品管理',
      icon: 'tab'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          // perms: [],
          title: '商品列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/goods/create/index'),
        name: 'goodsCreate',
        meta: {
          // perms: [],
          title: '商品上架',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/goods/edit'),
        name: 'goodsEdit',
        meta: {
          // perms: [],
          title: '商品编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'brandList',
        component: () => import('@/views/goods/brandList'),
        name: 'brandGoodsList',
        meta: {
          // perms: [],
          title: '门店-商品',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'brandListShow',
        component: () => import('@/views/goods/brandListShow'),
        name: 'brandGoodsListShow',
        meta: {
          // perms: [],
          title: '门店-商品展示',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'category',
        component: () => import('@/views/mall/category'),
        name: 'category',
        meta: {
          perms: ['POST /admin/category/update', 'POST /admin/category/delete', 'GET /admin/category/read', 'POST /admin/category/create', 'GET /admin/category/list'],
          title: '商品类目',
          noCache: true
        }
      },
      {
        path: 'issue',
        component: () => import('@/views/mall/issue'),
        name: 'issue',
        meta: {
          perms: ['POST /admin/issue/update', 'POST /admin/issue/delete', 'POST /admin/issue/create', 'GET /admin/issue/list'],
          title: '通用问题',
          noCache: true
        }
      },
      {
        path: 'keyword',
        component: () => import('@/views/mall/keyword'),
        name: 'keyword',
        meta: {
          perms: ['POST /admin/keyword/update', 'POST /admin/keyword/delete', 'GET /admin/keyword/read', 'POST /admin/keyword/create', 'GET /admin/keyword/list'],
          title: '关键词',
          noCache: true
        }
      },
      {
        path: 'painting',
        component: () => import('@/views/errorPage/developing'),
        name: 'painting',
        meta: {
          // perms: [],
          title: '智能画册',
          noCache: true
        }
      },
      {
        path: 'goodsTag',
        component: () => import('@/views/goods/goodsTag/index'),
        name: 'GoodsTag',
        meta: {
          // perms: [],
          title: '大类标签',
          noCache: true
        }
      },
      {
        path: 'goodsStyle',
        component: () => import('@/views/goods/goodsStyle/index'),
        name: 'GoodsStyle',
        meta: {
          // perms: [],
          title: '商品风格',
          noCache: true
        }
      },
      {
        path: 'comment',
        component: () => import('@/views/goods/comment/index'),
        name: 'CommentList',
        meta: {
          perms: ['POST /admin/comment/delete', 'GET /admin/comment/list'],
          title: '商品评论',
          noCache: true
        }
      },
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
      {
        path: '',
        component: () => import('@/views/digitalDashboard/informationSentry'),
        name: 'informationSentry',
        meta: {
          title: '信息哨兵',
          icon: 'druid'
        }
      },
      {
        path: '/performanceControlDashboard',
        component: () => import('@/views/digitalDashboard/performanceControlDashboard'),
        name: 'performanceControlDashboard',
        meta: {
          title: '业绩看板',
          icon: 'druid'
        }
      },
      {
        path: '/marketingToolsDashboard',
        component: () => import('@/views/digitalDashboard/marketingToolsDashboard'),
        name: 'marketingToolsDashboard',
        meta: {
          title: '营销看板',
          icon: 'druid'
        }
      },
      {
        path: '/userPortraitDashboard',
        component: () => import('@/views/digitalDashboard/userPortraitDashboard'),
        name: 'userPortraitDashboard',
        meta: {
          title: '用户看板',
          icon: 'druid'
        }
      },
      {
        path: 'stat',
        component: () => import('@/views/children'),
        redirect: 'noredirect',
        alwaysShow: true,
        name: 'statManage',
        meta: {
          title: '统计',
          icon: 'chart'
        },
        children: [
          {
            path: 'user',
            component: () => import('@/views/stat/user'),
            name: 'statUser',
            meta: {
              perms: ['GET /admin/stat/user'],
              title: '用户统计',
              icon: 'user',
              noCache: true
            }
          },
          {
            path: 'order',
            component: () => import('@/views/stat/order'),
            name: 'statOrder',
            meta: {
              perms: ['GET /admin/stat/order'],
              title: '订单统计',
              icon: 'shopping',
              noCache: true
            }
          },
          {
            path: 'goods',
            component: () => import('@/views/stat/goods'),
            name: 'statGoods',
            meta: {
              perms: ['GET /admin/stat/goods'],
              title: '商品统计',
              icon: 'table',
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
          icon: 'language',
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
          icon: 'link',
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
          icon: 'form',
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
          icon: 'language',
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
          icon: 'link',
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
          icon: 'form',
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
          icon: 'clipboard',
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
          icon: 'clipboard',
          noCache: true
        }
      }
    ]
  },
  {
    path: 'external-link',
    // component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'externalLink',
    hidden: true,
    meta: {
      title: '外链',
      icon: 'link'
    },
    children: [
      {
        path: 'https://cloud.tencent.com/product/cos',
        meta: {
          title: '腾讯云存储',
          icon: 'link'
          // perms: []
        }
      },
      {
        path: 'https://cloud.tencent.com/product/sms',
        meta: {
          title: '腾讯云短信',
          icon: 'link'
          // perms: []
        }
      },
      {
        path: 'https://pay.weixin.qq.com/index.php/core/home/login',
        meta: {
          title: '微信支付',
          icon: 'link'
          // perms: []
        }
      },
      {
        path: 'https://mpkf.weixin.qq.com/',
        meta: {
          title: '小程序客服',
          icon: 'link'
          // perms: []
        }
      },
      {
        path: 'https://www.alibabacloud.com/zh/product/oss',
        meta: {
          title: '阿里云存储',
          icon: 'link'
          // perms: []
        }
      },
      {
        path: 'https://www.qiniu.com/products/kodo',
        meta: {
          title: '七牛云存储',
          icon: 'link'
          // perms: []
        }
      },
      {
        path: 'http://www.kdniao.com/api-track',
        meta: {
          title: '快递鸟',
          icon: 'link'
          // perms: []
        }
      }
    ]
  },
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
    path: '/brand',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: '企业管理', icon: 'shopping', noCache: true
    },
    children: [
      {
        path: 'brandInfo',
        component: () => import('@/views/configurationTable/brand'),
        name: 'brandInfo',
        meta: {
          perms: ['POST /admin/brand/update', 'POST /admin/brand/delete', 'GET /admin/brand/read', 'POST /admin/brand/create', 'GET /admin/brand/list'],
          title: '基本信息',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'staffManagement',
        component: () => import('@/views/errorPage/developing'),
        name: 'staffManagement',
        meta: {
          // perms: [],
          title: '员工管理',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'authorizationManagement',
        component: () => import('@/views/errorPage/developing'),
        name: 'authorizationManagement',
        meta: {
          // perms: [],
          title: '授权管理',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'plugInManagement',
        component: () => import('@/views/errorPage/developing'),
        name: 'plugInManagement',
        meta: {
          // perms: [],
          title: '插件管理',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'rechargeManagement',
        component: () => import('@/views/errorPage/developing'),
        name: 'rechargeManagement',
        meta: {
          // perms: [],
          title: '充值管理',
          icon: '',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/marketingManagement',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: '营销管理', icon: 'table', noCache: true },
    children: [
      {
        path: 'couponManagement',
        alwaysShow: true,
        component: () => import('@/views/children'),
        redirect: 'noredirect',
        meta: { title: '代金券管理', icon: '', noCache: true },
        children: [
          {
            path: 'couponManagementGive',
            component: () => import('@/views/couponManagement/give'),
            name: 'couponManagementGive',
            meta: {
              perms: ['GET /admin/circula/list', 'POST /admin/circula/circula'],
              title: '转增记录',
              icon: '',
              noCache: true
            }
          },
          {
            path: 'couponManagementOrder',
            component: () => import('@/views/couponManagement/order'),
            name: 'couponManagementOrder',
            meta: {
              perms: ['GET /admin/voucherRecord/list'],
              title: '订单记录',
              icon: '',
              noCache: true
            }
          },
          {
            path: 'couponManagementPossess',
            component: () => import('@/views/couponManagement/possess'),
            name: 'couponManagementPossess',
            meta: {
              perms: ['GET /admin/hold/list'],
              title: '持有管理',
              icon: '',
              noCache: true
            }
          },
          {
            path: 'couponManagementGiveCreate',
            component: () => import('@/views/couponManagement/giveCreate'),
            name: 'CouponManagementGiveCreate',
            meta: {
              // perms: [],
              title: '转增创建',
              icon: '',
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
          icon: '',
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
              icon: '',
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
              icon: '',
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
              icon: '',
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
          icon: '',
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
          icon: '',
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
          icon: '',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: ['POST /admin/coupon/update', 'POST /admin/coupon/delete', 'GET /admin/coupon/read', 'POST /admin/coupon/create', 'GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
          title: '优惠券',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/promotion/couponDetail'),
        name: 'couponDetail',
        meta: {
          perms: ['POST /admin/coupon/update', 'POST /admin/coupon/delete', 'GET /admin/coupon/read', 'POST /admin/coupon/create', 'GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
          title: '优惠券详情',
          icon: 'tab',
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
          icon: '',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/businessManagement',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: '业务管理', icon: 'log', noCache: true },
    children: [
      {
        path: 'informationSentry',
        component: () => import('@/views/businessManagement/informationSentry/index'),
        name: 'InformationSentry',
        meta: {
          // perms: [],
          title: '信息哨兵',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'resultsSentry',
        component: () => import('@/views/errorPage/developing'),
        name: 'resultsSentry',
        meta: {
          // perms: [],
          title: '业绩哨兵',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'scriptSetting',
        component: () => import('@/views/businessManagement/scriptSetting'),
        name: 'ScriptSetting',
        meta: {
          // perms: [],
          title: '话术设置',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'marketingPortrait',
        component: () => import('@/views/businessManagement/marketingPortrait'),
        name: 'MarketingPortrait',
        meta: {
          // perms: [],
          title: '营销画像',
          icon: '',
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
      icon: 'table'
    },
    children: [
      {
        path: 'priceIndices',
        component: () => import('@/views/materialManagement/priceIndices'),
        name: 'priceIndices',
        // perms: [],
        meta: {
          title: '价格指数图表',
          icon: ''
        }
      },
      {
        path: 'priceIndicesInfo',
        component: () => import('@/views/materialManagement/priceIndicesInfo'),
        name: 'priceIndicesInfo',
        // perms: [],
        meta: {
          title: '价格指数',
          icon: ''
        }
      },
      {
        path: 'tradeLeads',
        component: () => import('@/views/materialManagement/tradeLeads'),
        name: 'tradeLeads',
        // perms: [],
        meta: {
          title: '供求信息',
          icon: ''
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
      icon: 'table'
    },
    children: [
      {
        path: 'communityArticleList',
        component: () => import('@/views/communityManagement/communityArticleList'),
        name: 'communityArticleList',
        // perms: [],
        meta: {
          title: '文章列表',
          icon: ''
        }
      },
      {
        path: 'communityArticleCreate',
        component: () => import('@/views/communityManagement/communityArticleCreate'),
        name: 'communityArticleCreate',
        // perms: [],
        meta: {
          title: '发布文章',
          icon: ''
        }
      },
      {
        path: 'communityArticleEdit',
        component: () => import('@/views/communityManagement/communityArticleEdit'),
        name: 'communityArticleEdit',
        meta: {
          // perms: [],
          title: '文章编辑',
          icon: '',
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
          title: '服务类型',
          icon: ''
        }
      }
    ]
  },

  {
    path: '/orderManagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'orderManagement',
    meta: {
      title: '订单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'orderCreate',
        component: () => import('@/views/errorPage/developing'),
        name: 'orderCreate',
        meta: {
          // perms: [],
          title: '创建订单',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/mall/order'),
        name: 'order',
        meta: {
          perms: ['GET /admin/order/list', 'POST /admin/order/reply', 'GET /admin/order/detail', 'POST /admin/order/ship', 'GET /admin/order/listShipChannel', 'POST /admin/order/refund'],
          title: '订单列表',
          icon: '',
          noCache: true
        }
      },
      {
        path: 'abnormalOrder',
        component: () => import('@/views/errorPage/developing'),
        name: 'abnormalOrder',
        meta: {
          // perms: [],
          title: '异常订单',
          icon: '',
          noCache: true
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
