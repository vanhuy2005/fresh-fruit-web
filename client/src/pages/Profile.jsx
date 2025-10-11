import { useState, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Profile = () => {
    const navigate = useNavigate()
    const { user, logout, orders } = useContext(AppContext)
    const [activeTab, setActiveTab] = useState('overview')

    // Calculate real stats from orders - Memoized để tránh recalculate mỗi render
    const orderStats = useMemo(() => {
        const totalOrders = orders.length
        const processingOrders = orders.filter(o => o.status === 'Processing').length
        const completedOrders = orders.filter(o => o.status === 'Completed').length
        const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length
        const rejectedOrders = orders.filter(o => o.status === 'Rejected').length
        const totalPoints = completedOrders * 50 // 50 points per completed order
        
        return {
            totalOrders,
            processingOrders,
            completedOrders,
            cancelledOrders,
            rejectedOrders,
            totalPoints
        }
    }, [orders])

    const { totalOrders, processingOrders, completedOrders, cancelledOrders, rejectedOrders, totalPoints } = orderStats

    // Stats data with real values
    const userStats = [
        { label: 'Tổng đơn hàng', value: totalOrders.toString(), emoji: '📦', color: 'from-blue-500 to-cyan-500' },
        { label: 'Đang xử lý', value: processingOrders.toString(), emoji: '🚚', color: 'from-green-500 to-emerald-500' },
        { label: 'Hoàn thành', value: completedOrders.toString(), emoji: '✅', color: 'from-purple-500 to-pink-500' },
        { label: 'Đã hủy/Từ chối', value: (cancelledOrders + rejectedOrders).toString(), emoji: '❌', color: 'from-red-500 to-orange-500' }
    ]

    // Get recent orders (latest 5) - Memoized
    const recentOrders = useMemo(() => {
        return orders.slice(0, 5).map(order => ({
            id: order.id,
            date: new Date(order.date).toLocaleDateString('vi-VN'),
            items: order.products.map(p => p.name).join(', '),
            total: `${order.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
            status: order.status === 'Processing' ? 'Đang xử lý' 
                  : order.status === 'Completed' ? 'Hoàn thành'
                  : order.status === 'Cancelled' ? 'Đã hủy'
                  : order.status === 'Rejected' ? 'Từ chối'
                  : order.status,
            statusColor: order.status === 'Processing' ? 'bg-blue-100 text-blue-700'
                       : order.status === 'Completed' ? 'bg-green-100 text-green-700'
                       : order.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                       : order.status === 'Rejected' ? 'bg-orange-100 text-orange-700'
                       : 'bg-gray-100 text-gray-700'
        }))
    }, [orders])

    // Get recent activities from orders - Memoized
    const recentActivities = useMemo(() => {
        return orders.slice(0, 4).map(order => {
            if (order.status === 'Processing') {
                return {
                    icon: '🛒',
                    text: `Đã đặt đơn hàng ${order.id}`,
                    time: new Date(order.date).toLocaleDateString('vi-VN'),
                    color: 'bg-green-50'
                }
            } else if (order.status === 'Completed') {
                return {
                    icon: '✅',
                    text: `Đơn hàng ${order.id} đã giao thành công`,
                    time: new Date(order.date).toLocaleDateString('vi-VN'),
                    color: 'bg-blue-50'
                }
            } else if (order.status === 'Cancelled') {
                return {
                    icon: '❌',
                    text: `Đã hủy đơn hàng ${order.id}`,
                    time: new Date(order.cancelledAt || order.date).toLocaleDateString('vi-VN'),
                    color: 'bg-red-50'
                }
            } else if (order.status === 'Rejected') {
                return {
                    icon: '⚠️',
                    text: `Đơn hàng ${order.id} bị từ chối`,
                    time: new Date(order.cancelledAt || order.date).toLocaleDateString('vi-VN'),
                    color: 'bg-orange-50'
                }
            }
            return {
                icon: '📦',
                text: `Đơn hàng ${order.id}`,
                time: new Date(order.date).toLocaleDateString('vi-VN'),
                color: 'bg-gray-50'
            }
        })
    }, [orders])

    // Achievements calculation - Memoized
    const achievements = useMemo(() => [
        { emoji: '🌟', title: 'Khách hàng mới', desc: `Đã mua ${totalOrders} đơn`, unlocked: totalOrders >= 1 },
        { emoji: '🎯', title: 'Người mua sắm thông minh', desc: `${completedOrders} đơn hoàn thành`, unlocked: completedOrders >= 5 },
        { emoji: '💎', title: 'VIP Member', desc: `Đạt ${totalPoints} điểm`, unlocked: totalPoints >= 1000 },
        { emoji: '🏆', title: 'Khách hàng thân thiết', desc: 'Mua 20+ đơn', unlocked: totalOrders >= 20 }
    ], [totalOrders, completedOrders, totalPoints])

    // Membership level calculation - Memoized
    const membershipLevel = useMemo(() => ({
        current: totalPoints >= 1000 ? 'Gold' : totalPoints >= 500 ? 'Silver' : 'Bronze',
        progress: Math.min((totalPoints % 500) / 5, 100),
        nextLevel: totalPoints >= 1000 ? 'Platinum' : totalPoints >= 500 ? 'Gold' : 'Silver',
        pointsNeeded: totalPoints >= 1000 ? 1500 - totalPoints : totalPoints >= 500 ? 1000 - totalPoints : 500 - totalPoints,
        benefits: ['Giảm giá đơn hàng', 'Freeship', 'Ưu tiên hỗ trợ']
    }), [totalPoints])

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
                                    {recentOrders.length > 0 ? (
                                        <>
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
                                                        <p className="text-gray-600 mb-2 line-clamp-1">{order.items}</p>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-lg font-bold text-green-600">{order.total}</span>
                                                            <button 
                                                                onClick={() => navigate('/orders')}
                                                                className="text-green-600 hover:text-green-700 font-medium text-sm"
                                                            >
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
                                        </>
                                    ) : (
                                        <div className="p-12 text-center">
                                            <div className="text-5xl mb-4">🛒</div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Chưa có đơn hàng</h3>
                                            <p className="text-gray-500 mb-4">Bắt đầu mua sắm ngay!</p>
                                            <button
                                                onClick={() => navigate('/products')}
                                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Khám phá sản phẩm
                                            </button>
                                        </div>
                                    )}
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
