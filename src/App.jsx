import React, { useState, useCallback } from 'react';
import AppShell from '@/components/global/AppShell';

// Screens
import Landing from '@/screens/Landing';
import PlatformOverview from '@/screens/PlatformOverview';
import FourPillars from '@/screens/FourPillars';
import ScenarioSelect from '@/screens/ScenarioSelect';
import SignalCollection from '@/screens/SignalCollection';
import ICEScreen from '@/screens/ICEScreen';
import DecisionGate from '@/screens/DecisionGate';
import BlinkScreen from '@/screens/BlinkScreen';
import ProtectionMode from '@/screens/ProtectionMode';
import SuccessOutcome from '@/screens/SuccessOutcome';
import IncidentTimeline from '@/screens/IncidentTimeline';
import FraudOpsCenter from '@/screens/FraudOpsCenter';
import ArchitectureScreen from '@/screens/ArchitectureScreen';
import BusinessImpact from '@/screens/BusinessImpact';
import ShadowHoneypot from '@/screens/ShadowHoneypot';
import DuressOutcome from '@/screens/DuressOutcome';
import CustomerAttackView from '@/screens/CustomerAttackView';

export default function App() {
  const [screen, setScreen] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'landing';
  });
  const [scenarioId, setScenarioId] = useState(null);

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setScreen(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((nextScreen, nextScenarioId) => {
    if (nextScenarioId !== undefined) setScenarioId(nextScenarioId);
    setScreen(nextScreen);
    window.location.hash = nextScreen;
    window.scrollTo(0, 0);
  }, []);

  const renderScreen = () => {
    const props = { onNavigate: navigate, scenarioId };
    switch (screen) {
      case 'landing':      return <Landing {...props} />;
      case 'overview':     return <PlatformOverview {...props} />;
      case 'pillars':      return <FourPillars {...props} />;
      case 'select':       return <ScenarioSelect {...props} />;
      case 'signals':      return <SignalCollection {...props} />;
      case 'ice':          return <ICEScreen {...props} />;
      case 'decision':     return <DecisionGate {...props} />;
      case 'blink':        return <BlinkScreen {...props} />;
      case 'protection':   return <ProtectionMode {...props} />;
      case 'success':      return <SuccessOutcome {...props} />;
      case 'timeline':     return <IncidentTimeline {...props} />;
      case 'dashboard':    return <FraudOpsCenter {...props} />;
      case 'architecture': return <ArchitectureScreen {...props} />;
      case 'impact':       return <BusinessImpact {...props} />;
      case 'shadow':       return <ShadowHoneypot {...props} />;
      case 'duress':       return <DuressOutcome {...props} />;
      case 'customer-attack': return <CustomerAttackView {...props} />;
      default:             return <Landing {...props} />;
    }
  };

  return (
    <AppShell currentScreen={screen} onNavigate={navigate}>
      {renderScreen()}
    </AppShell>
  );
}
