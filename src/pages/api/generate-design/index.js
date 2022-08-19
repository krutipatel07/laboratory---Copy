import axios from "axios"

export default async function handler(req, res) {
    try{
        // api call to generate designs
       const data = await axios.post('https://12tw3cl5sh.execute-api.ca-central-1.amazonaws.com/Prod/generate' , 
       req.body, 
        {
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
            }   
        })
        res.status(201).json({ success: true, data: data.data})
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }}