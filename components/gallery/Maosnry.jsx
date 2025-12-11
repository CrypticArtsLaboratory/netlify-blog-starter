'use client'

import React, {useState, useMemo, useRef, useEffect} from 'react';

import Image from "next/image";

const Masonry = ({data, allowedArtists: allowedArtistData}) => {

    const [filter, setFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedArtist, setSelectedArtist] = useState('All Artists');
    const [showArtistPopover, setShowArtistPopover] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({left: 0, right: 'auto'});
    const [expandedRelease, setExpandedRelease] = useState(null);
    const [galleryItems, setGalleryItems] = useState(data);
    const [allowedArtistsList, setAllowedArtistsList] = useState(allowedArtistData);
    const [loading, setLoading] = useState(true);
    const artistPopoverRef = useRef(null);
    const artistButtonRef = useRef(null);

    // Load data from external JSON file
    // useEffect(() => {
    //     fetch('/data/gallery-items.json?v=20200801')
    //         .then(response => response.json())
    //         .then(data => {
    //             setGalleryItems(data);
    //             setAllowedArtistsList(allowedArtistData);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error loading galleryItems data:', error);
    //             setLoading(false);
    //         });
    // }, []);

    // Show loading state

    // if (loading) {
    //     return (
    //         <div style={{
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             height: '100vh',
    //             fontSize: '18px',
    //             color: '#666'
    //         }}>
    //             Loading galleryItems...
    //         </div>
    //     );
    // }


    // Get unique categories
    const categories = useMemo(() => {
        return ['All', ...new Set(data.map(r => r.category).filter(Boolean))];
    }, [data]);

    // Get filtered artists
    const artists = useMemo(() => {
        const uniqueArtists = [...new Set(galleryItems.map(r => r.artist).filter(Boolean))];
        const filteredArtists = allowedArtistsList.filter(artist => uniqueArtists.includes(artist));
        return filteredArtists.sort();
    }, [galleryItems, allowedArtistsList]);

    // Calculate popover position to keep it in viewport
    useEffect(() => {
        if (showArtistPopover && artistButtonRef.current && artistPopoverRef.current) {
            const buttonRect = artistButtonRef.current.getBoundingClientRect();
            const popoverWidth = 300; // min-width of popover
            const viewportWidth = window.innerWidth;
            const padding = 20; // padding from edge

            // Calculate if popover would overflow on the right
            const wouldOverflow = buttonRect.left + popoverWidth > viewportWidth - padding;

            if (wouldOverflow) {
                // Align popover to the right edge of the button
                setPopoverPosition({left: 'auto', right: 0});
            } else {
                // Default: align to left edge of button
                setPopoverPosition({left: 0, right: 'auto'});
            }
        }
    }, [showArtistPopover]);

    // Click outside to close popover
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (artistPopoverRef.current && !artistPopoverRef.current.contains(event.target)) {
                setShowArtistPopover(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter and sort galleryItems
    const filteredReleases = useMemo(() => {
        let filtered = galleryItems.filter(release => {

            const categoryMatch = filter === 'All' || release.category === filter;
            const artistMatch = selectedArtist === 'All Artists' || release.artist === selectedArtist;
            return categoryMatch && artistMatch;
        });

        // Sort by year only
        return filtered.sort((a, b) => {
            const yearA = a.year || '0';
            const yearB = b.year || '0';
            if (sortOrder === 'desc') {
                return yearB.localeCompare(yearA);
            } else {
                return yearA.localeCompare(yearB);
            }
        });
    }, [filter, sortOrder, selectedArtist, galleryItems]);

    // Toggle sort order
    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    // Handle image click
    const handleImageClick = (release) => {
        setExpandedRelease(release);
    };

    // Handle close
    const handleClose = () => {
        setExpandedRelease(null);
    };

    // Handle background click
    const handleOverlayClick = (e) => {
        if (e.target.className === 'expanded-overlay') {
            handleClose();
        }
    };

    return (
        <div className="masonry-grid-wrapper p-10 rounded-md border-gray-200 z-auto">
            {/* Header */}
            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderBottom: '1px solid #ddd',
                position: 'sticky',
                top: "70px",
            }}>
                {/* Controls */}
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* Category Filter Buttons */}
                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '20px',
                                    backgroundColor: filter === cat ? '#333' : '#e0e0e0',
                                    color: filter === cat ? 'white' : '#333',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort and Artist Filter */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        <span style={{fontSize: '13px', color: '#666'}}>Sort:</span>

                        {/* Year Sort */}
                        <button
                            onClick={toggleSortOrder}
                            style={{
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '20px',
                                backgroundColor: '#333',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            Year
                            <span style={{fontSize: '10px'}}>
                    {sortOrder === 'desc' ? '↓' : '↑'}
                  </span>
                        </button>

                        {/* Artist Filter with Popover */}
                        <div style={{position: 'relative'}} ref={artistPopoverRef}>
                            <button
                                ref={artistButtonRef}
                                onClick={() => setShowArtistPopover(!showArtistPopover)}
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '20px',
                                    backgroundColor: selectedArtist !== 'All Artists' ? '#333' : '#e0e0e0',
                                    color: selectedArtist !== 'All Artists' ? 'white' : '#333',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span>{selectedArtist === 'All Artists' ? 'Artists' : selectedArtist}</span>
                                <span style={{fontSize: '10px'}}>▼</span>
                            </button>

                            {/* Artist Popover with Smart Positioning */}
                            {showArtistPopover && (
                                <div
                                    className="artist-popover"
                                    style={{
                                        left: popoverPosition.left,
                                        right: popoverPosition.right
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px'
                                    }}>
                                        {/* All Artists Button */}
                                        <button
                                            onClick={() => {
                                                setSelectedArtist('All Artists');
                                                setShowArtistPopover(false);
                                            }}
                                            style={{
                                                padding: '8px 16px',
                                                border: 'none',
                                                borderRadius: '20px',
                                                backgroundColor: selectedArtist === 'All Artists' ? '#333' : '#e0e0e0',
                                                color: selectedArtist === 'All Artists' ? 'white' : '#333',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            All Artists
                                        </button>

                                        {/* Filtered Artist Buttons */}
                                        {artists.map(artist => (
                                            <button
                                                key={artist}
                                                onClick={() => {
                                                    setSelectedArtist(artist);
                                                    setShowArtistPopover(false);
                                                }}
                                                style={{
                                                    padding: '8px 16px',
                                                    border: 'none',
                                                    borderRadius: '20px',
                                                    backgroundColor: selectedArtist === artist ? '#333' : '#e0e0e0',
                                                    color: selectedArtist === artist ? 'white' : '#333',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    fontWeight: '500',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {artist}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="masonry-grid">
                {filteredReleases.map((item, index) => (
                    <div
                        key={index}
                        className="masonry-item"
                        onClick={() => handleImageClick(item)}
                    >
                        <Image
                            src={item.localImage}
                            alt={item.title || item.catalogNumber}
                            loading="lazy"
                            width="75"
                            height="75"
                        />
                    </div>
                ))}
            </div>

            {/* Expanded View */}
            {expandedRelease && (
                <div className="expanded-overlay" onClick={handleOverlayClick}>
                    <div className="expanded-content">
                        <button className="close-button" onClick={handleClose}>
                            ×
                        </button>

                        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto p-4 gap-8">
                            <div className="w-full md:w-1/2">
                                <Image
                                    src={expandedRelease.localImage}
                                    alt={expandedRelease.title || expandedRelease.catalogNumber}
                                    className="w-full h-auto object-contain"
                                    width={600}
                                    height={600}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <div style={{
                                    bottom: '70px',
                                    left: '15px',
                                    right: '15px',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}>
                                    <div style={{fontWeight: 'bold', fontSize: '16px', marginBottom: '5px'}}>
                                        {expandedRelease.artist || 'Various'}
                                    </div>
                                    <div style={{fontSize: '14px', marginBottom: '10px'}}>
                                        {expandedRelease.title}
                                    </div>
                                    <div style={{fontSize: '12px', opacity: 0.9}}>
                                        {expandedRelease.label} • {expandedRelease.year} • {expandedRelease.format}
                                    </div>
                                    {expandedRelease.releaseUrl && (
                                        <a
                                            href={expandedRelease.releaseUrl}
                                            target="_blank"
                                            style={{
                                                display: 'inline-block',
                                                marginTop: '10px',
                                                color: '#4a9eff',
                                                textDecoration: 'none',
                                                fontSize: '13px'
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View on Discogs →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Masonry;
