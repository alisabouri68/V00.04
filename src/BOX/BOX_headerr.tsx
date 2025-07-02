import React from 'react'
import Container from "../COMP/RCOM_container"
import { GrMoreVertical } from "react-icons/gr";
import Logo from "../ASST/images/logo-dash.png"
import Avatar from "../ASST/images/avatar.png"
import { GoSun } from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
const BOX_headerr = () => {
    return (
        <header className='w-full shadow-md mb-2'>
            <div className="h-16 flex items-center">
                <Container>
                    <div className='w-full flex items-center justify-between '>
                        <div className="flex items-center">
                            <div className='mx-1 flex items-center'><img src={Logo} alt="logo-raad-health" /></div>
                            <div className='mx-1 flex items-center'><span>{`mono (mono)`}</span></div>
                            <div className='mx-1 flex items-center'><button><GrMoreVertical className='text-2xl' /></button></div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div>
                                <button className='flex items-center'>
                                    <div className='mx-1 items-center'><span><GoSun className='text-2xl' /></span></div>
                                    <div className='mx-1 items-center'>Theme</div>
                                    <div className='mx-1 items-center'><span><MdKeyboardArrowDown className='text-2xl' /></span></div>
                                </button>

                            </div>
                            <div>
                                <button className='flex items-center'>
                                    <div className='mx-1 flex items-center'><span><GrLanguage className='text-2xl' /></span></div>
                                    <div className='mx-1 flex items-center'>English</div>
                                    <div className='mx-1 flex items-center'><span><MdKeyboardArrowDown className='text-2xl' /></span></div>
                                </button>

                            </div>
                            <div>
                                <button className='flex items-center gap-3 text-sm font-bold'>

                                    <div><img src={Avatar} alt="user-avatar"/></div>
                                    <div className='flex flex-col items-start justify-center'>
                                        <div><span>Hana Rezaei</span></div>
                                        <div><span className='text-gray-500'>{`Tehran`}</span></div>
                                    </div>
                                </button>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </header>

    )
}

export default BOX_headerr
