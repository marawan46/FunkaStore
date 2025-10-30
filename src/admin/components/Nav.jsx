// src/components/Nav/Nav.jsx
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

export function Nav() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    localStorage.clear();
    sessionStorage.clear();
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* المنتجات */}
      <li className="flex items-center gap-x-2 p-1 font-medium text-blue-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
            1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 
            1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 
            1 5.513 7.5h12.974c.576 0 1.059.435 1.119 
            1.007ZM8.625 10.5a.375.375 0 1 1-.75 
            0 .375.375 0 0 1 .75 0Zm7.5 
            0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <span>المنتجات</span>
      </li>

      {/* Admin */}
      <li className="flex items-center gap-x-2 p-1 font-medium text-blue-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Admin</span>
      </li>

      {/* Add Product */}
      <Link to="addproduct" className="flex items-center">
      <li className="flex items-center gap-x-2 p-1 font-medium text-blue-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
        </svg>    
          اضف منتج       
      </li>
      </Link>
      {/* إعدادات */}
      <li className="flex items-center gap-x-2 p-1 font-medium text-blue-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 
            1.11-.94h2.593c.55 0 1.02.398 
            1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 
            1.075.124l1.217-.456a1.125 
            1.125 0 0 1 1.37.49l1.296 
            2.247a1.125 1.125 0 0 
            1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 
            7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 
            1.43l-1.298 2.247a1.125 
            1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 
            6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 
            1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 
            0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 
            6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 
            1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 
            1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 
            6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 
            1.125 0 0 1-.26-1.43l1.297-2.247a1.125 
            1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 
            1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <span>إعدادات</span>
      </li>
    </ul>
  );

  return (
    <Navbar className="mx-auto fixed z-50 max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            as="div"
            title="HOME"
            className="mr-4 cursor-pointer py-1.5 font-extrabold font-title"
          >
            رمز ليالي
          </Typography>
        </Link>

        <div className="hidden lg:block">{navList}</div>

        <div className="flex items-center gap-x-1">
          <Button
            size="sm"
            className="hidden bg-red-500 lg:inline-block"
            onClick={handleLogout}
          >
            <span>Log Out</span>
          </Button>
        </div>

        {/* Toggle button for mobile */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1 pb-4">
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              onClick={handleLogout}
            >
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
