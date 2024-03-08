import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Avatar, Button, Dialog, Menu, MenuItem, Tab } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { navigation } from "./navigationData";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getUser, logOut } from "../../../State/Auth/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorE1, setAnchorE1] = useState(null);
  const openUserMenu = Boolean(anchorE1);
  const jwt = localStorage.getItem("accessToken");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleUserClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorE1(null);
  };

  const handleOpen = (event) => {
    setOpenAuthModal(true);
  };
  const handleClose = (event) => {
    setOpenAuthModal(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
    handleCloseUserMenu();
    navigate("/");
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
  }, [auth.user]);

  return (
    <div className="bg-white pb-10 z-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.items.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="-m-2 flex items-center p-2">
                    <div></div>
                    <button onClick={() => navigate("/")}>
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                    </button>

                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <header className="fixed top-0 w-full z-50 bg-white">
        <nav aria-label="Top" className="mx-auto">
          <div
            className="flex h-16 items-center px-11"
            style={{ backgroundColor: "#303434" }}
          >
            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <button onClick={() => navigate("/")}>
                <img
                  imgLogo
                  src="https://neetcode.io/assets/neetcode-io-logo.png"
                  alt=""
                  width="36px"
                ></img>
              </button>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    {({ open, close }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? "text-white hover:bg-black"
                                : "border-transparent text-white hover:bg-black",
                              "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                            )}
                          >
                            {category.name}
                            <ArrowDropDownIcon />
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8"></div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    <div>
                                      <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                        {category.items.map((item) => (
                                          <p className="hover:text-red-600 cursor-pointer">
                                            {item.name}
                                          </p>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}
                {navigation.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-sm font-medium text-white hover:bg-blue-400"
                  >
                    {page.name}
                  </a>
                ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {auth.user?.roles[0].name === "ROLE_STUDENT" ? (
                  <div>
                    <Avatar
                      className="text-white"
                      onClick={handleUserClick}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <img
                        className="flex items-center justify-center"
                        imgLogo
                        src="https://cdn-icons-png.flaticon.com/512/5850/5850276.png"
                        alt=""
                        width="36px"
                      ></img>
                    </Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorE1}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      MenuListProps={{ "aria-labelledby": "basic-button" }}
                    >
                      <div className="text-center text-red-600">
                        Student: {auth.user?.studentId}
                      </div>
                      <MenuItem onClick={() => navigate("/account/point")}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/account/tuition")}>
                        Tuition
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                ) : auth.user?.roles[0].name === "ROLE_TEACHER" ? (
                  <div className="flex items-center">
                    <Avatar
                      className="text-white"
                      onClick={handleUserClick}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <img
                        className="flex items-center justify-center"
                        imgLogo
                        src="https://static-00.iconduck.com/assets.00/teacher-and-book-icon-2048x1974-gbj3kbyw.png"
                        alt=""
                        width="36px"
                      ></img>
                    </Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorE1}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      MenuListProps={{ "aria-labelledby": "basic-button" }}
                    >
                      <div className="text-center text-red-600">Teacher</div>
                      <MenuItem onClick={() => navigate("/teacher")}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button
                    onClick={handleOpen}
                    className="text-sm font-medium text-white hover:text-red-600"
                    style={{ color: "white" }}
                  >
                    Signin
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
