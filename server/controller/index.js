import dotenv from 'dotenv'
import fs from 'fs'
import { BlobServiceClient } from '@azure/storage-blob'

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

    const fileContent = fs.readFileSync(req.file.path);

    await blobClient.uploadData(fileContent);

    fs.unlinkSync(req.file.path)

    return res.status(200).json({message: `File uploaded to Azure Blob storage ${blobName}`})
}

export default { upload }