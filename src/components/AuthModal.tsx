import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { getUsers, saveUsers, setCurrentUser } from '../lib/storage';
import { X, Mail, Lock, User as UserIcon, Phone, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Simple demo login password
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState<UserRole>('parent');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Admin bypass
      if (email === 'admin@english.com' && (password === '1234' || password === 'admin')) {
        const adminUser: User = {
          id: 'admin-user',
          email: 'admin@english.com',
          name: '최고관리자',
          role: 'admin',
          contact: '010-1234-5678',
          createdAt: new Date().toISOString(),
        };
        setCurrentUser(adminUser);
        onLoginSuccess(adminUser);
        onClose();
        return;
      }

      // Standard user lookup
      const users = getUsers();
      const foundUser = users.find((u) => u.email === email);
      if (foundUser) {
        setCurrentUser(foundUser);
        onLoginSuccess(foundUser);
        onClose();
      } else {
        setError('가입되지 않은 이메일이거나 비밀번호가 다릅니다. (관리자 아이디: admin@english.com / 비밀번호: 1234)');
      }
    } else {
      // Sign up
      if (!email || !name || !contact) {
        setError('모든 항목을 입력해 주세요.');
        return;
      }

      const users = getUsers();
      if (users.some((u) => u.email === email)) {
        setError('이미 가입된 이메일입니다.');
        return;
      }

      const newUser: User = {
        id: 'u-' + Date.now(),
        email,
        name,
        role,
        contact,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      setCurrentUser(newUser);
      onLoginSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative px-6 py-5 text-white bg-slate-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <h3 className="text-xl font-bold">
            {isLogin ? '영어 일대일 전문 수업 로그인' : '무료 회원가입'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? '가입하신 이메일로 서비스를 이용해 보세요.' : '맞춤 수업과 상담 일정을 관리해 드립니다.'}
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg">
              {error}
            </div>
          )}

          {!isLogin && (
            <>
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">이름</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">연락처</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">가입 유형</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['parent', 'student', 'adult'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                        role === r
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r === 'parent' ? '학부모' : r === 'student' ? '초중고생' : '대학생·성인'}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password (Simplified) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            {isLogin && (
              <p className="text-[10px] text-slate-500 mt-1">
                ※ 데모 버전에서는 신규 가입 시 비밀번호 입력 제한이 없으며 바로 로그인됩니다.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-sm font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors"
          >
            {isLogin ? '로그인' : '회원가입 완료'}
          </button>

          {/* Toggle */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              {isLogin ? '아직 계정이 없으신가요? 가입하기' : '이미 계정이 있으신가요? 로그인하기'}
            </button>
          </div>
        </form>

        {/* Demo Account info */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-start gap-2">
          <Shield size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-500 leading-normal">
            <p className="font-semibold text-slate-700">관리자 테스트 계정 정보</p>
            <p>이메일: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-semibold">admin@english.com</code></p>
            <p>비밀번호: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-semibold">1234</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
