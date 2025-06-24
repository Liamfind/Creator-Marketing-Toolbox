import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculator from '../tools/calculator/Calculator';
import Analytics from '../tools/analytics/Analytics';
import Report from '../tools/report/Report';
import AvgViewsCalculator from '../tools/avg-views';

const ToolRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="calculator" element={<Calculator />} />
      <Route path="avg-views" element={<AvgViewsCalculator />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="report" element={<Report />} />
    </Routes>
  );
};

export default ToolRouter; 