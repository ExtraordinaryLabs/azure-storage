import dotenv from 'dotenv'
import fs from 'fs'
import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from '@azure/storage-blob'

dotenv.config()

const upload = async (req, res) => {
    const {AZURE_STORAGE_CONNECTION} = process.env
    const blobService = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION)
    
    const containerName = "upstationimages"
    const containerClient = blobService.getContainerClient(containerName)
    const containerExists = await containerClient.exists()
    if(!containerExists){
        await containerClient.create()
    }
    const blobName = req.file.originalname
    const blobClient = containerClient.getBlockBlobClient(blobName)

    const fileStream = fs.createReadStream(req.file.path)
    const fileSize = fs.statSync(req.file.path).size

    const uploadOptions = { bufferSize: 4 * 1024 * 1024, maxBuffers: 20 }
    await blobClient.uploadStream(fileStream, uploadOptions)

    fs.unlinkSync(req.file.path)

    return res.status(200).json({message: `File uploaded to Azure Blob storage ${blobName}`})
}

export default { upload }