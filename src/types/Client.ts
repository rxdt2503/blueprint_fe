export type Client = {
    srNo: number;
    name: string;
    business: string;
    industry: string;
    status: string;
    lastUpdate: string;
    strategyStatus: string;
    details: ClientDetails;
  };

  export interface ClientDetails {
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