import { createRouter, createWebHistory } from "vue-router"
// pages
import Authorization from "@/pages/Authorization"
import Main from "@/pages/Main"


const routes = [
    {
        path: "/",
        component: Main
    },

    {
        path: "/login",
        component: Authorization
    }
]


const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router