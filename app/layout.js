import './globals.css';
import Sidebar from "../components/sidebar.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar/>
        {children}
      </body>
    </html>
  );
}
