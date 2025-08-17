// components/ProgramCard.js
import Link from 'next/link';
import { slugify } from '../lib/slug';

export default function ProgramCard({ program }) {
  const isFree = () => {
    const p = (program.price || '').toString().toLowerCase();
    if (!p) return true;
    if (p.includes('free')) return true;
    if (p.includes('open source')) return true;
    if (p.replace(/[^0-9]/g, '') === '0') return true;
    return false;
  };

  const normalizeUrl = (url) => {
    if (!url) return '#';
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    // if it looks like domain without protocol, prefix https
    return `https://${trimmed}`;
  };
  const websiteUrl = normalizeUrl(program.website);
  const isRealWebsite = (url) => {
    if (!url || url === '#') return false;
    try {
      const u = new URL(url);
      const host = (u.hostname || '').toLowerCase();
      if (host.endsWith('example.com') || host.endsWith('example.org') || host.endsWith('example.net')) return false;
      if (host === 'localhost' || host.startsWith('127.')) return false;
      return true;
    } catch {
      return false;
    }
  };
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    return stars;
  };

  return (
    <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={program.imageUrl || '/images/placeholder.svg'}
          alt={program.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.svg'
          }}
        />
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">
                <Link href={`/programs/${slugify(program.title)}`} className="hover:underline">
                  {program.title}
                </Link>
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {renderStars(program.rating)}
                  <span className="ml-1 text-sm text-textSecondary">{program.rating}</span>
                </div>
                {program.featured && (
                  <span className="bg-accent text-white text-xs px-2 py-1 rounded">Featured</span>
                )}
                {program.researchBacked && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Research-backed</span>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-textSecondary text-sm mb-3 line-clamp-2">{program.description}</p>
          
          <div className="mb-3">
            <p className="text-xs text-textSecondary mb-1">
              <strong>For:</strong> {program.ageGroup}
            </p>
            <p className="text-xs text-textSecondary">
              <strong>Platforms:</strong> {program.platforms?.join(', ')}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="bg-secondary text-textPrimary text-xs px-2 py-1 rounded">
              {program.category}
            </span>
            <span className="bg-secondary text-textPrimary text-xs px-2 py-1 rounded">
              {program.country}
            </span>
            {program.price && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {program.price}
              </span>
            )}
            {isFree() && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Free</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {isRealWebsite(websiteUrl) && (
                <a 
                  href={websiteUrl}
                  rel="noopener noreferrer nofollow"
                  title={`Open ${program.title} website`}
                  className="bg-primary hover:bg-accent text-white text-sm px-3 py-1 rounded transition-colors"
                >
                  Visit Website
                </a>
              )}
              <Link href={`/programs/${slugify(program.title)}`} className="bg-gray-100 hover:bg-gray-200 text-textPrimary text-sm px-3 py-1 rounded transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
