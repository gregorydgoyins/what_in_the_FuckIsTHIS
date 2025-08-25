import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Loader } from './components/common/Loader';
import { NewsTicker } from './components/news/NewsTicker';
import { NewsNotification } from './components/news/NewsNotification';

// Main components
import { Dashboard } from './components/Dashboard';

// Lazy loaded pages
const IdeasPage = lazy(() => import('./pages/IdeasPage').then(module => ({ default: module.IdeasPage })));
const IdeaMappingPage = lazy(() => import('./pages/IdeaMappingPage').then(module => ({ default: module.IdeaMappingPage })));

// Trading pages
const BuyPage = lazy(() => import('./pages/trading/BuyPage').then(module => ({ default: module.BuyPage })));
const SellPage = lazy(() => import('./pages/trading/SellPage').then(module => ({ default: module.SellPage })));
const ETFsPage = lazy(() => import('./pages/trading/ETFsPage').then(module => ({ default: module.ETFsPage })));

// Character pages
const CharacterStockPage = lazy(() => import('./pages/character/CharacterStockPage').then(module => ({ default: module.CharacterStockPage })));
const HeroStockPage = lazy(() => import('./pages/character/HeroStockPage').then(module => ({ default: module.HeroStockPage })));
const VillainStockPage = lazy(() => import('./pages/character/VillainStockPage').then(module => ({ default: module.VillainStockPage })));
const SidekickStockPage = lazy(() => import('./pages/character/SidekickStockPage').then(module => ({ default: module.SidekickStockPage })));
const HenchmanStockPage = lazy(() => import('./pages/character/HenchmanStockPage').then(module => ({ default: module.HenchmanStockPage })));
const CharacterDetailsPage = lazy(() => import('./pages/character/CharacterDetailsPage').then(module => ({ default: module.CharacterDetailsPage })));

// Creator pages
const CreatorMatrix = lazy(() => import('./components/creator/CreatorMatrix').then(module => ({ default: module.CreatorMatrix })));
const CreatorProfile = lazy(() => import('./components/creator/CreatorProfile').then(module => ({ default: module.CreatorProfile })));

// Location pages
const LocationStockPage = lazy(() => import('./pages/location/LocationStockPage').then(module => ({ default: module.LocationStockPage })));
const HangoutStockPage = lazy(() => import('./pages/location/HangoutStockPage').then(module => ({ default: module.HangoutStockPage })));
const HideoutStockPage = lazy(() => import('./pages/location/HideoutStockPage').then(module => ({ default: module.HideoutStockPage })));
const LocationDetailsPage = lazy(() => import('./pages/location/LocationDetailsPage').then(module => ({ default: module.LocationDetailsPage })));

// Gadget pages
const GadgetStockPage = lazy(() => import('./pages/gadget/GadgetStockPage').then(module => ({ default: module.GadgetStockPage })));
const GadgetDetailsPage = lazy(() => import('./pages/gadget/GadgetDetailsPage').then(module => ({ default: module.GadgetDetailsPage })));

// Bond pages
const BondListPage = lazy(() => import('./pages/bond/BondListPage').then(module => ({ default: module.BondListPage })));
const CreatorBondPage = lazy(() => import('./pages/bond/CreatorBondPage').then(module => ({ default: module.CreatorBondPage })));
const PublisherBondPage = lazy(() => import('./pages/bond/PublisherBondPage').then(module => ({ default: module.PublisherBondPage })));
const SpecialtyBondPage = lazy(() => import('./pages/bond/SpecialtyBondPage').then(module => ({ default: module.SpecialtyBondPage })));
const BondDetailsPage = lazy(() => import('./pages/bond/BondDetailsPage').then(module => ({ default: module.BondDetailsPage })));

// Fund pages
const FundListPage = lazy(() => import('./pages/fund/FundListPage').then(module => ({ default: module.FundListPage })));
const ThemedFundPage = lazy(() => import('./pages/fund/ThemedFundPage').then(module => ({ default: module.ThemedFundPage })));
const CustomFundPage = lazy(() => import('./pages/fund/CustomFundPage').then(module => ({ default: module.CustomFundPage })));
const FundDetailsPage = lazy(() => import('./pages/fund/FundDetailsPage').then(module => ({ default: module.FundDetailsPage })));

// Portfolio pages
const WatchlistPage = lazy(() => import('./pages/portfolio/WatchlistPage').then(module => ({ default: module.WatchlistPage })));
const TradingJournalPage = lazy(() => import('./pages/portfolio/TradingJournalPage').then(module => ({ default: module.TradingJournalPage })));
const ToolsPage = lazy(() => import('./pages/portfolio/ToolsPage').then(module => ({ default: module.ToolsPage })));
const FormulasPage = lazy(() => import('./pages/portfolio/FormulasPage').then(module => ({ default: module.FormulasPage })));

// Options trading pages
const CallsPage = lazy(() => import('./pages/trading/options/CallsPage').then(module => ({ default: module.CallsPage })));
const PutsPage = lazy(() => import('./pages/trading/options/PutsPage').then(module => ({ default: module.PutsPage })));
const LEAPsPage = lazy(() => import('./pages/trading/options/LEAPsPage').then(module => ({ default: module.LEAPsPage })));

// Specialty trading pages
const StraddlesPage = lazy(() => import('./pages/trading/specialty/StraddlesPage').then(module => ({ default: module.StraddlesPage })));
const ButterflysPage = lazy(() => import('./pages/trading/specialty/ButterflysPage').then(module => ({ default: module.ButterflysPage })));
const BullBearStraddlesPage = lazy(() => import('./pages/trading/specialty/BullBearStraddlesPage').then(module => ({ default: module.BullBearStraddlesPage })));
const DerivativesFuturesPage = lazy(() => import('./pages/trading/DerivativesFuturesPage').then(module => ({ default: module.DerivativesFuturesPage })));

// Market pages
const MarketCalendarPage = lazy(() => import('./pages/markets/MarketCalendarPage').then(module => ({ default: module.MarketCalendarPage })));

// Learning pages
const LearningCenter = lazy(() => import('./components/learn/LearningCenter').then(module => ({ default: module.LearningCenter })));

// News pages
const BlogFeed = lazy(() => import('./components/news/BlogFeed').then(module => ({ default: module.BlogFeed })));
const NewsFeed = lazy(() => import('./components/news/NewsFeed').then(module => ({ default: module.NewsFeed })));

// Research pages
const ResearchReport = lazy(() => import('./components/research/ResearchReport').then(module => ({ default: module.ResearchReport })));

// Auth pages
const Login = lazy(() => import('./components/auth/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./components/auth/Register').then(module => ({ default: module.Register })));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword').then(module => ({ default: module.ResetPassword })));
const UserProfile = lazy(() => import('./components/auth/UserProfile').then(module => ({ default: module.UserProfile })));

// Navigation testing
const NavigationTest = lazy(() => import('./components/navigation/NavigationTest').then(module => ({ default: module.NavigationTest })));

// Loading fallback
const PageLoader = () => <Loader />;

function App() {
  return (
    <ErrorBoundary>
      <NewsTicker />
      <NewsNotification />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Dashboard */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Ideas Routes */}
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/ideas/mapping" element={<IdeaMappingPage />} />
            
            {/* Trading Routes */}
            <Route path="/trading" element={<BuyPage />} />
            <Route path="/trading/buy" element={<BuyPage />} />
            <Route path="/trading/sell" element={<SellPage />} />
            <Route path="/trading/etfs" element={<ETFsPage />} />
            
            {/* Options Trading */}
            <Route path="/trading/options/calls" element={<CallsPage />} />
            <Route path="/trading/options/puts" element={<PutsPage />} />
            <Route path="/trading/options/leaps" element={<LEAPsPage />} />
            
            {/* Specialty Trading */}
            <Route path="/trading/specialty/straddles" element={<StraddlesPage />} />
            <Route path="/trading/specialty/butterflys" element={<ButterflysPage />} />
            <Route path="/trading/specialty/bull-bear-straddles" element={<BullBearStraddlesPage />} />
            <Route path="/trading/derivatives-futures" element={<DerivativesFuturesPage />} />
            
            {/* Character Routes */}
            <Route path="/characters" element={<CharacterStockPage />} />
            <Route path="/characters/heroes" element={<HeroStockPage />} />
            <Route path="/characters/villains" element={<VillainStockPage />} />
            <Route path="/characters/sidekicks" element={<SidekickStockPage />} />
            <Route path="/characters/henchmen" element={<HenchmanStockPage />} />
            <Route path="/character/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/hero/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/villain/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/sidekick/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/henchman/:symbol" element={<CharacterDetailsPage />} />
            
            {/* Creator Routes */}
            <Route path="/creators" element={<CreatorMatrix />} />
            <Route path="/creator/:symbol" element={<CreatorProfile />} />
            <Route path="/creator-stock/:symbol" element={<CreatorProfile />} />
            
            {/* Location Routes */}
            <Route path="/locations" element={<LocationStockPage />} />
            <Route path="/locations/hangouts" element={<HangoutStockPage />} />
            <Route path="/locations/hideouts" element={<HideoutStockPage />} />
            <Route path="/location/:symbol" element={<LocationDetailsPage />} />
            <Route path="/hangout/:symbol" element={<LocationDetailsPage />} />
            <Route path="/hideout/:symbol" element={<LocationDetailsPage />} />
            
            {/* Gadget Routes */}
            <Route path="/gadgets" element={<GadgetStockPage />} />
            <Route path="/gadget/:symbol" element={<GadgetDetailsPage />} />
            
            {/* Bond Routes */}
            <Route path="/bonds" element={<BondListPage />} />
            <Route path="/bonds/creator" element={<CreatorBondPage />} />
            <Route path="/bonds/publisher" element={<PublisherBondPage />} />
            <Route path="/bonds/specialty" element={<SpecialtyBondPage />} />
            <Route path="/bond/:symbol" element={<BondDetailsPage />} />
            
            {/* Fund Routes */}
            <Route path="/funds" element={<FundListPage />} />
            <Route path="/funds/themed" element={<ThemedFundPage />} />
            <Route path="/funds/custom" element={<CustomFundPage />} />
            <Route path="/fund/:symbol" element={<FundDetailsPage />} />
            
            {/* Portfolio Routes */}
            <Route path="/portfolio" element={<WatchlistPage />} />
            <Route path="/portfolio/watchlist" element={<WatchlistPage />} />
            <Route path="/portfolio/journal" element={<TradingJournalPage />} />
            <Route path="/portfolio/tools" element={<ToolsPage />} />
            <Route path="/portfolio/formulas" element={<FormulasPage />} />
            
            {/* Market Routes */}
            <Route path="/markets" element={<MarketCalendarPage />} />
            <Route path="/markets/calendar" element={<MarketCalendarPage />} />
            
            {/* Learning Routes */}
            <Route path="/learn" element={<LearningCenter />} />
            
            {/* News Routes */}
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/blog" element={<BlogFeed />} />
            
            {/* Research Routes */}
            <Route path="/research" element={<ResearchReport />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<UserProfile />} />
            
            {/* Testing Routes */}
            <Route path="/navigation-test" element={<NavigationTest />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;