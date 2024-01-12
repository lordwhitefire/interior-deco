import React from 'react';
import { Link } from '@remix-run/react';
import logoImage from '../assets/logo/Logo.png';

const LastSection = (
    <div className="flex flex-col sm:flex-row sm:mt-12 mx-auto max-w-[50rem] p-6 sm:justify-between items-start">

      {/* First Division */}
      <div className="mb-16   hidden sm:block">
        <div className="mb-2 ">
          <img className="object-contain w-auto h-6 mx-auto sm:mx-0 "  src={logoImage} alt="Your Company" />
        </div>
        <p className="text-gray-800 mt-4 mb-4 sm:w-[14rem] text-[0.8rem] text-center sm:text-left">it is a long established fact that a reader will be distracted lookings </p>
        <div className="flex gap-x-6 sm:gap-x-4 ml-16 sm:ml-0 ">
          <span className=" icon-[basil--facebook-solid] w-4 h-4 text-black "></span>
          <span className=" icon-[mdi--twitter] w-4 h-4 text-black "></span>
          <span className=" icon-[ri--linkedin-fill] w-4 h-4 text-black "></span>
          <span className=" icon-[ri--instagram-line] w-4 h-4 text-black "></span>
        </div>
      </div>

      {/* Second Division */}
      <div className="mb-8 hidden sm:block text-[0.8rem] sm:mb-0">
        <ul className="flex flex-col ">
          <li className=" sm:ml-3 font-medium font2 text-sm ">page links</li>
          <Link to="/about" className="hover:bg-gray-900 text-black rounded-md px-3 py-2 font-medium mt-2 hover:text-white" aria-current="page">
        about us
      </Link>
      <Link to="/project" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
        projects
      </Link>
      <Link to="/team" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
        our team
      </Link>
      <Link to="/faq" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
        faq's
      </Link>
        </ul>
      </div>

      {/* Third Division */}
      <div className="mb-8   hidden sm:block text-[0.8rem] sm:mb-0">
        <ul className="flex flex-col gap-y-2">
          <li className="  font2 text-sm">services</li>
          <li>Kitchen</li>
          <li>living room</li>
          <li>bathroom</li>
          <li>dressing hall</li>
          <li>bedroom</li>
        </ul>
      </div>
      <div className="flex sm:hidden w-full mt-12  mb-6 justify-around items-start">
         {/* Second Division */}
      <div className="sm:hidden  text-[1rem] sm:mb-0">
        <ul className="flex flex-col  items-start gap-y-2">
          <li className=" ml-3 text-[1.3rem] font-semibold font2  ">page links</li>
          <Link to="/about" className="hover:bg-gray-900 text-black rounded-md px-3 py-2 font-medium mt-2 hover:text-white" aria-current="page">
        about us
      </Link>
      <Link to="/project" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
        projects
      </Link>
      <Link to="/team" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
        our team
      </Link>
      <Link to="/faq" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
        faq's
      </Link>
        </ul>
      </div>

      {/* Third Division */}
      <div className="sm:hidden font2 font-medium text-[1rem] sm:mb-0">
        <ul className="flex flex-col items-start gap-y-5">
          <li className=" text-[1.3rem] font-semibold font2">services</li>
          <li>Kitchen</li>
          <li>living room</li>
          <li>bathroom</li>
          <li>dressing hall</li>
          <li>bedroom</li>
        </ul>
      </div>
      </div>

      {/* Fourth Division */}
      <div className="   text-[1rem] font2 font-medium   sm:text-[0.8rem] mb-8">
        <h2 className="sm:text-sm text-[1.3rem] font-semibold  mb-4">Contact</h2>
        <p className="text-gray-800 mb-4 sm:w-4/5 w-4/5">55 Eastwood, Birchwood, New york 11201 </p>
        <p className="text-gray-800 mb-2 w-2/5">Email: victormakuo2002@gmail.com</p>
        <p className="text-gray-800">Phone: +(123)-456-7890</p>
      </div>

  {/* First Division */}
  <div className=" sm:hidden">
        <div className="mb-2 ">
          <img className="object-contain w-auto h-6  sm:mx-0 "  src={logoImage} alt="Your Company" />
        </div>
        <p className="text-gray-800 mt-4 mb-4 w-4/5 text-[1rem] font2 font-medium text-left sm:text-left">it is a long established fact that a reader will be distracted lookings </p>
        <div className="flex gap-x-6 sm:gap-x-4  ">
          <span className=" icon-[basil--facebook-solid] w-4 h-4 text-black "></span>
          <span className=" icon-[mdi--twitter] w-4 h-4 text-black "></span>
          <span className=" icon-[ri--linkedin-fill] w-4 h-4 text-black "></span>
          <span className=" icon-[ri--instagram-line] w-4 h-4 text-black "></span>
        </div>
      </div>

    </div>
  );


const Footer = () => {
  return (
    <div >
        {LastSection}
    <div className="w-screen bg-customColor3 flex items-center justify-center text-white text-xs sm:text-md">
      <p>
        copyrights @ lordwhitefire inc trademark policy
      </p>
    </div>
    </div >
  );
}

export default Footer;
