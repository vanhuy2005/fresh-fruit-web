import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('account')
    
    // Form states
    const [accountData, setAccountData] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        dateOfBirth: '1990-01-01',
        gender: 'male'
    })

    const [addressData, setAddressData] = useState([
        {
            id: 1,
            name: 'Nhà riêng',
            fullName: 'Nguyễn Văn A',
            phone: '0123456789',
            address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            isDefault: true
        }
    ])

    const [notificationSettings, setNotificationSettings] = useState({
        orderUpdates: true,
        promotions: true,
        newProducts: false,
        newsletter: true,
        smsNotifications: false,
        emailNotifications: true
    })

    const [privacySettings, setPrivacySettings] = useState({
        showProfile: true,
        showOrders: false,
        allowDataSharing: false
    })

    const [changePassword, setChangePassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const tabs = [
        { id: 'account', name: 'Tài khoản', icon: '👤' },
        { id: 'address', name: 'Địa chỉ', icon: '📍' },
        { id: 'notifications', name: 'Thông báo', icon: '🔔' },
        { id: 'privacy', name: 'Bảo mật', icon: '🔒' },
        { id: 'password', name: 'Đổi mật khẩu', icon: '🔑' }
    ]

    const handleSaveAccount = (e) => {
        e.preventDefault()
        // Implement save logic
        alert('Đã lưu thông tin tài khoản')
    }

    const handleSavePassword = (e) => {
        e.preventDefault()
        if (changePassword.newPassword !== changePassword.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp')
            return
        }
        // Implement password change logic
        alert('Đã đổi mật khẩu thành công')
        setChangePassword({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-16 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
                            <p className="text-sm text-gray-500">Quản lý thông tin tài khoản và cài đặt</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden sticky top-32">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-r-4 border-green-600 text-green-700 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span className="text-sm">{tab.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Account Info Tab */}
                        {activeTab === 'account' && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Thông tin tài khoản</h2>
                                    <p className="text-sm text-gray-500">Quản lý thông tin cá nhân của bạn</p>
                                </div>

                                <form onSubmit={handleSaveAccount} className="space-y-6">
                                    {/* Avatar Section */}
                                    <div className="flex items-center gap-6 pb-6 border-b">
                                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                            {accountData.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{accountData.fullName}</h3>
                                            <button
                                                type="button"
                                                className="text-sm text-green-600 hover:text-green-700 font-medium"
                                            >
                                                Thay đổi ảnh đại diện
                                            </button>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Họ và tên <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={accountData.fullName}
                                                onChange={(e) => setAccountData({...accountData, fullName: e.target.value})}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số điện thoại <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={accountData.phone}
                                                onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={accountData.email}
                                                onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngày sinh
                                            </label>
                                            <input
                                                type="date"
                                                value={accountData.dateOfBirth}
                                                onChange={(e) => setAccountData({...accountData, dateOfBirth: e.target.value})}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Giới tính
                                            </label>
                                            <select
                                                value={accountData.gender}
                                                onChange={(e) => setAccountData({...accountData, gender: e.target.value})}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                                <option value="other">Khác</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end pt-4 border-t">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Address Tab */}
                        {activeTab === 'address' && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">Địa chỉ của tôi</h2>
                                        <p className="text-sm text-gray-500">Quản lý địa chỉ giao hàng</p>
                                    </div>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                                        + Thêm địa chỉ
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {addressData.map((address) => (
                                        <div key={address.id} className="border rounded-lg p-4 hover:border-green-500 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-semibold text-gray-900">{address.name}</span>
                                                        {address.isDefault && (
                                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                                                Mặc định
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-700 mb-1">{address.fullName} | {address.phone}</p>
                                                    <p className="text-sm text-gray-600">{address.address}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                        Sửa
                                                    </button>
                                                    <span className="text-gray-300">|</span>
                                                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                            {!address.isDefault && (
                                                <button className="text-sm text-gray-600 hover:text-green-600 font-medium">
                                                    Đặt làm mặc định
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Cài đặt thông báo</h2>
                                    <p className="text-sm text-gray-500">Quản lý cách bạn nhận thông báo</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Email Notifications */}
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-4">Thông báo qua Email</h3>
                                        <div className="space-y-3">
                                            <ToggleItem
                                                label="Cập nhật đơn hàng"
                                                description="Nhận thông báo về trạng thái đơn hàng"
                                                checked={notificationSettings.orderUpdates}
                                                onChange={(checked) => setNotificationSettings({...notificationSettings, orderUpdates: checked})}
                                            />
                                            <ToggleItem
                                                label="Khuyến mãi & Ưu đãi"
                                                description="Nhận thông tin về các chương trình khuyến mãi"
                                                checked={notificationSettings.promotions}
                                                onChange={(checked) => setNotificationSettings({...notificationSettings, promotions: checked})}
                                            />
                                            <ToggleItem
                                                label="Sản phẩm mới"
                                                description="Thông báo khi có sản phẩm mới"
                                                checked={notificationSettings.newProducts}
                                                onChange={(checked) => setNotificationSettings({...notificationSettings, newProducts: checked})}
                                            />
                                            <ToggleItem
                                                label="Bản tin"
                                                description="Nhận bản tin hàng tuần"
                                                checked={notificationSettings.newsletter}
                                                onChange={(checked) => setNotificationSettings({...notificationSettings, newsletter: checked})}
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Thông báo khác</h3>
                                        <div className="space-y-3">
                                            <ToggleItem
                                                label="Thông báo SMS"
                                                description="Nhận tin nhắn SMS về đơn hàng"
                                                checked={notificationSettings.smsNotifications}
                                                onChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                                            />
                                            <ToggleItem
                                                label="Thông báo Email"
                                                description="Bật/tắt tất cả thông báo email"
                                                checked={notificationSettings.emailNotifications}
                                                onChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === 'privacy' && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Quyền riêng tư</h2>
                                    <p className="text-sm text-gray-500">Kiểm soát thông tin cá nhân của bạn</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <h4 className="font-semibold text-yellow-900 mb-1">Bảo vệ thông tin cá nhân</h4>
                                                <p className="text-sm text-yellow-800">Chúng tôi cam kết bảo mật thông tin của bạn theo chính sách bảo mật.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <ToggleItem
                                            label="Hiển thị hồ sơ công khai"
                                            description="Cho phép người khác xem hồ sơ của bạn"
                                            checked={privacySettings.showProfile}
                                            onChange={(checked) => setPrivacySettings({...privacySettings, showProfile: checked})}
                                        />
                                        <ToggleItem
                                            label="Hiển thị lịch sử đơn hàng"
                                            description="Cho phép chia sẻ lịch sử mua hàng"
                                            checked={privacySettings.showOrders}
                                            onChange={(checked) => setPrivacySettings({...privacySettings, showOrders: checked})}
                                        />
                                        <ToggleItem
                                            label="Cho phép chia sẻ dữ liệu"
                                            description="Chia sẻ dữ liệu để cải thiện trải nghiệm"
                                            checked={privacySettings.allowDataSharing}
                                            onChange={(checked) => setPrivacySettings({...privacySettings, allowDataSharing: checked})}
                                        />
                                    </div>

                                    <div className="border-t pt-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Quản lý dữ liệu</h3>
                                        <div className="space-y-3">
                                            <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-green-500 transition-colors text-left">
                                                <div>
                                                    <p className="font-medium text-gray-900">Tải xuống dữ liệu của bạn</p>
                                                    <p className="text-sm text-gray-500">Nhận bản sao dữ liệu cá nhân</p>
                                                </div>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                            <button className="w-full flex items-center justify-between px-4 py-3 border border-red-300 rounded-lg hover:border-red-500 transition-colors text-left">
                                                <div>
                                                    <p className="font-medium text-red-600">Xóa tài khoản</p>
                                                    <p className="text-sm text-red-500">Xóa vĩnh viễn tài khoản và dữ liệu</p>
                                                </div>
                                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Password Tab */}
                        {activeTab === 'password' && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Đổi mật khẩu</h2>
                                    <p className="text-sm text-gray-500">Cập nhật mật khẩu để bảo vệ tài khoản</p>
                                </div>

                                <form onSubmit={handleSavePassword} className="space-y-6 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mật khẩu hiện tại <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={changePassword.currentPassword}
                                            onChange={(e) => setChangePassword({...changePassword, currentPassword: e.target.value})}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mật khẩu mới <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={changePassword.newPassword}
                                            onChange={(e) => setChangePassword({...changePassword, newPassword: e.target.value})}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-2">Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={changePassword.confirmPassword}
                                            onChange={(e) => setChangePassword({...changePassword, confirmPassword: e.target.value})}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <h4 className="font-semibold text-blue-900 mb-1">Lưu ý bảo mật</h4>
                                                <ul className="text-sm text-blue-800 space-y-1">
                                                    <li>• Không chia sẻ mật khẩu với bất kỳ ai</li>
                                                    <li>• Sử dụng mật khẩu mạnh và độc nhất</li>
                                                    <li>• Thay đổi mật khẩu định kỳ</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t">
                                        <button
                                            type="button"
                                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Đổi mật khẩu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Toggle Component
const ToggleItem = ({ label, description, checked, onChange }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    checked ? 'bg-green-600' : 'bg-gray-200'
                }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    )
}

export default Settings
