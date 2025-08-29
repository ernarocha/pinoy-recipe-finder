import { Routes, Route } from "react-router-dom";
import FavoritesProvider from "./components/FavoritesProvider";
import Homepage from "./pages/Homepage";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </FavoritesProvider>
  );
}
