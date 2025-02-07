import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-teal-100 to-gray-100">
            <h1 className="text-8xl font-extrabold text-teal-600 animate-bounce">404</h1>
            <p className="text-2xl text-gray-700 mt-4">الصفحة غير موجودة</p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-lg shadow-lg text-lg hover:bg-teal-700 transition-all duration-300"
            >
                العودة إلى الصفحة الرئيسية
            </Link>
        </div>
    );
}
