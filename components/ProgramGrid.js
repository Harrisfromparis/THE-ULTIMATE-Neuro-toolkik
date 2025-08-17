// components/ProgramGrid.js
import { useState, useMemo, useEffect } from 'react';
import ProgramCard from './ProgramCard';

export default function ProgramGrid({ programs, categories, countries, stats }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResearchBacked, setShowResearchBacked] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24; // items per page

  const isFree = (program) => {
    const p = (program.price || '').toString().toLowerCase();
    if (!p) return true; // missing price -> treat as free
    if (p.includes('free')) return true; // e.g., "free", "free tier"
    if (p.includes('open source')) return true;
    if (p.replace(/[^0-9]/g, '') === '0') return true; // "$0"
    return false;
  };

  const platforms = ['iOS', 'Android', 'Windows', 'Mac', 'Web', 'Chrome Extension', 'Physical Robot', 'Wearable Device', 'Podcast'];

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || program.country === selectedCountry;
      const matchesPlatform = selectedPlatform === 'All' || program.platforms?.includes(selectedPlatform);
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesResearchBacked = !showResearchBacked || program.researchBacked;
      const matchesFeatured = !showFeatured || program.featured;
      
      return matchesCategory && matchesCountry && matchesPlatform && matchesSearch && matchesResearchBacked && matchesFeatured;
    });
  }, [programs, selectedCategory, selectedCountry, selectedPlatform, searchTerm, showResearchBacked, showFeatured]);

  // Sort: free first, then A–Z
  const sortedPrograms = useMemo(() => {
    return filteredPrograms.slice().sort((a, b) => {
      const af = isFree(a);
      const bf = isFree(b);
      if (af !== bf) return af ? -1 : 1; // free first
      return (a.title || '').localeCompare(b.title || '');
    });
  }, [filteredPrograms]);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedCountry, selectedPlatform, searchTerm, showResearchBacked, showFeatured]);

  const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / pageSize));
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedPrograms = sortedPrograms.slice(startIdx, endIdx);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Statistics Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">World's Largest Verified Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{stats.totalResources}</div>
            <div className="text-sm opacity-90">Total Resources</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.researchBacked}</div>
            <div className="text-sm opacity-90">Research-Backed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.freeResources}</div>
            <div className="text-sm opacity-90">Free Resources</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.openSourceProjects}</div>
            <div className="text-sm opacity-90">Open Source</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.downloadableGuides}</div>
            <div className="text-sm opacity-90">Downloadable Guides</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.totalDownloads}</div>
            <div className="text-sm opacity-90">Total Downloads</div>
          </div>
        </div>
        <div className="mt-4 text-sm opacity-90">
          ✅ All Links Verified Working • 🎮 Gaming Resources • 🎓 Oxford Educational Materials • 🌍 International University Resources • 🇧🇷 Brazilian ABRA Resources • 🧠 Neurodiversity Hub Tools
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <h3 className="text-2xl font-bold text-textPrimary">
            Browse Programs ({filteredPrograms.length} of {programs.length})
          </h3>
          <div className="text-sm text-textSecondary">
            Showing {filteredPrograms.length === 0 ? 0 : startIdx + 1}
            -{Math.min(endIdx, filteredPrograms.length)} of {filteredPrograms.length}
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search programs, descriptions, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-textPrimary">Filters</label>
            <div className="space-y-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showResearchBacked}
                  onChange={(e) => setShowResearchBacked(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Research-backed only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showFeatured}
                  onChange={(e) => setShowFeatured(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Featured only</span>
              </label>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            setSelectedCategory('All');
            setSelectedCountry('All');
            setSelectedPlatform('All');
            setSearchTerm('');
            setShowResearchBacked(false);
            setShowFeatured(false);
          }}
          className="bg-gray-100 hover:bg-gray-200 text-textPrimary px-4 py-2 rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedPrograms.map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>

      {/* Pagination Controls */}
      {filteredPrograms.length > pageSize && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded border ${currentPage === 1 ? 'text-gray-400 border-gray-200 bg-white' : 'text-textPrimary border-border hover:bg-gray-50'}`}
          >
            Previous
          </button>
          {/* Page numbers (compact) */}
          {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => {
            // Show first 3, last, and current +/-1 if many pages
            const page = i + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded border ${isActive ? 'bg-primary text-white border-primary' : 'text-textPrimary border-border hover:bg-gray-50'}`}
              >
                {page}
              </button>
            );
          })}
          {totalPages > 7 && (
            <>
              <span className="px-2">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-2 rounded border ${currentPage === totalPages ? 'bg-primary text-white border-primary' : 'text-textPrimary border-border hover:bg-gray-50'}`}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded border ${currentPage === totalPages ? 'text-gray-400 border-gray-200 bg-white' : 'text-textPrimary border-border hover:bg-gray-50'}`}
          >
            Next
          </button>
        </div>
      )}

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textSecondary text-lg">No programs found matching your criteria.</p>
          <button 
            onClick={() => {
              setSelectedCategory('All');
              setSelectedCountry('All');
              setSelectedPlatform('All');
              setSearchTerm('');
              setShowResearchBacked(false);
              setShowFeatured(false);
            }}
            className="mt-4 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
