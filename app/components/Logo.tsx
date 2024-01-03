import React from 'react';

import icon1 from '../assets/icon/01.svg';
import icon2 from '../assets/icon/02.svg';
import icon3 from '../assets/icon/03.svg';
import icon4 from '../assets/icon/04.svg';
import icon5 from '../assets/icon/05.svg';
import project1Image from '../assets/images/Modern_kitchen.jpg';
 import project2Image from '../assets/images/modern_cupboard.jpg';
 import project3Image from '../assets/images/modern_dining.jpg';
 import project4Image from '../assets/images/modern_reading.jpg';

 

const LogoSection = () => {

    const projectSection = (
        <div className="p-8 mx-auto max-w-[50rem]">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-4xl font-medium font2 mb-4">Follow Our Projects</h2>
          <p className="text-gray-700 text-center text-[0.67rem] sm:w-1/2">
            It is a long established fact that a reader will be distracted by the of readable content of page looking at its layouts points.
          </p>
        </div>
        <div className="flex flex-wrap justify-center -mx-4">
          <figure className="sm:w-1/2 w-full p-4">
            <img src={project1Image} alt="Project 1" className="w-full h-auto mb-4 rounded-tr-[2rem] sm:rounded-tr-[4rem]" />
            <figcaption className="flex text-gray-800 justify-between p-2">
              <p>
                <span className="font1">Modern Kitchen</span><br />
                <span className="text-sm text-gray-800">Decor/Architecture</span>
              </p>
              <div className="mt-1 h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
              </div>
            </figcaption>
          </figure>
          <figure className="sm:w-1/2 w-full p-4">
            <img src={project2Image} alt="Project 2" className="w-full h-auto mb-4 rounded-tl-[2rem] sm:rounded-tl-[4rem]" />
            <figcaption className="flex text-gray-800 justify-between p-2">
              <p>
                <span className="font1">Modern Kitchen</span><br />
                <span className="text-sm text-gray-800">Decor/Architecture</span>
              </p>
              <div className="mt-1 h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
              </div>
            </figcaption>
          </figure>
          <figure className="sm:w-1/2 w-full p-4">
            <img src={project3Image} alt="Project 3" className="w-full h-auto mb-4 rounded-br-[2rem] sm:rounded-br-[4rem]" />
            <figcaption className="flex text-gray-800 justify-between p-2">
              <p>
                <span className="font1">Modern Kitchen</span><br />
                <span className="text-sm text-gray-800">Decor/Architecture</span>
              </p>
              <div className="mt-1 h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
              </div>
            </figcaption>
          </figure>
          <figure className="sm:w-1/2 w-full p-4">
            <img src={project4Image} alt="Project 4" className="w-full h-auto mb-4 rounded-bl-[2rem] sm:rounded-bl-[4rem]" />
            <figcaption className="flex text-gray-800 justify-between p-2">
              <p>
                <span className="font1">Modern Kitchen</span><br />
                <span className="text-sm text-gray-800">Decor/Architecture</span>
              </p>
              <div className="mt-1 h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    );
    const experienceSection = (
        <div className="w-full   bg-customColor  py-10" >
        <div className="flex justify-between items-center mx-auto max-w-[50rem] font2 font-medium  p-4 sm:py-8 sm:px-16">
      <div className="w-1/4   h-20 flex items-center justify-center border-r-[0.07rem]  border-customColor2 ">
        {/* Content for Division 1 */}
        <div className="sm:hidden">
          <span className="font1 text-5xl text-customColor2 ">12</span><br />
          <span className="text-xs">years of <br />experience</span>
        </div>
        <div className="hidden sm:block sm:flex flex-col items-center justify-center">
          <span className="font1 text-5xl text-customColor2 ">12</span>
          <span className="text-xs">years of experience</span>
        </div>
      </div>
      
      <div className="w-1/4  h-20 flex items-center justify-center border-r-[0.07rem]  border-customColor2   ">
        {/* Content for Division 2 */}
        <div className="sm:hidden">
          <span className="font1 text-5xl text-customColor2 ">85</span><br />
          <span className="text-xs ">success <br />projects</span>
        </div>
        <div className="hidden sm:block sm:flex flex-col items-center justify-center">
          <span className="font1 text-5xl text-customColor2 ">85</span>
          <span className="text-xs">success Projects</span>
        </div>
      </div>
      
      <div className="w-1/4  h-20 flex items-center justify-center border-r-[0.07rem]  border-customColor2 ">
        {/* Content for Division 3 */}
        <div className="sm:hidden ">
          <span className="font1 text-5xl text-customColor2 ">15</span><br />
          <span className="text-xs ">
            Active </span><br />
          <span className="text-xs">  projects </span>
        </div>
        <div className="hidden sm:block sm:flex flex-col items-center justify-center">
          <span className="font1 text-5xl text-customColor2 ">15</span>
          <span className="text-xs">success projects </span>
        </div>
      </div>
      <div className="w-1/4   h-20 flex items-center justify-center    ">
        {/* Content for Division 4 */}
        <div className="sm:hidden">
          <span className="font1 text-5xl text-customColor2 ">95</span><br />
          <span className="text-xs">Happy <br />customers</span>
        </div>
        <div className="hidden sm:block sm:flex flex-col items-center justify-center">
          <span className="font1 text-5xl text-customColor2 ">95</span>
          <span className="text-xs">happy customers</span>
        </div>
      </div>
    </div> 
</div>
    );
  return (
    <div >
    <div className="flex justify-between items-center  mx-auto sm:max-w-[47rem] py-4">
      <img src={icon1} alt="Logo 1" className="sm:mx-4 mx-2 w-10 h-10 sm:w-20 sm:h-20" />
      <img src={icon2} alt="Logo 1" className="sm:mx-4 mx-2 w-10 h-10 sm:w-20 sm:w-20" />
      <img src={icon3} alt="Logo 1" className="sm:mx-4 mx-2 w-10 h-10 sm:w-20 sm:h-20" />
      <img src={icon4} alt="Logo 1" className="sm:mx-4 mx-2 w-10 h-10 sm:h-20 sm:w-20" />
      <img src={icon5} alt="Logo 1" className="sm:mx-4 mx-2 w-10 h-10 sm:h-20 sm:w-20" />
    </div>
    {projectSection}
    {experienceSection}
    </div>
  );
}

export default LogoSection;
