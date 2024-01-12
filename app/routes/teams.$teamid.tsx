// interior-deco/app/routes/app/services/[serviceId].tsx
import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { useParams } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';
import Footer from "~/components/Footer";
import TeamSingleSection from "../components/TeamSingleSection";

import oldImage from '../assets/images/about-old.jpg';
import finishedImage from '../assets/images/project7.jpeg';
import guyImage from '../assets/images/team-guy.jpg';
import lady3Image from '../assets/images/team-lady3.jpg';
import lady2Image from '../assets/images/team-lady2.jpg';


export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style." },
    { property: "og:title", content: "Interior Decorators Inc. - Transforming Spaces" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://drive.google.com/uc?export=view&id=1G6deIUVFQG1pD-yxvBXrSRhe591u1REy" },
    { property: "og:url", content: "https://interior-deco-kappa.vercel.app/" },
    { property: "og:description", content: "Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style." },
    { property: "og:site_name", content: "Interior Decorators Inc." },
  ];
};

export default function TeamSingle() {
  // State for Exclusive dropdown in Navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for Exclusive dropdown
  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Use useParams() to get the dynamic parameter
  const { teamid } = useParams();

  const BannerSection = (
    <div className="relative">
      <div className="h-60 bg-cover bg-center team-background"></div>
      <div className="absolute inset-0 flex justify-center items-end">
        <div className="bg-white py-8 px-16 rounded-t-[1rem]  flex flex-col items-center">
          <h2 className="sm:text-3xl font-bold font1 text-xl">Professional Single</h2>
          <p className="text-center text-gray-700">home/Team single {teamid}</p>
        </div>
      </div>
    </div>
  );

  const ShortBiographySection = (
      <div className="sm:w-[45rem] sm:mx-auto mt-[3rem] mx-[1.5rem] ">
        <h2 className="text-3xl font1 mb-4"> 
          Short Biography
        </h2>
        <p className="text-xs text-justify mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur nisl a metus lacinia, et ultrices purus finibus. Nulla facilisi. Phasellus bibendum, mi non tincidunt cursus, tortor urna luctus lectus, eu hendrerit felis arcu non ante.
          Sed euismod metus et vestibulum lacinia. Integer volutpat odio et lacus auctor, at hendrerit lectus cursus. 
        </p>
        <p className="text-xs text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur nisl a metus lacinia, et ultrices purus finibus. Nulla facilisi. Phasellus bibendum, mi non tincidunt cursus, tortor urna luctus lectus, eu hendrerit felis arcu non ante.
        </p>
      </div>
    );

const SimplicityAndQASection = (
    <div className="sm:w-[45rem] sm:mx-auto sm:mt-8 sm:flex sm:gap-x-8 mx-[1.5rem]">
     <div className="sm:w-[20rem]">
      <h2 className="text-md font2 sm:mt-0 mt-[3rem] mb-2">
        Simplicity and Functionality
      </h2>
      <p className="text-justify text-sm sm:text-xs mb-6">
        Sed euismod metus et vestibulum lacinia. Integer volutpat odio et lacus auctor, at hendrerit lectus cursus.
      </p>
      <p className="text-justify text-xs mb-6">
        Sed euismod metus et vestibulum lacinia. Integer volutpat odio et lacus auctor, at hendrerit lectus cursus. Vestibulum hendrerit justo nec eleifend varius. Suspendisse potenti.
      </p>

      {/* Project Design Bars */}
      <div className="sm:w-[20rem] mb-6">
        <p className="flex justify-between mb-1 max-w-[14rem] font-medium"><span>Project Design</span> <span>65%</span></p>
        {/* Skill bar */}
        <div className="h-1 w-[20rem] bg-customColor rounded-md border">
          <div className="h-1 w-[13rem] flex items-center">
            <div id="bar1" className="h-1 w-[12.6rem] bg-customColor2 rounded-md flex justify-end"></div>
            <div className="h-4 w-4 rounded-full border border-customColor2 border-[0.2rem] bg-white"></div>
          </div>
        </div>
      </div>

      {/* Repeat the skill bar sections for other projects */}
      {/* Project Design Bars 2 */}
      <div className="sm:w-[20rem] mb-6">
        <p className="flex justify-between mb-1 max-w-[20rem] font-medium"><span>Project Design</span> <span>95%</span></p>
        {/* Skill bar */}
        <div className="h-1 w-[20rem] bg-customColor rounded-md border">
          <div className="h-1 w-[19rem] flex items-center">
            <div id="bar1" className="h-1 w-[18.6rem] bg-customColor2 rounded-md flex justify-end"></div>
            <div className="h-4 w-4 rounded-full border border-customColor2 border-[0.2rem] bg-white"></div>
          </div>
        </div>
      </div>

      {/* Project Design Bars 3 */}
      <div className="sm:w-[20rem] mb-6">
        <p className="flex justify-between mb-1 max-w-[16rem] font-medium"><span>Project Design</span> <span>75%</span></p>
        {/* Skill bar */}
        <div className="h-1 w-[20rem] bg-customColor rounded-md border">
          <div className="h-1 w-[15rem] flex items-center">
            <div id="bar1" className="h-1 w-[14.5rem] bg-customColor2 rounded-md flex justify-end"></div>
            <div className="h-4 w-4 rounded-full border border-customColor2 border-[0.2rem] bg-white"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="sm:w-[18rem] sm:mt-0 mt-[3rem] ">
      <h2 className="text-md font2 mb-2">
        Question and Answer
      </h2>
      <p className="text-justify text-sm sm:text-xs mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur nisl a metus lacinia.
      </p>
      <div className="sm:w-[23rem]">
        {/* First Question */}
        <div className="bg-customColor sm:w-[19.5rem] py-2 px-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium font2 sm:text-xs text-sm flex items-center">
              So, How does this work?
            </p>
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
              <span className="icon-[ph--minus-bold] w-[16] h-[16] "></span>
            </div>
          </div>
          <p className="sm:w-[13rem] text-justify sm:text-xs text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Second Question */}
        <div className="sm:w-[19.5rem] mb-2">
          <div className="flex justify-between items-center py-2 px-3 border border-customColor2 mb-4 rounded-lg">
            <p className="font-medium font2 sm:text-xs text-sm flex items-center">
              Which cities do you operate in?
            </p>
            <div className="mt-1 h-8 w-8 rounded-full bg-customColor flex items-center justify-center">
              <span className="icon-[tabler--plus] w-[16] h-[16] "></span>
            </div>
          </div>
        </div>

        {/* Third Question */}
        <div className="sm:w-[19.5rem] mb-2">
          <div className="flex justify-between items-center py-2 px-3 border border-customColor2 rounded-lg mb-4">
            <p className="font-medium font2 sm:text-xs text-sm flex items-center">
              Hipcouch interior Design Service?
            </p>
            <div className="mt-1 h-8 w-8 rounded-full bg-customColor flex items-center justify-center">
              <span className="icon-[tabler--plus] w-[16] h-[16] "></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );


const TestimonialSection = (
  <div className="flex-col flex bg-customColor p-8 sm:py-24 items-center mt-[3rem] rounded-[2rem]">
    <h1 className="sm:w-1/2 mb-4 sm:mb-8 text-xl sm:text-3xl sm:mt-0 text-center font2 mt-16">
     our team members
    </h1>
    <div className="flex flex-col sm:flex-row sm:gap-x-2 gap-y-4">
      {/* First testimony card */}
      <div>
        <img className="sm:w-[9rem] object-cover w-[10rem] rounded-xl h-[12rem]" src={guyImage} alt="Team Member" />
      </div>

      {/* Second testimony card */}
      <div>
        <img className="sm:w-[9rem] w-[10rem] object-cover rounded-xl h-[12rem]" src={lady3Image}  alt="Team Member" />
      </div>

      {/* Third testimony card */}
      <div className="sm:max-w-[12rem] w-[9rem] rounded-xl bg-white h-[12rem] flex flex-col justify-around rounded-xl items-center sm:p-4">
        <div>
          <h3 className="text-sm font-medium font1">Raymond Gario</h3>
          <h5 className="text-xs">Sydney, Australia</h5>
        </div>
        <div className="flex gap-x-2 sm:gap-x-4">
          <span className="icon-[basil--facebook-solid] w-4 h-4 text-black"></span>
          <span className="icon-[mdi--twitter] w-4 h-4 text-black"></span>
          <span className="icon-[ri--linkedin-fill] w-4 h-4 text-black"></span>
          <span className="icon-[ri--instagram-line] w-4 h-4 text-black"></span>
        </div>
        <p className="flex flex-col text-gray-700 text-xs">
          123-456-7890
          <span className="text-gray-700">imdigo@gmail</span>
        </p>
      </div>

      {/* Fourth testimony card */}
      <div>
        <img className="sm:w-[9rem] w-[10rem] rounded-xl h-[12rem] object-cover" src={lady2Image}   alt="Team Member" />
      </div>
    </div>
  </div>
);  

const FormSection =  (
  <form className="max-w-[50rem] mx-auto mt-24 p-4 flex flex-col items-center">
    <fieldset className="flex flex-col items-center">
      <legend className="sm:text-3xl text-xl text-center font2 mb-8">
        Creative Project? Let's have  <br /> a productive talk
      </legend>

      <div className="flex flex-col sm:flex-row  justify-between sm:gap-x-4 gap-y-4 w-full sm:w-[30rem] mb-2">
        <div className="mb-4  ">
          <input
            className="border-b bg-transparent sm:w-[15rem]  w-[80vw] py-2  border-black border-b focus:outline-none focus:shadow-outline font-bold text-xs"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <input
            className="border-b bg-transparent w-[80vw] sm:w-[15rem] py-2 border-black focus:outline-none focus:shadow-outline  font-bold text-xs"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>

      <textarea
        className="border-b bg-transparent w-full py-2   sm:w-[30rem] border-b border-black focus:outline-none focus:shadow-outline font-bold text-xs sm:h-20 h-20"
        id="message"
        placeholder="Hello! I am interested in..."
      ></textarea>

      <div>
      <p className="sm:w-[27rem] mt-4  items-center flex gap-x-4">
            <span className=" icon-[ph--square] w-4 h-4 text-customColor2"></span>
            <span className="text-customColor2 text-xs">save my name email and website for the next time I comment</span>
          </p>
        <button className="mt-6 w-[8rem] sm:w-[9rem] text-[0.8rem] sm:text-xs flex items-center gap-x-2 bg-gray-800 text-white hover:bg-blue-700  font-bold py-3 sm:py-3 sm:pl-4 pl-4 rounded-md sm:rounded-xl">
          Send now
          <span className=" icon-[solar--arrow-right-linear] w-4 h-4 text-customColor2" ></span>
        </button>
        
      </div>
    </fieldset>
  </form>
);
  return (
    <div>
      <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
      {BannerSection}

      {/* Corrected prop name: teamId instead of teamid */}
      <TeamSingleSection teamId={teamid} />
      {ShortBiographySection}
      {SimplicityAndQASection}
      {TestimonialSection}
      {FormSection}
      <Footer />
    </div>
  );
}
