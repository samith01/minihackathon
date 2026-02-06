import { useState, useRef } from 'react';
import { getStudentsWhoLiked } from '../data/students';
import { offCampusListings } from '../data/offCampusListings';
import { useFavorites } from '../context/FavoritesContext';
import type { Student } from '../data/students';
import './TinderSwipe.css';

interface TinderSwipeProps {
  onBack: () => void;
  listingId: string;
}

export function TinderSwipe({ onBack, listingId }: TinderSwipeProps) {
  // Filter students who liked this listing
  const interestedStudents = getStudentsWhoLiked(listingId);
  const { favorites } = useFavorites();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<Student[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showMatch, setShowMatch] = useState<Student | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentStudent = interestedStudents[currentIndex];
  const isFinished = currentIndex >= interestedStudents.length;

  const getListingById = (id: string) => offCampusListings.find(l => l.id === id);
  const selectedListing = getListingById(listingId);

  // Find common listings between user favorites and student's liked listings
  const getCommonListings = (student: Student) => {
    return student.likedListings
      .filter(id => favorites.includes(id))
      .map(id => getListingById(id))
      .filter(Boolean);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === 'right') {
        setMatches(prev => [...prev, currentStudent]);
        setShowMatch(currentStudent);
        setTimeout(() => setShowMatch(null), 2500);
      }
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handleSwipe('left');
    if (e.key === 'ArrowRight') handleSwipe('right');
  };

  if (interestedStudents.length === 0) {
    return (
      <div className="swipe-container">
        <div className="swipe-finished">
          <h2>No students found 😕</h2>
          <p>No students have shown interest in this listing yet.</p>
          <button className="btn-back" onClick={onBack}>
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="swipe-container">
        <div className="swipe-finished">
          <h2>You've seen all interested students! 🎉</h2>
          <p>You matched with {matches.length} potential roommate{matches.length !== 1 ? 's' : ''}</p>
          
          {matches.length > 0 && (
            <div className="matches-list">
              <h3>Your Matches</h3>
              {matches.map(student => {
                const commonListings = getCommonListings(student);
                return (
                  <div key={student.id} className="match-card">
                    <img src={student.avatar} alt={student.name} />
                    <div className="match-info">
                      <h4>{student.name}</h4>
                      <p>{student.program}</p>
                      {commonListings.length > 0 && (
                        <div className="common-listings">
                          <span className="common-label">🏠 Common interests:</span>
                          {commonListings.map(listing => listing && (
                            <span key={listing.id} className="common-listing-tag">{listing.title}</span>
                          ))}
                        </div>
                      )}
                      <div className="match-socials">
                        {student.instagram && (
                          <a href={`https://instagram.com/${student.instagram}`} target="_blank" rel="noopener noreferrer">
                            Instagram
                          </a>
                        )}
                        {student.linkedin && (
                          <a href={`https://linkedin.com/in/${student.linkedin}`} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <button className="btn-back" onClick={onBack}>
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="swipe-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="swipe-header">
        <button className="btn-back-icon" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="header-info">
          <h2>Find Your Roommate</h2>
          {selectedListing && <p className="listing-context">for {selectedListing.title}</p>}
        </div>
        <span className="counter">{currentIndex + 1} / {interestedStudents.length}</span>
      </div>

      <div className="swipe-instructions">
        <span>← Pass</span>
        <span>Use arrow keys or buttons</span>
        <span>Match →</span>
      </div>

      {showMatch && (
        <div className="match-popup">
          <span className="match-emoji">🎉</span>
          <span>It's a match with {showMatch.name}!</span>
        </div>
      )}

      <div className="cards-stack">
        {/* Next card preview */}
        {currentIndex + 1 < interestedStudents.length && (
          <div className="swipe-card preview">
            <div className="card-image">
              <img src={interestedStudents[currentIndex + 1].avatar} alt="Next" />
            </div>
          </div>
        )}
        
        {/* Current card */}
        <div 
          ref={cardRef}
          className={`swipe-card ${swipeDirection ? `swiping-${swipeDirection}` : ''}`}
        >
          <div className="card-image">
            <img src={currentStudent.avatar} alt={currentStudent.name} />
            <div className="card-gradient" />
          </div>
          
          <div className="card-content">
            <h3>{currentStudent.name}, Year {currentStudent.year}</h3>
            <p className="card-program">{currentStudent.program}</p>
            <p className="card-bio">{currentStudent.bio}</p>
            
            <div className="card-prefs">
              <div className="pref-item">
                <span className="pref-label">Budget</span>
                <span className="pref-value">${currentStudent.budget.min}-${currentStudent.budget.max}</span>
              </div>
              <div className="pref-item">
                <span className="pref-label">Year</span>
                <span className="pref-value">Year {currentStudent.year}</span>
              </div>
              <div className="pref-item">
                <span className="pref-label">Listings Liked</span>
                <span className="pref-value">{currentStudent.likedListings.length}</span>
              </div>
            </div>

            <div className="card-tags">
              {currentStudent.preferences.map((pref, i) => (
                <span key={i} className="tag">{pref}</span>
              ))}
            </div>

            <div className="card-socials">
              {currentStudent.instagram && (
                <a href={`https://instagram.com/${currentStudent.instagram}`} target="_blank" rel="noopener noreferrer" className="social-badge instagram">
                  @{currentStudent.instagram}
                </a>
              )}
              {currentStudent.linkedin && (
                <a href={`https://linkedin.com/in/${currentStudent.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-badge linkedin">
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {swipeDirection === 'left' && <div className="swipe-label nope">NOPE</div>}
          {swipeDirection === 'right' && <div className="swipe-label like">LIKE</div>}
        </div>
      </div>

      <div className="swipe-actions">
        <button className="swipe-btn pass" onClick={() => handleSwipe('left')}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button className="swipe-btn like" onClick={() => handleSwipe('right')}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="matches-counter">
        {matches.length > 0 && (
          <span>💕 {matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
        )}
      </div>
    </div>
  );
}
