// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './style/App.css';
import './style/style.css';

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [visibleTemplates, setVisibleTemplates] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const backendBaseUrl = 'http://localhost:5000/';
  const frontendBaseUrl = 'http://localhost:3000/';
  const thumbnailFolder = './images/thumbnails/';
  const largeImageFolder = './images/large/';

  useEffect(() => {
    fetch(`${backendBaseUrl}api/templates`
      )
      .then((response) => response.json())
      .then((data) => {
        setTemplates(data);
        setVisibleTemplates(data.slice(startIndex, startIndex + 4));
      })
      .catch((error) => {
        console.error('API Templates Get Error:', error);
      });
  }, [startIndex]);

  const handleThumbnailClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleNextClick = () => {
    const nextIndex = startIndex + 4;
    setStartIndex(nextIndex);
    setVisibleTemplates(templates.slice(nextIndex, nextIndex + 4));
  };

  const handlePreviousClick = () => {
    const previousIndex = startIndex - 4;
    setStartIndex(previousIndex);
    setVisibleTemplates(templates.slice(previousIndex, previousIndex + 4));
  };

  return (
    <div id="container">
      <header>
        Aaron Darling's Template Viewer Solution
      </header>
      <div id="main" role="main">
        <div id="large">
          <div class="group">
            {selectedTemplate && (
              <div>
                <img src={`${frontendBaseUrl}${largeImageFolder}${selectedTemplate.image}`} alt="Large Image" width="430" height="360" />
                <div class="details">
                  <p><strong>Title</strong> {`${selectedTemplate.title}`}</p>
                  <p><strong>Description</strong> {`${selectedTemplate.description}`}</p>
                  <p><strong>Cost</strong> {`$${selectedTemplate.cost}`}</p>
                  <p><strong>ID #</strong> {`${selectedTemplate.id}`}</p>
                  <p><strong>Thumbnail File</strong> {`${selectedTemplate.thumbnail}`}</p>
                  <p><strong>Large Image File</strong> {`${selectedTemplate.image}`}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="thumbnails">
          <div class="group">
            {visibleTemplates.map((template) => (
              <span
                key={template.id}
                className={`Thumbnail ${selectedTemplate === template ? 'selected' : ''}`}
                onClick={() => handleThumbnailClick(template)}
              >
                <a href="#" ><img src={`${frontendBaseUrl}${thumbnailFolder}${template.thumbnail}`} alt={template.id} /> </a>
              </span>   
            ))}
            {visibleTemplates && (
              <div className="Navigation">
                <button type="button" className='previous' onClick={handlePreviousClick} disabled={startIndex === 0}>
                   <img src="./images/previous.png" alt="Previous" /> 
                </button>
                <button type="button" className ='next' onClick={handleNextClick} disabled={startIndex + 4 >= templates.length}>
                  <img src="./images/next.png" alt="Next" disabled={startIndex + 4 >= templates.length} /> 
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  </div>
)}