// components/CandidateCard.tsx
import Image from 'next/image';

// interface CandidateProfile {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   resume: string;
//   skills: string[];
//   totalExperience: string;
//   currentJobLocation: string;
//   state: string;
//   currentSalary: string;
//   linkedinProfile?: string;
//   githubProfile?: string;
// }

export default function CandidateCard({ candidate }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header with avatar and basic info */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
            {candidate.image && (
              <Image 
                src={candidate.image} 
                alt={candidate.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{candidate.name}</h3>
            <p className="text-gray-600 text-sm">{candidate.currentJobLocation}, {candidate.state}</p>
          </div>
        </div>
      </div>

      {/* Body with details */}
      <div className="p-4">
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500">Experience</span>
            <p className="font-medium">{candidate.totalExperience} years</p>
          </div>

          <div>
            <span className="text-sm text-gray-500">Skills</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {candidate.skills?.map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-500">Expected Salary</span>
            <p className="font-medium">${candidate.currentSalary}</p>
          </div>
        </div>
      </div>

      {/* Footer with actions */}
      <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
        <a 
          href={candidate.resume} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          View Resume
        </a>
        <div className="flex space-x-2">
          {candidate.linkedinProfile && (
            <a href={candidate.linkedinProfile} target="_blank">
              <LinkedInIcon className="h-5 w-5 text-[#0077b5]" />
            </a>
          )}
          {candidate.githubProfile && (
            <a href={candidate.githubProfile} target="_blank">
              <GithubIcon className="h-5 w-5 text-gray-800" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple icon components (or use from a library like Lucide)
function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
    </svg>
  );
}

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}