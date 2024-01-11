import React from 'react';
import { Link } from '@remix-run/react';


import teanImage from '../assets/images/person3.jpg';
import teamImage2 from '../assets/images/guy3.jpg';
import teamImage3 from '../assets/images/guy4.jpg';
import teamImage4 from '../assets/images/lady4.jpg';
import teamImage5 from '../assets/images/lady5.jpg';
import teamImage6 from '../assets/images/team-lady2.jpg';
import teamImage7 from '../assets/images/guy2.jpg';
import teamImage8 from '../assets/images/team-lady.jpg';

const TeamSection = () => {

  const teams = [
    { id: 1, image: teanImage, name: 'John Doe', location: 'New York, USA', profession: 'Designer' },
    { id: 2, image: teamImage2, name: 'Michael Brown', location: 'Los Angeles, USA', profession: 'Architect' },
    { id: 3, image: teamImage3, name: 'Robert Johnson', location: 'Chicago, USA', profession: 'Interior Decorator' },
    { id: 4, image: teamImage4, name: 'Alice Taylor', location: 'San Francisco, USA', profession: 'Project Manager' },
    { id: 5, image: teamImage5, name: 'Jane Smith', location: 'Miami, USA', profession: 'Graphic Designer' },
    { id: 6, image: teamImage6, name: 'Sophia White', location: 'Austin, USA', profession: 'Landscaper' },
    { id: 7, image: teamImage7, name: 'David Miller', location: 'Seattle, USA', profession: 'Marketing Specialist' },
    { id: 8, image: teamImage8, name: 'Olivia Davis', location: 'Denver, USA', profession: 'Software Engineer' },
  ];
  
  
  return (
    <div className="sm:max-w-[50rem] w-screen sm:px-0 mx-auto flex justify-center flex-wrap sm:gap-x-2 gap-y-4 gap-x-0 sm:mt-[8rem] mt-[4rem]">
      {teams.map((team) => (
        <figure key={team.id} className="sm:w-[12rem] w-[10rem] p-4">
           <Link to={`/teams/${team.id}`}>
            <img src={team.image} alt={`Project ${team.id}`} className=" sm:w-[9rem] w-[10rem] object-cover rounded-xl h-[12rem]  mb-1 " />
          </Link>
          <figcaption className="flex text-gray-800 items-center flex-col p-2">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium font1">{team.name}</h3>
              <h5 className="text-xs">{team.location}</h5>
            </div>
            <div className="flex justify-center gap-x-2 mt-2 sm:gap-x-2">
              <span className="icon-[basil--facebook-solid] w-4 h-4 text-black"></span>
              <span className="icon-[mdi--twitter] w-4 h-4 text-black"></span>
              <span className="icon-[ri--linkedin-fill] w-4 h-4 text-black"></span>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default TeamSection;
