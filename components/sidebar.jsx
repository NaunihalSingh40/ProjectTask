import Link from "next/link";
import { FaTasks, FaCalendarAlt } from "react-icons/fa";


export default function sidebar(){
    return(
        <>
        <aside 
        className='fixed inset-y-0 left-0 z-50 w-[50px] py-4  overflow-y-auto transform transition-transform duration-300 scrollbar bg-gray-100'
        >
            <button className='px-3 scale-125 hover:scale-150 duration-100 text-gray-400'> <Link href='/tasks'><FaTasks /></Link></button>
            
            <button className='px-3 scale-125 mt-3 hover:scale-150 duration-100 text-gray-400'><Link href='/calender'><FaCalendarAlt /></Link></button>

        </aside>
        
        
        
        </>

    );
}