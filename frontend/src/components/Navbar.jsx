import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import PartnerRegistration from './partners_component/PartnerRegistration';
import OTPLogin from './partners_component/OTPLogin';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <span className="text-white text-xl font-bold">LOGO</span> */}
            <Link to={'/'}>
              <img className='h-10 w-full rounded cursor-pointer'src="https://res.cloudinary.com/daf7blofc/image/upload/v1742589542/kl2suqvae1x3kp9pqi2x.png" alt="walzono-logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to={'/'} className='text-gray-300 hover:text-white transition-colors'>Home</Link>
              <Link to={'/partner/login'} className='text-gray-300 hover:text-white transition-colors'>Add Partners</Link>
              <Link className='text-gray-300 hover:text-white transition-colors'>About</Link>
              <Link to={'/contact'} className='text-gray-300 hover:text-white transition-colors'>Contact Us</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to={'/'} className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors'>Home</Link>
              <Link to={'/partner/login'} className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors'>Add Partner</Link>
              <Link className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors'>About</Link>
              <Link to={'/contact'} className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors'>Contact Us</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;