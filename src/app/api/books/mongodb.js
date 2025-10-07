import { MongoClient } from "mongodb"

const uri = process.env.URIMONGOLOCAL
let client
let clientPromise

if(!uri){
    throw new Error("Defina URIMONGOLOCAL no arquivo .env.local")
}

export async function connectDB(){
    if(!client){
        client = new MongoClient(uri)
        clientPromise = client.connect()
    }
    
    await clientPromise
    return client.db("booksDB")
}

export async function getBooksCollection(){
    const db = await connectDB()
    return db.collection("books")
}
