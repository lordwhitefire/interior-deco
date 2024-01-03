// components/Testimonials.tsx
import React, { useState, useEffect } from 'react';

 import person1Image from '../assets/images/person1.jpg';
 import person2Image from '../assets/images/person2.jpg';
 import person3Image from '../assets/images/person3.jpg';
 import person4Image from '../assets/images/lady3.jpg';
 import person5Image from '../assets/images/guy3.jpg';
 import person6Image from '../assets/images/lady4.jpg';
 import person7Image from '../assets/images/guy4.jpg';
 import person8Image from '../assets/images/lady5.jpg';
 import person9Image from '../assets/images/guy5.jpg';
 import person10Image from '../assets/images/team-lady.jpg';

const testimonies = [
  {
    id: 1,
    img: person1Image,
    name: 'John Doe',
    location: 'Sydney, USA',
    text: 'I had an amazing experience with your services. The quality and attention to detail exceeded my expectations. Highly recommended!',
  },
  {
    id: 2,
    img: person2Image,
    name: 'Benny Roll',
    location: 'Sydney, New York',
    text: ' Your team went above and beyond to make sure I was satisfied. I appreciate the professionalism and dedication to excellence.',
  },
  {
    id: 3,
    img: person3Image,
    name: 'Raymond Gario',
    location: 'Sydney, Australia',
    text: 'The stylish living section is exactly what I was looking for. It added a unique and elegant touch to my home. Thank you!',
  },
  {
    id:4,
    img:person4Image,
    name: 'Mary Johnson',
    location: 'New York, USA',
    text: 'Impressive design and outstanding customer service. I\'m delighted with the results. Will definitely work with you again!',
   
  },
  {
    id:5,
    img:person5Image,
    name: 'Robert Smith',
    location: 'London, UK',
    text: 'Your attention to detail is impeccable. The realization of my project exceeded my expectations. Thank you for your creativity!',
  },
  {
    id:6,
    img:person6Image,
    name: 'Jennifer Davis',
    location: 'Sydney, Australia',
    text: 'The interior work you did for me was top-notch. It transformed my space into a beautiful and functional environment.',
  },
  {
    id:7,
    img:person7Image,
    name: 'Michael Wilson',
    location: 'Tokyo, Japan',
    text: 'I can\'t thank you enough for the wonderful project plan. It was well-thought-out and perfectly suited to my needs.',
  },
  {
    id:8,
    img:person8Image,
    name: 'Sarah Brown',
    location: 'Paris, France',
    text: 'The level of professionalism displayed by your team is commendable. I couldn\'t be happier with the outcome of my project.',
  },
  {
    id:9,
    img:person9Image,
    name: 'Christopher Lee',
    location: 'Toronto, Canada',
    text: 'From concept to completion, your team demonstrated expertise and creativity. I\'m thrilled with the end result!',
  },
  {id:10,
    img:person10Image,
    name: 'Amanda Martinez',
    location: 'Berlin, Germany',
    text: 'Working with your company was a pleasure. The communication, craftsmanship, and final product were all exceptional.',
  },
  {
    id: 11,
    img: person1Image,
    name: 'John Doe',
    location: 'Sydney, USA',
    text: 'Lauren ipsum is simply Tommy text of the type setting industry Epson has been',
  },
  {
    id: 12,
    img: person2Image,
    name: 'Benny Roll',
    location: 'Sydney, New York',
    text: 'Lauren Epson a simply dummy text of data setting industry Epson has been scrambled it to make a Time Book',
  },
  {
    id: 13,
    img: person3Image,
    name: 'Raymond Gario',
    location: 'Sydney, Australia',
    text: 'Alarm Epson is simply Timmy text of the type setting industry Epson has been scrambled',
  },

];

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonialsToShow = testimonies.slice(currentTestimonial, currentTestimonial + 3);

  const goToNextTestimonial = () => {
    const newTestimonial = (currentTestimonial + 1) % testimonies.length;
    setCurrentTestimonial(newTestimonial);
  };

  useEffect(() => {
    const interval = setInterval(goToNextTestimonial, 3000);

    return () => clearInterval(interval);
  }, [currentTestimonial]);

  // Check for the second-to-last testimonial outside the interval
  useEffect(() => {
    if (currentTestimonial === testimonies.length - 3) {
      // Reset immediately if the second to last testimonial
      setCurrentTestimonial(0);
    }
  }, [currentTestimonial]);

  return (
    <div className={`flex-col flex bg-customColor sm:mt-16 p-8 pb-16 pt-20 mx-auto max-w-[50rem] items-center rounded-[2rem] sm:rounded-[3rem] `}>
      <h1 className="sm:w-1/2 mb-4 sm:mb-8 font-medium text-2xl sm:text-4xl text-center font2">
        What the People Think About Us
      </h1>

      <div className="flex flex-col sm:flex-row gap-x-6">
        {testimonialsToShow.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`sm:w-1/3 rounded-xl pt-8 h-[13rem] px-4 mb-8 sm:mb-0 bg-white ${index === 1 ? 'center' : ''}`}
            style={{ transition: 'transform 0.5s ease' }}
          >
            <div className="flex mb-2 sm:mb-5">
              <div className="flex-shrink-0">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="ml-4 mt-1">
                <h3 className="text-md font-medium font2">{testimonial.name}</h3>
                <h5 className="text-sm font2">{testimonial.location}</h5>
              </div>
            </div>
            <div >
              <p className="text-gray-800 text-[0.8rem] text-justify">{testimonial.text}</p>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Testimonials;




