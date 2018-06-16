import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
import groupsAdd from '@/views/Administrative/structures/groups/add'
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

//export newArrRouterMap
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'),name:'login',type:'common', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'),type:'common', hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    type:'common',
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      name: 'home',
      meta: { title: '首页', icon: 'home', noCache: true ,requireAuth:true}
    }]
  },
  {
    path:'/home',
    component:Layout,
    children:[
      {
        path: '/refresh',
        component: () => import('@/components/refresh/index'),
        name: 'refresh'
      }
    ]
  },
  {
    path:'/home',
    component:Layout,
    name:'Charts',
    meta:{title:'图标展示',icon:'example',alwaysShow: true},
    children: [
      {
        path:'charts/line',
        name:'chartsLine',
        component:()=> import('@/views/charts/lineMarker'),
        meta:{title:'线性图标',icon:'table',module:'Administrative',menu:'charts',requireAuth:true}
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    //redirect: '/home/table',
    name: 'Example',
    meta: { title: '系统配置', icon: 'systemAdmin' },
    children: [
      {
        path: 'menu/list',
        name: 'menuList',
        component: () => import('@/views/Administrative/system/menu/list'),
        meta: { title: '菜单管理', icon: 'menuAdmin' ,module: 'Administrative', menu: 'menu',requireAuth:true}
      },
      {
        path: 'menu/edit/:id',
        name: 'menuEdit',
        component: () => import('@/views/Administrative/system/menu/edit'),
        meta: { title: '菜单编辑', icon: 'table' ,module: 'Administrative', menu: 'menu',requireAuth:true}
      },
      {
        path: 'menu/add',
        name: 'menuAdd',
        component: () => import('@/views/Administrative/system/menu/add'),
        meta: { title: '添加菜单', icon: 'table' ,module: 'Administrative', menu: 'menu',requireAuth:true}
      },
      {
        path: 'config/list',
        name: 'configList',
        component: () => import('@/views/Administrative/system/config/list'),
        meta: { title: '系统参数', icon: 'configList' ,module: 'Administrative', menu: 'config',requireAuth:true}
      },
      {
        path: 'config/add',
        name: 'configAdd',
        component: () => import('@/views/Administrative/system/config/add'),
        meta: { title: '参数添加', icon: 'configAdd' ,module: 'Administrative', menu: 'config',requireAuth:true}
      },
      {
        path: 'parameter/list/:id',
        name: 'parameterList',
        component: () => import('@/views/Administrative/system/parameter/list'),
        meta: { title: '参数项列表', icon: 'configAdd' ,module: 'Administrative', menu: 'parameter',requireAuth:true,noCache:true}
      },
      {
        path: 'parameter/add/:id',
        name: 'parameterAdd',
        component: () => import('@/views/Administrative/system/parameter/add'),
        meta: { title: '参数项添加', icon: 'configAdd' ,module: 'Administrative', menu: 'parameter',requireAuth:true}
      },
      {
        path: 'rule/list',
        name: 'ruleList',
        component: () => import('@/views/Administrative/system/rule/list'),
        meta: { title: '权限规则', icon: 'ruleList' ,module: 'Administrative', menu: 'rule',requireAuth:true}
      },
      {
        path: 'rule/add',
        name: 'ruleAdd',
        component: () => import('@/views/Administrative/system/rule/add'),
        meta: { title: '添加权限', icon: 'tree' ,module: 'Administrative', menu: 'rule',requireAuth:true}
      },
      {
        path: 'rule/edit/:id',
        name: 'ruleEdit',
        component: () => import('@/views/Administrative/system/rule/edit'),
        meta: { title: '编辑权限', icon: 'tree' ,module: 'Administrative', menu: 'rule',requireAuth:true}
      }
    ]



  },
  {
    path:'/home',
    component:Layout,
    name:'SystemConfig',
    meta:{title:'组织架构', icon: 'tree'},
    children:[
      {
        path:'position/list',
        name:'positionList',
        component: () => import('@/views/Administrative/structures/position/list'),
        meta:{title:'岗位管理',icon:'postAdmin',module: 'Administrative', menu: 'position',requireAuth:true},
        children:[
          {
            path:'structures/list',
            name:'structuresList',
            component: () => import('@/views/Administrative/structures/structures/list'),
            meta:{title:'部门管理',icon:'departmentAdmin',module: 'Administrative', menu: 'structures',requireAuth:true}
          },
        ]
      },
      {
        path:'groups/list',
        name:'groupsList',
        component: () => import('@/views/Administrative/structures/groups/list'),
        meta:{title:'用户组管理',icon:'groupsList',module: 'Administrative', menu: 'groups',requireAuth:true}
      },
      {
        path: 'groups/add',
        name: 'groupsAdd',
        component: groupsAdd,
        meta:{title:'添加用户组',module:'Administrative',requireAuth:true}
      },
      {
        path:'mechanism/list',
        name:'mechanismList',
        component: ()=> import('@/views/Administrative/structures/mechanism/list'),
        meta:{title:'机构列表',icon:'mechanismList',module:'Administrative',menu:'mechanism',requireAuth:true}
      },
      {
        path:'mechanism/add',
        name:'mechanismAdd',
        component: ()=> import('@/views/Administrative/structures/mechanism/add'),
        meta:{title:'添加机构',module:'Administrative',menu:'mechanism',requireAuth:true}
      },
      {
        path:'mechanism/edit/:id',
        name:'mechanismEdit',
        component: ()=> import('@/views/Administrative/structures/mechanism/edit'),
        meta:{title:'机构列表编辑',module:'Administrative',menu:'mechanism',requireAuth:true}
      },
      {
        path:'commission/list',
        name:'commissionList',
        component:()=> import('@/views/Administrative/structures/commission/list'),
        meta:{title:'机构佣金列表',icon:"commissionList",module:'Administrative',menu:'commission',requireAuth:true}
      },
      {
        path:'commission/edit/:id',
        name:'commissionEdit',
        component:()=> import('@/views/Administrative/structures/commission/edit'),
        meta:{title:'机构佣金列表编辑',module:'Administrative',menu:'commission',requireAuth:true}
      },
      {
        path:'commission/add',
        name:'commissionAdd',
        component:()=> import('@/views/Administrative/structures/commission/add'),
        meta:{title:'机构佣金列表添加',module:'Administrative',menu:'commission',requireAuth:true}
      }

    ]
  },
  {
    path:'/home',
    component:Layout,
    name:'personnel',
    meta:{ title:'代理人管理',icon: 'example' },
    children:[
      {
        path:'users/list',
        name:'usersList',
        component:()=>import('@/views/Administrative/personnel/users/list'),
        meta:{ title:'代理人列表',icon:'usersList',module:'Administrative',menu:'users',requireAuth:true }
      },
      {
        path:'relation/list/:id',
        name:'relationUserList',
        component: ()=> import('@/views/Administrative/personnel/relation/list'),
        meta:{title:'马甲列表',icon:'usersList',module:'Administrative',menu:'relation',requireAuth:true,noCache:true}
      },
      {
        path:'users/add',
        name:'usersAdd',
        component:()=>import('@/views/Administrative/personnel/users/add'),
        meta:{ title:'添加代理人',icon:'usersList',module:'Administrative',menu:'users',requireAuth:true }
      },
          {
            path:'relation/add/:pid',
            name:'relationUserAdd',
            component: ()=> import('@/views/Administrative/personnel/relation/add'),
            meta:{title:'关联添加',module:'Administrative',menu:'relation',requireAuth:true}
          }
    ]
  },
  // {
  //   path:'/home',
  //   component:Layout,
  //   name:'personnel',
  //   meta:{title:'代理人管理', icon: 'example'},
  //   children:[
  //     {
  //       path: 'users/list',
  //       name: 'usersList',
  //       component: () => import('@/views/Administrative/personnel/users/list'),
  //       meta: {title: '代理人列表', icon: 'usersList', module: 'Administrative', menu: 'users',requireAuth:true}
  //     },
  //     {
  //       path:'add/list',
  //       name:'usersAdd',
  //       component: () => import('@/views/Administrative/personnel/users/add'),
  //       meta:{title: '添加账户',icon:'example',module:'Administrative',menu:'users',requireAuth:true}
  //     },
  //     {
  //       path:'users/edit/:id',
  //       name:'usersEdit',
  //       component: () => import('@/views/Administrative/personnel/users/edit'),
  //       meta:{title:'编辑账户',icon:'example',module:'Administrative',menu:'users',requireAuth:true}
  //     },
  //     {
  //       path:'relation/list/:id',
  //       name:'relationUserList',
  //       component: ()=> import('@/views/Administrative/personnel/relation/list'),
  //       meta:{title:'马甲列表',module:'Administrative',menu:'relation',requireAuth:true,noCache:true}
  //     },
  //     {
  //       path:'relation/add/:pid',
  //       name:'relationUserAdd',
  //       component: ()=> import('@/views/Administrative/personnel/relation/add'),
  //       meta:{title:'关联添加',module:'Administrative',menu:'relation',requireAuth:true}
  //     }
  //   ]
  // },
  {
    path:'/home',
    component:Layout,
    name:'SystemRule',
    meta:{title:'产品管理', icon: 'example'},
    children:[
      {
        path:'product/list',
        name:'productList',
        component: () => import('@/views/Administrative/product/list'),
        meta: {title: '产品列表', icon: 'example', module: 'Administrative', menu: 'product',requireAuth:true},
      },
    ]
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'form/table',
        name: 'formTable',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' ,module: 'Administrative', menu: 'formTable',requireAuth:true}
      }
    ]
  },
  { path: '*', redirect: '/404',type:'common', hidden: true }
];


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

