import React from 'react';

import icon1 from '../assets/icon/01.svg';
import icon2 from '../assets/icon/02.svg';
import icon3 from '../assets/icon/03.svg';
import icon4 from '../assets/icon/04.svg';
import icon5 from '../assets/icon/05.svg';

const LogoSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-4 my-16 mx-auto sm:max-w-[47rem] py-4">
        <img src={icon1} alt="Logo 1" className="sm:mx-4 mx-2 w-10 h-10 sm:w-20 sm:h-20" />
        <img src={icon2} alt="Logo 2" className="sm:mx-4 mx-2 w-10 h-10 sm:w-20 sm:w-20" />
        <img src={icon3} alt="Logo 3" className="sm:mx-4 mx-2 w-10 h-10 sm:w-20 sm:h-20" />
        <img src={icon4} alt="Logo 4" className="sm:mx-4 mx-2 w-10 h-10 sm:h-20 sm:w-20" />
        <img src={icon5} alt="Logo 5" className="sm:mx-4 mx-2 w-10 h-10 sm:h-20 sm:w-20" />
      </div>
    </div>
  );
};

export default LogoSection;
