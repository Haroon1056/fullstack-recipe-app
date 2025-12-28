import express from 'express';
import { ENV } from './config/env.js';
import { db } from './config/db.js';
import { favoritesTable } from './db/schema.js'
import { eq, and } from "drizzle-orm";


const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ sucess: true, message: 'API is healthy' });
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || recipeId == null || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const recipeIdInt = Number.parseInt(recipeId, 10);
    if (Number.isNaN(recipeIdInt)) {
      return res.status(400).json({ error: "recipeId must be a number" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId: recipeIdInt,
        title,
        image,
        cookTime: cookTime == null ? null : Number.parseInt(cookTime, 10),
        servings: servings == null ? null : Number.parseInt(servings, 10),
      })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.log("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json(userFavorites);
  } catch (error) {
    console.log("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const recipeIdInt = Number.parseInt(recipeId, 10);
    if (Number.isNaN(recipeIdInt)) {
      return res.status(400).json({ error: "recipeId must be a number" });
    }

    await db
      .delete(favoritesTable)
      .where(and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, recipeIdInt)));

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.log("Error removing favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});