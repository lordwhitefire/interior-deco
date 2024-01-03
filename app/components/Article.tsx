import React, { useState, useEffect } from 'react';

import "../tailwind.css?__remix_sideEffect__";

const articles = [
  {
    id: 1,
    title: "Let's get solutions for building construction work",
    date: '3rd October, 2023',
    buttonLabel: 'Kitchen design',
    blog:'blog1',
  },
  {
    id: 2,
    title: "Low cost latest invented interior designing ideas",
    date: '23rd november, 2023',
    buttonLabel: 'Living design',
    blog:'blog4',
  },
  {
    id: 3,
    title: "Best for any office and business interior solution",
    date: '3rd january, 2024',
    buttonLabel: 'Interior design',
    blog:'blog3',
  },
  {
    id: 4,
    title: "Let's get solutions for building construction work",
    date: '3rd October, 2023',
    buttonLabel: 'Kitchen design',
    blog:'blog2',
  },
  {
    id: 5,
    title: "Low cost latest invented interior designing ideas",
    date: '23rd november, 2023',
    buttonLabel: 'Living design',
    blog:'blog5',
  },
  {
    id: 6,
    title: "Best for any office and business interior solution",
    date: '3rd january, 2024',
    buttonLabel: 'Interior design',
    blog:'blog6',
  },
  {
    id: 7,
    title: "Let's get solutions for building construction work",
    date: '3rd October, 2023',
    buttonLabel: 'Kitchen design',
    blog:'blog1',
  },
  {
    id: 8,
    title: "Low cost latest invented interior designing ideas",
    date: '23rd november, 2023',
    buttonLabel: 'Living design',
    blog:'blog4',
  },
  {
    id: 9,
    title: "Best for any office and business interior solution",
    date: '3rd january, 2024',
    buttonLabel: 'Interior design',
    blog:'blog3',
  },
];

const ArticlesAndNews = () => {
  const [currentArticle, setCurrentArticle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticle((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getFirstArticleIndex = (currentIndex) => (currentIndex + articles.length - 1) % articles.length;

  const firstArticleIndex = getFirstArticleIndex(currentArticle);

  return (
    <div className="max-w-[50rem] mx-auto py-8  my-4 sm:mb-8">
       <div className="flex flex-col items-center mb-8">
          <h2 className="text-4xl font-medium font2 mb-4">Articles and News</h2>
          <p className="text-gray-700 text-center mx-2 sm:mx-0 text-[0.8rem] sm:text-[0.67rem] sm:w-1/2">
            It is a long established fact that a reader will be distracted by the of readable content of page looking at its layouts points.
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3   sm:px-4">
        {Array.from({ length: 3 }).map((_, index) => {
          const articleIndex = (firstArticleIndex + index) % articles.length;
          const article = articles[articleIndex];

          return (
            <div
              key={article.id}
              className={`flex flex-col justify-center items-center sm:mx-1  my-4 mx-8 p-3 border border-gray-300 rounded-[2rem] ${
                index === 1 ? 'center' : ''
              }`}
              style={{ transition: 'transform 0.5s ease' }}
            >
              {/* First Division with Button */}
              <div className={`p-4 border border-gray-300 w-full h-[12rem] flex flex-col justify-end rounded-t-[2rem] ${article.blog}`}>
  <button className="w-[6rem] sm:w-[6rem] text-[0.6rem] flex bg-white hover:bg-blue-700 text-gray-700 font-medium font2 py-3 sm:py-2 justify-center items-center rounded-r-lg rounded-tl-xl sm:rounded-r-md sm:rounded-tl-lg">
    {article.buttonLabel}
  </button>
</div>

              {/* Second Division with Header */}
              <div className="pt-2 px-2 w-full">
                <h2 className="text-md font-medium font2 w-10/12 mb-2">{article.title}</h2>
                <div className="flex text-gray-800  items-center justify-between">
                  <p className="mt-0">
                    <span className="text-[0.8rem] text-gray-800">{article.date}</span>
                  </p>
                  <a href="blogdetails.html">
                    <div className="mt-1 h-8 w-8 rounded-full bg-customColor flex items-center justify-center">
                      <span className="icon-[ooui--next-ltr] w-3 h-3"></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticlesAndNews;
