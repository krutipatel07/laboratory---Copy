import axios from "axios"

export default async function handler(req, res) {
    try{
        // api call to generat4e designs
        console.log(req.body.userData.constraints["1"]);
       const data = await axios.post('https://qq0e9ltr8k.execute-api.ca-central-1.amazonaws.com/Prod/generate' , 
       req.body, 
        {
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
            }   
        })
        console.log(data.data);
        res.status(201).json({ success: true, data: data.data})
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }}