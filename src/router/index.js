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
  // {
  //   path: '/dashboardBig',
  //   component: () => import('@/views/dashboardBig/index'),
  //   hidden: true
  // },
  // {
  //   path: '/paintingshow_out',
  //   alwaysShow: true,
  //   name: 'paintingshow_out',
  //   component: () => import('@/views/painting/show'),
  //   hidden: true
  // },
  // {
  //   path: '/pictureShow_out',
  //   alwaysShow: true,
  //   name: 'pictureShow_out',
  //   component: () => import('@/views/painting/pictureShow'),
  //   hidden: true
  // },
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
    redirect: 'homepage',
    children: [
      {
        path: 'homepage',
        // component: () => import('@/views/homepage/index'),
        component: () => import('@/views/homepage/index'),
        name: 'Homepage',
        meta: { title: 'homepage', icon: 'home', noCache: true }
      }
    ]
  }
  // {
  //   path: '/dashboard_out',
  //   alwaysShow: true,
  //   name: 'dashboard_out',
  //   component: () => import('@/views/dashboard/index'),
  //   hidden: true
  // }
  // {
  //   path: '/dataStatisticsDashboard',
  //   component: Layout,
  //   // component: () => import('@/views/dataStatisticsDashboard'),
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dataStatisticsDashboard'),
  //       name: 'dataStatisticsDashboard',
  //       meta: { title: '????????????', icon: 'table', noCache: true }
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
      title: '????????????',
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
          title: '????????????'
        },
        children: [
          {
            path: 'memberList',
            component: () => import('@/views/userManagement/memberList'),
            name: 'user',
            meta: {
              perms: [ 'GET /admin/user/list' ],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'partnerApply',
            component: () => import('@/views/userManagement/partnerApply'),
            name: 'PartnerApply',
            _ROLES: [ 'ADMIN' ],
            meta: {
              title: '???????????????'
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
          title: '????????????',
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
              title: '????????????',
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
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'commissionSetting',
            component: () => import('@/views/brand/commissionSetting'),
            name: 'CommissionSetting',
            meta: {
              perms: [ 'GET /admin/comModule/list' ],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'commissionView',
            component: () => import('@/views/brand/commissionView'),
            name: 'CommissionView',
            meta: {
              perms: [ 'GET /admin/comModule/moduleList' ],
              title: '????????????',
              noCache: true
            }
          }
        ]
      },
      {
        path: 'brand',
        component: () => import('@/views/children'),
        name: 'Children',
        redirect: 'noredirect',
        alwaysShow: true,
        _ROLES: [ 'ADMIN' ],
        meta: {
          title: '????????????'
        },
        children: [
          {
            path: 'brandList',
            component: () => import('@/views/brand/brandList'),
            name: 'BrandList',
            _ROLES: [ 'ADMIN' ],
            meta: {
              perms: [ 'GET /admin/brand/list' ],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'brandGoods',
            component: () => import('@/views/brand/brandGoods'),
            name: 'BrandGoods',
            meta: {
              perms: [ 'GET /admin/goods/list' ],
              title: '????????????',
              noCache: false
            }
            // hidden: true
          },
          {
            path: 'brandStyle',
            component: () => import('@/views/brand/brandStyle'),
            name: 'BrandStyle',
            _ROLES: [ 'ADMIN' ],
            meta: {
              perms: [ 'GET /admin/brandStyle/list' ],
              title: '????????????',
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
              title: '????????????',
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
          title: '????????????',
          noCache: true
        },
        children: [
          {
            path: 'brandLevel',
            component: () => import('@/views/brand/brandLevel'),
            name: 'BrandLevel',
            meta: {
              perms: [ 'GET /admin/brandLevel/list' ],
              title: '????????????',
              noCache: true
            }
          }
        ]
      },
      {
        path: 'regionalAgent',
        component: () => import('@/views/children'),
        redirect: 'noredirect',
        alwaysShow: true,
        _ROLES: [ 'ADMIN' ],
        meta: {
          title: '????????????',
          noCache: true
        },
        children: [
          {
            path: 'regionalAgentList',
            component: () => import('@/views/regionalAgent/regionalAgentList'),
            name: 'RegionalAgentList',
            meta: {
              perms: ['POST /admin/regionagent/getRegionAgentList', 'POST /admin/regionagent/updaetRegionAgentStatus', 'POST /admin/regionagent/updaetRegionAgent', 'GET /admin/regionagent/getRegionAgentInfo'],
              title: '??????????????????',
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
      title: '????????????',
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
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/orderManagement/orderDetail'),
        name: 'OrderDetail',
        meta: {
          title: '????????????',
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
      title: '????????????',
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
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/goods/create/index'),
        name: 'GoodsCreate',
        meta: {
          perms: [ 'POST /admin/goods/create' ],
          title: '????????????',
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
          title: '????????????',
          noCache: true
        },
        hidden: true
      },
      // {
      //   path: 'brandListShow',
      //   component: () => import('@/views/goods/brandListShow'),
      //   name: 'brandGoodsListShow',
      //   meta: {
      //     perms: [ 'GET /admin/goods/list' ],
      //     title: '??????????????????',
      //     noCache: true
      //   },
      //   hidden: true
      // },
      {
        path: 'category',
        component: () => import('@/views/goods/category'),
        name: 'Category',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [ 'GET /admin/category/list' ],
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'issue',
        component: () => import('@/views/goods/issue'),
        name: 'Issue',
        meta: {
          perms: [ 'GET /admin/issue/list' ],
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'keyword',
        component: () => import('@/views/goods/keyword'),
        name: 'Keyword',
        meta: {
          perms: [ 'GET /admin/keyword/list' ],
          title: '???????????????',
          noCache: true
        }
      },
      // {
      //   path: 'painting',
      //   component: () => import('@/views/errorPage/developing'),
      //   name: 'painting',
      //   meta: {
      //     // perms: [],
      //     title: '????????????',
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
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'goodsMaterial',
        component: () => import('@/views/goods/goodsMaterial/index'),
        name: 'GoodsMaterial',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [ 'GET /newmaterial/getNewMaterialList' ],
          title: '????????????',
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
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'comment',
        component: () => import('@/views/goods/comment/index'),
        name: 'CommentList',
        meta: {
          perms: [ 'GET /admin/comment/list' ],
          title: '????????????',
          noCache: true
        }
      }
    ]
  },
  // {
  //   path: '/dataStatisticsDashboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   // alwaysShow: true,
  //   name: 'dataStatisticsDashboard',
  //   meta: {
  //     title: '??????????????????',
  //     icon: 'server'
  //   },
  //   // hidden: true,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/digitalDashboard/informationSentry'),
  //       name: 'informationSentry',
  //       meta: {
  //         perms: [ 'POST /admin/messagesentry/queryMsgSentryList' ],
  //         title: '????????????',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: '/performanceControlDashboard',
  //       component: () => import('@/views/digitalDashboard/performanceControlDashboard'),
  //       name: 'performanceControlDashboard',
  //       meta: {
  //         title: '????????????'
  //       }
  //     },
  //     {
  //       path: '/marketingToolsDashboard',
  //       component: () => import('@/views/digitalDashboard/marketingToolsDashboard'),
  //       name: 'marketingToolsDashboard',
  //       meta: {
  //         title: '????????????'
  //       }
  //     },
  //     {
  //       path: '/userPortraitDashboard',
  //       component: () => import('@/views/digitalDashboard/userPortraitDashboard'),
  //       name: 'userPortraitDashboard',
  //       meta: {
  //         title: '????????????'
  //       }
  //     }
  //     // {
  //     //   path: 'stat',
  //     //   component: () => import('@/views/children'),
  //     //   redirect: 'noredirect',
  //     //   alwaysShow: true,
  //     //   name: 'statManage',
  //     //   meta: {
  //     //     title: '??????'
  //     //   },
  //     //   children: [
  //     //     {
  //     //       path: 'user',
  //     //       component: () => import('@/views/stat/user'),
  //     //       name: 'statUser',
  //     //       meta: {
  //     //         perms: [ 'GET /admin/stat/user' ],
  //     //         title: '????????????',
  //     //         noCache: true
  //     //       }
  //     //     },
  //     //     {
  //     //       path: 'order',
  //     //       component: () => import('@/views/stat/order'),
  //     //       name: 'statOrder',
  //     //       meta: {
  //     //         perms: [ 'GET /admin/stat/order' ],
  //     //         title: '????????????',
  //     //         noCache: true
  //     //       }
  //     //     },
  //     //     {
  //     //       path: 'goods',
  //     //       component: () => import('@/views/stat/goods'),
  //     //       name: 'statGoods',
  //     //       meta: {
  //     //         perms: [ 'GET /admin/stat/goods' ],
  //     //         title: '????????????',
  //     //         noCache: true
  //     //       }
  //     //     }
  //     //   ]
  //     // }
  //   ]
  // },
  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '????????????',
      icon: 'guide'
    },
    children: [
      {
        path: 'teachArticleList',
        component: () => import('@/views/promotion/articleManagement/articleList'),
        name: 'teachArticleList',
        meta: {
          perms: ['POST /admin/richText/update', 'POST /admin/richText/delete', 'POST /admin/richText/create', 'GET /admin/richText/list', 'GET /admin/richText/detail'],
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'teachArticleCreate',
        component: () => import('@/views/promotion/articleManagement/components/articleCreate'),
        name: 'teachArticleCreate',
        meta: {
          perms: ['POST /admin/richText/update', 'POST /admin/richText/delete', 'POST /admin/richText/create', 'GET /admin/richText/list', 'GET /admin/richText/detail'],
          title: '????????????',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'teachArticleEdit',
        component: () => import('@/views/promotion/articleManagement/components/articleEdit'),
        name: 'teachArticleEdit',
        meta: {
          perms: ['POST /admin/richText/update', 'POST /admin/richText/delete', 'POST /admin/richText/create', 'GET /admin/richText/list', 'GET /admin/richText/detail'],
          title: '????????????',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'announcementList',
        component: () => import('@/views/promotion/announcementManagement'),
        name: 'announcementList',
        meta: {
          perms: ['POST /admin/article/update', 'POST /admin/article/delete', 'POST /admin/article/create', 'GET /admin/article/list', 'GET /admin/article/detail'],
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'announcementCreate',
        component: () => import('@/views/promotion/announcementManagement/components/announcementCreate'),
        name: 'announcementCreate',
        meta: {
          perms: ['POST /admin/article/update', 'POST /admin/article/delete', 'POST /admin/article/create', 'GET /admin/article/list', 'GET /admin/article/detail'],
          title: '????????????',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'announcementEdit',
        component: () => import('@/views/promotion/announcementManagement/components/announcementEdit'),
        name: 'announcementEdit',
        meta: {
          perms: ['POST /admin/article/update', 'POST /admin/article/delete', 'POST /admin/article/create', 'GET /admin/article/list', 'GET /admin/article/detail'],
          title: '??????????????????',
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
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'video',
        component: () => import('@/views/errorPage/developing'),
        name: 'video',
        meta: {
          // perms: [],
          title: '????????????',
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
  //     title: '??????',
  //     icon: 'link'
  //   },
  //   children: [
  //     {
  //       path: 'https://cloud.tencent.com/product/cos',
  //       meta: {
  //         title: '???????????????',
  //         // perms: []
  //       }
  //     },
  //     {
  //       path: 'https://cloud.tencent.com/product/sms',
  //       meta: {
  //         title: '???????????????',
  //         // perms: []
  //       }
  //     },
  //     {
  //       path: 'https://pay.weixin.qq.com/index.php/core/home/login',
  //       meta: {
  //         title: '????????????',
  //         // perms: []
  //       }
  //     },
  //     {
  //       path: 'https://mpkf.weixin.qq.com/',
  //       meta: {
  //         title: '???????????????',
  //         // perms: []
  //       }
  //     },
  //     {
  //       path: 'https://www.alibabacloud.com/zh/product/oss',
  //       meta: {
  //         title: '???????????????',
  //         // perms: []
  //       }
  //     },
  //     {
  //       path: 'https://www.qiniu.com/products/kodo',
  //       meta: {
  //         title: '???????????????',
  //         // perms: []
  //       }
  //     },
  //     {
  //       path: 'http://www.kdniao.com/api-track',
  //       meta: {
  //         title: '?????????',
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
        meta: { title: '????????????', noCache: true }
      },
      {
        name: 'userInfo',
        path: 'userInfo',
        component: () => import('@/views/errorPage/developing'),
        meta: { title: '????????????', noCache: true }
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
      title: '????????????',
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
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'supplier',
        component: () => import('@/views/enterprise/supplier'),
        name: 'Supplier',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [ 'GET /admin/newsupplier/getNewSupplierList' ],
          title: '???????????????',
          noCache: true
        }
      },
      {
        path: 'roles',
        component: () => import('@/views/enterprise/roles'),
        name: 'Roles',
        meta: {
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'staff',
        component: () => import('@/views/enterprise/staff'),
        name: 'Staff',
        meta: {
          title: '????????????',
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
      title: '????????????',
      icon: 'marketing',
      noCache: true
    },
    children: [
      {
        path: 'voucherManagement',
        alwaysShow: true,
        component: () => import('@/views/children'),
        redirect: 'noredirect',
        meta: { title: '???????????????', noCache: true },
        children: [
          {
            path: 'voucherManagementGive',
            component: () => import('@/views/voucherManagement/give'),
            name: 'voucherManagementGive',
            meta: {
              perms: ['GET /admin/circula/list', 'POST /admin/circula/circula'],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'voucherManagementOrder',
            component: () => import('@/views/voucherManagement/order'),
            name: 'voucherManagementOrder',
            meta: {
              perms: [ 'GET /admin/voucherRecord/list' ],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'voucherManagementPossess',
            component: () => import('@/views/voucherManagement/possess'),
            name: 'voucherManagementPossess',
            meta: {
              perms: [ 'GET /admin/hold/list' ],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'voucherManagementGiveCreate',
            component: () => import('@/views/voucherManagement/giveCreate'),
            name: 'voucherManagementGiveCreate',
            meta: {
              // perms: [],
              title: '????????????',
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
          title: '??????',
          noCache: true
        },
        children: [
          {
            path: 'normal',
            component: () => import('@/views/errorPage/developing'),
            name: 'groupBookingNormal',
            meta: {
              // perms: [],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'draw',
            component: () => import('@/views/errorPage/developing'),
            name: 'groupBookingDraw',
            meta: {
              // perms: [],
              title: '????????????',
              noCache: true
            }
          },
          {
            path: 'host',
            component: () => import('@/views/errorPage/developing'),
            name: 'groupBookingHost',
            meta: {
              // perms: [],
              title: '????????????',
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
          title: '???????????????',
          noCache: true
        }
      },
      {
        path: 'tkb',
        component: () => import('@/views/errorPage/developing'),
        name: 'tkb',
        meta: {
          // perms: [],
          title: '?????????',
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
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/marketingManagement/coupon/coupon'),
        name: 'coupon',
        meta: {
          perms: ['POST /admin/coupon/update', 'POST /admin/coupon/delete', 'GET /admin/coupon/read', 'POST /admin/coupon/create', 'GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
          title: '?????????',
          noCache: true
        }
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/marketingManagement/couponDetail/couponDetail'),
        name: 'couponDetail',
        meta: {
          perms: ['POST /admin/coupon/update', 'POST /admin/coupon/delete', 'GET /admin/coupon/read', 'POST /admin/coupon/create', 'GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
          title: '???????????????',
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
          title: '?????????',
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
      title: '????????????',
      icon: 'business',
      noCache: true
    },
    children: [
      {
        path: 'customerPool',
        // component: () => import('@/views/businessManagement/customerPool'),
        component: () => import('@/views/errorPage/developing'),
        name: 'CustomerPool',
        meta: {
          title: '?????????',
          noCache: true
        }
      },
      {
        path: 'informationSentry',
        component: () => import('@/views/businessManagement/informationSentry'),
        name: 'InformationSentry',
        meta: {
          // perms: [ 'POST /admin/messagesentry/queryMsgSentryList' ],
          title: '????????????',
          noCache: true
        }
      },
      // {
      //   path: 'resultsSentry',
      //   component: () => import('@/views/errorPage/developing'),
      //   name: 'resultsSentry',
      //   meta: {
      //     // perms: [],
      //     title: '????????????',
      //     noCache: true
      //   }
      // },
      {
        path: 'scriptSetting',
        component: () => import('@/views/businessManagement/scriptSetting'),
        name: 'ScriptSetting',
        meta: {
          // perms: [ 'POST /admin/msgsay/msgSayList' ],
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'marketingPortrait',
        component: () => import('@/views/businessManagement/marketingPortrait'),
        name: 'MarketingPortrait',
        meta: {
          // perms: [ 'GET /admin/statistical/home' ],
          title: '????????????',
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
      title: '????????????',
      icon: 'material'
    },
    children: [
      {
        path: 'materialCity',
        component: () => import('@/views/materialManagement/materialCity'),
        name: 'MaterialCity',
        // perms: [],
        meta: {
          title: '???????????????'
        }
      },
      {
        path: 'priceIndices',
        component: () => import('@/views/materialManagement/priceIndices'),
        name: 'PriceIndices',
        // perms: [],
        meta: {
          title: '??????????????????'
        }
      },
      {
        path: 'priceIndicesInfo',
        component: () => import('@/views/materialManagement/priceIndicesInfo'),
        name: 'PriceIndicesInfo',
        // perms: [],
        meta: {
          title: '????????????'
        }
      },
      {
        path: 'tradeLeads',
        component: () => import('@/views/materialManagement/tradeLeads'),
        name: 'TradeLeads',
        // perms: [],
        meta: {
          title: '????????????'
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
      title: '????????????',
      icon: 'community'
    },
    children: [
      // {
      //   path: 'communityArticleList',
      //   component: () => import('@/views/communityManagement/communityArticleList'),
      //   name: 'communityArticleList',
      //   // perms: [],
      //   meta: {
      //     title: '????????????'
      //   }
      // },
      {
        path: 'communityArticleCreate',
        component: () => import('@/views/communityManagement/communityArticleCreate'),
        name: 'communityArticleCreate',
        // perms: [],
        meta: {
          title: '????????????'
        }
      },
      {
        path: 'communityArticleEdit',
        component: () => import('@/views/communityManagement/communityArticleEdit'),
        name: 'communityArticleEdit',
        meta: {
          // perms: [],
          title: '????????????',
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
          title: '????????????'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
