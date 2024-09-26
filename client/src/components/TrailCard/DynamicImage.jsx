import React, { useState, useEffect } from 'react';

const DynamicImage = ({ shortUrl, alt, className }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const resolveImageUrl = async () => {
      try {
        // First, follow the short URL
        const response = await fetch(shortUrl);
        const htmlText = await response.text();
        
        // Parse the HTML to find the og:image meta tag
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const metaTag = doc.querySelector('meta[property="og:image"]');
        
        if (metaTag) {
          setImageUrl(metaTag.getAttribute('content'));
        } else {
          // Fallback to a placeholder if the image URL is not found
          setImageUrl('https://picsum.photos/300/200');
        }
      } catch (error) {
        console.error('Error resolving image URL:', error);
        setImageUrl('https://picsum.photos/300/200'); // Fallback on error
      }
    };

    resolveImageUrl();
  }, [shortUrl]);

  return (
    <img 
      src={imageUrl || 'https://picsum.photos/300/200'} // Use placeholder while loading
      alt={alt}
      className={className}
    />
  );
};

export default DynamicImage;