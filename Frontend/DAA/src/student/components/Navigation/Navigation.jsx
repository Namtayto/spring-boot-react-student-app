import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { navigation } from "./navigationData";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";

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
  const jwt = localStorage.getItem("jwt");
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
                {/* <HouseIcon className="bg-white" style={{ color: "red" }} /> */}
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
                {auth.user?.firstName ? (
                  <div>
                    <Avatar
                      className="text-white"
                      onClick={handleUserClick}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      sx={{
                        bgcolor: deepPurple[500],
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {auth.user?.firstName[0].toUpperCase()}
                    </Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorE1}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      MenuListProps={{ "aria-labelledby": "basic-button" }}
                    >
                      <MenuItem onClick={() => navigate("/account/point")}>
                        Profile
                      </MenuItem>

                      <MenuItem onClick={() => navigate("/account/tuition")}>
                        Tuition
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
