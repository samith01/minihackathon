export interface Student {
  id: string;
  name: string;
  program: string;
  year: number;
  bio: string;
  avatar: string;
  instagram?: string;
  linkedin?: string;
  likedListings: string[]; // listing IDs
  budget: { min: number; max: number };
  preferences: string[];
}

export const students: Student[] = [
  {
    id: 'student-1',
    name: 'Sarah Chen',
    program: 'Computer Science',
    year: 3,
    bio: 'Looking for a quiet roommate who respects study time. I love cooking and keeping spaces tidy!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    instagram: 'sarah.chen.cs',
    linkedin: 'sarahchen-uottawa',
    likedListings: ['1', '3', '7', '12'],
    budget: { min: 800, max: 1400 },
    preferences: ['Non-smoker', 'Early bird', 'Clean', 'Quiet']
  },
  {
    id: 'student-2',
    name: 'Marcus Johnson',
    program: 'Mechanical Engineering',
    year: 2,
    bio: 'Chill guy looking for someone to split rent. Into gaming and basketball. Night owl but respectful!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    instagram: 'marcus.j.eng',
    linkedin: 'marcusjohnson-eng',
    likedListings: ['3', '5', '6', '9', '12'],
    budget: { min: 600, max: 1200 },
    preferences: ['Gamer friendly', 'Night owl', 'Social']
  },
  {
    id: 'student-3',
    name: 'Priya Sharma',
    program: 'Nursing',
    year: 4,
    bio: 'Final year nursing student with irregular schedule. Looking for understanding roommate!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    instagram: 'priya.sharma.rn',
    linkedin: 'priyasharma-nursing',
    likedListings: ['1', '2', '7', '8', '13'],
    budget: { min: 900, max: 1500 },
    preferences: ['Flexible schedule', 'Clean', 'Pet friendly']
  },
  {
    id: 'student-4',
    name: 'Alex Thompson',
    program: 'Business Administration',
    year: 2,
    bio: 'Outgoing person who loves hosting small gatherings. Looking for a social roommate!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    instagram: 'alex.t.biz',
    linkedin: 'alexthompson-telfer',
    likedListings: ['5', '6', '9', '11', '14'],
    budget: { min: 700, max: 1300 },
    preferences: ['Social', 'Party friendly', 'Downtown lover']
  },
  {
    id: 'student-5',
    name: 'Emma Wilson',
    program: 'Psychology',
    year: 3,
    bio: 'Introvert who enjoys reading and yoga. Looking for a calm living environment.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    instagram: 'emma.mindful',
    linkedin: 'emmawilson-psych',
    likedListings: ['2', '4', '8', '10', '15'],
    budget: { min: 800, max: 1200 },
    preferences: ['Quiet', 'Mindful', 'Non-smoker', 'Plant lover']
  },
  {
    id: 'student-6',
    name: 'David Kim',
    program: 'Software Engineering',
    year: 4,
    bio: 'Tech enthusiast working on side projects. Need good WiFi and a coding buddy!',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    instagram: 'david.codes',
    linkedin: 'davidkim-swe',
    likedListings: ['1', '5', '7', '12', '14'],
    budget: { min: 1000, max: 1800 },
    preferences: ['Tech savvy', 'Night owl', 'Coffee lover']
  },
  {
    id: 'student-7',
    name: 'Olivia Brown',
    program: 'Fine Arts',
    year: 2,
    bio: 'Creative soul looking for an inspiring space. I paint and play guitar (with headphones)!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    instagram: 'olivia.creates',
    linkedin: 'oliviabrown-art',
    likedListings: ['2', '4', '10', '11', '15'],
    budget: { min: 600, max: 1100 },
    preferences: ['Creative', 'Music friendly', 'Artistic']
  },
  {
    id: 'student-8',
    name: 'James Lee',
    program: 'Civil Engineering',
    year: 3,
    bio: 'Gym rat and foodie. Looking for someone to share meal prep and workout motivation!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    instagram: 'james.lifts',
    linkedin: 'jameslee-civil',
    likedListings: ['3', '5', '6', '9', '12'],
    budget: { min: 800, max: 1400 },
    preferences: ['Fitness enthusiast', 'Meal prep', 'Early bird']
  },
  {
    id: 'student-9',
    name: 'Sophie Martin',
    program: 'French Studies',
    year: 2,
    bio: 'Bilingual student who loves exploring Ottawa. Looking for adventure buddy!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    instagram: 'sophie.explores',
    linkedin: 'sophiemartin-french',
    likedListings: ['1', '6', '10', '11', '13'],
    budget: { min: 700, max: 1200 },
    preferences: ['Bilingual', 'Adventurous', 'Social']
  },
  {
    id: 'student-10',
    name: 'Ryan Patel',
    program: 'Economics',
    year: 3,
    bio: 'Finance nerd who cooks amazing Indian food. Will trade meals for clean dishes!',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150',
    instagram: 'ryan.cooks',
    linkedin: 'ryanpatel-econ',
    likedListings: ['2', '4', '7', '8', '15'],
    budget: { min: 900, max: 1500 },
    preferences: ['Foodie', 'Clean', 'Budget conscious']
  }
];

// Get students who liked a specific listing
export function getStudentsWhoLiked(listingId: string): Student[] {
  return students.filter(s => s.likedListings.includes(listingId));
}

// Get listing IDs sorted by popularity (most liked first)
export function getListingsByPopularity(): { listingId: string; likeCount: number }[] {
  const likeCounts: Record<string, number> = {};
  
  students.forEach(student => {
    student.likedListings.forEach(listingId => {
      likeCounts[listingId] = (likeCounts[listingId] || 0) + 1;
    });
  });
  
  return Object.entries(likeCounts)
    .map(([listingId, likeCount]) => ({ listingId, likeCount }))
    .sort((a, b) => b.likeCount - a.likeCount);
}
