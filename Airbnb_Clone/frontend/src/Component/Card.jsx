import React, { useContext } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
// 1. Import ListingContext
import { listingDataContext } from '../Context/ListingContext';

function Card({ title, landMark, city, image1, rent, id, ratings = 0, isBooked = false }) {
    // 2. Get the handleViewCard function from Context
    const { handleViewCard } = useContext(listingDataContext);

    const handleClick = () => {
        // 3. FIX: Call the context function instead of navigating blindly
        // This function fetches the data AND navigates to "/viewcard"
        handleViewCard(id);
    };

    return (
        <div 
            className='w-[300px] md:w-[320px] h-[400px] flex flex-col rounded-2xl cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200 overflow-hidden group p-3 gap-3' 
            onClick={handleClick}
        >
            {/* Image Section */}
            <div className='w-full h-[65%] overflow-hidden relative rounded-xl'>
                <img 
                    src={image1} 
                    alt={title} 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"; }} 
                />
                {isBooked && (
                    <div className='absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-green-700 text-xs font-bold shadow-sm'>
                        Booked
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className='w-full h-[35%] flex flex-col gap-1 px-1'>
                <div className='flex items-center justify-between'>
                    <h3 className='font-bold text-gray-800 text-lg truncate w-[70%] capitalize'>
                        {city}, {landMark}
                    </h3>
                    
                    <div className='flex items-center gap-1 text-sm'>
                        {ratings > 0 ? (
                            <>
                                <FaStar className='text-yellow-500' /> 
                                <span>{ratings}</span>
                            </>
                        ) : (
                            <>
                                <FaRegStar className='text-gray-400' />
                                <span className='text-gray-400 text-xs'>New</span>
                            </>
                        )}
                    </div>
                </div>
                
                <p className='text-gray-500 text-sm truncate capitalize'>{title}</p>
                
                <div className='mt-auto flex items-baseline gap-1'>
                    <span className='text-lg font-bold text-gray-900'>₹{rent && rent.toLocaleString()}</span>
                    <span className='text-gray-500 text-sm'>/ night</span>
                </div>
            </div>
        </div>
    );
}

export default Card;