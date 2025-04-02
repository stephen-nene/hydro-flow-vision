
import { WaterSample } from "@/types/water";

export const mockWaterData: WaterSample[] = [
  {
    id: 1001,
    location: "Municipal Treatment Plant",
    toxicityLevel: 35,
    collectionDate: "2023-07-15",
    contaminants: ["Chlorine", "Trace Metals"],
    metrics: {
      pH: 7.2,
      chlorine: 1.5,
      turbidity: 0.5
    }
  },
  {
    id: 1002,
    location: "Factory Outlet - North",
    toxicityLevel: 87,
    collectionDate: "2023-07-16",
    contaminants: ["Lead", "Mercury", "Industrial Waste"],
    metrics: {
      pH: 6.1,
      chlorine: 0.2,
      turbidity: 8.5
    }
  },
  {
    id: 1003,
    location: "River Sampling Station 3",
    toxicityLevel: 65,
    collectionDate: "2023-07-16",
    contaminants: ["Agricultural Runoff", "Nitrates"],
    metrics: {
      pH: 6.8,
      chlorine: 0.1,
      turbidity: 4.2
    }
  },
  {
    id: 1004,
    location: "Residential Water Supply",
    toxicityLevel: 12,
    collectionDate: "2023-07-17",
    contaminants: ["Trace Minerals"],
    metrics: {
      pH: 7.4,
      chlorine: 0.8,
      turbidity: 0.3
    }
  },
  {
    id: 1005,
    location: "Lake Recreation Area",
    toxicityLevel: 42,
    collectionDate: "2023-07-17",
    contaminants: ["Algae", "Organic Matter"],
    metrics: {
      pH: 7.8,
      chlorine: 0.1,
      turbidity: 2.1
    }
  },
  {
    id: 1006,
    location: "Industrial Zone - East",
    toxicityLevel: 91,
    collectionDate: "2023-07-18",
    contaminants: ["Heavy Metals", "Chemical Waste", "Petroleum"],
    metrics: {
      pH: 5.2,
      chlorine: 0.0,
      turbidity: 12.7
    }
  },
  {
    id: 1007,
    location: "Groundwater Well #12",
    toxicityLevel: 28,
    collectionDate: "2023-07-18",
    contaminants: ["Minerals", "Iron"],
    metrics: {
      pH: 7.5,
      chlorine: 0.3,
      turbidity: 0.8
    }
  },
  {
    id: 1008,
    location: "Wastewater Treatment Output",
    toxicityLevel: 38,
    collectionDate: "2023-07-19",
    contaminants: ["Bacteria", "Chlorine"],
    metrics: {
      pH: 7.0,
      chlorine: 2.1,
      turbidity: 1.4
    }
  }
];
