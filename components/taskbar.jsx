import { MdAddTask } from "react-icons/md";
import { IoTodayOutline } from "react-icons/io5";
import { FaCalendarWeek, FaRegTrashAlt } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import Link from "next/link";

export default function sidebar(){

    const taskbarItems=[
        {
            name: 'Today',
            icon: <IoTodayOutline/>,
            path: '/tasks/today'
        },
        {
            name: 'Next 7 days',
            icon: <FaCalendarWeek/>,
            path: '/tasks/next7day'
        },
        {
            name: 'Completed',
            icon: <MdTaskAlt/>,
            path: '/tasks/completed'
        },
        {
            name: 'Trash',
            icon: <FaRegTrashAlt/>,
            path: '/tasks/trash'
        },
        {
            name: 'Add Task',
            icon: <MdAddTask/>,
            path: '/tasks'
        },
    ]
    
    return(
        
        <aside 
        className='fixed inset-y-0 left-0 z-50 w-[250px] py-4 mx-[50px] overflow-y-auto transform transition-transform duration-300 scrollbar bg-white'
        >
            <ul className="space-y-2 font-medium">
                {taskbarItems.map(section =>(
                    <li key={section.name} >
                        <button 
                        className='flex items-center w-[220px] p-1 mr-2 ml-2 text-[17px] hover:scale-105 transition duration-75 rounded-lg group bg-gray-100 hover:bg-gray-200 '>
                        <Link href={section.path} className='flex gap-3 items-center px-[40px] w-full h-full text-gray-400 hover:text-gray-500'><div>{section.icon}</div> <div>{section.name}</div></Link></button>
                    </li>
                ))}

            </ul>

        </aside>
        

    );
}