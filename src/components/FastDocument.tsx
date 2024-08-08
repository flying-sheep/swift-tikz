import { useCallback, useState, type FC } from 'react'
import { Document, Page, type DocumentProps } from 'react-pdf'

const FastDocument: FC<DocumentProps> = ({ file, ...props }) => {
	const [loadedFile, setLoadedFile] = useState<
		DocumentProps['file'] | undefined
	>(undefined)

	const onDocumentLoadSuccess = useCallback<
		NonNullable<DocumentProps['onLoadSuccess']>
	>(() => setLoadedFile(file), [file])

	const isLoading = loadedFile !== file

	return (
		<>
			{loadedFile && (
				<Document // display previously loaded file, hidden when new file is ready
					file={loadedFile}
					className={isLoading ? null : 'hidden'}
					{...props}
				>
					<Page pageNumber={1} />
				</Document>
			)}
			<Document // load and display new file, hidden while loading
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				className={isLoading ? 'hidden' : null}
				{...props}
			>
				<Page
					pageNumber={1}
					//onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
				/>
			</Document>
		</>
	)
}

export default FastDocument
