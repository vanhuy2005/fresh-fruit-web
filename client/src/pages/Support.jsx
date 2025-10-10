import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Support = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [openFaqId, setOpenFaqId] = useState(null)
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    // FAQ Categories
    const faqCategories = [
        { id: 'all', name: 'Tất cả', emoji: '📋' },
        { id: 'order', name: 'Đơn hàng', emoji: '📦' },
        { id: 'shipping', name: 'Vận chuyển', emoji: '🚚' },
        { id: 'payment', name: 'Thanh toán', emoji: '💳' },
        { id: 'product', name: 'Sản phẩm', emoji: '🍎' },
        { id: 'account', name: 'Tài khoản', emoji: '👤' }
    ]

    // FAQs Data
    const faqs = [
        {
            id: 1,
            category: 'order',
            question: 'Làm thế nào để đặt hàng?',
            answer: 'Để đặt hàng, bạn chỉ cần: 1) Chọn sản phẩm và thêm vào giỏ hàng, 2) Vào giỏ hàng và nhấn "Thanh toán", 3) Điền thông tin giao hàng, 4) Chọn phương thức thanh toán và hoàn tất đơn hàng. Đơn giản vậy thôi!'
        },
        {
            id: 2,
            category: 'order',
            question: 'Tôi có thể hủy đơn hàng không?',
            answer: 'Bạn có thể hủy đơn hàng miễn phí trong vòng 30 phút sau khi đặt. Sau thời gian này, vui lòng liên hệ hotline 1900-xxxx để được hỗ trợ.'
        },
        {
            id: 3,
            category: 'order',
            question: 'Làm sao để theo dõi đơn hàng của tôi?',
            answer: 'Vào mục "Đơn hàng của tôi" trong tài khoản, bạn sẽ thấy trạng thái và vị trí hiện tại của đơn hàng. Chúng tôi cũng gửi thông báo qua email và SMS.'
        },
        {
            id: 4,
            category: 'shipping',
            question: 'Thời gian giao hàng là bao lâu?',
            answer: 'Đơn hàng thường được giao trong vòng 2-4 giờ tại nội thành và 1-2 ngày cho các khu vực khác. Đơn hàng gấp có thể giao trong 1 giờ với phí express.'
        },
        {
            id: 5,
            category: 'shipping',
            question: 'Phí vận chuyển là bao nhiêu?',
            answer: 'Miễn phí vận chuyển cho đơn hàng từ 150.000 ₫. Đơn hàng dưới 150.000 ₫ chỉ mất 15.000 ₫ phí ship. Áp dụng toàn quốc!'
        },
        {
            id: 6,
            category: 'shipping',
            question: 'Tôi có thể thay đổi địa chỉ giao hàng không?',
            answer: 'Bạn có thể thay đổi địa chỉ giao hàng trước khi đơn được xác nhận (trong vòng 15 phút). Sau đó vui lòng liên hệ hotline để được hỗ trợ.'
        },
        {
            id: 7,
            category: 'payment',
            question: 'Các phương thức thanh toán nào được chấp nhận?',
            answer: 'Chúng tôi chấp nhận: Tiền mặt (COD), Thẻ ATM/Visa/Mastercard, Ví điện tử (MoMo, ZaloPay, VNPay), Chuyển khoản ngân hàng.'
        },
        {
            id: 8,
            category: 'payment',
            question: 'Thanh toán online có an toàn không?',
            answer: 'Hoàn toàn an toàn! Chúng tôi sử dụng mã hóa SSL 256-bit và tuân thủ chuẩn PCI-DSS. Thông tin thanh toán của bạn được bảo mật tuyệt đối.'
        },
        {
            id: 9,
            category: 'product',
            question: 'Sản phẩm có tươi ngon không?',
            answer: 'Tất cả sản phẩm đều được nhập khẩu trực tiếp từ vườn và kiểm tra kỹ lưỡng trước khi giao. Chúng tôi cam kết 100% tươi ngon hoặc hoàn tiền!'
        },
        {
            id: 10,
            category: 'product',
            question: 'Tôi có thể đổi trả sản phẩm không?',
            answer: 'Bạn có thể đổi/trả sản phẩm trong vòng 24 giờ nếu không hài lòng. Chỉ cần liên hệ hotline và chúng tôi sẽ đến lấy hàng miễn phí.'
        },
        {
            id: 11,
            category: 'account',
            question: 'Làm sao để tạo tài khoản?',
            answer: 'Nhấn vào "Đăng ký" trên thanh menu, điền số điện thoại/email và mật khẩu. Xác nhận qua OTP và bạn đã có tài khoản ngay!'
        },
        {
            id: 12,
            category: 'account',
            question: 'Tôi quên mật khẩu thì làm sao?',
            answer: 'Nhấn "Quên mật khẩu" trên trang đăng nhập, nhập email/SĐT đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn.'
        }
    ]

    // Contact methods
    const contactMethods = [
        {
            title: 'Hotline',
            content: '1900-xxxx',
            description: 'Hỗ trợ 24/7',
            bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
            textColor: 'text-green-700',
            emoji: '📞'
        },
        {
            title: 'Email',
            content: 'support@fruithub.vn',
            description: 'Phản hồi trong 2h',
            bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
            textColor: 'text-blue-700',
            emoji: '✉️'
        },
        {
            title: 'Zalo',
            content: '0123-456-789',
            description: 'Chat trực tiếp',
            bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
            textColor: 'text-purple-700',
            emoji: '💬'
        },
        {
            title: 'Facebook',
            content: 'fb.com/fruithub',
            description: 'Messenger 24/7',
            bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
            textColor: 'text-indigo-700',
            emoji: '📱'
        }
    ]

    // Quick actions
    const quickActions = [
        { title: 'Theo dõi đơn hàng', emoji: '🔍', link: '/orders' },
        { title: 'Chính sách đổi trả', emoji: '🔄', link: '/returns' },
        { title: 'Hướng dẫn thanh toán', emoji: '💰', link: '/payment-guide' },
        { title: 'Khuyến mãi', emoji: '🎁', link: '/promotions' }
    ]

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const handleSubmitContact = (e) => {
        e.preventDefault()
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 2 giờ.')
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Chúng tôi ở đây để giúp bạn 👋
                    </h1>
                    <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto mb-8">
                        Tìm câu trả lời nhanh chóng hoặc liên hệ với đội ngũ hỗ trợ nhiệt tình của chúng tôi
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm câu hỏi... (VD: đặt hàng, giao hàng, thanh toán)"
                                className="w-full px-6 py-4 pr-12 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-2xl text-lg"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                                🔍
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Hành động nhanh ⚡
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(action.link)}
                                className="p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 text-center group"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {action.emoji}
                                </div>
                                <p className="font-semibold text-gray-800 group-hover:text-green-600">
                                    {action.title}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contact Methods */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                        Liên hệ với chúng tôi
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        Chọn phương thức liên lạc phù hợp với bạn
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className={`${method.bgColor} p-6 rounded-2xl border-2 border-gray-100 hover:border-green-400 transition-all duration-300 hover:scale-105 cursor-pointer`}
                            >
                                <div className="text-4xl mb-3">{method.emoji}</div>
                                <h3 className={`font-bold text-lg mb-2 ${method.textColor}`}>
                                    {method.title}
                                </h3>
                                <p className="text-gray-800 font-semibold mb-1">
                                    {method.content}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {method.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Câu hỏi thường gặp 💡
                        </h2>
                        <p className="text-gray-600">
                            Tìm câu trả lời cho các thắc mắc phổ biến
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {faqCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                    selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500'
                                }`}
                            >
                                <span className="mr-2">{cat.emoji}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-green-400 transition-all duration-300"
                                >
                                    <button
                                        onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-gray-900 pr-4">
                                            {faq.question}
                                        </span>
                                        <span className="text-2xl flex-shrink-0">
                                            {openFaqId === faq.id ? '−' : '+'}
                                        </span>
                                    </button>
                                    {openFaqId === faq.id && (
                                        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 animate-fadeIn">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                                <div className="text-6xl mb-4">🤔</div>
                                <p className="text-gray-600 text-lg">
                                    Không tìm thấy câu hỏi phù hợp
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setSelectedCategory('all')
                                    }}
                                    className="mt-4 text-green-600 font-medium hover:underline"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                Vẫn cần hỗ trợ? 🤝
                            </h2>
                            <p className="text-green-50">
                                Gửi tin nhắn cho chúng tôi và nhận phản hồi trong vòng 2 giờ
                            </p>
                        </div>

                        <form onSubmit={handleSubmitContact} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                                        required
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                                        required
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        value={contactForm.phone}
                                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                                        placeholder="0123456789"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Chủ đề <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={contactForm.subject}
                                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                                        required
                                    >
                                        <option value="">Chọn chủ đề</option>
                                        <option value="order">Vấn đề đơn hàng</option>
                                        <option value="product">Sản phẩm</option>
                                        <option value="payment">Thanh toán</option>
                                        <option value="shipping">Vận chuyển</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nội dung tin nhắn <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                    rows="6"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors resize-none"
                                    required
                                    placeholder="Mô tả chi tiết vấn đề của bạn..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                            >
                                Gửi tin nhắn 📮
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white">
                    <div className="text-6xl mb-4">🌟</div>
                    <h2 className="text-3xl font-bold mb-4">
                        Hài lòng với dịch vụ của chúng tôi?
                    </h2>
                    <p className="text-green-50 text-lg mb-6 max-w-2xl mx-auto">
                        Chia sẻ trải nghiệm của bạn để giúp chúng tôi phục vụ bạn tốt hơn!
                    </p>
                    <button
                        onClick={() => navigate('/feedback')}
                        className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Support
