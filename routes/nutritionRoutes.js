const express = require('express');
const router = express.Router();
const NutritionEntry = require('../models/nutritionEntry');

// POST /api/nutrition - Create a new nutrition entry
router.post('/save', async (req, res) => {
  try {
    const { date, foodItem, calories, protein, carbs, fats } = req.body;
    if (!date || !foodItem || calories == null || protein == null || carbs == null || fats == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newEntry = new NutritionEntry({ date, foodItem, calories, protein, carbs, fats });
    await newEntry.save();
    res.status(201).json({ message: 'Nutrition entry created', entry: newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/nutrition - Get all nutrition entries
router.get('/list', async (req, res) => {
  try {
    const entries = await NutritionEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;