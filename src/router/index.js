import { createWebHistory, createRouter } from "vue-router";
import middleware from "@/router/middleware";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      layout: "home",
      title: "Home",
      breadCrumb: "Home",
    },
  },
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("@/views/Feedback.vue"),
    meta: {
      layout: "home",
      title: "Feedback",
      breadCrumb: "Feedback",
    },
  },
  {
    path: "/products",
    component: () => import("@/views/products/Index.vue"),
    meta: {
      layout: "home",
      title: "Products",
      breadCrumb: "Products",
    },
    children: [
      {
        path: "",
        name: "products",
        component: () => import("@/views/products/All.vue"),
      },
      {
        path: ":page?",
        component: () => import("@/views/products/All.vue"),
      },
      {
        path: ":slug",
        name: "product.show",
        props: true,
        component: () => import("@/views/products/Show.vue"),
      },
    ],
  },
  {
    path: "/cabinet",
    component: () => import("@/views/cabinet/Index.vue"),
    beforeEnter: middleware.user,
    meta: {
      layout: "home",
      title: "Cabinet",
      breadCrumb: "Cabinet",
    },
    children: [
      {
        path: "",
        name: "cabinet",
        component: () => import("@/views/cabinet/Home.vue"),
      },
      {
        path: "settings",
        name: "cabinet.settings",
        component: () => import("@/views/cabinet/Settings.vue"),
        meta: {
          title: "Settings",
          breadCrumb: "Settings",
        },
      },
    ],
  },
  {
    path: "/checkout",
    name: "order.checkout",
    component: () => import("@/views/order/Checkout.vue"),
    meta: {
      layout: "home",
      title: "Checkout page",
      breadCrumb: "Checkout",
    },
  },
  {
    path: "/summary",
    name: "order.summary",
    component: () => import("@/views/order/Summary.vue"),
  },
  {
    path: "/login",
    name: "auth.login",
    beforeEnter: middleware.guest,
    meta: {
      layout: "home",
      title: "Login",
      breadCrumb: "Login",
    },
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/signup",
    name: "auth.signup",
    beforeEnter: middleware.guest,
    meta: {
      layout: "home",
      title: "Signup",
      breadCrumb: "Signup",
    },
    component: () => import("@/views/auth/Signup.vue"),
  },
  {
    path: "/forgot",
    name: "auth.forgot",
    beforeEnter: middleware.guest,
    meta: {
      layout: "home",
      title: "Reset password",
      breadCrumb: "Reset password",
    },
    component: () => import("@/views/auth/Forgot.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      layout: "home",
      title: "404 - Page not found",
      breadCrumb: "404 - Page not found",
    },
  },
  {
    path: "/admin",
    component: () => import("@/views/admin/Index.vue"),
    beforeEnter: middleware.admin,
    meta: {
      layout: "admin",
      title: "Admin",
      breadCrumb: "Admin",
    },
    children: [
      {
        path: "",
        name: "admin",
        component: () => import("@/views/admin/Home.vue"),
      },
      {
        path: "users/:page?",
        component: () => import("@/views/admin/users/Index.vue"),
        meta: {
          title: "Users",
          breadCrumb: "Users",
        },
        children: [
          {
            path: "",
            name: "admin.users",
            component: () => import("@/views/admin/users/All.vue"),
          },
          {
            path: ":id",
            name: "admin.user.show",
            component: () => import("@/views/admin/users/Show.vue"),
            props: true,
          },
        ],
      },
      {
        path: "products",
        component: () => import("@/views/admin/products/Index.vue"),
        meta: {
          title: "Products",
          breadCrumb: "Products",
        },
        children: [
          {
            path: "",
            name: "admin.products",
            component: () => import("@/views/admin/products/All.vue"),
          },
          {
            path: ":id",
            name: "admin.product.show",
            props: true,
            component: () => import("@/views/admin/products/Show.vue"),
          },
          {
            path: "categories",
            component: () =>
              import("@/views/admin/products/categories/Index.vue"),
            meta: {
              title: "Categories",
              breadCrumb: "Categories",
            },
            children: [
              {
                path: ":page?",
                name: "admin.products.categories",
                component: () =>
                  import("@/views/admin/products/categories/All.vue"),
              },
              {
                path: ":slug",
                name: "admin.products.categories.show",
                props: true,
                component: () =>
                  import("@/views/admin/products/categories/Show.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "",
});

export default router;
