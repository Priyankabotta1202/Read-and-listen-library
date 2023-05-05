import mongoose from "mongoose";
import { userModel } from "../src/models/user.model";
import { bookModel } from "../src/models/book.model";
import { generateHash } from "../src/utils/bcrypt.utils.js";

const seed = async () => {
    await mongoose.connect("mongodb://localhost:27017/library");

    await userModel.insertMany([
        {
            email: "admin@gmail.com",
            fullName: "Jon Snow",
            password: await generateHash("password"),
            isAdmin: true,
        },
        {
            email: "user@gmail.com",
            fullName: "Robb Stark",
            password: await generateHash("password"),
        },
    ]);

    await bookModel.insertMany([
        {
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki",
            genre: "Non-fiction",
            thumbnail:
                "https://cdn.asaha.com/assets/thumbs/29c/29c31e04c5e8eb202e16918b95c55351.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
        {
            title: "A Court of Mist and Fury",
            author: "Sarah J. Maas",
            genre: "Fantasy",
            thumbnail: "https://covers.openlibrary.org/b/id/13325542-M.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
        {
            title: "Rich Dad Poor Dad 1",
            author: "Robert Kiyosaki",
            genre: "Non-fiction",
            thumbnail:
                "https://cdn.asaha.com/assets/thumbs/29c/29c31e04c5e8eb202e16918b95c55351.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
        {
            title: "A Court of Mist and Fury 1",
            author: "Sarah J. Maas",
            genre: "Fantasy",
            thumbnail: "https://covers.openlibrary.org/b/id/13325542-M.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
        {
            title: "Rich Dad Poor Dad 2",
            author: "Robert Kiyosaki",
            genre: "Non-fiction",
            thumbnail:
                "https://cdn.asaha.com/assets/thumbs/29c/29c31e04c5e8eb202e16918b95c55351.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
        {
            title: "A Court of Mist and Fury 2",
            author: "Sarah J. Maas",
            genre: "Fantasy",
            thumbnail: "https://covers.openlibrary.org/b/id/13325542-M.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
        {
            title: "Rich Dad Poor Dad 3",
            author: "Robert Kiyosaki",
            genre: "Non-fiction",
            thumbnail:
                "https://cdn.asaha.com/assets/thumbs/29c/29c31e04c5e8eb202e16918b95c55351.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
        {
            title: "A Court of Mist and Fury 3",
            author: "Sarah J. Maas",
            genre: "Fantasy",
            thumbnail: "https://covers.openlibrary.org/b/id/13325542-M.jpg",
            url: "https://nftstorage.link/ipfs/bafybeicfhtvqhlggicvg6vbvae7ynvbabtx5x3ulhf6rpxrumg3dyzi22m",
        },
    ]);

    process.exit();
};

seed();
