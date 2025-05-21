
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-500">HeadHunter</h2>
            <p className="text-gray-600 max-w-xs">
              Ish qidirayotganlar va ishga olayotganlar uchun zamonaviy platforma
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Ishlar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-brand-500">
                  Barcha ishlar
                </Link>
              </li>
              <li>
                <Link to="/jobs/remote" className="text-gray-600 hover:text-brand-500">
                  Masofaviy ishlar
                </Link>
              </li>
              <li>
                <Link to="/jobs/full-time" className="text-gray-600 hover:text-brand-500">
                  To'liq stavka
                </Link>
              </li>
              <li>
                <Link to="/jobs/part-time" className="text-gray-600 hover:text-brand-500">
                  Yarim stavka
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Kompaniya</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-500">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-500">
                  Bog'lanish
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-brand-500">
                  Maxfiylik siyosati
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-brand-500">
                  Foydalanish shartlari
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Bog'lanish</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> info@headhunter.uz
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Tel:</span> +998 71 123-45-67
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Manzil:</span> Toshkent sh., Shayxontohur tumani, Navoiy ko'chasi, 22-uy
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} HeadHunter. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
