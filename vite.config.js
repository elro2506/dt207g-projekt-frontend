import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                menu: 'menu.html',
                admin: 'admin.html',
                login: 'login.html',
                cats: 'cats.html'
            }
        }
    }
})