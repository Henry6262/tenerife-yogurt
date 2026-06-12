import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from '@/layout/RootLayout';
import Home from '@/pages/Home';

const Chefs = lazy(() => import('@/pages/Chefs'));
const ArticlesIndex = lazy(() => import('@/pages/ArticlesIndex'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const RecipesIndex = lazy(() => import('@/pages/RecipesIndex'));
const RecipeDetail = lazy(() => import('@/pages/RecipeDetail'));
const PreorderSuccess = lazy(() => import('@/pages/PreorderSuccess'));
const PreorderCancel = lazy(() => import('@/pages/PreorderCancel'));
const Privacy = lazy(() => import('@/pages/Privacy'));

function LazyWrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'chefs', element: <LazyWrap><Chefs /></LazyWrap> },
      { path: 'articles', element: <LazyWrap><ArticlesIndex /></LazyWrap> },
      { path: 'articles/:slug', element: <LazyWrap><ArticleDetail /></LazyWrap> },
      { path: 'recipes', element: <LazyWrap><RecipesIndex /></LazyWrap> },
      { path: 'recipes/:slug', element: <LazyWrap><RecipeDetail /></LazyWrap> },
      { path: 'preorder/success', element: <LazyWrap><PreorderSuccess /></LazyWrap> },
      { path: 'preorder/cancel', element: <LazyWrap><PreorderCancel /></LazyWrap> },
      { path: 'datenschutz', element: <LazyWrap><Privacy /></LazyWrap> },
      { path: 'privacy', element: <Navigate to="/datenschutz" replace /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
