/**
 * Application entry point.
 * Registers Vue plugins: Router, i18n.
 * Imports global CSS before mounting.
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// Global styles (order matters: reset → variables → components → sections)
import './assets/styles/main.css'
import './assets/styles/components.css'
import './assets/styles/sections.css'

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
