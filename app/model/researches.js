





// const mongoose = require("mongoose");

// const researchSchema = mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     catagory: { type: String, required: true },
//     researcher: { type: String, required: true },
//     abstract: { type: String, required: true },
//     image: { type: String, required: true }, 
//     date: { type: Date, required: true },
//     fullDescription: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// const Researche = mongoose.models.researches || mongoose.model("researches", researchSchema);
// module.exports = Researche;





// app/model/researches.js (or .ts if using TypeScript)

import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // ✅ fixed typo
    researcher: { type: String, required: true },
    researcherEmail: { type: String, required: true }, // ✅ added to link research to user
    abstract: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
    fullDescription: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // optional now
  },
  { timestamps: true }
);

export default mongoose.models.Researche || mongoose.model("Researche", researchSchema);
