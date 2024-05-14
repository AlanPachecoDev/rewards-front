import { createRouter, createWebHistory } from "vue-router";

import home from "./views/home.vue";
import registerComponent from "./components/registerComponent.vue";
import loginComponent from "./components/loginComponent.vue";
import auth from "./views/auth.vue";
import manageKits from "./views/admins/manageKits.vue";
import createKit from "./views/admins/createKit.vue";
import createKitMaterial from "./views/admins/createKitMaterial.vue";
//rewards
import rewards from "./views/admins/rewards/rewards.vue";
import generateStickers from "./views/admins/rewards/generateStickers.vue";
import generate3DObjects from "./views/admins/rewards/generate3DObjects.vue";
import assignRewardTokit from "./views/admins/rewards/assignRewardToKit.vue";
import generateProduct from "./views/admins/rewards/generateProduct.vue";
import stickersTable from "./views/admins/rewards/stickersTable.vue";
import threeDObjectsTable from "./views/admins/rewards/threeDObjectsTable.vue";
import productsTable from "./views/admins/rewards/productsTable.vue";
// import firebase from 'firebase/app';
// import 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: auth,
      children: [
        {
          path: "/register",
          name: "register",
          component: registerComponent,
        },
        {
          path: "/login",
          name: "login",
          component: loginComponent,
        },
      ],
    },
    {
      path: "/",
      name: "home",
      component: home,
    },
    //Admins
    {
      path: "/admin/manageKits",
      name: "manageKits",
      component: manageKits,
    },
    {
      path: "/admin/createKit",
      name: "createKit",
      component: createKit,
    },
    {
      path: "/admin/createKitMaterial/:kitId",
      name: "createKitMaterial",
      component: createKitMaterial,
      props: true,
    },
    {
      path: "/admin/rewards",
      name: "rewards",
      component: rewards,
      props: true,
    },
    {
      path: "/admin/generateStickers",
      name: "generateStickers",
      component: generateStickers,
      props: true,
    },
    {
      path: "/admin/generate3DObjects",
      name: "generate3DObjects",
      component: generate3DObjects,
      props: true,
    },
    {
      path: "/admin/generateProducts",
      name: "generateProducts",
      component: generateProduct,
      props: true,
    },
    {
      path: "/admin/assignRewardTokit/:rewardId",
      name: "assignRewardTokit",
      component: assignRewardTokit,
      props: true,
    },
    {
      path: "/admin/stickersTable",
      name: "stickersTable",
      component: stickersTable,
      props: true,
    },
    {
      path: "/admin/threeDObjectsTable",
      name: "threeDObjectsTable",
      component: threeDObjectsTable,
      props: true,
    },
    {
      path: "/admin/productsTable",
      name: "productsTable",
      component: productsTable,
      props: true,
    },
  ],
});

// {
//   path: '/admin/edit/:id',
//   name: 'editUser',
//   component: editUser,
//   props: true
// },

// Guardia de navegación para verificar el estado de autenticación

// Hacer que esta redirección forzosa solo se active cuando el usuario no autenticado quiera ir a alguna pestaña que requiera de los
// datos del usuario
// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) {
//     next('/login'); // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a la página de inicio de sesión
//   } else {
//     next(); // De lo contrario, permite que el usuario acceda a la ruta solicitada
//   }
// });

export default router;
