export enum EngineStatus {
	Init = 1,
	Ready = 2,
	Busy = 3,
	Error = 4,
}

export class CompileResult {
	pdf: Uint8Array
	status: number
	log: string
	constructor()
}

export class Engine {
	latexWorker: Worker
	latexWorkerStatus: EngineStatus
	constructor()
	loadEngine(): Promise<void>
	isReady(): boolean
	checkEngineStatus(): void
	setEngineMainFile(filename: string): void
	writeMemFSFile(filename: string, srccode?: ArrayBuffer | string): void
	makeMemFSFolder(folder: string): void
	setTexliveEndpoint(url: string): void
	closeWorker(): void
}
