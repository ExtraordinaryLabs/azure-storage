import dotenv from 'dotenv'
import { BlobServiceClient } from '@azure/storage-blob'

const upload = async (req, res) => {
    const {AZURE_STORAGE_CONNECTION} = process.env
    const blobService = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION)
    
    const containerName = "upstationimages";
    const containerClient = blobService.getContainerClient(containerName);
    const containerRespose = await containerClient.create()
    return res.status(200).json({message: `Create container ${containerRespose}`})
}

export default { upload }