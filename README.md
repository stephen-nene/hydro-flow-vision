# Hydro-Flow-Vision: Water Quality Monitoring Platform

![Hydro-Flow-Vision](https://via.placeholder.com/800x400?text=Hydro-Flow-Vision)

**URL**: https://lovable.dev/projects/316a0dc9-0636-414a-91fe-629273ee92e2

## Project Overview

Hydro-Flow-Vision is a comprehensive water quality monitoring and analysis platform designed for water treatment professionals. The application provides real-time monitoring, predictive analysis, and treatment recommendations through an intuitive user interface.

### Key Features

- **Real-time Dashboard**: Monitor critical water parameters with easy-to-understand visualizations
- **Emergency Mode**: Special interface optimization for critical situations
- **Water Sample Analysis**: Track and analyze water samples from various sources
- **Treatment Simulator**: Test different treatment approaches before implementation
- **AI Chatbot**: Get intelligent recommendations and insights
- **Report Generation**: Create detailed reports for compliance and analysis

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **State Management**: React Query, React Context
- **Routing**: React Router
- **Visualization**: Recharts
- **Icons**: Lucide React

## Integration Points for ML/AI Team

The platform is designed to integrate with machine learning and AI capabilities. Here are the key integration points:

### 1. Water Quality Prediction Model

**Integration Path**: `/src/services/ml/waterQualityPrediction.ts`

**Expected Input**:
```typescript
interface WaterSampleData {
  ph: number;
  turbidity: number;
  dissolvedOxygen: number;
  conductivity: number;
  temperature: number;
  // Additional parameters as needed
}
```

**Expected Output**:
```typescript
interface PredictionResult {
  toxicityLevel: number; // 0-100 scale
  contaminants: {
    name: string;
    concentration: number;
    unit: string;
    dangerLevel: 'low' | 'medium' | 'high';
  }[];
  timeToAction: number; // Time in hours until situation becomes critical
  confidenceScore: number; // 0-1 scale
}
```

### 2. Treatment Simulation Model

**Integration Path**: `/src/services/ml/treatmentSimulation.ts`

**Expected Input**:
```typescript
interface TreatmentParameters {
  waterSample: WaterSampleData;
  treatmentSteps: {
    type: 'filtration' | 'chemical' | 'uv' | 'reverse_osmosis' | 'other';
    parameters: Record<string, number>;
  }[];
}
```

**Expected Output**:
```typescript
interface TreatmentSimulationResult {
  resultingWaterQuality: WaterSampleData;
  toxicityReduction: number; // Percentage
  timeRequired: number; // Minutes
  costEstimate: number; // In currency units
  energyConsumption: number; // kWh
  environmentalImpact: 'low' | 'medium' | 'high';
}
```

### 3. Anomaly Detection Model

**Integration Path**: `/src/services/ml/anomalyDetection.ts`

Purpose: Identify unusual patterns in water quality data that might indicate equipment failure, contamination events, or other issues.

**Expected Input**: Time series water quality data

**Expected Output**: Anomaly flags with confidence scores and potential causes

### 4. Natural Language Processing for AI Chatbot

**Integration Path**: `/src/services/ml/chatbotNLP.ts`

Purpose: Process natural language queries about water quality, treatment options, and provide intelligent responses.

**Expected Input**: User text queries

**Expected Output**: Structured responses with relevant data, recommendations, and follow-up questions

## Integration Points for Backend Team

### 1. API Endpoints

The frontend expects the following RESTful API endpoints:

#### Water Samples
- `GET /api/water-samples` - List all samples
- `GET /api/water-samples/:id` - Get sample details
- `POST /api/water-samples` - Create new sample
- `PUT /api/water-samples/:id` - Update sample
- `DELETE /api/water-samples/:id` - Delete sample

#### Users & Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

#### Reports
- `GET /api/reports` - List all reports
- `GET /api/reports/:id` - Get report details
- `POST /api/reports/generate` - Generate new report
- `GET /api/reports/download/:id` - Download report PDF

#### Alerts
- `GET /api/alerts` - Get active alerts
- `POST /api/alerts/acknowledge/:id` - Acknowledge alert
- `POST /api/alerts/resolve/:id` - Resolve alert

#### Treatment Plans
- `GET /api/treatment-plans` - List all plans
- `POST /api/treatment-plans` - Create new plan
- `GET /api/treatment-plans/:id` - Get plan details
- `PUT /api/treatment-plans/:id` - Update plan
- `DELETE /api/treatment-plans/:id` - Delete plan

### 2. Data Models

The backend should implement the following key data models:

#### Water Sample
```typescript
interface WaterSample {
  id: string;
  source: string;
  collectionDate: string;
  analyzedDate: string;
  parameters: {
    ph: number;
    turbidity: number;
    dissolvedOxygen: number;
    conductivity: number;
    temperature: number;
    // Other parameters
  };
  toxicityLevel: number;
  contaminants: Array<{
    name: string;
    concentration: number;
    unit: string;
  }>;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  analyst: string;
  notes: string;
  status: 'pending' | 'analyzed' | 'critical' | 'resolved';
}
```

#### Alert
```typescript
interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  sampleId?: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  actions?: Array<{
    title: string;
    description: string;
    completed: boolean;
    completedBy?: string;
    completedAt?: string;
  }>;
}
```

#### Treatment Plan
```typescript
interface TreatmentPlan {
  id: string;
  name: string;
  description: string;
  sampleId: string;
  steps: Array<{
    order: number;
    type: string;
    parameters: Record<string, number>;
    duration: number;
    expectedResults: Record<string, number>;
  }>;
  estimatedCost: number;
  estimatedDuration: number;
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'approved' | 'in_progress' | 'completed' | 'failed';
}
```

### 3. Real-time Updates

The application requires real-time updates for critical alerts and monitoring. The backend should implement:

- WebSocket connections for live data updates
- Push notifications for critical alerts
- Event-driven architecture for timely updates

### 4. Authentication & Authorization

Implement JWT-based authentication with role-based access control:

- **Admin**: Full access to all features
- **Analyst**: Can view all data and create reports
- **Operator**: Can view dashboard and acknowledge alerts
- **Viewer**: Read-only access to dashboard and reports

## Development Workflow

1. Frontend development happens in this repository
2. ML/AI models should be developed in separate repositories and integrated
3. Backend API development should be synchronized with frontend requirements
4. Regular integration testing ensures all components work together

## Getting Started

### For Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```
VITE_API_URL=http://localhost:8000/api
VITE_WEBSOCKET_URL=ws://localhost:8001
VITE_ENABLE_MOCKS=true
```

## Deployment

The application can be deployed using the built-in Lovable deployment process:

1. Navigate to the [Lovable Project](https://lovable.dev/projects/316a0dc9-0636-414a-91fe-629273ee92e2)
2. Click on Share -> Publish
3. Follow the prompts to complete deployment

For custom domain setup, navigate to Project > Settings > Domains and click "Connect Domain".

## Contributing

1. Create feature branches from `main`
2. Follow the established code style and patterns
3. Write tests for new features
4. Create pull requests with clear descriptions

## Contact

For questions related to this project, please contact the project administrator.
