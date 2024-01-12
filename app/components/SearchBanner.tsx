import React from 'react';

import projectImage from '../assets/images/project1.jpg';
import projectImage2 from '../assets/images/other2.jpeg';
import projectImage3 from '../assets/images/project3.jpeg';
import projectImage5 from '../assets/images/progect5.jpg';
import projectImage4 from '../assets/images/project4.jpeg';
import projectImage6 from '../assets/images/project6.jpeg';
import projectImage7 from '../assets/images/project7.jpeg';
import projectImage8 from '../assets/images/other.jpeg';

const SearchBanner = ({ projectId }) => {

    const projectsData = [
        { id: '1', imageClass: 'project-search1' },
        { id: '2', imageClass: 'project-search2' },
        { id: '3', imageClass: 'project-search3' },
        { id: '4', imageClass: 'project-search4' },
        { id: '5', imageClass: 'project-search5' },
        { id: '6', imageClass: 'project-search6' },
        { id: '7', imageClass: 'project-search7' },
        { id: '8', imageClass: 'project-search8' },
        { id: '9', imageClass: 'project-search9' },
        { id: '10', imageClass: 'project-search10' },
        { id: '11', imageClass: 'project-search11' },
        { id: '12', imageClass: 'project-search12' },
      ];
    
      // Find the corresponding service data based on the serviceId
      const project = projectsData.find((s) => s.id === projectId);
    
      if (!project) {
        // Handle the case where the service is not found
        return <div>Service not found</div>;
      }
      // Destructure data from the service object
      const { imageClass } = project;

  return (
    <div className="w-screen mt-[5rem] mb-[6rem]">
      <div className={`sm:h-[26rem] h-[16rem] bg-cover bg-center project-search sm:w-[40rem] flex justify-center sm:mx-auto items-center rounded-[2rem] mx-[1.5rem] ${imageClass}`}>
        <div className="mt-1 sm:h-20 h-12 w-12 sm:w-20 rounded-full bg-white flex items-center justify-center">
          <span className="icon-[solar--play-bold] sm:w-6 sm:h-6 text-[cda274] h-4 w-4"></span>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
