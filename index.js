import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "fs/promises";
import cors from "cors";


const app = express();
const upload = multer();
const ai = new GoogleGenAI({});

// inisialisasi model AI
const geminniModels = {
    text: "gemini-2.0-flash",
    image: "gemini-2.0-flash",
    audio: "gemini-2.0-flash",
    document: "gemini-2.0-flash",
}

// inisialisasi aplikasi backend/server
app.use(cors()); // app.use(cors()); .use --> panggil/bikin middleware
// app.use() --> untuk memanggil middleware
app.use(express.json());

// inisialisasi route-nya get, post, put, delete

app.post('/generate-text', async (req, res) => {
    // handle request diterima
    const { body } = req;

    // guard clause
    if (!body) {
        // jika body tidak ada isinya
        res.status(400).json({ message: "Tidak ada yang dikirim" });
        return;
    }

    // satpam cek tipe data
    if (typeof body !== "object") {
        res.status(400).json({ message: "Tipe data tidak sesuai" });
        return;
    }

    const { message } = body;

    if (!message || typeof message !== "string") {
        res.status(400).json({ message: "Pesan tidak sesuai" });
        return;
    }


    // logic dimulai disini
    const response = await ai.models.generateContent({
        contents: message,
        model: geminniModels.text,
    });

    res.status(200).json({
        reply: response.text
    });
});


// async function main() {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "Halo,apa kabar?",
//     });
//     console.log(response.text);
// }

// await main();

const port = 3000;

app.listen(port, () => {
    console.log(`I LOVE YOU`, port);
}); 