'use client'

import React, {useState} from 'react';
import Masonry from "/components/gallery/Maosnry";

const GallerySection = ({data, galleryData, profile}) => {

    const [loading, setLoading] = useState(true);

    // Load data from external JSON file
    // useEffect(() => {
    //     fetch(`/data/${data.music}/gallery-items.json?v=20200801`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setGallery(data);
    //             setAllowedArtists(data.profile?.allowedArtists);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error loading Gallery data:', error);
    //             setLoading(false);
    //         });
    // }, [data]);

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
    //             Loading Gallery...
    //         </div>
    //     );
    // }

    return (
        <section id="music-production" className="section p-10  mt-8">
            <div className="text-5xl ">{data.label}</div>
            <h2 className="text-3xl  mb-6">{data.title}</h2>
            <br/>
            <Masonry data={galleryData} allowedArtists={profile.allowedArtists}/>
            <div className="p-10 relative">

            </div>
        </section>
    );
};

export default GallerySection;
