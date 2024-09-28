'use client'
import '../globals.css';
import Taskbar from "../../components/taskbar.jsx";
import Sidebar from "../../components/sidebar.jsx";
import { useState, useEffect } from 'react';


export default function RootLayout({ children }) {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true); // Only set state on the client
    }, []);
  
    if (!isMounted) {
      return null; // Render nothing on the server-side to avoid mismatch
    }

  return (
    <html lang="en">
      <body>
        <Sidebar/>
        <Taskbar />
        {children}
      </body>
    </html>
  );
}
