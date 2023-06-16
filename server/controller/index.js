import dotenv from 'dotenv'
import { BlobServiceClient } from '@azure/storage-blob'

const upload = async(req, res) => {
    const image = req.body
    const blogSas = process.env.BLOBSAS
    const containerName = "demo";
    const containerClient = BlobServiceClient.getContainerClient(containerName);
    try{
        const promises = [];
        for(let i of req.body){
            const blockBlobClient = containerClient.getBlockBlobClient(i.name)
            promises.push(blockBlobClient)
        }
        await Promise.all(promises)
    }
    catch(error){
        console.log({error})
    }
    return res.status(200).json({message: 'Test'})
}

export default { upload }