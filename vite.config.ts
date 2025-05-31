import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'
import tailwindcss from '@tailwindcss/vite'

// Import all themes
// import * as themes from './src/theme'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    ui({
      ui: {
        // Pink theme configuration with softer appearance
        colors: {
          primary: 'pink',
          secondary: 'rose',
          success: 'emerald',
          info: 'blue',
          warning: 'amber',
          error: 'red',
          neutral: 'slate'
        },
        // Global theme overrides
        global: {
          body: 'bg-soft text-soft-primary antialiased',
          html: 'bg-soft'
        },
        // Enhanced component theming for softer appearance
        app: {
          slots: {
            base: 'bg-soft min-h-screen text-soft-primary'
          }
        },
        tabs: {
          slots: {
            root: 'relative flex items-center gap-2',
            list: 'sticky top-0 z-19 flex p-1 group bg-soft-elevated/80 backdrop-blur-sm rounded-lg border border-gray-100 dark:border-gray-700',
          },
        },
        button: {
          variants: {
            color: {
              primary: {
                base: 'text-white bg-pink-500 hover:bg-pink-600 disabled:bg-pink-500 aria-disabled:bg-pink-500 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 ring-pink-500/75'
              }
            }
          }
        },
        card: {
          slots: {
            base: 'bg-soft-elevated border border-gray-100 dark:border-gray-600 rounded-lg shadow-sm',
            header: 'px-4 py-3 border-b border-gray-100 dark:border-gray-600 bg-soft-subtle',
            body: 'px-4 py-3 bg-soft-elevated',
            footer: 'px-4 py-3 border-t border-gray-100 dark:border-gray-600 bg-soft-subtle'
          }
        },
        modal: {
          slots: {
            overlay: 'bg-gray-100/60 dark:bg-gray-700/60 backdrop-blur-sm',
            base: 'bg-soft-elevated border border-gray-100 dark:border-gray-600 shadow-xl'
          }
        },
        form: {
          slots: {
            base: 'space-y-4 bg-soft-surface p-4 rounded-lg border border-gray-100 dark:border-gray-600'
          }
        },
        input: {
          slots: {
            base: 'bg-soft-elevated border-gray-200 dark:border-gray-500 text-soft-primary placeholder-gray-400 dark:placeholder-gray-400'
          }
        },
        textarea: {
          slots: {
            base: 'bg-soft-elevated border-gray-200 dark:border-gray-500 text-soft-primary placeholder-gray-400 dark:placeholder-gray-400'
          }
        },
        container: {
          base: 'bg-soft'
        },
        table: {
          slots: {
            base: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700',
            th: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold',
            td: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
            tr: 'hover:bg-gray-50 dark:hover:bg-gray-700',
            tbody: 'divide-y divide-default [&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary',
          }
        }
      },
      autoImport: {
        imports: ['vue'],
      },
      components: {
        dirs: ['./src/components'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: ['localweb.phuongy.works'],
  },
})
