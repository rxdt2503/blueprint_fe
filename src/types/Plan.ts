export type Plan = {
    srNo: number;
    planName: string;
    organization: string;
    createdDate: string;
    createdBy: string;
    status: string;
    // details: PlanDetails;
  };

  export interface PlanDetails {
    name: string;
    businessName: string;
    status: string;
    lastUpdate: string;
    strategyStatus: string;
    identity: string;
    goals: string;
    currentStrategy: string;
    progressCompleted: number;
  }

