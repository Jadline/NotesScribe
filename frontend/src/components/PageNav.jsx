import { Fragment, useState } from 'react'
import { Dialog, Transition, Menu, DialogBackdrop, TransitionChild, DialogPanel, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useUsers } from '../contexts/UserContext'
import { useMutation } from '@tanstack/react-query'
import { logout } from '../services/logout.js'



const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PageNav() {
  const {userInfo,setUserInfo} = useUsers()
  const navigation = [
  
  // { name: 'My Profile', to: 'user-profile', icon: IdentificationIcon },
  { name: 'Dashboard', to: '/', icon: HomeIcon },
 ...(userInfo ? [ { name: 'Notes', to: 'all-notes', icon: DocumentDuplicateIcon }] : []),
 ...(userInfo?.role === 'admin' ? [ { name: 'Users', to: 'users', icon: UsersIcon }] : []),
  ...(userInfo ? [{ name: 'My Profile', to: 'user-profile', icon: IdentificationIcon }] : [])
]
const navigate = useNavigate()
 const userNavigation = userInfo
    ? [
        { name: "Your profile", to: "/user-profile" },
        { name: "Logout", action: handleLogout }, // use action instead of to
      ]
    : [
        { name: "Create Account", to: "/signup" },
        { name: "Sign in", to: "/login" },
      ];

      async function handleLogout() {
  try {
    await logout();
    setUserInfo(null);
    navigate("/login");
  } catch (err) {
    console.error("Logout failed", err);
  }
}
  
    
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* ---------------- Mobile sidebar ---------------- */}
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop
            className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          {/* Sidebar Panel */}
          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-indigo-800 px-6 pb-4">
                {/* Close button */}
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5 text-white"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Logo */}
                <div className="flex h-16 items-center">
                  <h2 className='text-white'>NotesScribe</h2>
                 
                </div>

                {/* Navigation */}
                <nav className="mt-5 flex-1">
                  <ul className="space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? 'bg-indigo-950/25 text-white'
                                : 'text-indigo-100 hover:bg-indigo-950/25 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                            )
                          }
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0 text-indigo-100 group-hover:text-white"
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>

                  
                </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* ---------------- Desktop sidebar ---------------- */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-800 px-6 pb-4">
          <div className="flex h-16 items-center">
             <h2 className='text-white text-xl'>NotesScribe</h2>
            {/* <img
              alt="Logo"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
              className="h-8 w-auto"
            /> */}
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? 'bg-indigo-950/25 text-white'
                          : 'text-indigo-100 hover:bg-indigo-950/25 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                      )
                    }
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0 text-indigo-100 group-hover:text-white"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ---------------- Main content & Top bar ---------------- */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-white/10 bg-gray-900 px-4 sm:px-6 lg:px-8">
          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Search + Profile */}
          <div className="flex flex-1 gap-x-4">
            <form className="flex flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="block w-full rounded-md bg-gray-900 pl-9 pr-3 text-white placeholder-gray-500 focus:outline-none sm:text-sm"
              />
            </form>

            <div className="flex items-center gap-x-4">
              <button type="button" className="text-gray-400 hover:text-white">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-x-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1558470598-a5dda9640f68?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                 <MenuItems 
                 className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg focus:outline-none">
  {userNavigation.map((item) => (
    <MenuItem key={item.name}>
      {({ active }) =>
        item.action ? (
          <button
            onClick={item.action}
            className={classNames(
              active ? "bg-gray-700" : "",
              "w-full text-left px-4 py-2 text-sm text-white"
            )}
          >
            {item.name}
          </button>
        ) : (
          <Link
            to={item.to}
            className={classNames(
              active ? "bg-gray-700" : "",
              "block px-4 py-2 text-sm text-white"
            )}
          >
            {item.name}
          </Link>
        )
      }
    </MenuItem>
  ))}
</MenuItems>

                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
