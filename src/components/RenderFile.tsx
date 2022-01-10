import { sizeInMb } from 'libs/sizeInMB'
import { IFile } from 'libs/types'
import React, { FunctionComponent } from 'react'

const RenderFile: FunctionComponent<{ file: IFile}> = ({file}) => {
    return (
        <div className='flex items-center w-full p-4 my-2  '>
            <img src={`/images/${file.format}.png`} className='w-14 h-14' />
            <span className='mx-2'>
                {file.name}
            </span>
            <span className='ml-auto'>
                {sizeInMb(file.sizeInBytes)}
            </span>
        </div>
    )
}

export default RenderFile
