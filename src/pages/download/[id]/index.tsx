import RenderFile from '@components/RenderFile'
import axios from 'axios'
import { IFile } from 'libs/types'
import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import fileDownload from 'js-file-download'


const index: NextPage<{file: IFile}> = ({file: {format, name, sizeInBytes, id}}) => {
    
    const handleDownload = async () => {
      const {data} = await  axios.get(`http://localhost:8000/api/files/${id}/download`, {
            responseType: 'blob'
        })

        fileDownload(data, name)

    }
    
    return (
        <div className='flex felx-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96 '>
           {!id && <span>
               File does not exist
           </span> }
           {
               id && <>
               <>
               <img src="/images/file-download.png" className='w-16 h-16' />
               <h1 className='text-xl'>Your file is ready to be downloaded</h1>
               <RenderFile file={{format, name, sizeInBytes}} />
               <button onClick={handleDownload} className='w-44 focus:outline-none bg=gray-900 p-2 my-5 rounded-md'>Download</button>
               </>
               </>
           }  
        </div>
    )
}

export async function GetServerSideProps(context: GetServerSidePropsContext) {
    let file;
    try {
       const {data} = await axios.get(`http://localhost:8000/api/files/${context.query.id}`)
        file = data
    } catch (error) {
        console.log(error.response.data)
        file =  {}
    }

    return {
        props: {
            file,
        }
    }
}

export default index
