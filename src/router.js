import Vue from 'vue';
import Router from 'vue-router';
import requireAuth from './services/requireAuth';
import localStorageService from './services/localStorage';
import Home from './views/Home.vue';
import Username from './views/Username.vue';
import Profile from './views/Profile.vue';
import Blog from './views/blog/index.vue';
import Interview from './views/interview/index.vue';
// import Login from './views/Login.vue';
// import Register from './views/Register.vue';
// import EmailVerification from './views/EmailVerification.vue';
// import ProfileUpdate from './views/ProfileUpdate.vue';
// import QuestionUpdate from './views/QuestionUpdate.vue';
// import AskQuestion from './views/AskQuestion.vue';
// import QuestionDetail from './views/QuestionDetail.vue';
// import changePassword from './views/changePassword.vue';
// import Tag from './views/Tag.vue';
// import AppMyQuestion from '@/components/AppMyQuestion.vue';
// import AppMyAnswer from '@/components/AppMyAnswer.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      beforeEnter(to, from, next) {
        if (to.name === 'login' && localStorageService.getToken()) {
          return next(from.path);
        }
        return next();
      },
      component: () => import('./views/Login.vue'),
      meta: {
        layout: 'login',
      },
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter(to, from, next) {
        if (to.name === 'register' && localStorageService.getToken()) {
          return next(from.path);
        }
        return next();
      },
      component: () => import('./views/Register.vue'),
      meta: {
        layout: 'login',
      },
    },
    {
      path: '/auth/account/user/:username/recover/:hash',
      name: 'resetPassword',
      component: () => import('./views/Login.vue'),
      meta: {
        layout: 'login',
      },
    },
    {
      path: '/auth/user/:username/verify/:hash',
      name: 'emailVerification',
      component: () => import('./views/EmailVerification.vue'),
      meta: {
        layout: 'login',
      },
    },
    {
      path: '/@:username',
      component: Username,
      children: [
        {
          path: '/',
          component: Profile,
          meta: {
            layout: 'profile',
          },
        },
        {
          path: 'profile/update',
          beforeEnter: requireAuth,
          component: () => import('./views/ProfileUpdate.vue'),
          meta: {
            layout: 'profile',
          },
        },
        {
          path: 'profile/password',
          beforeEnter: requireAuth,
          component: () => import('./views/changePassword.vue'),
          meta: {
            layout: 'profile',
          },
        },
        {
          path: 'question',
          component: () => import('./components/AppMyQuestion.vue'),
          meta: {
            layout: 'profile',
          },
        },
        {
          path: 'answer',
          component: () => import('./components/AppMyAnswer.vue'),
          meta: {
            layout: 'profile',
          },
        },
      ],
    },
    {
      path: '/addArticle',
      name: 'addQuestion',
      beforeEnter: requireAuth,
      component: () => import('./views/AskQuestion.vue'),
    },
    {
      path: '/question/:slug',
      name: 'questionDetail',
      component: () => import('./views/QuestionDetail.vue'),
    },
    {
      path: '/question/update/:slug',
      name: 'questionUpdate',
      component: () => import('./views/QuestionUpdate.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/tagss',
      name: 'tag',
      component: () => import('./views/Tag.vue'),
      meta: {
        layout: 'login',
      },
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      props: route => ({ query: route.query.q }),
    },
    {
      path: '/questions/tagged/:slug',
      name: 'tagQuestion',
      component: Home,
    },
    {
      path: '/blogs',
      component: Blog,
      children: [
        {
          path: '/',
          component: () => import('./views/blog/list.vue'),
          meta: {
            layout: 'blog',
          },
        },
        {
          path: 'add',
          component: () => import('./views/blog/add.vue'),
          meta: {
            layout: 'blog',
          },
          beforeEnter: requireAuth,
        },
        {
          path: 'update/:slug',
          component: () => import('./views/blog/update.vue'),
          beforeEnter: requireAuth,
          meta: {
            layout: 'blog',
          },
        },
        {
          path: ':slug',
          component: () => import('./views/blog/detail.vue'),
          meta: {
            layout: 'blog',
          },
        },
      ],
    },
    {
      path: '/tags',
      component: Interview,
      children: [
        {
          path: '/',
          component: () => import('./views/interview/tag.vue'),
          meta: {
            layout: 'login',
          },
        },
        {
          path: 'tag/:slug',
          name: 'interviewTag',
          component: () => import('./views/interview/question.vue'),
          meta: {
            layout: 'login',
          },
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue'),
      meta: {
        layout: 'login',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        layout: 'login',
      },
    },
    // {
    //   path: '/services',
    //   name: 'service',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Service.vue'),
    // },
    // {
    //   path: '/technologies',
    //   name: 'technology',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Technology.vue'),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

// router.beforeResolve((to, from, next) => {
//   // If this isn't an initial page load.
//   if (to.name) {
//     // Start the route progress bar.
//     NProgress.start();
//   }
//   next();
// });

// router.afterEach((to, from) => {
//   // Complete the animation of the route progress bar.
//   NProgress.done();
// });

export default router;
