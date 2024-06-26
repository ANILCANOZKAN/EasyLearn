import {useStateContext} from "../context/ContextProvider.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import {Link} from "react-router-dom";

const Admin = ({ children }) => {
  const {user, token, role, setUser, setToken} = useStateContext()
  const [open, setOpen] = useState(true);

  useEffect(() => {
    axiosClient.get('/me')
      .then(({data}) => {
        setUser(data)
      })
  },[])
  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setUser({});
      setToken(null);
    });
  };

  let navBtns = [];
  let header;
  header = user.name+" "+user.surname;
  navBtns = [
    {
      name: "Kullanıcılar",
      url: "/admin/users",
      svg: <path strokeLinecap="round" strokeLinejoin="round"
                 d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
    },
    {
      name: "Eğitimler",
      url: "/lessons",
      svg: <path strokeLinecap="round" strokeLinejoin="round"
                 d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
    },
  ]


  const listItem = navBtns.map((list) =>
    <li
      className={`flex rounded-md 4 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}>
      <Link to={list.url} className="flex flex-row emrebaba p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
          {list.svg}
        </svg>
        <span className={`${!open && "hidden"} origin-left duration-200 ml-3`}>{list.name}
        </span>
      </Link>
    </li>
  );
  return(
    <>
      <div className="flex flex-row">
        <div className="flex">
          <div
            className={` ${
              open ? "w-72" : "w-20 "
            } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
          >
            <img
              src="../../src/assets/control.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex items-center justify-center flex-col">
              <img
                style={{width: "120px", borderRadius: "5px", border: "0px solid white"}}
                src="../../src/assets/Group3.png"
                className={`cursor-pointer duration-50${
                  open && "rotate-[360deg]"
                }`}
              />

              <h1
                className={`text-white origin-left font-medium text-xl duration-200 mt-4 ${
                  !open && "scale-0"
                }`}
              >
                {header}
              </h1>
            </div>
            <ul className="">
              {listItem}
              <li
                className={`flex rounded-md cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}>
                <a onClick={onLogout} className="flex flex-row emrebaba p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                  </svg>
                  <span className={`${!open && "hidden"} origin-left duration-200 ml-3`}>Çıkış Yap
              </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
export default Admin;
