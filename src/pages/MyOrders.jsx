import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const { currency } = useAppContext()
    
    const fetchMyOrders = async () => {
        setMyOrders(dummyOrders)
    }

    useEffect(() => {
        fetchMyOrders()
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex flex-col items-start w-full mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full mt-2'></div>
            </div>
            
            <div className="space-y-4">
                {myOrders.map((order, index) => (
                    <div key={order._id || index} className="border rounded-lg p-4 bg-white shadow-sm">
                        <p className="text-sm mb-2">
                            <span className="font-medium">Order ID:</span> {order._id}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium">Payment:</span> {order.paymentType}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium">Amount:</span> {currency}{order.amount}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium">Status:</span> <span className="text-green-600">{order.status}</span>
                        </p>
                    </div>
                ))}
                
                {myOrders.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No orders found</p>
                )}
            </div>
        </div>
    )
}

export default MyOrders