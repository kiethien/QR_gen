"use client"
import React, { useState, useEffect } from "react";
import MyQRCodesContent from "./MyQRCodesContent";
import MyProfileContent from "./MyProfileContent";
import './style.css';

const App = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(2);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Initialize with false
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  const Menus = [
    { title: "Profile", src: "User", content: <MyProfileContent onFolderCreate={() => {}} />,
},
    { title: "Statistic", src: "Chat", content: "Inbox Content" },
    {
      title: "My QR Codes",
      src: "User",
      gap: true,
      content: <MyQRCodesContent onFolderCreate={() => {}} />,
    },
    { title: "Schedule", src: "Calendar", content: "Schedule Content" },
    { title: "User Domain", src: "Search", content: "Search Content" },
    {
      title: "Import From CSV",
      src: "Chart",
      content: "Analytics Content",
    },
    {
      title: "Archive QR Codes",
      src: "Folder",
      gap: true,
      content: "Files Content",
    },
    { title: "Setting", src: "Setting", content: "Setting Content" },
  ];

  const handleLogoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Toggle the sidebar
    setOpen(!open);
  };

  const handleResize = () => {
    const newIsSmallScreen = window.innerWidth <= 1200;
    setIsSmallScreen(newIsSmallScreen);

    // Automatically close the sidebar when the screen is small
    if (newIsSmallScreen) {
      setOpen(false);
    } else {
      // Open the sidebar when the screen is large
      setOpen(true);
    }
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    updateScreenSize(); // Set initial size on mount

    // Event listener to update state on window resize
    window.addEventListener('resize', updateScreenSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []) // Dependency array is empty to ensure the effect runs only once on mount

  return (
    <div className="flex overflow-hidden">
      <div className={"w-[260px] bg-dark-purple h-screen hidden lg:block"}>
        <div className="flex gap-x-4 items-center">
          {/* Logo3.png */}
            <img
              src="logo3.png"
              alt="Logo3"
              className={`cursor-pointer duration-500 
                  h-11 w-11" 
              `}
            />

          <h1 className={"text-white origin-left font-medium text-xl "}>
            QREACTIVE
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === selectedMenuItem && "bg-light-white"
              } `}
              onClick={() => setSelectedMenuItem(index)}
            >
              <img src={`${Menu.src}.png`} alt={Menu.title} />
              <span className={"origin-left duration-200"}>{Menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div class="flex-1 h-screen w-full overflow-y-scroll  ">
        <div className={"w-full bg-gray-200 lg:hidden h-[70px]"}>
          <div className="flex justify-between items-center h-full">
            {/* Logo on the left */}
            <img
              src="burger.png"
              alt="Left Logo"
              className="h-4/5	"
              onClick={toggleNavbar}
            />
            {/* Middle logo */}
            <img src="qreact.png" alt="Middle Logo" className="h-full" />
            {/* Button on the right */}
            {/* Button with logo */}
            <button className="bg-blue-500 text-white px-4 py-2  flex items-center mr-2 rounded-xl">
              {/* Logo inside the button */}
              <img
                src="User.png"
                alt="Button Logo"
                className="h-6 mr-2"
              />
              {/* Button text */}
              HL
            </button>{" "}
          </div>
        </div>

        {Menus[selectedMenuItem].content}
      </div>

      <div
        className={`w-[260px] h-screen fixed z-10 top-0 bg-dark-purple lg:hidden transition ${
          navbarActive ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={toggleNavbar}
      >
        <div className="flex gap-x-4 items-center">
          {/* Logo3.png */}
          <img
            src="cross.png"
            alt="Logo3"
            className={`cursor-pointer duration-500 
                h-11 w-11" 
            `}
          />

          <h1 className={"text-white origin-left font-medium text-xl "}>
            
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === selectedMenuItem && "bg-light-white"
              } `}
              onClick={() => setSelectedMenuItem(index)}
            >
              <img src={`${Menu.src}.png`} alt={Menu.title} />
              <span className={"origin-left duration-200"}>{Menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

