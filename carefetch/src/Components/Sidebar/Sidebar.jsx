import { AiFillHome } from 'react-icons/ai'
import { FaUserDoctor } from 'react-icons/fa6';
import { BsFillHospitalFill } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import "./Sidebar.css"
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { imgSrc } from "../../assets/bg-login.jpg";
import { ImLab } from "react-icons/im"
import { RxAvatar } from "react-icons/rx";
import { BiLogOut, BiSolidReport } from "react-icons/bi";
import { GiTestTubes } from "react-icons/gi"
export default function Sidebar() {

    let [hovered, setHovered] = useState(false);
    let [user, setUser] = useState({})

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, [])

    function sideBarLinks() {
        let sideBarLinks = [];
        if (user?.UserType?.toLowerCase() === "admin") {
            sideBarLinks = [
                {
                    text: "Home",
                    icon: <AiFillHome />,
                    link: "/"
                },
                {
                    text: "Labs",
                    icon: <ImLab />,
                    link: "/labs"
                },
                {
                    text: "Hospitals",
                    icon: <BsFillHospitalFill />,
                    link: "/hospitals"
                }, {
                    text: "Logout",
                    icon: <BiLogOut />,
                    link: "/logout"
                },
            ]
        } else if (user?.UserType?.toLowerCase() == "patient") {
            sideBarLinks = [
                {
                    text: "Home",
                    icon: <AiFillHome />,
                    link: "/"
                },
                {
                    text: "Hospitals",
                    icon: <BsFillHospitalFill />,
                    link: "/hospitals"
                },
                {
                    text: "Labs",
                    icon: <ImLab />,
                    link: "/labs"
                },
                {
                    text: "Appointments",
                    icon: <SlCalender />,
                    link: "/appointments"
                },
                {
                    text: "Logout",
                    icon: <BiLogOut />,
                    link: "/logout"
                },
            ]
        } else if (user?.UserType?.toLowerCase() == "lab") {
            sideBarLinks = [
                {
                    text: "Home",
                    icon: <AiFillHome />,
                    link: "/"
                },
                {
                    text: "Patients",
                    link: "/lab-patients",
                },
                {
                    text: "Create Test",
                    link: "/create-test",
                    icon: <GiTestTubes />
                }, {
                    text: "Reports",
                    link: "/reports",
                    icon: <BiSolidReport />
                },
                {
                    text: "Appointments",
                    icon: <SlCalender />,
                    link: "/lab-appointments"
                },
                {
                    text: "Logout",
                    icon: <BiLogOut />,
                    link: "/logout"
                },
            ]
        } else if (user?.UserType?.toLowerCase() == "hospital") {
            sideBarLinks = [
                {
                    text: "Home",
                    icon: <AiFillHome />,
                    link: "/"
                },
                {
                    text: "Doctors",
                    icon: <FaUserDoctor />,
                    link: "/doctors"
                },
                {
                    text: "Appointments",
                    icon: <SlCalender />,
                    link: "/appointments"
                },
                {
                    text: "Logout",
                    icon: <BiLogOut />,
                    link: "/logout"
                },
            ]
        }
        return sideBarLinks;
    }

    let links = sideBarLinks();



    const openSidebar = () => {
        setHovered(true);
    }
    const closeSidebar = (e) => {
        e.stopPropagation()
        setHovered(false);
    }
    return (
        <>
            <div className="sidebar p-3 bg-black h-100 position-fixed top-0 z-1" style={{ width: "150px", transition: "all .4s", left: hovered ? "0px" : "-100px" }} onMouseLeave={closeSidebar} onMouseEnter={openSidebar}>
                <div className='h-100 d-flex flex-column justify-content-between h-100'>
                    <div className='Logo d-flex justify-content-center align-items-center' style={{ height: "200px" }}>
                        <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="logo" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
                    </div>
                    <ul className="sidebarLinks d-flex flex-column justify-content-around h-75 ps-0">
                        {links.map((link, index) => {
                            return (
                                <li key={index} className='list-unstyled'>
                                    <Link to={link.link} className='flex-column d-flex justify-content-center align-items-center text-white text-decoration-none'>
                                        <span className="icon" style={{ width: "20px", fontSize: "20px", }}>{link.text == "Patients" ? (<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none"><path d="M1962 4914 c-177 -30 -362 -121 -494 -244 -163 -151 -250 -285 -295 -459 -21 -79 -25 -121 -27 -241 -1 -132 2 -157 31 -275 18 -71 35 -139 38 -150 5 -17 -2 -24 -43 -41 -78 -33 -122 -108 -122 -207 0 -63 50 -213 96 -289 49 -80 119 -149 181 -179 50 -23 52 -26 64 -79 34 -160 106 -300 211 -406 l60 -61 -46 -92 c-26 -50 -48 -91 -50 -91 -14 0 -470 -135 -551 -163 -134 -46 -268 -102 -335 -140 -186 -104 -325 -236 -390 -371 -66 -138 -72 -186 -68 -638 l3 -395 35 -69 c25 -49 47 -77 78 -99 l44 -30 1746 0 1747 0 117 32 c430 116 750 433 863 855 82 308 38 636 -124 912 -175 297 -451 495 -801 572 -106 24 -357 24 -465 0 -281 -62 -523 -208 -696 -421 -77 -96 -98 -89 -144 48 l-29 85 69 74 c39 41 85 100 104 131 39 66 88 202 97 270 6 45 9 49 58 73 64 32 137 102 182 176 43 70 91 198 100 266 15 113 -56 234 -146 248 -23 4 -40 12 -40 20 0 7 7 89 16 181 20 213 15 527 -11 618 -36 126 -99 229 -202 325 -228 216 -540 308 -861 254z m333 -139 c174 -31 321 -107 447 -231 132 -131 170 -251 166 -522 -3 -158 -4 -165 -16 -122 -21 68 -79 189 -119 248 -61 87 -111 82 -163 -17 -43 -79 -93 -137 -144 -164 -38 -20 -52 -22 -203 -20 -158 3 -163 2 -190 -21 -40 -35 -38 -90 5 -151 17 -25 32 -48 32 -50 0 -10 -56 8 -104 34 -61 32 -107 92 -141 184 -79 212 -106 241 -213 234 -157 -11 -284 -140 -336 -337 -14 -54 -14 -54 -22 -25 -5 17 -8 89 -7 160 3 243 58 373 235 553 208 210 481 298 773 247z m-599 -782 c65 -177 92 -227 156 -292 86 -86 183 -122 328 -120 105 1 128 7 153 41 26 35 17 59 -49 128 l-52 55 77 -3 c147 -7 268 44 350 148 l40 51 14 -28 c42 -80 95 -303 121 -508 12 -90 19 -113 36 -127 33 -27 67 -22 99 13 36 38 70 37 90 -5 18 -39 2 -115 -49 -221 -42 -89 -117 -169 -167 -180 -89 -20 -95 -28 -113 -150 -29 -196 -136 -358 -290 -439 -94 -49 -183 -69 -315 -69 -182 1 -301 43 -411 145 -104 98 -168 227 -194 393 -12 79 -40 115 -89 115 -64 0 -154 99 -206 229 -35 86 -43 153 -21 186 21 32 37 32 87 -2 33 -22 45 -25 67 -17 43 15 55 54 58 192 8 267 77 449 189 498 56 25 72 19 91 -33z m2154 -1558 c356 -53 648 -269 801 -590 140 -292 141 -612 5 -901 -52 -110 -107 -192 -182 -273 -261 -283 -664 -402 -1035 -307 -372 95 -665 387 -766 763 -24 87 -27 116 -27 263 0 146 3 176 26 261 48 179 134 332 259 464 93 98 182 164 294 220 200 99 411 133 625 100z m-1975 -254 c158 -49 368 -47 519 3 39 14 74 21 77 18 3 -4 21 -50 38 -102 31 -89 53 -130 72 -130 4 0 19 -4 34 -10 l25 -10 -23 -47 c-13 -27 -32 -70 -42 -98 -33 -92 -135 -175 -268 -220 -92 -31 -240 -35 -328 -9 -147 44 -283 156 -347 285 -41 85 -41 104 1 115 28 8 39 22 90 122 39 75 63 112 72 109 7 -3 43 -15 80 -26z m-401 -307 c63 -186 245 -364 436 -426 90 -29 288 -36 382 -14 53 12 164 56 208 83 3 2 5 -63 6 -145 0 -153 9 -212 51 -347 83 -267 278 -514 519 -659 l59 -36 -1356 0 c-1321 0 -1356 0 -1373 19 -41 45 -46 97 -46 475 0 391 5 436 56 541 105 214 355 359 894 519 63 19 122 34 132 35 11 1 21 -14 32 -45z" /><path d="M3479 1971 l-29 -29 0 -171 0 -171 -176 0 -176 0 -29 -29 -29 -29 0 -172 0 -172 29 -29 29 -29 176 0 176 0 0 -176 0 -176 29 -29 29 -29 172 0 172 0 29 29 29 29 0 176 0 176 171 0 171 0 29 29 29 29 0 172 0 172 -29 29 -29 29 -171 0 -171 0 0 171 0 171 -29 29 -29 29 -172 0 -172 0 -29 -29z m291 -282 l0 -171 29 -29 29 -29 171 0 171 0 0 -90 0 -90 -171 0 -171 0 -29 -29 -29 -29 0 -176 0 -176 -90 0 -90 0 0 176 0 176 -29 29 -29 29 -176 0 -176 0 0 90 0 90 176 0 176 0 29 29 29 29 0 171 0 171 90 0 90 0 0 -171z" /></g></svg>) : (link.icon)}</span>
                                        <span className="title">{link.text}</span>
                                    </Link>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
            <div className="position-fixed fixed-top w-100 bg-black py-3 z-0 d-flex justify-content-end px-5">
                <div className=''>
                    <Link to="/profile" style={{ color: "white" }}>
                        <RxAvatar style={{ fontSize: "3rem" }} />
                    </Link>
                </div>
            </div>
            <div className="mainContent" style={{ marginLeft: hovered ? "155px" : "55px", marginTop: "100px", transition: "all .4s" }}>
                <Outlet />
            </div>
        </>
    )
}
