import { useEffect, useState } from 'react';
import { fetchTabData } from './api';
import { TabbedAnalytics } from './components/TabbedAnalytics';
import { AnalyticsItem, TabId } from './types';

type TabState = {
  overview: AnalyticsItem[];
  candidates: AnalyticsItem[];
  assessments: AnalyticsItem[];
};

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [tabState, setTabState] = useState<TabState>({
    overview: [],
    candidates: [],
    assessments: []
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchTabData('overview').then((data) => {
      setTabState((current) => ({
        ...current,
        overview: data
      }));
      setLoading(false);
    });
    fetchTabData('candidates').then((data) => {
      setTabState((current) => ({
        ...current,
        candidates: data
      }));
    });
    fetchTabData('assessments').then((data) => {
      setTabState((current) => ({
        ...current,
        assessments: data
      }));
    });
  }, [activeTab]);

  function handleTabChange(nextTab: TabId): void {
    setActiveTab(nextTab);
  }

  return (
    <TabbedAnalytics
      activeTab={activeTab}
      overviewData={tabState.overview}
      candidatesData={tabState.candidates}
      assessmentsData={tabState.assessments}
      loading={loading}
      onTabChange={handleTabChange}
    />
  );
}

export default App;
