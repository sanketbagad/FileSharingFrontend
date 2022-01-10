import Delete from "@components/Delete";
import DownloadFile from "@components/DownloadFile";
import DropZoneComponent from "@components/Dropzone";
import RenderFile from "@components/RenderFile";
import EmailForm from "@components/EmailForm"
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const [file, setFile] =  useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");
  
  const handleUpload = async () => {
   
    if(uploadState === "Uploaded") return;
    setUploadState("Uploading");
   
    const formdata = new FormData();
    formdata.append("myFile", file)
    try {
      const {data} =  await axios({
        method: "post",
        data: formdata,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setDownloadPageLink(data.downloadPageLink)
      setId(data.id)

    } catch (error) {
      console.log(error.response.data)
      setUploadState("Upload Failed")
    }
  }

  const resetComponent = () => {
    setFile(null)
    setDownloadPageLink(null)
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium">Got a File? Just Share It Like Fake News😜</h1>
      <div className="w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center">
      {!downloadPageLink && <DropZoneComponent setFile={setFile} />}
      { file && (
        <RenderFile file={{
          format: file.type.split("/")[1],
          name: file.name,
          sizeInBytes: file.size 
        }} />
      )}

      {
        !downloadPageLink && file && (
          <button onClick={handleUpload} className="w-44 focus:outline-none bg=gray-900 p-2 my-5 rounded-md">
          {uploadState}
        </button>
        )
      }

      {
        downloadPageLink && (
          <div className="p-2 text-center">
         <DownloadFile downloadPageLink={downloadPageLink} />
          <EmailForm />
          <button onClick={resetComponent} className="w-44 focus:outline-none bg=gray-900 p-2 my-5 rounded-md">
            Upload New File
          </button>
          </div>
        )
      }
      </div>
    </div>
  );
}
