import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Profile = () => {
    const navigate = useNavigate()
    const { user, logout } = useContext(AppContext)
    const [activeTab, setActiveTab] = useState('overview')

    // Demo data
    const userStats = [
        { label: 'Tổng đơn hàng', value: '24', emoji: '📦', color: 'from-blue-500 to-cyan-500' },
        { label: 'Đang giao', value: '2', emoji: '🚚', color: 'from-green-500 to-emerald-500' },
        { label: 'Hoàn thành', value: '22', emoji: '✅', color: 'from-purple-500 to-pink-500' },
        { label: 'Điểm thưởng', value: '850', emoji: '⭐', color: 'from-orange-500 to-yellow-500' }
    ]

    const recentOrders = [
        {
            id: '#DH2024001',
            date: '15/12/2024',
            items: 'Táo Fuji, Cam Sành, Xoài Cát',
            total: '245.000 ₫',
            status: 'Đang giao',
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: '#DH2024002',
            date: '10/12/2024',
            items: 'Nho Mỹ, Bơ Booth, Dâu Tây',
            total: '380.000 ₫',
            status: 'Hoàn thành',
            statusColor: 'bg-blue-100 text-blue-700'
        },
        {
            id: '#DH2024003',
            date: '05/12/2024',
            items: 'Cam Cara, Bưởi Da Xanh',
            total: '156.000 ₫',
            status: 'Hoàn thành',
            statusColor: 'bg-blue-100 text-blue-700'
        }
    ]

    const recentActivities = [
        { icon: '🛒', text: 'Đã đặt đơn hàng #DH2024001', time: '2 giờ trước', color: 'bg-green-50' },
        { icon: '⭐', text: 'Đã đánh giá sản phẩm Táo Fuji', time: '1 ngày trước', color: 'bg-yellow-50' },
        { icon: '🎁', text: 'Nhận được 50 điểm thưởng', time: '2 ngày trước', color: 'bg-purple-50' },
        { icon: '✅', text: 'Đơn hàng #DH2024002 đã giao thành công', time: '3 ngày trước', color: 'bg-blue-50' }
    ]

    const achievements = [
        { emoji: '🌟', title: 'Khách hàng thân thiết', desc: 'Đã mua 20+ đơn', unlocked: true },
        { emoji: '🎯', title: 'Người mua sắm thông minh', desc: 'Tiết kiệm 500K', unlocked: true },
        { emoji: '💎', title: 'VIP Member', desc: 'Đạt 1000 điểm', unlocked: false },
        { emoji: '🏆', title: 'Siêu sao đánh giá', desc: 'Đánh giá 50 sản phẩm', unlocked: false }
    ]

    const membershipLevel = {
        current: 'Silver',
        progress: 65,
        nextLevel: 'Gold',
        pointsNeeded: 350,
        benefits: ['Giảm 10% mọi đơn', 'Freeship từ 100K', 'Ưu tiên hỗ trợ']
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Vui lòng đăng nhập</h2>
                    <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem trang cá nhân</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Đăng nhập ngay
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                        <span className="text-xl">←</span>
                        <span className="font-medium">Quay lại</span>
                    </button>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white to-green-100 p-1 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-inner">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 w-10 h-10 bg-white text-green-600 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                                <span className="text-lg">📷</span>
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-bold">
                                    Xin chào, {user.name}! 👋
                                </h1>
                            </div>
                            <p className="text-green-100 text-lg mb-3">{user.email}</p>
                            
                            {/* Membership Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                <span className="text-2xl">💎</span>
                                <span className="font-semibold">Thành viên {membershipLevel.current}</span>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/settings')}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/30"
                            >
                                <span className="text-2xl">⚙️</span>
                            </button>
                            <button
                                onClick={() => {
                                    logout()
                                    navigate('/')
                                }}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-red-500/80 transition-all border border-white/30"
                            >
                                <span className="text-2xl">🚪</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {userStats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg`}>
                                {stat.emoji}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Membership Progress */}
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 mb-8 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Hạng thành viên của bạn</h3>
                            <p className="text-white/80">Còn {membershipLevel.pointsNeeded} điểm nữa để lên {membershipLevel.nextLevel}</p>
                        </div>
                        <div className="text-5xl">💎</div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="bg-white/20 rounded-full h-4 mb-4 overflow-hidden backdrop-blur-sm">
                        <div 
                            className="bg-white h-full rounded-full transition-all duration-1000 shadow-lg"
                            style={{ width: `${membershipLevel.progress}%` }}
                        ></div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {membershipLevel.benefits.map((benefit, index) => (
                            <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm border border-white/30">
                                ✨ {benefit}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Tổng quan', emoji: '📊' },
                        { id: 'orders', label: 'Đơn hàng', emoji: '📦' },
                        { id: 'activity', label: 'Hoạt động', emoji: '⚡' },
                        { id: 'achievements', label: 'Thành tích', emoji: '🏆' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                            }`}
                        >
                            <span className="mr-2">{tab.emoji}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === 'overview' && (
                            <>
                                {/* Recent Orders */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            <span className="text-2xl">📦</span>
                                            Đơn hàng gần đây
                                        </h2>
                                    </div>
                                    <div className="divide-y">
                                        {recentOrders.map((order, index) => (
                                            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <div className="font-bold text-gray-900 mb-1">{order.id}</div>
                                                        <div className="text-sm text-gray-500">{order.date}</div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-2">{order.items}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg font-bold text-green-600">{order.total}</span>
                                                    <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                                                        Xem chi tiết →
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-gray-50 text-center">
                                        <button
                                            onClick={() => navigate('/orders')}
                                            className="text-green-600 hover:text-green-700 font-semibold"
                                        >
                                            Xem tất cả đơn hàng →
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Trang đơn hàng</h3>
                                <p className="text-gray-600 mb-6">Xem chi tiết tất cả đơn hàng của bạn</p>
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                                >
                                    Xem đơn hàng
                                </button>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <span className="text-2xl">⚡</span>
                                        Hoạt động gần đây
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className={`flex items-start gap-4 p-4 ${activity.color} rounded-xl`}>
                                            <div className="text-3xl">{activity.icon}</div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{activity.text}</p>
                                                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div className="space-y-4">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-2xl border-2 transition-all ${
                                            achievement.unlocked
                                                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400 shadow-lg'
                                                : 'bg-gray-50 border-gray-200 opacity-60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-5xl">{achievement.emoji}</div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    {achievement.title}
                                                    {achievement.unlocked && <span className="ml-2">✅</span>}
                                                </h3>
                                                <p className="text-gray-600">{achievement.desc}</p>
                                            </div>
                                            {!achievement.unlocked && (
                                                <div className="text-2xl">🔒</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Links */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-xl">🔗</span>
                                Liên kết nhanh
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'Cài đặt tài khoản', emoji: '⚙️', path: '/settings' },
                                    { label: 'Địa chỉ giao hàng', emoji: '📍', path: '/settings' },
                                    { label: 'Hỗ trợ khách hàng', emoji: '💬', path: '/support' },
                                    { label: 'Ưu đãi của tôi', emoji: '🎁', path: '/promotions' }
                                ].map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => navigate(link.path)}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                                    >
                                        <span className="text-2xl">{link.emoji}</span>
                                        <span className="text-gray-700 group-hover:text-green-600 font-medium">
                                            {link.label}
                                        </span>
                                        <span className="ml-auto text-gray-400 group-hover:text-green-600">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Promotions */}
                        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl shadow-xl p-6 text-white">
                            <div className="text-4xl mb-3">🎉</div>
                            <h3 className="text-xl font-bold mb-2">Ưu đãi đặc biệt!</h3>
                            <p className="text-white/90 mb-4">
                                Giảm 20% cho đơn hàng tiếp theo của bạn
                            </p>
                            <button className="w-full py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                                Xem chi tiết
                            </button>
                        </div>

                        {/* Support */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="text-center">
                                <div className="text-5xl mb-3">💬</div>
                                <h3 className="font-bold text-gray-900 mb-2">Cần hỗ trợ?</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Đội ngũ chăm sóc khách hàng sẵn sàng giúp bạn 24/7
                                </p>
                                <button
                                    onClick={() => navigate('/support')}
                                    className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                                >
                                    Liên hệ ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
