import React, { useState } from 'react';
import { User, UserRole, isAdminEmail } from '../types';
import { getUsers, saveUsers, setCurrentUser } from '../lib/storage';
import { loginWithGoogle, loginWithEmailOrAdmin } from '../lib/firebase';
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
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const googleUser = await loginWithGoogle();
      if (googleUser) {
        const isAdmin = isAdminEmail(googleUser.email);
        const appUser: User = {
          id: googleUser.uid,
          email: googleUser.email || 'google_user@english.com',
          name: googleUser.displayName || (isAdmin ? '관리자' : '온리원 회원'),
          role: isAdmin ? 'admin' : 'student',
          contact: googleUser.phoneNumber || '010-0000-0000',
          createdAt: new Date().toISOString(),
        };
        setCurrentUser(appUser);
        onLoginSuccess(appUser);
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Google 로그인에 실패하였습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Check if email matches admin list or default admin password
        const cleanEmail = email.trim().toLowerCase();
        const isAdmin = isAdminEmail(cleanEmail) || (cleanEmail === 'admin@english.com' && (password === '1234' || password === 'admin'));

        // Always authenticate with Firebase Auth so onAuthStateChanged and rules work
        const firebaseUser = await loginWithEmailOrAdmin(
          isAdmin ? (cleanEmail || 'admin@english.com') : cleanEmail,
          password || '1234'
        );

        if (isAdmin) {
          const adminUser: User = {
            id: firebaseUser.uid || 'admin-user',
            email: cleanEmail || 'admin@english.com',
            name: cleanEmail === 'rlawldjs89@gmail.com' ? '관리자 (rlawldjs89)' : '최고관리자',
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
          const newUser: User = {
            id: firebaseUser.uid || 'u-' + Date.now(),
            email: email.trim(),
            name: email.split('@')[0] || '온리원 회원',
            role: 'student',
            contact: '010-0000-0000',
            createdAt: new Date().toISOString(),
          };
          setCurrentUser(newUser);
          onLoginSuccess(newUser);
          onClose();
        }
      } else {
        // Sign up
        if (!email || !name || !contact) {
          setError('모든 항목을 입력해 주세요.');
          return;
        }

        const firebaseUser = await loginWithEmailOrAdmin(email.trim(), password || '123456');

        const newUser: User = {
          id: firebaseUser.uid || 'u-' + Date.now(),
          email,
          name,
          role,
          contact,
          createdAt: new Date().toISOString(),
        };

        const users = getUsers();
        const updatedUsers = [...users, newUser];
        saveUsers(updatedUsers);
        setCurrentUser(newUser);
        onLoginSuccess(newUser);
        onClose();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let msg = err?.message || '로그인 중 오류가 발생하였습니다.';
      if (msg.includes('auth/admin-restricted-operation') || msg.includes('operation-not-allowed')) {
        msg = 'Firebase 콘솔에서 이메일/비밀번호 인증이 차단되어 있습니다. 상단의 [Google 계정으로 빠른 로그인]을 사용하시면 즉시 로그인됩니다!';
      }
      setError(msg);
    } finally {
      setLoading(false);
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
            {isLogin ? '가입하신 이메일이나 Google 계정으로 로그인해 보세요.' : '맞춤 수업과 상담 일정을 안전하게 관리해 드립니다.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Google Quick Auth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{loading ? '인증 처리 중...' : 'Google 계정으로 빠른 로그인'}</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-2 text-[10px] text-slate-400 font-bold uppercase">또는 이메일 로그인</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
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

            {/* Password */}
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
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-sm font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors"
            >
              {isLogin ? '로그인' : '회원가입 완료'}
            </button>

            {/* Toggle */}
            <div className="text-center pt-1">
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
        </div>

        {/* Demo Account info */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-start gap-2">
          <Shield size={15} className="text-slate-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-500 leading-normal">
            <p className="font-semibold text-slate-700">관리자 테스트 계정 정보</p>
            <p>이메일: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-semibold">admin@english.com</code> / 비밀번호: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-semibold">1234</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
