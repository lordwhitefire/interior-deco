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


const ProjectSection = () => {
  // Arrays for generating data
  const categories = [
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'living-area', name: 'Living Area' },
  ];

  
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

  const numbers = [
    { id: '1', name:1 },
    { id: '2', name: 2 },
    { id: '3', name: 3},
    { id: '4', name: 4 },
  ];


  return (
    <div className="flex flex-col sm:mx-0 mx-2 mt-16 sm:mt-20 items-center">
      {/* Generating div for categories */}
      <div className="flex justify-between border border-customColor2 mb-2 sm:mb-4 w-[20rem] sm:w-[30rem]">
        {categories.map((category) => (
          <p
            key={category.id}
            className={`w-[7rem] sm:w-[7rem] text-[0.8rem] sm:text-sm hover:bg-customColor2 text-black hover:text-white font-bold py-2 sm:py-2 flex justify-center rounded-md sm:rounded-md`}
          >
            {category.name}
          </p>
        ))}
      </div>
      {/* Generating figures */}
      <div className="sm:w-[44rem]  grid grid-cols-1  sm:grid-cols-2 ">
        {projects.map((project) => (
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
      {/* Generating numbers */}
      <div className="flex justify-between w-[13rem]">
        {numbers.map((number) => (
          <div key={number.id} className={`mt-1 h-10 w-10 rounded-full ${number.id === '1' ? 'bg-customColor' : 'border border-customColor2'} flex items-center justify-center `}>
            {number.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
