import React from 'react';
import { Link } from '@remix-run/react';


import projectImage from '../assets/images/project1.jpg';
import projectImage2 from '../assets/images/other2.jpeg';
import projectImage3 from '../assets/images/project3.jpeg';
import projectImage5 from '../assets/images/progect5.jpg';
import projectImage4 from '../assets/images/project4.jpeg';
import projectImage6 from '../assets/images/project6.jpeg';
import projectImage7 from '../assets/images/project7.jpeg';
import projectImage8 from '../assets/images/other.jpeg';


const OtherProjectsSection = ({ selectedProjectId }) => {
  // Your array of projects
  const projects = [
    { id: '1', imagePath: projectImage, title: 'UrbanGlow Living Space', description: 'Decor/Architecture' },
    { id: '2', imagePath: projectImage2, title: 'GlamSeat Terrace', description: 'Decor/Architecture' },
    { id: '3', imagePath: projectImage3, title: 'PlushPine Parlor', description: 'Decor/Architecture' },
    { id: '4', imagePath: projectImage4, title: 'GoldenGlow Creativespace', description: 'Decor/Architecture' },
    { id: '5', imagePath: projectImage5, title: 'Celestial Scape lounge', description: 'Decor/Architecture' },
    { id: '6', imagePath: projectImage6, title: 'Starburst Serenity Suite', description: 'Decor/Architecture' },
    { id: '7', imagePath: projectImage7, title: 'BlissfulAsh Escape', description: 'Decor/Architecture' },
    { id: '8', imagePath: projectImage8, title: 'WhiteWaltz Retreat', description: 'Decor/Architecture' },
    // Add other projects with their details
  ];

  // Function to get four random projects excluding the selectedProjectId
  const getRandomProjects = (allProjects, selectedId) => {
    const shuffledProjects = allProjects.sort(() => 0.5 - Math.random());
    const selectedProjects = shuffledProjects.slice(0, 4).filter(project => project.id !== selectedId);
    return selectedProjects;
  };

  // Get four random projects
  const randomProjects = getRandomProjects(projects, selectedProjectId);

  return (
    <div className="flex flex-col items-center">
       <h2 className="text-2xl font2">
    Other projects
  </h2>
    <div className="max-w-[44rem] mx-auto grid grid-cols-1 sm:grid-cols-2">
      {randomProjects.map((project) => (
        <figure key={project.id} className="sm:w-[22rem] p-4">
          <Link to={`/projects/${project.id}`}>
            <img src={project.imagePath} alt={`Project ${project.id}`} className="w-full h-auto mb-4" />
          </Link>
          <figcaption className="flex text-gray-800 justify-between p-2">
            <p>
              <span className="font1">{project.title}</span><br />
              <span className="text-sm text-gray-800">{project.description}</span>
            </p>
            <div className={`mt-1 h-10 w-10 rounded-full bg-customColor flex items-center justify-center`}>
              <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
    </div >
  );
};

export default OtherProjectsSection;
