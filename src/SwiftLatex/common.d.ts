export enum EngineStatus {
	Init = 1,
	Ready = 2,
	Busy = 3,
	Error = 4,
}

export type CompileResult =
	| {
			pdf: Uint8Array
			status: 0
			log: string
	  }
	| {
			pdf: undefined
			status: 1
			log: string
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
