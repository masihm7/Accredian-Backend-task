const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Bee!");
});

app.post("/referals", async (req, res) => {

  const { userName, Mobileno, refereeName, refereeEmail } = req.body;

  try {
    if (!userName || !Mobileno || !refereeName || !refereeEmail) {
      console.log("Validation Failed: Missing fields");
      return res.status(400).json({ message: "All fields are required!" });
    }
    const newReferral = await prisma.referral.create({
      data: { userName, Mobileno, refereeName, refereeEmail },
    });
    res.status(201).json({ message: "Referral Send!", REfid: newReferral.id });

  } catch (error) {
    console.error("Error creating referral:", error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/referals", async (req, res) => {
  try {
    const allReferrals = await prisma.referral.findMany();
    res.status(200).json(allReferrals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3300, () => {
  console.log("App running on http://localhost:3300");
});
