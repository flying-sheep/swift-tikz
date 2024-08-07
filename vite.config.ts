import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'

export default {
	plugins: [react(), commonjs()],
} satisfies UserConfig
