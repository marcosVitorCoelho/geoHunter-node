import { app } from './app'
import 'dotenv/config'
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

process.on('SIGINT', () => {
    server.close()
    console.log("App finalizado")
})