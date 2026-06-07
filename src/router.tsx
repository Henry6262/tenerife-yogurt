import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import Home from '@/pages/Home';
import Chefs from '@/pages/Chefs';
import ArticlesIndex from '@/pages/ArticlesIndex';
import ArticleDetail from '@/pages/ArticleDetail';
import RecipesIndex from '@/pages/RecipesIndex';
import RecipeDetail from '@/pages/RecipeDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'chefs', element: <Chefs /> },
      { path: 'articles', element: <ArticlesIndex /> },
      { path: 'articles/:slug', element: <ArticleDetail /> },
      { path: 'recipes', element: <RecipesIndex /> },
      { path: 'recipes/:slug', element: <RecipeDetail /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
