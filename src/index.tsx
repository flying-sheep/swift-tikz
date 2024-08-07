import { createRoot } from 'react-dom/client'
import App from './components/App'
import { StrictMode } from 'react'

document.addEventListener('DOMContentLoaded', async () => {
	const node = document.getElementById('root')
	if (!node) return
	const root = createRoot(node)
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
})
