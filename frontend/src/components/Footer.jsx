import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  // Social media icons using online SVG sources
  const socialMedia = [
    {
      name: 'Facebook',
      icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png',
      link: 'https://facebook.com'
    },
    {
      name: 'Instagram',
      icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
      link: 'https://instagram.com'
    },
    {
      name: 'Twitter',
      icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
      link: 'https://twitter.com'
    },
    {
      name: 'Pinterest',
      icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png',
      link: 'https://pinterest.com'
    },
    {
      name: 'YouTube',
      icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
      link: 'https://youtube.com'
    }
  ]

  return (
    <div className="bg-gray-50 mt-16 border-t border-gray-200">
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='flex flex-col sm:grid grid-cols-[2.5fr_1fr_1fr] gap-10 lg:gap-14 text-sm'>
          {/* Company Info & Social Media */}
          <div>
            <img src={assets.logo} className='mb-5 w-36 h-13' alt="RNY Clothing" />
            <p className='w-full md:w-3/4 text-gray-600 mb-6'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 mt-6">
              {socialMedia.map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                  aria-label={platform.name}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                    <img 
                      src={platform.icon} 
                      alt={platform.name} 
                      className="w-5 h-5" 
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className='text-lg font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
              <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/collection" className="hover:text-black transition-colors">Collection</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className='text-lg font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1-212-456-7890
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@rnyclothing.com
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Fashion St, New York, NY 10001
              </li>
            </ul>
          </div>
        </div>


        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200"> 
          <p className='py-2 text-sm text-center text-gray-500'>
            Copyright © {new Date().getFullYear()} RNY Clothing - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer