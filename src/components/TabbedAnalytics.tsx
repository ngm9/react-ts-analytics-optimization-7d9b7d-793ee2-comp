import { AnalyticsItem, TabId } from '../types';

interface TabbedAnalyticsProps {
  activeTab: TabId;
  overviewData: AnalyticsItem[];
  candidatesData: AnalyticsItem[];
  assessmentsData: AnalyticsItem[];
  loading: boolean;
  onTabChange: (tab: TabId) => void;
}

interface TabButtonProps {
  label: string;
  tab: TabId;
  isActive: boolean;
  onClick: (tab: TabId) => void;
}

interface TabTableProps {
  title: string;
  rows: AnalyticsItem[];
  isActive: boolean;
}

function TabButton(props: TabButtonProps): JSX.Element {
  const backgroundColor = props.isActive ? '#2563eb' : '#e5e7eb';
  const color = props.isActive ? '#ffffff' : '#111827';
  return (
    <button
      type="button"
      onClick={function () {
        props.onClick(props.tab);
      }}
      style={{
        padding: '8px 16px',
        marginRight: '8px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor,
        color,
        fontSize: '14px'
      }}
    >
      {props.label}
    </button>
  );
}

function TabTable(props: TabTableProps): JSX.Element {
  const totalAttempts = props.rows.reduce((sum, row) => sum + row.attempts, 0);
  const totalScore = props.rows.reduce((sum, row) => sum + row.score, 0);
  const averageScore = props.rows.length === 0 ? 0 : Math.round(totalScore / props.rows.length);
  return (
    <section
      style={{
        display: props.isActive ? 'block' : 'none',
        marginTop: '16px'
      }}
    >
      <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>{props.title}</h2>
      <div style={{ marginBottom: '8px', fontSize: '14px' }}>
        <span style={{ marginRight: '16px' }}>Rows: {props.rows.length}</span>
        <span style={{ marginRight: '16px' }}>Total attempts: {totalAttempts}</span>
        <span>Average score: {averageScore}</span>
      </div>
      <div style={{ maxHeight: '360px', overflowY: 'auto', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
              <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #e5e7eb' }}>Score</th>
              <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #e5e7eb' }}>Attempts</th>
              <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #e5e7eb' }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row) => (
              <tr key={row.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #f3f4f6' }}>{row.name}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>{row.score}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>{row.attempts}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>
                  {new Date(row.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function TabbedAnalytics(props: TabbedAnalyticsProps): JSX.Element {
  const tabs: TabId[] = ['overview', 'candidates', 'assessments'];
  return (
    <main style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <h1 style={{ fontSize: '22px', marginBottom: '12px' }}>Utkrusht Assessment Analytics</h1>
      <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '16px' }}>
        This dashboard shows aggregated analytics for assessments and candidates across multiple tabs. All data is generated
        locally to simulate a busy analytics view.
      </p>
      <div style={{ marginBottom: '8px' }}>
        {tabs.map((tab) => {
          let label = 'Overview';
          if (tab === 'candidates') {
            label = 'Candidate performance';
          }
          if (tab === 'assessments') {
            label = 'Assessment usage';
          }
          return (
            <TabButton
              key={tab}
              tab={tab}
              label={label}
              isActive={props.activeTab === tab}
              onClick={props.onTabChange}
            />
          );
        })}
      </div>
      {props.loading ? (
        <div style={{ fontSize: '14px', marginTop: '8px' }}>Loading data for all tabs. This may take a moment.</div>
      ) : null}
      <TabTable
        title="Overview across all assessments"
        rows={props.overviewData}
        isActive={props.activeTab === 'overview'}
      />
      <TabTable
        title="Candidate performance details"
        rows={props.candidatesData}
        isActive={props.activeTab === 'candidates'}
      />
      <TabTable
        title="Assessment engagement and usage"
        rows={props.assessmentsData}
        isActive={props.activeTab === 'assessments'}
      />
    </main>
  );
}
