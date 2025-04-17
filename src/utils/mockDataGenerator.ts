
import { ClientData, CAMPAIGNS } from "../types/client";

// Generate a random date between a start and end date
function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Generate random phone number
function randomPhone(): string {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

// Generate random client data
function generateRandomClient(id: number): ClientData {
  // Random names
  const firstNames = ['Juan', 'Maria', 'Carlos', 'Sofia', 'Luis', 'Ana', 'Miguel', 'Gabriela', 'Jorge', 'Rosa', 
                     'Pedro', 'Isabella', 'Fernando', 'Valentina', 'Diego', 'Camila', 'Eduardo', 'Julieta', 'Roberto', 'Lucia',
                     'Manuel', 'Elena', 'Ricardo', 'Carmen', 'Victor', 'Julia', 'Javier', 'Patricia', 'Francisco', 'Laura'];
  const lastNames = ['Rodriguez', 'Garcia', 'Martinez', 'Lopez', 'Gonzalez', 'Perez', 'Sanchez', 'Ramirez', 'Torres', 'Flores',
                    'Rivera', 'Gomez', 'Diaz', 'Reyes', 'Morales', 'Cruz', 'Ortiz', 'Gutierrez', 'Chavez', 'Ramos',
                    'Hernandez', 'Vasquez', 'Mendoza', 'Vargas', 'Castillo', 'Jimenez', 'Romero', 'Alvarez', 'Ruiz', 'Suarez'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  // Random agents
  const agents = ['SoReal Estate', 'Tito Baptista', 'Dennis Lopez', 'Dens Taveras', 'Alvaro Terry'];
  const agent = agents[Math.floor(Math.random() * agents.length)];
  
  // Random employment type
  const employmentType = Math.random() > 0.3 ? 'W-2' : '1099';
  const selfEmployedYears = employmentType === '1099' ? Math.floor(Math.random() * 10) + 1 : undefined;
  
  // Random income
  const incomeAnnual = Math.floor(Math.random() * 80000) + 35000;
  
  // Random credit category and score
  const creditCategories = ['Poor', 'Fair', 'Good', 'Excellent'] as const;
  const creditCategory = creditCategories[Math.floor(Math.random() * creditCategories.length)];
  
  let creditScoreApprox;
  switch (creditCategory) {
    case 'Excellent':
      creditScoreApprox = Math.floor(Math.random() * 50) + 750;
      break;
    case 'Good':
      creditScoreApprox = Math.floor(Math.random() * 50) + 680;
      break;
    case 'Fair':
      creditScoreApprox = Math.floor(Math.random() * 80) + 580;
      break;
    case 'Poor':
      creditScoreApprox = Math.floor(Math.random() * 100) + 450;
      break;
  }
  
  // Random down payment
  const downPaymentSaved = Math.random() > 0.4;
  const downPaymentAmount = downPaymentSaved ? Math.floor(Math.random() * 40000) + 5000 : undefined;
  const assistanceInterested = !downPaymentSaved && Math.random() > 0.5;
  
  // Random timeline
  const timelines = ['immediately', '3months', '3to6months', '6to12months', 'exploring'] as const;
  const timeline = timelines[Math.floor(Math.random() * timelines.length)];
  
  // Random legal status
  const legalStatuses = ['US Citizen', 'Permanent Resident', 'Work Permit', 'Undocumented'] as const;
  const legalStatus = legalStatuses[Math.floor(Math.random() * legalStatuses.length)];
  
  // Random campaign
  const campaign = CAMPAIGNS[Math.floor(Math.random() * CAMPAIGNS.length)];
  
  // Random qualification (more likely to be qualified than not)
  const qualified = Math.random() > 0.2;
  
  // Random credit issues
  const hasCreditIssues = Math.random() > 0.7;
  let creditIssues;
  
  if (hasCreditIssues) {
    const issues = {
      bankruptcy: Math.random() > 0.8,
      foreclosure: Math.random() > 0.8,
      collections: Math.random() > 0.6,
      medical: Math.random() > 0.7,
      other: Math.random() > 0.9,
    };
    
    const details = [];
    if (issues.bankruptcy) details.push('Bankruptcy: $12,000, 3 years ago');
    if (issues.foreclosure) details.push('Foreclosure: $180,000, 4 years ago');
    if (issues.collections) details.push('Collections: $3,500, 2 years ago');
    if (issues.medical) details.push('Medical debt: $8,200, 1 year ago');
    if (issues.other) details.push('Other credit issues');
    
    creditIssues = {
      hasCreditIssues: true,
      ...issues,
      details: details.join('; ')
    };
  } else {
    creditIssues = { hasCreditIssues: false };
  }
  
  // Create date in the past year
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  const createdDate = randomDate(startDate, endDate);
  
  // First time buyer
  const firstTimeBuyer = Math.random() > 0.4;
  
  // Generate comments
  const commentOptions = [
    'Looking for a family home in a good school district',
    'Interested in investment properties',
    'Wants to be close to public transportation',
    'Prefers a newly built home',
    'Needs a home office space',
    'Looking for a fixer-upper',
    'Wants a property with land',
    'Looking to downsize',
    'Relocating for work',
    'Wants to be close to family',
  ];
  
  const comments = Math.random() > 0.3 ? commentOptions[Math.floor(Math.random() * commentOptions.length)] : undefined;
  
  // Generate email
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
  
  // Determine urgency based on timeline
  let urgency: 'low' | 'medium' | 'high';
  if (timeline === 'immediately' || timeline === '3months') {
    urgency = 'high';
  } else if (timeline === '3to6months') {
    urgency = 'medium';
  } else {
    urgency = 'low';
  }
  
  // Generate next steps
  let nextSteps;
  if (!qualified) {
    nextSteps = 'Review qualifications and contact for credit counseling';
  } else if (hasCreditIssues) {
    nextSteps = 'Address credit issues';
  } else if (timeline === 'immediately') {
    nextSteps = 'Schedule pre-approval meeting immediately';
  } else if (!downPaymentSaved && assistanceInterested) {
    nextSteps = 'Discuss down payment assistance programs';
  } else {
    nextSteps = 'Schedule follow-up consultation';
  }
  
  return {
    id: id.toString(),
    name,
    phone: randomPhone(),
    email,
    agent,
    campaign,
    employmentType,
    selfEmployedYears,
    incomeAnnual,
    creditCategory,
    creditScoreApprox,
    creditIssues,
    downPaymentSaved,
    downPaymentAmount,
    assistanceInterested,
    timeline,
    firstTimeBuyer,
    legalStatus,
    qualified,
    createdDate,
    consentGiven: true,
    comments,
    urgency,
    nextSteps
  };
}

// Generate random clients
export const generateRandomClients = (count: number): ClientData[] => {
  const clients: ClientData[] = [];
  for (let i = 1; i <= count; i++) {
    clients.push(generateRandomClient(i));
  }
  return clients;
};
