
import React from 'react';

import teanImage from '../assets/images/person3.jpg';
import teamImage2 from '../assets/images/guy3.jpg';
import teamImage3 from '../assets/images/guy4.jpg';
import teamImage4 from '../assets/images/lady4.jpg';
import teamImage5 from '../assets/images/lady5.jpg';
import teamImage6 from '../assets/images/team-lady2.jpg';
import teamImage7 from '../assets/images/guy2.jpg';
import teamImage8 from '../assets/images/team-lady.jpg';

const TeamSingleSection = ({ teamId }) => {
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
  
    // Convert teamId to a number (assuming teamId is a string or number)
    const numericTeamId = parseInt(teamId, 10);
  
    // Find the team based on the numericTeamId
    const team = teams.find((s) => s.id === numericTeamId);
  
  if (!team) {
    // Handle the case where the team is not found
    return <div>Team not found</div>;
  }

  const { image, name, profession } = team;

  return (
    <div key={team.id} className="sm:mx-auto sm:w-[45rem] sm:flex sm:gap-x-8 sm:items-center mt-[5rem]">
      <div className="sm:w-[20rem] sm:mx-0 mx-[1.5rem]">
        <img className="sm:w-[20rem] object-cover rounded-[2rem] h-[22rem]" src={image} alt={name} />
      </div>
      <div className="sm:w-[20rem] mx-[1.5rem] flex flex-col sm:mx-0 mt-[2rem] sm:mt-0">
        <h2 className="text-4xl font2 font-regularr mb-1">{name}</h2>
        <p className="sm:text-sm font2 mb-4 text-gray-800">{profession}</p>
        <p className="mb-4 sm:text-xs text-sm text-gray-700">
          Sed euismod metus et vestibulum lacinia. Integer volutpat odio et lacus auctor, at hendrerit lectus cursus.
          Vestibulum hendrerit justo nec eleifend varius. Suspendisse potenti.
        </p>
        <div className="flex items-center w-[14rem] mb-4">
          <div className="flex justify-center sm:h-8 sm:w-8 h-10 w-10 items-center rounded-full bg-customColor">
            <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[ic--outline-email] text-customColor2 sm:w-4 sm:h-4 h-5 w-5"></span>
          </div>
          <p className="ml-4 sm:text-xs text-gray-700 text-sm">info@yourdomain.com</p>
        </div>
        <div className="flex items-center mb-4 w-[14rem]">
          <div className="flex justify-center sm:h-8 sm:w-8 h-10 w-10 items-center rounded-full bg-customColor">
            <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[icon-park-outline--phone-telephone] text-customColor2 sm:w-4 sm:h-4 h-5 w-5"></span>
          </div>
          <p className="ml-4 sm:text-xs text-gray-700 text-sm">+1-(123)-456-7890</p>
        </div>
        <div className="flex items-center mb-4 w-[14rem]">
          <div className="flex justify-center sm:h-8 sm:w-8 h-10 w-10 items-center rounded-full bg-customColor">
            <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[ion--earth-outline] text-customColor2 sm:w-4 sm:h-4 h-5 w-5"></span>
          </div>
          <p className="ml-4 sm:text-xs text-gray-700 text-sm">www.yourdomain.com</p>
        </div>
        <div className="flex gap-x-6 sm:gap-x-4 w-[14rem] mb-4 sm:-ml-2">
          <span className=" icon-[basil--facebook-solid] sm:w-3 sm:h-3 h-6 w-6 text-black"></span>
          <span className=" icon-[mdi--twitter] sm:w-3 sm:h-3 h-6 w-6 text-black"></span>
          <span className=" icon-[ri--linkedin-fill] sm:w-3 sm:h-3 h-6 w-6 text-black"></span>
          <span className=" icon-[ri--instagram-line sm:w-3 sm:h-3 h-6 w-6 text-black"></span>
        </div>
      </div>
    </div>
  );
};

export default TeamSingleSection;



