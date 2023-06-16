const upload = async(req, res) => {
    const image = req.body
    return res.status(200).json({message: 'Test'})
}

export default { upload }