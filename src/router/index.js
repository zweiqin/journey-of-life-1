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
    name: 'HomepageBig',
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'homepage',
    _ROLES: [ 'ADMIN' ],
    children: [
      {
        path: 'homepage',
        component: () => import('@/views/homepage/index'),
        name: 'Homepage',
        meta: {
          title: 'homepage',
          icon: 'home',
          noCache: true
        }
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
        name: 'UserManagement',
        meta: {
          title: '用户管理'
        },
        children: [
          {
            path: 'memberList',
            component: () => import('@/views/userManagement/memberList'),
            name: 'MemberList',
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
            meta: {
              perms: [
                'GET /admin/partnerApply/list',
                'POST /admin/partnerApply/manage',
                'POST /admin/partnerApply/signin'
              ],
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
            path: 'commissionQuery',
            component: () => import('@/views/brand/commissionQuery'),
            name: 'CommissionQuery',
            _ROLES: [ 'ADMIN' ],
            meta: {
              perms: [ 'GET /admin/new/commission/queryCommissionList' ],
              title: '佣金列表',
              noCache: true
            }
          }
          // {
          //   path: 'commissionSetting',
          //   component: () => import('@/views/brand/commissionSetting'),
          //   name: 'CommissionSetting',
          //   meta: {
          //     perms: [ 'GET /admin/comModule/list' ],
          //     title: '佣金板块',
          //     noCache: true
          //   }
          // },
          // {
          //   path: 'commissionView',
          //   component: () => import('@/views/brand/commissionView'),
          //   name: 'CommissionView',
          //   meta: {
          //     perms: [ 'GET /admin/comModule/moduleList' ],
          //     title: '佣金查看',
          //     noCache: true
          //   }
          // }
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
          title: '门店管理'
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
      },
      {
        path: 'regionalAgent',
        component: () => import('@/views/children'),
        redirect: 'noredirect',
        alwaysShow: true,
        _ROLES: [ 'ADMIN' ],
        meta: {
          title: '区域代理',
          noCache: true
        },
        children: [
          {
            path: 'regionalAgentList',
            component: () => import('@/views/regionalAgent/regionalAgentList'),
            name: 'RegionalAgentList',
            meta: {
              perms: [
                'POST /admin/regionagent/getRegionAgentList',
                'POST /admin/regionagent/updaetRegionAgentStatus',
                'POST /admin/regionagent/updaetRegionAgent',
                'GET /admin/regionagent/getRegionAgentInfo'
              ],
              title: '区域代理列表',
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
          perms: [
            'GET /admin/order/detail',
            'POST /admin/order/changePrice',
            'POST /admin/order/ship',
            'POST /admin/order/refund',
            'GET /admin/order/isFreeze'
          ],
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
    name: 'GoodsManage',
    meta: {
      title: '商品管理',
      icon: 'goods'
    },
    children: [
      {
        path: 'brandGoods',
        component: () => import('@/views/goods/brandGoods'),
        name: 'BrandGoods',
        meta: {
          perms: [ 'GET /admin/goods/list' ],
          title: '门店商品',
          noCache: false
        },
        hidden: true
      },
      {
        path: 'allGoods',
        component: () => import('@/views/goods/allGoods'),
        name: 'AllGoods',
        _ROLES: ['ADMIN', 'TENANTRY'],
        meta: {
          perms: [ 'GET /admin/goods/list' ],
          title: '所有商品',
          noCache: false
        }
      },
      {
        path: 'selfSupportGoods',
        component: () => import('@/views/goods/selfSupportGoods'),
        name: 'SelfSupportGoods',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [ 'GET /admin/goods/list' ],
          title: '自营商品',
          noCache: false
        }
      },
      {
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'GoodsList',
        _ROLES: [ 'USER' ],
        meta: {
          perms: [ 'GET /admin/goods/list' ],
          title: '商品列表',
          noCache: false
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
      // {
      //   path: 'brandListShow',
      //   component: () => import('@/views/goods/brandListShow'),
      //   name: 'brandGoodsListShow',
      //   meta: {
      //     perms: [ 'GET /admin/goods/list' ],
      //     title: '门店商品展示',
      //     noCache: true
      //   },
      //   hidden: true
      // },
      {
        path: 'category',
        component: () => import('@/views/goods/category'),
        name: 'Category',
        _ROLES: ['ADMIN', 'TENANTRY'],
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
        _ROLES: ['ADMIN', 'TENANTRY'],
        meta: {
          perms: [ 'GET /admin/goodsTag/list' ],
          title: '大类标签',
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
          title: '商品材质',
          noCache: true
        }
      },
      {
        path: 'goodsStyle',
        component: () => import('@/views/goods/goodsStyle/index'),
        name: 'GoodsStyle',
        _ROLES: ['ADMIN', 'TENANTRY'],
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
  // {
  //   path: '/dataStatisticsDashboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   // alwaysShow: true,
  //   name: 'dataStatisticsDashboard',
  //   meta: {
  //     title: '情报数据看板',
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
  //         title: '信息哨兵',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: '/performanceControlDashboard',
  //       component: () => import('@/views/digitalDashboard/performanceControlDashboard'),
  //       name: 'performanceControlDashboard',
  //       meta: {
  //         title: '业绩看板'
  //       }
  //     },
  //     {
  //       path: '/marketingToolsDashboard',
  //       component: () => import('@/views/digitalDashboard/marketingToolsDashboard'),
  //       name: 'MarketingToolsDashboard',
  //       meta: {
  //         title: '营销看板'
  //       }
  //     },
  //     {
  //       path: '/userPortraitDashboard',
  //       component: () => import('@/views/digitalDashboard/userPortraitDashboard'),
  //       name: 'UserPortraitDashboard',
  //       meta: {
  //         title: '用户看板'
  //       }
  //     }
  //     // {
  //     //   path: 'stat',
  //     //   component: () => import('@/views/children'),
  //     //   redirect: 'noredirect',
  //     //   alwaysShow: true,
  //     //   name: 'StatManage',
  //     //   meta: {
  //     //     title: '统计'
  //     //   },
  //     //   children: [
  //     //     {
  //     //       path: 'user',
  //     //       component: () => import('@/views/stat/user'),
  //     //       name: 'StatUser',
  //     //       meta: {
  //     //         perms: [ 'GET /admin/stat/user' ],
  //     //         title: '用户统计',
  //     //         noCache: true
  //     //       }
  //     //     },
  //     //     {
  //     //       path: 'order',
  //     //       component: () => import('@/views/stat/order'),
  //     //       name: 'StatOrder',
  //     //       meta: {
  //     //         perms: [ 'GET /admin/stat/order' ],
  //     //         title: '订单统计',
  //     //         noCache: true
  //     //       }
  //     //     },
  //     //     {
  //     //       path: 'goods',
  //     //       component: () => import('@/views/stat/goods'),
  //     //       name: 'StatGoods',
  //     //       meta: {
  //     //         perms: [ 'GET /admin/stat/goods' ],
  //     //         title: '商品统计',
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
    name: 'PromotionManagement',
    meta: {
      title: '推广中心',
      icon: 'guide'
    },
    children: [
      {
        path: 'announcementManagement',
        component: () => import('@/views/promotion/announcementManagement'),
        name: 'AnnouncementManagement',
        meta: {
          perms: [
            'POST /admin/announcement/queryAnnouncementList',
            'POST /admin/announcement/saveAnnouncement',
            'POST /admin/announcement/updaetByStatus',
            'POST /admin/announcement/updateByIdAnnouncement',
            'POST /admin/announcement/deleteByIdAnnouncement'
          ],
          title: '公告管理',
          noCache: true
        }
      },
      {
        path: 'articleManagement',
        component: () => import('@/views/promotion/articleManagement'),
        name: 'ArticleManagement',
        meta: {
          perms: [
            'GET /admin/newarticle/getArticleList',
            'GET /admin/newarticle/getArticleTypeList',
            'POST /admin/newarticle/queryArticleTypeList',
            'POST /admin/newarticle/saveArticleType',
            'POST /admin/newarticle/updateByIdArticleType',
            'POST /admin/article/updaetByStatus',
            'POST /admin/newarticle/deleteByIdArticleType'
          ],
          title: '文章管理',
          noCache: true
        }
      },
      {
        path: 'noticeList',
        component: () => import('@/views/promotion/noticeManagement'),
        name: 'NoticeList',
        meta: {
          perms: [
            'POST /admin/article/update',
            'POST /admin/article/delete',
            'POST /admin/article/create',
            'GET /admin/article/list',
            'GET /admin/article/detail'
          ],
          title: '（废弃）公告列表',
          noCache: true
        }
      },
      {
        path: 'noticeCreate',
        component: () => import('@/views/promotion/noticeManagement/components/noticeCreate'),
        name: 'NoticeCreate',
        meta: {
          perms: [
            'POST /admin/article/update',
            'POST /admin/article/delete',
            'POST /admin/article/create',
            'GET /admin/article/list',
            'GET /admin/article/detail'
          ],
          title: '发布公告',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'noticeEdit',
        component: () => import('@/views/promotion/noticeManagement/components/noticeEdit'),
        name: 'NoticeEdit',
        meta: {
          perms: [
            'POST /admin/article/update',
            'POST /admin/article/delete',
            'POST /admin/article/create',
            'GET /admin/article/list',
            'GET /admin/article/detail'
          ],
          title: '公告通知编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'writingsList',
        component: () => import('@/views/promotion/writingsManagement/writingsList'),
        name: 'WritingsList',
        meta: {
          perms: [
            'POST /admin/richText/update',
            'POST /admin/richText/delete',
            'POST /admin/richText/create',
            'GET /admin/richText/list',
            'GET /admin/richText/detail'
          ],
          title: '（废弃）文章列表',
          noCache: true
        }
      },
      {
        path: 'writingsCreate',
        component: () => import('@/views/promotion/writingsManagement/components/writingsCreate'),
        name: 'WritingsCreate',
        meta: {
          perms: [
            'POST /admin/richText/update',
            'POST /admin/richText/delete',
            'POST /admin/richText/create',
            'GET /admin/richText/list',
            'GET /admin/richText/detail'
          ],
          title: '发布文章',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'writingsEdit',
        component: () => import('@/views/promotion/writingsManagement/components/writingsEdit'),
        name: 'WritingsEdit',
        meta: {
          perms: [
            'POST /admin/richText/update',
            'POST /admin/richText/delete',
            'POST /admin/richText/create',
            'GET /admin/richText/list',
            'GET /admin/richText/detail'
          ],
          title: '文章编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'Ad',
        meta: {
          perms: [
            'POST /admin/ad/update',
            'POST /admin/ad/delete',
            'GET /admin/ad/read',
            'POST /admin/ad/create',
            'GET /admin/ad/list'
          ],
          title: '广告管理',
          noCache: true
        }
      },
      {
        path: 'video',
        component: () => import('@/views/errorPage/developing'),
        name: 'Video',
        meta: {
          perms: [ '/admin/developing' ],
          title: '视频列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/financialCenter',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'FinancialCenter',
    _ROLES: [ 'ADMIN' ],
    meta: {
      title: '财务中心',
      icon: 'financial'
    },
    children: [
      {
        path: 'mallReportForms',
        component: () => import('@/views/financialCenter/mallReportForms'),
        name: 'MallReportForms',
        meta: {
          perms: [ 'POST /admin/finance/queryMallReportForms' ],
          title: '商城报表',
          noCache: true
        }
      },
      {
        path: 'logisticsReportForms',
        component: () => import('@/views/financialCenter/logisticsReportForms'),
        name: 'LogisticsReportForms',
        meta: {
          perms: [ 'POST /admin/finance/queryLogisticsReportForms' ],
          title: '物流报表',
          noCache: true
        }
      },
      {
        path: 'communityReportForms',
        component: () => import('@/views/financialCenter/communityReportForms'),
        name: 'CommunityReportForms',
        meta: {
          perms: [ 'POST /admin/finance/queryCommunityReportForms' ],
          title: '社区报表',
          noCache: true
        }
      },
      {
        path: 'withdrawalList',
        component: () => import('@/views/financialCenter/withdrawalList'),
        name: 'WithdrawalList',
        meta: {
          perms: [
            'POST /admin/finance/getWithdrawRecordList',
            'POST /admin/finance/withdrawApprove'
          ],
          title: '提现列表',
          noCache: true
        }
      },
      {
        path: 'accumulatedWithdrawal',
        component: () => import('@/views/financialCenter/accumulatedWithdrawal'),
        name: 'AccumulatedWithdrawal',
        meta: {
          perms: [ 'POST /admin/finance/withdrawalStatistics' ],
          title: '累计提现',
          noCache: true
        }
      },
      {
        path: 'masterWithdrawal',
        component: () => import('@/views/financialCenter/masterWithdrawal'),
        name: 'MasterWithdrawal',
        meta: {
          perms: [
            'POST /admin/finance/getWithdrawRecordList',
            'POST /admin/finance/withdrawApprove',
            'POST /admin/finance/withdrawalStatistics'
          ],
          title: '师傅提现',
          noCache: true
        }
      },
      {
        path: 'storeWithdrawal',
        component: () => import('@/views/financialCenter/storeWithdrawal'),
        name: 'StoreWithdrawal',
        meta: {
          perms: [
            'POST /admin/finance/getWithdrawRecordList',
            'POST /admin/finance/withdrawApprove',
            'POST /admin/finance/withdrawalStatistics'
          ],
          title: '店长提现',
          noCache: true
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
        path: 'roles',
        component: () => import('@/views/enterprise/roles'),
        name: 'Roles',
        _ROLES: ['ADMIN', 'TENANTRY'],
        meta: {
          perms: [
            'GET /admin/role/list',
            'POST /admin/role/create',
            'POST /admin/role/update',
            'POST /admin/role/delete'
          ],
          title: '角色管理',
          // title: '平台管理',
          noCache: true
        }
      },
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
        path: 'supplier',
        component: () => import('@/views/enterprise/supplier'),
        name: 'Supplier',
        _ROLES: ['ADMIN', 'TENANTRY'],
        meta: {
          perms: [ 'GET /admin/newsupplier/getNewSupplierList' ],
          title: '供应商管理',
          noCache: true
        }
      },
      {
        path: 'department',
        component: () => import('@/views/enterprise/department'),
        name: 'Department',
        meta: {
          perms: [
            'POST /admin/department/queryDepartmentList',
            'GET /admin/department/selectByPrimaryKey',
            'GET /admin/department/deleteByPrimaryKey',
            'POST /admin/department/insertSelective',
            'POST /admin/department/updateByPrimaryKeySelective'
          ],
          title: '部门管理',
          noCache: true
        }
      },
      {
        path: 'staff',
        component: () => import('@/views/enterprise/staff'),
        name: 'Staff',
        meta: {
          perms: [
            'POST /admin/staff/update',
            'POST /admin/staff/delete',
            'POST /admin/staff/create',
            'GET /admin/staff/list',
            'GET /admin/staff/detail'
          ],
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
        path: 'activityList',
        component: () => import('@/views/marketingManagement/activityList'),
        name: 'ActivityList',
        meta: {
          perms: [
            'GET /admin/userCrm/list',
            'POST /admin/userCrm/create',
            'POST /admin/userCrm/update'
          ],
          _ROLES: [ 'ADMIN' ],
          title: '活动列表',
          noCache: true
        }
      },
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
            name: 'VoucherManagementGive',
            meta: {
              perms: ['GET /admin/circula/list', 'POST /admin/circula/circula'],
              title: '转赠记录',
              noCache: true
            }
          },
          {
            path: 'voucherManagementOrder',
            component: () => import('@/views/voucherManagement/order'),
            name: 'VoucherManagementOrder',
            meta: {
              perms: [ 'GET /admin/voucherRecord/list' ],
              title: '订单记录',
              noCache: true
            }
          },
          {
            path: 'voucherManagementPossess',
            component: () => import('@/views/voucherManagement/possess'),
            name: 'VoucherManagementPossess',
            meta: {
              perms: [ 'GET /admin/hold/list' ],
              title: '持有管理',
              noCache: true
            }
          },
          {
            path: 'voucherManagementGiveCreate',
            component: () => import('@/views/voucherManagement/giveCreate'),
            name: 'VoucherManagementGiveCreate',
            meta: {
              perms: [ 'POST /admin/circula/circula' ],
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
        name: 'GroupBooking',
        meta: {
          // perms: [],
          title: '拼团',
          noCache: true
        },
        children: [
          {
            path: 'normal',
            component: () => import('@/views/errorPage/developing'),
            name: 'GroupBookingNormal',
            meta: {
              perms: [ '/admin/developing' ],
              title: '正常拼团',
              noCache: true
            }
          },
          {
            path: 'draw',
            component: () => import('@/views/errorPage/developing'),
            name: 'GroupBookingDraw',
            meta: {
              perms: [ '/admin/developing' ],
              title: '抽奖拼团',
              noCache: true
            }
          },
          {
            path: 'host',
            component: () => import('@/views/errorPage/developing'),
            name: 'GroupBookingHost',
            meta: {
              perms: [ '/admin/developing' ],
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
          perms: [ '/admin/developing' ],
          title: '同城联盟卡',
          noCache: true
        }
      },
      {
        path: 'tkb',
        component: () => import('@/views/errorPage/developing'),
        name: 'tkb',
        meta: {
          perms: [ '/admin/developing' ],
          title: '拓客宝',
          noCache: true
        }
      },
      {
        path: 'flashSale',
        alwaysShow: true,
        component: () => import('@/views/errorPage/developing'),
        name: 'FlashSale',
        meta: {
          perms: [ '/admin/developing' ],
          title: '限时抢购',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/marketingManagement/coupon/coupon'),
        name: 'Coupon',
        meta: {
          perms: [
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete',
            'GET /admin/coupon/read',
            'POST /admin/coupon/create',
            'GET /admin/coupon/list',
            'GET /admin/coupon/listuser'
          ],
          title: '优惠券',
          noCache: true
        }
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/marketingManagement/couponDetail/couponDetail'),
        name: 'CouponDetail',
        meta: {
          perms: [
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete',
            'GET /admin/coupon/read',
            'POST /admin/coupon/create',
            'GET /admin/coupon/list',
            'GET /admin/coupon/listuser'
          ],
          title: '优惠券详情',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'couponCard',
        component: () => import('@/views/errorPage/developing'),
        name: 'CouponCard',
        meta: {
          perms: [
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete',
            'GET /admin/coupon/read',
            'POST /admin/coupon/create',
            'GET /admin/coupon/list',
            'GET /admin/coupon/listuser'
          ],
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
        path: 'customerServiceSystem',
        component: () => import('@/views/children'),
        redirect: 'noredirect',
        alwaysShow: true,
        meta: {
          title: '客服系统',
          icon: '',
          noCache: true
        },
        children: [
          {
            path: 'problemClassificationList',
            component: () => import('@/views/customerServiceSystem/problemClassificationList'),
            name: 'ProblemClassificationList',
            meta: {
              title: '问题分类',
              icon: '',
              noCache: true,
              perms: ['GET /admin/dtsCustomerCategory/singleStage', 'GET /admin/dtsCustomerCategory/categoryTree', 'POST /admin/dtsCustomerCategory/addCategory', 'POST /admin/dtsCustomerCategory/updateCategory']
            }
          },
          {
            path: 'suggestionsList',
            component: () => import('@/views/customerServiceSystem/suggestionsList'),
            name: 'SuggestionsList',
            meta: {
              title: '建议列表',
              icon: '',
              noCache: true,
              perms: ['GET /admin/dtsCustomerFeedback/customerList', 'GET /admin/dtsCustomerFeedback/updateStatus']
            }
          }
        ]
      },
      {
        path: 'customerPool',
        component: () => import('@/views/businessManagement/customerPool'),
        name: 'CustomerPool',
        meta: {
          perms: [
            'POST /admin/customerpool/updateByPrimaryKeySelective',
            'POST /admin/customerpool/insertSelective',
            'GET /admin/customerpool/deleteByPrimaryKey',
            'GET /admin/customerpool/selectByPrimaryKey',
            'POST /admin/customerpool/queryCustomerPoolList'
          ],
          title: '客户池',
          noCache: true
        }
      },
      {
        path: 'informationSentry',
        component: () => import('@/views/businessManagement/informationSentry'),
        name: 'InformationSentry',
        meta: {
          perms: [
            'POST /admin/messagesentry/queryMsgSentryList',
            'POST /admin/messagesentry/saveMsgSentry',
            'POST /admin/messagesentry/conversion',
            'POST /admin/messagesentry/isConversion',
            'POST /admin/messagesentry/salesmanBinding',
            'POST /admin/messagesentry/setOverdueTime'
          ],
          title: '信息哨兵',
          noCache: true
        }
      },
      {
        path: 'scriptSetting',
        component: () => import('@/views/businessManagement/scriptSetting'),
        name: 'ScriptSetting',
        meta: {
          perms: [
            'GET /admin/msgsay/msgSayTypeList',
            'POST /admin/msgsay/msgSayList',
            'POST /admin/msgsay/saveMsgSay',
            'GET /admin/msgsay/selectById',
            'PUT /admin/msgsay/updateSay',
            'DELETE /admin/msgsay/deleteById'
          ],
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
    name: 'MaterialManagement',
    _ROLES: [ 'ADMIN' ],
    meta: {
      title: '材料管理',
      icon: 'material'
    },
    children: [
      {
        path: 'materialBrand',
        component: () => import('@/views/materialManagement/materialBrand'),
        name: 'MaterialBrand',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [ 'GET /admin/brand/list' ],
          title: '材料门店',
          noCache: true
        }
      },
      {
        path: 'materialGoods',
        component: () => import('@/views/materialManagement/materialGoods'),
        name: 'MaterialGoods',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [ 'GET /admin/goods/list' ],
          title: '材料商品',
          noCache: false
        }
      },
      {
        path: 'materialCity',
        component: () => import('@/views/materialManagement/materialCity'),
        name: 'MaterialCity',
        _ROLES: [ 'ADMIN' ],
        meta: {
          // perms: [],
          title: '材料城管理'
        }
      },
      {
        path: 'materialBrandStyle',
        component: () => import('@/views/materialManagement/materialBrandStyle'),
        name: 'MaterialBrandStyle',
        _ROLES: [ 'ADMIN' ],
        meta: {
          // perms: [],
          title: '门店材料风格'
        }
      },
      {
        path: 'priceIndices',
        component: () => import('@/views/materialManagement/priceIndices'),
        name: 'PriceIndices',
        _ROLES: [ 'ADMIN' ],
        meta: {
          // perms: [],
          title: '价格指数图表'
        }
      },
      {
        path: 'priceIndicesInfo',
        component: () => import('@/views/materialManagement/priceIndicesInfo'),
        name: 'PriceIndicesInfo',
        _ROLES: [ 'ADMIN' ],
        meta: {
          // perms: [],
          title: '价格指数'
        }
      },
      {
        path: 'tradeLeads',
        component: () => import('@/views/materialManagement/tradeLeads'),
        name: 'TradeLeads',
        _ROLES: [ 'ADMIN' ],
        meta: {
          // perms: [],
          title: '供求信息'
        }
      }
    ]
  },
  {
    path: '/communityManagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'CommunityManagement',
    _ROLES: [ 'ADMIN' ],
    meta: {
      perms: [
        'POST /admin/community/richText/update',
        'POST /admin/community/richText/delete',
        'POST /admin/community/richText/create',
        'GET /admin/community/richText/list',
        'GET /admin/community/richText/detail'
      ],
      title: '社区管理',
      icon: 'community'
    },
    children: [
      // {
      //   path: 'communityArticleList',
      //   component: () => import('@/views/communityManagement/communityArticleList'),
      //   name: 'CommunityArticleList',
      //   // perms: [],
      //   meta: {
      //     title: '文章列表'
      //   }
      // },
      // {
      //   path: 'communityArticleCreate',
      //   component: () => import('@/views/communityManagement/communityArticleCreate'),
      //   name: 'CommunityArticleCreate',
      //   _ROLES: [ 'ADMIN' ],
      //   meta: {
      //     perms: [],
      //     title: '发布文章'
      //   }
      // },
      // {
      //   path: 'communityArticleEdit',
      //   component: () => import('@/views/communityManagement/communityArticleEdit'),
      //   name: 'CommunityArticleEdit',
      //   meta: {
      //     // perms: [],
      //     _ROLES: [ 'ADMIN' ],
      //     title: '文章编辑',
      //     noCache: true
      //   },
      //   hidden: true
      // },
      {
        path: 'communityPartner',
        component: () => import('@/views/communityManagement/communityPartner'),
        name: 'CommunityPartner',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [
            'POST /admin/api/third/partner/getCustomerList',
            'POST /admin/api/third/partner/startAudit',
            'GET /admin/api/third/partner/getPartnerInfo'
          ],
          title: '社区合伙人',
          noCache: true
        }
      },
      {
        path: 'communityCommander',
        component: () => import('@/views/communityManagement/communityCommander'),
        name: 'CommunityCommander',
        _ROLES: [ 'ADMIN' ],
        meta: {
          perms: [
            'POST /admin/api/third/partner/getCustomerList',
            'POST /admin/api/third/partner/startAudit',
            'GET /admin/api/third/partner/getPartnerInfo'
          ],
          title: '社区团长',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/newMediaManagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'NewMediaManagement',
    _ROLES: [ 'ADMIN' ],
    meta: {
      // perms: [],
      title: '新媒体',
      icon: 'new-media'
    },
    children: [
      {
        path: 'customerInformation',
        component: () => import('@/views/newMediaManagement/customerInformation'),
        name: 'CustomerInformation',
        perms: [ 'POST /admin/customerscancode/queryCustomerPoolList' ],
        meta: {
          title: '客户信息'
        }
      }
    ]
  },
  {
    path: '/enrollmentManagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'EnrollmentManagement',
    meta: {
      title: '招生管理',
      icon: 'membership'
    },
    children: [
      {
        path: 'admissionInformation',
        component: () => import('@/views/enrollmentManagement/admissionInformation'),
        name: 'AdmissionInformation',
        meta: {
          title: '招生信息',
          perms: [ 'POST /admin/customerscancode/queryCustomerPoolList' ]
        }
      }
    ]
  },
  {
    path: '/nationalMerchants',
    component: Layout,
    alwaysShow: true,
    redirect: 'storeInformation',
    meta: {
      title: '全国商家',
      icon: 'nearbyShop'
    },
    children: [
      {
        path: 'storeInformation',
        name: 'storeInformation',
        component: () => import('@/views/nationalMerchants/storeInformation'),
        meta: {
          title: '门店信息',
          perms: [ 'GET /gaode/poi/queryVicinityShop' ]
        }
      }
    ]
  },
  {
    path: '/custom',
    component: Layout,
    alwaysShow: true,
    redirect: 'designCompany',
    meta: {
      title: '全屋定制',
      icon: 'quanwudingzhi'
    },
    children: [
      {
        path: 'designCompany',
        name: 'designCompany',
        component: () => import('@/views/custom/designCompany'),
        meta: {
          title: '设计公司',
          perms: ['POST /admin/dtsDesignCom', 'DELETE /admin/dtsDesignCom', 'GET /admin/dtsDesignCom{id}', 'GET /admin/dtsDesignCom', 'PUT /admin/dtsDesignCom']
        }
      },
      {
        path: 'designCase',
        name: 'designCase',
        component: () => import('@/views/custom/designCase'),
        meta: {
          title: '设计案例',
          perms: ['POST /admin/dtsDesignCase', 'DELETE /admin/dtsDesignCase', 'GET /admin/dtsDesignCase{id}', 'GET /admin/dtsDesignCase']
        }
      }
    ]
  },
  {
    path: '/tenantOccupancy',
    component: Layout,
    alwaysShow: true,
    redirect: 'tenantManagement',
    meta: { title: '系统管理',
      icon: 'zuhuguanli' },
    children: [
      {
        path: 'tenantManagement',
        name: 'tenantManagement',
        component: () => import('@/views/tenantOccupancy/tenantManagement'),
        _ROLES: [ 'ADMIN' ],
        meta: {
          title: '租户管理',
          perms: ['DELETE /admin/tenant', 'GET /admin/tenant', 'GET /admin/tenant{id}']
        }
      },
      {
        path: 'tenantEdit',
        component: () => import('@/views/tenantOccupancy/tenantManagement/edit'),
        name: 'tenantEdit',
        meta: {
          perms: [ 'PUT /admin/tenant' ],
          title: '租户编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'tenantCreate',
        component: () => import('@/views/tenantOccupancy/tenantManagement/create'),
        name: 'tenantCreate',
        meta: {
          perms: [ 'POST /admin/tenant' ],
          title: '创建租户',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'tenantConfig',
        name: 'tenantConfig',
        component: () => import('@/views/tenantOccupancy/tenantConfig'),
        meta: {
          title: '配置管理',
          perms: ['POST /admin/dtsTenantConfig', 'DELETE /admin/dtsTenantConfig', 'GET /admin/dtsTenantConfig', 'PUT /admin/dtsTenantConfig']
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
  { path: '*', redirect: '/404', hidden: true }
]
