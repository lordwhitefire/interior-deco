import React from 'react';


import blogImage from '../assets/images/Blog.jpeg';
import blogImage2 from '../assets/images/blog-2.jpeg';
import blogImage3 from '../assets/images/blog-3.jpeg';
import blogImage5 from '../assets/images/blog-5.jpeg';
import blogImage4 from '../assets/images/blog-2.jpeg';
import blogImage6 from '../assets/images/blog-6.jpg';
import blogImage7 from '../assets/images/blog-7.jpg';
import blog2Image from '../assets/images/banner4.jpg';



const BlogPost = ({ articleId }) => {


  const articlesData = [
    { id: '1', imagePath: blogImage },
    { id: '2', imagePath: blogImage2 },
    { id: '3', imagePath: blogImage3 },
    { id: '4', imagePath: blogImage4 },
    { id: '5', imagePath: blogImage5 },
    { id: '6', imagePath: blogImage6 },
    { id: '7', imagePath: blogImage7 },
    
    // Add other projects with their details
  ];

  const article = articlesData.find((s) => s.id === articleId);

  if (!article) {
    // Handle the case where the service is not found
    return <div>article not found</div>;
  }
  // Destructure data from the service object
  const { imagePath } = article;


  return (
    <div className="max-w-[50rem] mx-auto bg-white p-16  mt-8 rounded-lg flex justify-between shadow-lg">
    <div className="mb-8">
      <header className="text-2xl pl-1 font-medium font2 mb-4">
        Let's Get Solutions for Building <br /> Construction Work
      </header>
      <figure key={article.id} className="mb-8">
        <img src={imagePath} alt={`Article ${article.id}`} className="h-[18rem] mb-4 sm:w-[27rem] rounded-[2rem] object-cover" />
        <figcaption className="text-xs font2 text-gray-700 text-center">
          <p className="sm:w-[27rem] px-1 flex justify-between">
            <span className="block">26 December 2022</span>
            <span className="block">Interior/Home/Decor/Design</span>
          </p>
        </figcaption>
      </figure>
      <p className="sm:text-xs text-sm mb-4 sm:w-[27rem] text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis odio vitae venenatis tincidunt.
        Fusce ac elit eu felis bibendum bibendum. Donec vel ligula finibus, ullamcorper nisl sed, auctor sem.
      </p>
      <p className="text-sm sm:text-xs sm:w-[27rem] text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac elit eu felis bibendum bibendum.
      </p>
      <div className="mt-4 flex flex-col items-center sm:w-[27rem] bg-customColor justify-center py-6 rounded-[1.5rem]">
        <span className="icon-[raphael--quote]  w-12 h-12 text-customColor2 "></span>
        <p className="text-sm italic text-customColor2">The details are not the details, </p>
        <p className=" text-sm italic text-customColor2">they make the design</p>
      </div>

      {/* Additional Section 2 */}
      <header className="text-2xl mt-4 font-medium font2 mb-4">Design Sprints are Great</header>
      <p className="text-sm sm:text-xs mb-4 text-justify sm:w-[27rem] ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis odio vitae venenatis tincidunt.
      </p>
      <div className="sm:w-[27rem]  mb-4">
        <div className="text-sm mb-4 sm:text-xs text-justify">
          <span className="text-customColor2">1.</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque mollis odio vitae venenatis tincidunt.
        </div>
        <div className="text-sm mb-4 sm:text-xs text-justify">
          <span className="text-customColor2">2.</span> Fusce ac elit eu felis bibendum bibendum.Quisque mollis odio vitae venenatis tincidunt.
        </div>
        <div className="text-sm mb-4 sm:text-xs text-justify">
          <span className="text-customColor2">3.</span> Donec vel ligula finibus, ullamcorper nisl sed, auctor sem.Quisque mollis odio vitae venenatis tincidunt.
        </div>
      </div>
      <img src={blog2Image} alt="Design Image" className="sm:w-[27rem] h-[10rem] sm:h-[12rem] object-cover mb-4 rounded-[1rem] " />
      <p className="text-sm sm:text-xs sm:w-[27rem] text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis odio vitae venenatis tincidunt.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis odio vitae venenatis tincidunt.
      </p>

      <div className="sm:max-w-[27rem] sm:flex sm:justify-between sm:items-center mt-12">
        <div className="items-center flex flex-wrap gap-x-2 gap-y-2 mb-4 sm:mb-0">
          <h2 className="text-lg font1">Tags </h2>
          <button className="text-[0.8rem] sm:text-xs flex hover:bg-customColor bg-gray-800 text-white hover:text-black font-bold py-2 sm:py-2 px-6 rounded-md sm:rounded-md">
            kitchen
          </button>
          <button className="text-[0.8rem] sm:text-xs flex bg-customColor hover:bg-gray-800 hover:text-white text-black font-bold py-2 sm:py-2 px-6 rounded-md sm:rounded-md">
            Bedroom
          </button>
        </div>
        <div className="flex gap-x-6 sm:gap-x-4 ">
          <span className=" icon-[basil--facebook-solid]  w-4 h-4 text-black "></span>
          <span className=" icon-[mdi--twitter]  w-4 h-4 text-black "></span>
          <span className=" icon-[ri--linkedin-fill]  w-4 h-4 text-black "></span>
          <span className=" icon-[ri--instagram-line]  w-4 h-4 text-black "></span>
        </div>
      </div>

      {/* Form Section */}
      <form className="sm:max-w-[27rem] px-2 w-full mx-auto flex flex-col items-center sm:mt-12 mt-16">
          <fieldset className="flex flex-col items-center">
          <legend className="text-xl font1 mb-4">leave a reply</legend>
            <div className="flex flex-col sm:flex-row sm:gap-x-4 gap-y-4 mb-2 sm:w-[27rem] min-w-[17rem]">
              <div className="mb-4 sm:w-[13rem]">
                <input
                  className="border-b bg-transparent w-full py-2 border-black border-b focus:outline-none focus:shadow-outline font-bold text-sm"
                  id="name" type="text" placeholder="Name" />
              </div>
              <div className="mb-4 sm:w-[13rem]">
                <input
                  className="border-b bg-transparent w-full py-2  border-black focus:outline-none focus:shadow-outline w-full font-bold text-sm"
                  id="email" type="phone" placeholder="Phone" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4 gap-y-4 mb-2 sm:w-[27rem] min-w-[17rem]">
              <div className="mb-4 sm:w-[13rem]">
                <input
                  className="border-b bg-transparent w-full py-2  border-black border-b focus:outline-none focus:shadow-outline font-bold text-sm"
                  id="name" type="text" placeholder="Website" />
              </div>
              <div className="mb-4  sm:w-[13rem]">
                <input
                  className="border-b bg-transparent w-full py-2  border-black focus:outline-none focus:shadow-outline w-full font-bold text-sm"
                  id="email" type="email" placeholder="Email" />
              </div>
            </div>
            <textarea
              className="border-b bg-transparent sm:w-[27rem] w-full pt-2 min-w-[17rem] border-b border-black focus:outline-none focus:shadow-outline font-bold text-sm sm:h-20 h-20"
              id="message"
              placeholder="Hello! I am interested in...">
            </textarea>
            <p className="sm:w-[27rem] mt-4  items-center flex gap-x-4">
            <span className=" icon-[ph--square] w-4 h-4 text-customColor2"></span>
            <span className="text-customColor2 text-xs">save my name email and website for the next time I comment</span>
          </p>
            <div className="w-full flex justify-start">
              <button className="mt-6 w-[8rem] sm:w-[9rem] text-[0.8rem] sm:text-sm items-center  flex gap-x-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-3 sm:pl-4 pl-4 rounded-md sm:rounded-xl ">
                send now
                <span className="icon-[solar--arrow-right-linear] w-4 h-4 text-customColor2"></span>
              </button>
            </div>
          </fieldset>
        </form>

    </div>
    <div className=" mt-[5rem] sm:mt-0 ">
      {/* Core Division 1 */}
      <div className="flex justify-between items-center p-4 bg-[f4f0ec] rounded-[1rem] mb-4">
        {/* Content for Core Division 1 */}
        <span className="text-[cda274]">
          search
        </span>
        <span className="icon-[ion--search] w-4 h-4 text-[cda274]"></span>
      </div>
      {/* Core Division 2 */}
      <div className="sm:w-[12rem] mb-8">
        {/* Content for Core Division 2 */}
        <h2 className="text-lg font1 mb-4">
          latest news
        </h2>
        <div className="sm:w-[12rem] mb-4">
          <p className="flex justify-between items-end px-2 sm:px-0">
            <span className="font-medium font1 mb-2 text-xs sm:min-w-[8rem] w-full">
              We focus on comfort <br /> and gorgeous
            </span>
            <span className="text-[292f36] text-[0.5rem]">
              06/07/2023
            </span>
          </p>
          <span className="icon-[pepicons-pencil--line-x] sm:w-[13rem] w-full h-[0.1rem] text-[cda274] sm:-ml-2"></span>
        </div>
        {/* Additional content for Core Division 2 */}
      </div>
      {/* Core Division 3 */}
      <div className="sm:w-[12rem] w-full mb-4 bg-[f4f0ec] rounded-[1rem] sm:px-2 py-8 flex flex-col items-center">
        {/* Content for Core Division 3 */}
        <h2 className="text-lg sm:-ml-[2.5rem] font1 mb-4">
          Categories
        </h2>
        {/* Additional content for Core Division 3 */}
      </div>
      {/* Core Division 4 */}
      <div className="w-[12rem] mb-8">
        {/* Content for Core Division 4 */}
        <h2 className="text-lg font1 mb-4">
          Tags
        </h2>
        <div className="max-w-[18rem] min-w-[17rem] flex flex-wrap gap-x-2 gap-y-2">
          {/* Tags buttons go here */}
        </div>
      </div>
    </div>
    </div >
  );
};

export default BlogPost;
