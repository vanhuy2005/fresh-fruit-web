import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const SellerOrders = () => {
    const { orders, formatPrice, rejectOrder, deleteOrder } = useAppContext()
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [rejectReason, setRejectReason] = useState('')
    const [customReason, setCustomReason] = useState('')

    const rejectReasons = [
        'Sản phẩm hết hàng',
        'Không thể giao đến địa chỉ này',
        'Thông tin đơn hàng không hợp lệ',
        'Giá sản phẩm đã thay đổi',
        'Lý do khác'
    ]

    const handleRejectClick = (orderId) => {
        setSelectedOrderId(orderId)
        setShowRejectModal(true)
        setRejectReason('')
        setCustomReason('')
    }

    const handleConfirmReject = () => {
        if (!rejectReason) {
            toast.error('Vui lòng chọn lý do từ chối')
            return
        }
        if (rejectReason === 'Lý do khác' && !customReason.trim()) {
            toast.error('Vui lòng nhập lý do cụ thể')
            return
        }

        const finalReason = rejectReason === 'Lý do khác' ? customReason : rejectReason
        rejectOrder(selectedOrderId, finalReason)
        toast.success('Đã từ chối đơn hàng')
        setShowRejectModal(false)
    }

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Bạn có chắc muốn xóa đơn hàng này? Hành động này không thể hoàn tác!')) {
            deleteOrder(orderId)
            toast.success('Đã xóa đơn hàng')
        }
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
        <div className="py-8 px-6 md:px-12 bg-white min-h-[calc(100vh-73px)]">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Orders List</h2>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                    <p className="text-gray-500">Orders from customers will appear here</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Order Status Bar */}
                            <div className="px-6 py-3 bg-gray-50 border-b flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">Order ID: <span className="font-mono font-semibold">{order.id}</span></span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {order.status === 'Processing' && (
                                        <button
                                            onClick={() => handleRejectClick(order.id)}
                                            className="px-4 py-1.5 bg-orange-50 border border-orange-300 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-all"
                                        >
                                            Từ chối
                                        </button>
                                    )}
                                    {(order.status === 'Cancelled' || order.status === 'Rejected') && (
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="px-4 py-1.5 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-all"
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Cancel/Reject Info */}
                            {(order.status === 'Cancelled' || order.status === 'Rejected') && order.cancelReason && (
                                <div className="px-6 py-3 bg-red-50 border-b border-red-100">
                                    <p className="text-sm text-red-700">
                                        <span className="font-semibold">Lý do:</span> {order.cancelReason}
                                    </p>
                                    <p className="text-xs text-red-600 mt-1">
                                        {order.cancelledBy === 'seller' ? 'Từ chối bởi Seller' : 'Hủy bởi khách hàng'} - {new Date(order.cancelledAt).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                            )}

                            {/* Order Card */}
                            <div className="p-6">
                                <div className="flex items-start gap-6">
                                    {/* Product Image with Count Badge */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                            <img 
                                                src={order.products[0]?.image} 
                                                alt={order.products[0]?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {order.products.length > 1 && (
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                                                +{order.products.length - 1}
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Details */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {/* Product Names */}
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 mb-1">
                                                {order.products.map((p, idx) => (
                                                    <span key={idx}>
                                                        {p.name}
                                                        {idx < order.products.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {order.products.map((p, idx) => (
                                                    <span key={idx}>
                                                        x{p.quantity}
                                                        {idx < order.products.length - 1 && ' | '}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>

                                        {/* Shipping Address */}
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Shipping Address</p>
                                            <p className="text-sm text-gray-800 font-medium">
                                                {order.address?.street || 'Great Stock'}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {order.address?.city || 'Street 123, Main City'}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {order.address?.state || 'New State'},{order.address?.country || 'IN'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {order.address?.zip || '123456'},{order.address?.phone || '1234567890'}
                                            </p>
                                        </div>

                                        {/* Total Amount */}
                                        <div className="flex flex-col justify-center">
                                            <p className="text-2xl font-bold text-gray-800">
                                                {formatPrice(order.totalAmount)}
                                            </p>
                                        </div>

                                        {/* Payment & Status Info */}
                                        <div className="flex flex-col justify-center text-sm">
                                            <div className="space-y-1">
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Method:</span> {order.paymentMethod}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Payment:</span>{' '}
                                                    <span className={`${
                                                        order.paymentMethod === 'Online' 
                                                            ? 'text-green-600' 
                                                            : 'text-orange-600'
                                                    } font-semibold`}>
                                                        {order.paymentMethod === 'Online' ? 'Paid' : 'Pending'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reject Order Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Từ chối đơn hàng</h3>
                        
                        <p className="text-sm text-gray-600 mb-4">
                            Vui lòng chọn lý do từ chối đơn hàng:
                        </p>

                        <div className="space-y-2 mb-4">
                            {rejectReasons.map((reason, index) => (
                                <label 
                                    key={index}
                                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        rejectReason === reason 
                                            ? 'border-orange-500 bg-orange-50' 
                                            : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="rejectReason"
                                        value={reason}
                                        checked={rejectReason === reason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        className="mr-3 text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-sm text-gray-700">{reason}</span>
                                </label>
                            ))}
                        </div>

                        {rejectReason === 'Lý do khác' && (
                            <textarea
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                placeholder="Nhập lý do cụ thể..."
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none mb-4"
                                rows={3}
                            />
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleConfirmReject}
                                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-lg"
                            >
                                Xác nhận từ chối
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SellerOrders
