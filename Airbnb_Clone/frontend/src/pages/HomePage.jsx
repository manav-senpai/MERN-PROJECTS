import React, { useContext } from 'react'
import Nav from '../Component/Nav'
import { listingDataContext } from '../Context/ListingContext'

function Home() {
  // Safe destructuring: we provide an empty object fallback {} 
  // so it doesn't crash if context is temporarily undefined
  const context = useContext(listingDataContext) || {};
  const { newListData = [] } = context; 

  return (
    <div className='w-full min-h-screen bg-white'>
      <Nav />
      
      <div className='w-full flex items-center justify-center gap-[25px] flex-wrap mt-[200px] md:mt-[180px] px-4'>
        {newListData.length > 0 ? (
          newListData.map((list) => (
            <div key={list._id} className="p-4 border rounded-lg shadow-sm w-[300px]">
               <p className="font-bold text-lg">{list.title}</p>
               <p className="text-gray-500">{list.city}, {list.landMark}</p>
               <p className="text-red-600 font-semibold">₹{list.rent} / night</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center mt-10">
            <p className="text-gray-400 text-xl font-medium">No listings available right now.</p>
            <p className="text-gray-500 text-sm">Try adding one from the "List your home" menu!</p>
          </div>
        )}
      </div>
    </div> 
  )
}

export default Home