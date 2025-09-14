import { Router } from "@vaadin/router";

document.addEventListener("DOMContentLoaded", () => {
  const routerDiv = document.getElementById("router");

  const router = new Router(routerDiv);

  router.setRoutes([
    {
      path: "/",
      component: "employee-list",
      action: () => import("../pages/employee-list.js"),
    },
    {
      path: "/add",
      component: "employee-add-edit",
      action: () => import("../pages/employee-add-edit.js"),
    },
    {
      path: "/edit/:id",
      component: "employee-add-edit",
      action: () => import("../pages/employee-add-edit.js"),
    },
    {
      path: "(.*)",
      redirect: "/",
    },
  ]);

  console.log("Vaadin Router initialized successfully!");
});
