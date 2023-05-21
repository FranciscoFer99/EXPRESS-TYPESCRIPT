import express from "express";
import * as diarySevices from "../services/diaryServices";
import toNewDiaryEntry from '../utils'

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diarySevices.getentriesWithoutSensitiveInfo());
});

router.get("/:id", (req, res) => {
  const diary = diarySevices.findById(Number(req.params.id));
  return diary != null ? res.send(diary) : res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const newDiaryentry = toNewDiaryEntry(req.body);

    const addDiaryentry = diarySevices.addDiary(newDiaryentry);

    return res.json(addDiaryentry);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).send(e.message);
    }
    return res.status(400).send("An error occurred");
  }
});

export default router;
