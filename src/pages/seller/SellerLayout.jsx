import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const SellerLayout = () => {
    const { setIsSeller } = useAppContext()

    const sidebarLinks = [
        { name: "Add Product", path: "/seller/dashboard", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ]

    const logout = async () => {
        setIsSeller(false)
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/'>
                   <img src={assets.logo} alt="logo" className="cursor-pointer w-32" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1 hover:bg-gray-50'>Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                    {sidebarLinks.map((item, index) => (
                        <NavLink 
                            to={item.path} 
                            key={index}
                            end={item.path === "/seller/dashboard"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                                ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                    : "hover:bg-gray-100/90 border-white text-gray-700"
                                }`
                            }
                        >
                            <img src={item.icon} alt={item.name} className="w-7 h-7"/>
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default SellerLayout