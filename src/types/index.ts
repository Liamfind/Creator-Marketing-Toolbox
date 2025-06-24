import React from 'react';

// 通用类型定义
export interface BaseResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// 工具相关类型
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  component: React.ComponentType;
}

// ROI计算器相关类型
export interface ROICalculationParams {
  influencerFee: number;
  productCost: number;
  shippingCost: number;
  platformFee: number;
  expectedSales: number;
  averageOrderValue: number;
}

export interface ROICalculationResult {
  totalCost: number;
  totalRevenue: number;
  roi: number;
  profit: number;
  profitMargin: number;
}

// 数据分析相关类型
export interface AnalyticsData {
  totalInfluencers: number;
  activeCampaigns: number;
  totalRevenue: number;
  avgROI: number;
  conversionRate: number;
  engagementRate: number;
  monthlyGrowth: number;
}

// 报告生成相关类型
export interface ReportFormData {
  campaignName: string;
  platform: string;
  startDate: any;
  endDate: any;
  description: string;
  reportType: string;
  format?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
}

// 平台相关类型
export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
} 