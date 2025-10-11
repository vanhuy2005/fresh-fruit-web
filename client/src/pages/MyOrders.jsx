import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyOrders = () => {
    const navigate = useNavigate()
    const { orders, formatPrice, cancelOrder, user } = useAppContext()
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [cancelReason, setCancelReason] = useState('')
    const [customReason, setCustomReason] = useState('')

    // Check if user is logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Vui lòng đăng nhập</h2>
                    <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem đơn hàng</p>
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

    const cancelReasons = [
        'Đổi ý không muốn mua nữa',
        'Tìm được giá rẻ hơn',
        'Đặt nhầm sản phẩm',
        'Thời gian giao hàng quá lâu',
        'Lý do khác'
    ]

    const handleCancelClick = (orderId) => {
        setSelectedOrderId(orderId)
        setShowCancelModal(true)
        setCancelReason('')
        setCustomReason('')
    }

    const handleConfirmCancel = () => {
        if (!cancelReason) {
            toast.error('Vui lòng chọn lý do hủy đơn')
            return
        }
        if (cancelReason === 'Lý do khác' && !customReason.trim()) {
            toast.error('Vui lòng nhập lý do cụ thể')
            return
        }

        const finalReason = cancelReason === 'Lý do khác' ? customReason : cancelReason
        cancelOrder(selectedOrderId, finalReason, 'customer')
        toast.success('Đã hủy đơn hàng thành công')
        setShowCancelModal(false)
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'Processing': return 'text-blue-600 bg-blue-50'
            case 'Cancelled': return 'text-red-600 bg-red-50'
            case 'Rejected': return 'text-orange-600 bg-orange-50'
            case 'Completed': return 'text-green-600 bg-green-50'
            default: return 'text-gray-600 bg-gray-50'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">MY ORDERS</h1>

                {/* Orders List */}
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            {/* Order Header */}
                            <div className="bg-gray-50 px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">OrderId : </span>
                                    <span className="font-medium text-gray-800">{order.id}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Payment : </span>
                                    <span className="font-medium text-gray-800">{order.paymentMethod}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Total : </span>
                                    <span className="font-medium text-gray-800">{formatPrice(order.totalAmount)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Status : </span>
                                    <span className={`font-semibold px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Cancel Info if cancelled */}
                            {(order.status === 'Cancelled' || order.status === 'Rejected') && order.cancelReason && (
                                <div className="px-6 py-3 bg-red-50 border-b border-red-100">
                                    <p className="text-sm text-red-700">
                                        <span className="font-semibold">
                                            {order.cancelledBy === 'seller' ? 'Từ chối bởi Seller' : 'Đã hủy'}:
                                        </span> {order.cancelReason}
                                    </p>
                                    <p className="text-xs text-red-600 mt-1">
                                        {new Date(order.cancelledAt).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                            )}

                            {/* Order Items */}
                            <div className="p-6 space-y-4">
                                {order.products.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="md:col-span-1">
                                                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500">Price: {formatPrice(item.price)}</p>
                                            </div>

                                            <div className="md:col-span-1">
                                                <p className="text-sm">
                                                    <span className="text-teal-500 font-medium">Quantity: {item.quantity}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                            </div>

                                            <div className="md:col-span-1">
                                                <p className="text-lg font-semibold text-teal-500">
                                                    Amount: {formatPrice(item.total)}
                                                </p>
                                            </div>

                                            <div className="md:col-span-1 flex items-center justify-end gap-2">
                                                {order.status === 'Processing' && (
                                                    <button 
                                                        onClick={() => handleCancelClick(order.id)}
                                                        className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all text-sm"
                                                    >
                                                        Hủy đơn
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => navigate(`/product/${item._id}`)}
                                                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-green-500 hover:text-green-600 transition-all text-sm"
                                                >
                                                    Xem SP
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State (nếu không có orders) */}
                {orders.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
                        <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700"
                        >
                            Browse Products
                        </button>
                    </div>
                )}
            </div>

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Hủy đơn hàng</h3>
                        
                        <p className="text-sm text-gray-600 mb-4">
                            Vui lòng chọn lý do hủy đơn hàng:
                        </p>

                        <div className="space-y-2 mb-4">
                            {cancelReasons.map((reason, index) => (
                                <label 
                                    key={index}
                                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        cancelReason === reason 
                                            ? 'border-red-500 bg-red-50' 
                                            : 'border-gray-200 hover:border-red-300'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="cancelReason"
                                        value={reason}
                                        checked={cancelReason === reason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                        className="mr-3 text-red-600 focus:ring-red-500"
                                    />
                                    <span className="text-sm text-gray-700">{reason}</span>
                                </label>
                            ))}
                        </div>

                        {cancelReason === 'Lý do khác' && (
                            <textarea
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                placeholder="Nhập lý do cụ thể..."
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none resize-none mb-4"
                                rows={3}
                            />
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg"
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyOrders
