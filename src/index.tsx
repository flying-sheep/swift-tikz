import { createRoot } from 'react-dom/client'
import SwiftLaTeX from './components/SwiftLaTeX'

document.addEventListener('DOMContentLoaded', async () => {
	const node = document.getElementById('root')
	if (!node) return
	const root = createRoot(node)
	root.render(
		<SwiftLaTeX tex="\documentclass{article}\begin{document}Hi!\end{document}" />,
	)
})
