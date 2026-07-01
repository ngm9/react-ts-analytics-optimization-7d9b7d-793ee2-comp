### Task Overview
Utkrusht is a proof-of-skills marketplace, and this small React + TypeScript app represents an internal multi-tab analytics dashboard used by agile hiring teams to inspect assessment and candidate analytics. The application is already fully functional and type-safe, but it is intentionally implemented in a way that causes unnecessary data fetching and expensive re-renders when switching between tabs with large datasets. Your task in this 30-minute exercise is to focus on targeted optimizations that improve perceived performance and responsiveness without changing the visible behavior of the UI.

### Objectives
- Reduce unnecessary component re-renders in the tabbed analytics view.
- Optimize how and when API-like data loading is triggered to avoid redundant calls for the same tab.
- Improve UI responsiveness when switching between tabs that display large tables of analytics data.
- Maintain existing TypeScript type safety for components, props, and data-loading functions while applying optimizations.
- Apply fundamental React performance best practices to the most critical rendering paths of the dashboard.
- Verify that all existing functionality and data display remain correct after optimization.

### How to Verify
- Use the React DevTools Profiler to compare render counts for key components before and after your changes.
- Use the browser Network panel to confirm fewer repeated calls.
- Interact with the tabs and observe whether switching between them feels more immediate and responsive.
- Confirm that the TypeScript compiler runs without errors and that the strict configuration remains satisfied.
- Verify that the dashboard still shows correct data for all tabs, with the same structure and labels as before.

### Helpful Tips
- Consider how React's rendering cycle impacts how often components update when state or props change.
- Consider when components might be re-rendering even though their underlying data has not actually changed.
- Consider how many times data fetching functions are called and whether the same data is being requested repeatedly.
- Think about where state is stored and how that choice affects which parts of the component tree re-render.
- Think about how to preserve TypeScript types while introducing memoization or restructuring data flow.
