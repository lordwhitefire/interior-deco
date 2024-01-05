import React from 'react';

const HowWeWorkSection = () => {
  return (
    <div className="sm:w-[40rem] w-[18rem] flex flex-col items-center justify-center mx-auto bg-customColor sm:rounded-[1rem] rounded-[0.5rem] sm:px-12 sm:py-20 py-12 mt-4 sm:mb-24 mb-12 px-4">
      <header className="mb-4 text-xl sm:text-4xl font2 font-medium">How we work</header>
      <p className="mb-4 text-center text-sm sm:mb-20">
        It is a long-established fact that will be distracted. Lorem ipsum is simply a dummy text of the printing and typesetting industry.
      </p>

      {/* Four outer divisions */}
      <div className="sm:flex sm:justify-around sm:mb-12 mb-4">
        <div className="sm:max-w-[15rem] background4 sm:rounded-bl-[15rem] sm:rounded-tr-[5rem] sm:basis-1/2 h-[20rem] rounded-bl-[10rem] w-[15rem] rounded-tr-[3rem] mx-auto"></div>
        <div className="sm:basis-1/2">
          <div className="sm:pr-8 sm:mt-8 flex justify-between items-center sm:mb-8">
            <span className="icon-[icon-park-twotone--concept-sharing] w-20 h-20 text-customColor2"></span>
            <p className="mt-5 sm:mt-0 text-7xl font2 font-medium text-white">01</p>
          </div>

          <div className="m-2">
            <header className="mb-2 font2 sm:text-xl">Concepts and Ideas</header>
            <p className="sm:text-sm text-xs">
              It is a long-established fact that will be distracted. Lorem ipsum is simply a dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>

      {/* Repeat the above 'flex' and 'm-2' structure as needed for the remaining two divisions */}
      {/* Division 2 */}
      <div className="sm:flex sm:justify-around sm:mb-12 mb-4">
        <div className="sm:hidden sm:max-w-[15rem] background1 sm:rounded-bl-[15rem] sm:rounded-tr-[5rem] sm:basis-1/2 h-[20rem] rounded-bl-[10rem] w-[15rem] rounded-tr-[3rem] mx-auto"></div>
        <div className="sm:basis-1/2">
          <div className="sm:pr-8 sm:mt-8 flex justify-between items-center sm:mb-8">
            <span className="icon-[fluent--design-ideas-24-filled] w-20 h-20 text-customColor2"></span>
            <p className=" mt-5 sm:mt-0 text-7xl   font2 font-medium text-white">02</p>
          </div>

          <div className="m-2">
            <header className="mb-2  font2 sm:text-xl">Idea for Work</header>
            <p className="sm:text-sm text-xs">
              It is a long-established fact that will be distracted. Lorem ipsum is simply a dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
        <div className="hidden sm:block sm:max-w-[15rem] background1 sm:rounded-bl-[15rem] sm:rounded-tr-[5rem] sm:basis-1/2 h-[20rem] rounded-bl-[10rem] w-[15rem] rounded-tr-[3rem] mx-auto"></div>
      </div>

      {/* Division 3 */}
      <div className="sm:flex sm:justify-around sm:mb-12 mb-4">
        <div className="sm:max-w-[15rem] background2 sm:rounded-bl-[15rem] sm:rounded-tr-[5rem] sm:basis-1/2 h-[20rem] rounded-bl-[10rem] w-[15rem] rounded-tr-[3rem] mx-auto"></div>
        <div className="sm:basis-1/2">
          <div className="sm:pr-8 sm:mt-8 flex justify-between items-center sm:mb-8">
            <span className="icon-[icon-park-solid--bydesign] w-20 h-20 text-customColor2"></span>
            <p className="mt-5 sm:mt-0 text-7xl font2 font-medium text-white">03</p>
          </div>

          <div className="m-2">
            <header className="mb-2 font2 sm:text-xl">Design</header>
            <p className="sm:text-sm text-xs">
              It is a long-established fact that will be distracted. Lorem ipsum is simply a dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>

      {/* Division 4 */}
      <div className="sm:flex sm:justify-around sm:mb-12 mb-4">
        <div className="sm:hidden sm:max-w-[15rem] background3 sm:rounded-bl-[15rem] sm:rounded-tr-[5rem] sm:basis-1/2 h-[20rem] rounded-bl-[10rem] w-[15rem] rounded-tr-[3rem] mx-auto"></div>
        <div className="sm:basis-1/2">
          <div className="sm:pr-8 sm:mt-8 flex justify-between items-center sm:mb-8">
            <span className="icon-[ic--round-incomplete-circle] w-20 h-20 text-customColor2"></span>
            <p className="mt-5 sm:mt-0 text-7xl font2 font-medium text-white">04</p>
          </div>

          <div className="m-2">
            <header className="mb-2 sm:text-xl">Perfection</header>
            <p className="sm:text-sm text-xs">
              It is a long-established fact that will be distracted. Lorem ipsum is simply a dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
        <div className="hidden sm:block sm:max-w-[15rem] background3 sm:rounded-bl-[15rem] sm:rounded-tr-[5rem] sm:basis-1/2 h-[20rem] rounded-bl-[10rem] w-[15rem] rounded-tr-[3rem] mx-auto"></div>
      </div>
    </div>
  );
};

export default HowWeWorkSection;
