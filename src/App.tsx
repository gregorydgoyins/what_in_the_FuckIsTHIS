import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Loader } from './components/common/Loader';

// Main components
import { Dashboard } from './components/Dashboard';

// Lazy loaded pages
const IdeasPage = lazy(() => import('./pages/IdeasPage').then(module => ({ default: module.IdeasPage })));
const IdeaMappingPage = lazy(() => import('./pages/IdeaMappingPage').then(module => ({ default: module.IdeaMappingPage })));

// Loading fallback
const PageLoader = () => <Loader />;

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Dashboard */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Ideas Routes */}
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/ideas/mapping" element={<IdeaMappingPage />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;