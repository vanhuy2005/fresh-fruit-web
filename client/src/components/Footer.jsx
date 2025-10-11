import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    const linkSections = [
        {
            title: "Liên kết nhanh",
            links: [
                { name: "Trang chủ", href: "/" },
                { name: "Bán chạy", href: "/bestsellers" },
                { name: "Danh mục", href: "/categories" },
                { name: "Ưu đãi & Khuyến mãi", href: "/offers" },
                { name: "Về chúng tôi", href: "/about" }
            ]
        },
        {
            title: "Hỗ trợ khách hàng",
            links: [
                { name: "Thông tin giao hàng", href: "/delivery" },
                { name: "Chính sách đổi trả & hoàn tiền", href: "/returns" },
                { name: "Phương thức thanh toán", href: "/payment" },
                { name: "Theo dõi đơn hàng", href: "/track" },
                { name: "Liên hệ", href: "/contact" }
            ]
        },
        {
            title: "Kết nối",
            links: [
                { name: "Bản tin ưu đãi", href: "#newsletter" },
                { name: "Câu hỏi thường gặp", href: "/faq" },
                { name: "Blog", href: "/blog" },
                { name: "Tuyển dụng", href: "/careers" },
                { name: "Báo chí", href: "/press" }
            ]
        }
    ];

    const socialLinks = [
        {
            name: "Instagram",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            )
        },
        {
            name: "Facebook",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            )
        },
        {
            name: "Twitter",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            )
        },
        {
            name: "YouTube",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        }
    ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden border-t border-gray-200/50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500/5 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/5 rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/5 rounded-full"></div>
        </div>
        
        <div className="relative px-6 md:px-16 lg:px-24 xl:px-32">
            {/* Main Footer Content */}
            <div className="py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-bold">
                                <span className="bg-gradient-to-b from-emerald-300 via-green-600 to-green-800 bg-clip-text text-transparent">Fruit</span><span className="text-gray-800">Hub</span>
                            </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-8 max-w-md text-lg">
                        Chúng tôi là dịch vụ giao hàng, cửa hàng mang thực phẩm tươi ngon tận cửa nhà bạn. Được hàng ngàn người tin tưởng với định hướng lâu dài là mang đến trải nghiệm mua sắm đơn giản và phải chăng.   
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-medium">Theo dõi chúng tôi tại:</span>
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, index) => {
                                    const hoverColors = [
                                        'hover:bg-pink-500 hover:shadow-pink-500/25 hover:text-white',      // Instagram
                                        'hover:bg-blue-600 hover:shadow-blue-600/25 hover:text-white',      // Facebook  
                                        'hover:bg-sky-500 hover:shadow-sky-500/25 hover:text-white',        // Twitter
                                        'hover:bg-red-600 hover:shadow-red-600/25 hover:text-white'         // YouTube
                                    ];
                                    
                                    return (
                                        <a
                                            key={index}
                                            href="#"
                                            className={`w-12 h-12 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 ${hoverColors[index]} transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-2 hover:scale-110`}
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {linkSections.map((section, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-gray-800 mb-6 text-xl relative">
                                        {section.title}
                                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-green-500 rounded-full"></div>
                                    </h3>
                                    <ul className="space-y-4">
                                        {section.links.map((link, i) => (
                                            <li key={i}>
                                                <a 
                                                    href={link.href} 
                                                    className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:translate-x-2 transform inline-block hover:scale-105"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="py-8 border-t border-gray-200">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-gray-600">
                        <span className="font-medium">Copyright {new Date().getFullYear()} © FruitHub. All rights reserved.</span>
                        <a href="/privacy" className="hover:text-green-600 transition-colors font-medium">Chính Sách Bảo Mật</a>
                        <a href="/terms" className="hover:text-green-600 transition-colors font-medium">Điều Khoản Dịch Vụ</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
