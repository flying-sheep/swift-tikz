import { PdfTeXEngine } from './SwiftLatex/PdfTeXEngine.js'

async function main() {
	const engine = new PdfTeXEngine()
	await engine.loadEngine()

	engine.writeMemFSFile(
		'main.tex',
		'\\documentclass{article}\n\\begin{document}\nHi!\n\\end{document}\n',
	)
	engine.setEngineMainFile('main.tex')
	const r = await engine.compileLaTeX()

	if (r.status !== 0) {
		console.error(r)
		return
	}

	const blob = new Blob([r.pdf], { type: 'application/pdf' })
	const url = URL.createObjectURL(blob)
	const obj = document.createElement('object')
	obj.type = 'application/pdf'
	obj.style.width = '100%'
	obj.style.height = '100%'
	obj.data = url
	document.body.appendChild(obj)
}

await main()
