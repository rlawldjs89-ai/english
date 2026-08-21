import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'bookings.json');
const EMAIL_CONFIG_FILE = path.join(process.cwd(), 'email-config.json');

// Helper to get Email configuration
function getEmailConfig() {
  let config = {
    recipientEmail: 'deux102@naver.com',
    senderEmail: 'deux102@naver.com',
    smtpHost: 'smtp.naver.com',
    smtpPort: 465,
    smtpSecure: true,
    smtpUser: 'deux102@naver.com',
    smtpPass: process.env.NAVER_SMTP_PASS || '',
    notifyPhone: '010-8374-6543',
    isEnabled: true,
  };
  if (fs.existsSync(EMAIL_CONFIG_FILE)) {
    try {
      const fileData = JSON.parse(fs.readFileSync(EMAIL_CONFIG_FILE, 'utf8'));
      config = { ...config, ...fileData };
    } catch (e) {
      console.error('Error reading email-config.json:', e);
    }
  }
  return config;
}

function saveEmailConfig(configUpdate: Partial<ReturnType<typeof getEmailConfig>>) {
  try {
    const current = getEmailConfig();
    const merged = { ...current, ...configUpdate };
    fs.writeFileSync(EMAIL_CONFIG_FILE, JSON.stringify(merged, null, 2), 'utf8');
    return merged;
  } catch (e) {
    console.error('Failed to save email config:', e);
    return null;
  }
}

// Format booking HTML for clean email viewing
function formatBookingEmailHtml(booking: any) {
  const dateStr = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  return `
    <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 24px; border-radius: 12px; text-align: center; color: #ffffff; margin-bottom: 20px;">
        <span style="display: inline-block; background-color: #f97316; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 8px;">실시간 신청 접수</span>
        <h1 style="font-size: 20px; font-weight: 800; margin: 6px 0; letter-spacing: -0.5px;">🔔 [Only One Study] 신규 무료 상담 신청</h1>
        <p style="font-size: 13px; color: #93c5fd; margin: 0;">학부모/학생의 새로운 1:1 과외 및 학습 상담 신청이 접수되었습니다.</p>
      </div>

      <div style="background-color: #ffffff; padding: 20px 24px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
        <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; margin-top: 0; margin-bottom: 16px;">
          📋 신청자 & 학생 상세 정보
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 120px;">신청자 (관계)</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${booking.applicantName || '미기재'} (${booking.relationship || '본인'})</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">연락처</td>
            <td style="padding: 10px 0; color: #2563eb; font-weight: 800; font-size: 15px;">
              <a href="tel:${booking.contact}" style="color: #2563eb; text-decoration: none;">${booking.contact || '미기재'}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">수강생 이름 / 학년</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${booking.studentName || '미기재'} (${booking.gradeOrJob || (booking.studentAge ? `${booking.studentAge}세` : '미기재')})</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">희망 과목</td>
            <td style="padding: 10px 0; color: #ea580c; font-weight: 800; font-size: 14px;">${booking.selectedCourse || '미기재'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">거주 지역</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${booking.region || '미기재'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">수업 방식</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${booking.classType || '방문/화상 협의'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">희망 일정/시간대</td>
            <td style="padding: 10px 0; color: #0f172a;">${booking.preferredDate || '빠른 상담'} ${booking.preferredTimeSlot ? `(${booking.preferredTimeSlot})` : ''}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">현재 학습 수준</td>
            <td style="padding: 10px 0; color: #0f172a;">${booking.currentLevel || '상담 시 진단'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">선생님 선호</td>
            <td style="padding: 10px 0; color: #0f172a;">${booking.preferredTeacherGender || '무관'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">상담 및 신청 사유</td>
            <td style="padding: 10px 0; color: #334155; line-height: 1.6;">${booking.reason || '없음'}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #eff6ff; padding: 14px 18px; border-radius: 10px; border: 1px solid #bfdbfe; font-size: 12px; color: #1e40af; margin-bottom: 20px;">
        💡 <strong>관리자 조치 안내:</strong> 빠른 상담 진행을 위해 학부모님(${booking.contact || ''})께 유선 연락 또는 담당 코치님 배정을 진행해 주세요.
      </div>

      <div style="text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 14px;">
        Only One Study 과외 관리자 자동 알림 시스템 | 수신: deux102@naver.com | 접수일시: ${dateStr}
      </div>
    </div>
  `;
}

// Function to send Email via Nodemailer
async function sendEmailNotification(subject: string, htmlContent: string, textContent?: string): Promise<{ success: boolean; message?: string }> {
  const config = getEmailConfig();
  const recipient = config.recipientEmail || 'deux102@naver.com';

  if (!config.isEnabled) {
    return { success: false, message: '이메일 알림이 비활성화 상태입니다.' };
  }

  // If no password set, return informative message
  if (!config.smtpPass) {
    console.log(`[Email Notification Log] Recipient: ${recipient} | Subject: ${subject}`);
    return {
      success: false,
      message: '네이버 메일 비밀번호(또는 2단계 인증 애플리케이션 비밀번호) 설정이 필요합니다.',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost || 'smtp.naver.com',
      port: Number(config.smtpPort) || 465,
      secure: config.smtpSecure !== false, // true for 465
      auth: {
        user: config.smtpUser || 'deux102@naver.com',
        pass: config.smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"온리원스터디 알림" <${config.smtpUser || 'deux102@naver.com'}>`,
      to: recipient,
      subject: subject,
      text: textContent || '신규 무료 상담 신청이 접수되었습니다.',
      html: htmlContent,
    });

    console.log(`[Email Notification Sent] Message ID: ${info.messageId} to ${recipient}`);
    return { success: true, message: `메일이 ${recipient} (네이버 메일)로 성공적으로 전송되었습니다.` };
  } catch (err: any) {
    console.error('Email send error:', err);
    return { success: false, message: err.message || '네이버 메일 SMTP 발송 오류가 발생했습니다.' };
  }
}

// Ensure data file exists or seed it
const seedBookings = [
  {
    id: 'b-1',
    applicantName: '김지현',
    contact: '010-9876-5432',
    relationship: '어머니',
    studentName: '김동우',
    studentAge: '14',
    gradeOrJob: '중학교 1학년',
    region: '서울 서초구 반포동',
    currentLevel: '중급 (의사소통/학교내신)',
    selectedCourse: '중등 영어',
    classType: '방문수업',
    preferredDate: '2026-07-22',
    preferredTimeSlot: '평일 저녁',
    reason: '이번 중간고사 영어 점수가 많이 떨어져서 문법과 서술형을 철저하게 채워줄 전문 선생님을 구합니다.',
    goals: '내신 95점 이상 및 영어에 대한 흥미 회복',
    preferredTeacherGender: '여자 선생님',
    status: '상담 예정',
    createdAt: '2026-07-18T10:15:30Z',
    adminMemo: '7월 20일 오후 2시 전화 상담 진행 예정. 학부모 성향 차분하며 꼼꼼한 피드백 원하심.',
  },
  {
    id: 'b-2',
    applicantName: '박준혁',
    contact: '010-2233-4455',
    relationship: '본인',
    studentName: '박준혁',
    studentAge: '27',
    gradeOrJob: '직장인 (IT개발자)',
    region: '서울 마포구 공덕동',
    currentLevel: '초급 (단순회화/쉬운문장)',
    selectedCourse: '영어 회화',
    classType: '화상수업',
    preferredDate: '2026-07-20',
    preferredTimeSlot: '평일 저녁',
    reason: '외국계 기업으로 이직을 희망하여 비즈니스 및 기본 대화를 매끄럽게 나누고 싶어 신청합니다.',
    goals: '전화 회화 및 간단한 프레젠테이션 막힘없이 하기',
    preferredTeacherGender: '무관',
    status: '체험수업 예정',
    trialDate: '2026-07-20',
    trialTime: '20:00',
    teacherId: 't2', // 이지혜 선생님
    createdAt: '2026-07-17T14:22:11Z',
    adminMemo: '회화가 급하다고 하여 이지혜 선생님 화상 무료 체험 수업 7월 20일 오후 8시 예약 잡음.',
  },
  {
    id: 'b-3',
    applicantName: '이지연',
    contact: '010-8888-9999',
    relationship: '어머니',
    studentName: '이하윤',
    studentAge: '6',
    gradeOrJob: '유치원생',
    region: '서울 강남구 압구정동',
    currentLevel: '왕초보 (알파벳/기초단어)',
    selectedCourse: '유아 영어',
    classType: '방문수업',
    preferredDate: '2026-07-24',
    preferredTimeSlot: '평일 오후',
    reason: '아이가 영어유치원에 다니는데, 좀 더 적극적으로 말을 트이게 방문 과외로 놀이 보충을 해주고 싶습니다.',
    goals: '영어 동요와 놀이를 통해 영어 거부감 없이 귀 열기',
    preferredTeacherGender: '여자 선생님',
    status: '정규수업 진행',
    teacherId: 't3', // 박지연 선생님
    createdAt: '2026-07-10T09:05:00Z',
    adminMemo: '박지연 선생님 배정 후 체험수업 대만족. 현재 주 2회 방문 정규수업 전환 성공하여 활발히 진행 중.',
  },
  {
    id: 'b-4',
    applicantName: '한만수',
    contact: '010-5555-6666',
    relationship: '본인',
    studentName: '한만수',
    studentAge: '68',
    gradeOrJob: '은퇴 및 시니어',
    region: '서울 종로구 혜화동',
    currentLevel: '왕초보 (알파벳/기초단어)',
    selectedCourse: '시니어 영어',
    classType: '방문수업',
    preferredDate: '2026-07-23',
    preferredTimeSlot: '평일 오전',
    reason: '은퇴 후 해외에 있는 손주들과 쉬운 대화를 나누고, 해외 여행가서 길 묻기를 혼자서 직접 하고 싶습니다.',
    goals: '알파벳 기초와 가벼운 생활 여행 회화 마스터',
    preferredTeacherGender: '무관',
    status: '신청 접수',
    createdAt: '2026-07-19T11:45:12Z',
    adminMemo: '신규 접수 건. 거주지가 종로 혜화동이므로 종로 한정희 선생님 방문 상담 가능한지 스케줄 조율 필요.',
  },
  {
    id: 'b-5',
    applicantName: '최예리',
    contact: '010-4444-1111',
    relationship: '본인',
    studentName: '최예리',
    studentAge: '24',
    gradeOrJob: '대학생 (취업준비생)',
    region: '인천 연수구 송도동',
    currentLevel: '중급 (의사소통/학교내신)',
    selectedCourse: '오픽',
    classType: '화상수업',
    preferredDate: '2026-07-21',
    preferredTimeSlot: '주말 오후',
    reason: '하반기 공채 접수를 위해 오픽 IH 성적이 급히 필요합니다. 유형별 공략 노하우를 알고 싶어요.',
    goals: '한 달 내 오픽 IH 이상 취득하기',
    preferredTeacherGender: '무관',
    status: '체험수업 완료',
    teacherId: 't4', // 최준영 선생님
    createdAt: '2026-07-15T16:30:00Z',
    adminMemo: '최준영 선생님과 화상 무료체험 성공적으로 진행 완료. 주 3회 단기 속성 등록 조율 중.',
  }
];

function getBookings() {
  if (!fs.existsSync(DATA_FILE)) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(seedBookings, null, 2), 'utf8');
      return seedBookings;
    } catch (e) {
      console.error("Failed to write seed bookings:", e);
      return seedBookings;
    }
  }
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to read bookings file, using seeds:", e);
    return seedBookings;
  }
}

function saveBookings(bookings: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf8');
  } catch (e) {
    console.error("Failed to write bookings file:", e);
  }
}

async function startServer() {
  app.use(express.json({ limit: '10mb' }));

  // API Route: GET /api/bookings
  app.get("/api/bookings", (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(getBookings());
  });

  // API Route: POST /api/bookings
  app.post("/api/bookings", (req, res) => {
    const { bookings } = req.body;
    if (Array.isArray(bookings)) {
      const current = getBookings();
      const map = new Map<string, any>();
      current.forEach((b: any) => { if (b && b.id) map.set(b.id, b); });
      bookings.forEach((b: any) => {
        if (b && b.id) {
          const existing = map.get(b.id);
          map.set(b.id, existing ? { ...existing, ...b } : b);
        }
      });
      const merged = Array.from(map.values());
      merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      saveBookings(merged);
      res.json({ success: true, count: merged.length });
    } else {
      res.status(400).json({ error: "Invalid bookings data format" });
    }
  });

  // API Route: POST /api/bookings/add
  app.post("/api/bookings/add", (req, res) => {
    const { booking } = req.body;
    if (booking && typeof booking === 'object') {
      const current = getBookings();
      if (!current.some((b: any) => b.id === booking.id)) {
        const updated = [booking, ...current];
        saveBookings(updated);

        // Auto Send Email Notification to Naver Mail (deux102@naver.com)
        const emailSubject = `🔔 [신규 상담 접수] ${booking.applicantName || '학부모'}님 (${booking.selectedCourse || '과외 상담'}) - ${booking.contact || ''}`;
        sendEmailNotification(emailSubject, formatBookingEmailHtml(booking)).catch((err) => {
          console.error("Failed to send email notification:", err);
        });

        res.json(updated);
      } else {
        res.json(current);
      }
    } else {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // API Route: POST /api/notify-email/booking (Explicit notification trigger)
  app.post("/api/notify-email/booking", async (req, res) => {
    const { booking } = req.body;
    if (!booking) {
      return res.status(400).json({ error: "Booking data required" });
    }
    const emailSubject = `🔔 [신규 상담 접수] ${booking.applicantName || '학부모'}님 (${booking.selectedCourse || '과외 상담'}) - ${booking.contact || ''}`;
    const result = await sendEmailNotification(emailSubject, formatBookingEmailHtml(booking));
    res.json(result);
  });

  // API Route: GET /api/email-config
  app.get("/api/email-config", (req, res) => {
    const config = getEmailConfig();
    res.json({
      recipientEmail: config.recipientEmail || 'deux102@naver.com',
      senderEmail: config.senderEmail || 'deux102@naver.com',
      smtpHost: config.smtpHost || 'smtp.naver.com',
      smtpPort: config.smtpPort || 465,
      smtpUser: config.smtpUser || 'deux102@naver.com',
      isConfigured: Boolean(config.smtpPass),
      notifyPhone: config.notifyPhone || '010-8374-6543',
      isEnabled: config.isEnabled !== false,
    });
  });

  // API Route: POST /api/email-config
  app.post("/api/email-config", (req, res) => {
    const { recipientEmail, smtpPass, smtpUser, isEnabled } = req.body;
    const current = getEmailConfig();
    const updated = saveEmailConfig({
      recipientEmail: recipientEmail || current.recipientEmail || 'deux102@naver.com',
      senderEmail: recipientEmail || current.senderEmail || 'deux102@naver.com',
      smtpUser: smtpUser || current.smtpUser || 'deux102@naver.com',
      smtpPass: smtpPass !== undefined && smtpPass !== '' ? smtpPass : current.smtpPass,
      isEnabled: isEnabled !== undefined ? isEnabled : current.isEnabled,
    });
    if (updated) {
      res.json({
        success: true,
        config: {
          recipientEmail: updated.recipientEmail,
          smtpUser: updated.smtpUser,
          isConfigured: Boolean(updated.smtpPass),
          isEnabled: updated.isEnabled,
        },
      });
    } else {
      res.status(500).json({ error: "Failed to save email configuration" });
    }
  });

  // API Route: POST /api/notify-email/test
  app.post("/api/notify-email/test", async (req, res) => {
    const { testEmail, testPass } = req.body || {};
    const config = getEmailConfig();
    const recipient = testEmail || config.recipientEmail || 'deux102@naver.com';
    const pass = testPass || config.smtpPass;

    if (!pass) {
      return res.status(400).json({
        success: false,
        message: '네이버 메일 비밀번호(또는 네이버 2단계 인증 애플리케이션 비밀번호)를 입력해 주세요.',
      });
    }

    const testSubject = `🧪 [Only One Study] 네이버 메일(${recipient}) 실시간 알림 연동 테스트 성공!`;
    const testHtml = `
      <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 24px; border-radius: 12px; text-align: center; color: #ffffff; margin-bottom: 20px;">
          <span style="display: inline-block; background-color: #38bdf8; color: #0c4a6e; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 8px;">연동 테스트 성공</span>
          <h1 style="font-size: 20px; font-weight: 800; margin: 6px 0;">🎉 네이버 메일 알림 정상 연동 확인!</h1>
          <p style="font-size: 13px; color: #e0f2fe; margin: 0;">관리자 이메일(${recipient})로 실시간 상담 알림을 받을 준비가 완료되었습니다.</p>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 13px; color: #334155; line-height: 1.6;">
          <p><strong>안녕하세요, 온리원스터디 관리자님!</strong></p>
          <p>이 메일은 온리원스터디 과외 웹사이트에서 발송된 <strong>실시간 알림 연동 확인 메일</strong>입니다.</p>
          <ul style="padding-left: 20px; margin: 12px 0;">
            <li><strong>수신 이메일:</strong> ${recipient}</li>
            <li><strong>관리자 연락처:</strong> 010-8374-6543</li>
            <li><strong>발송 일시:</strong> ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</li>
          </ul>
          <p style="color: #0284c7; font-weight: 700; margin-top: 14px;">
            ✅ 앞으로 학부모나 학생이 무료 상담을 신청하면 상세 인적사항 및 상담 내용이 즉시 이 메일함으로 자동 전송됩니다!
          </p>
        </div>
      </div>
    `;

    try {
      const transporter = nodemailer.createTransport({
        host: config.smtpHost || 'smtp.naver.com',
        port: Number(config.smtpPort) || 465,
        secure: config.smtpSecure !== false,
        auth: {
          user: config.smtpUser || 'deux102@naver.com',
          pass: pass,
        },
      });

      await transporter.sendMail({
        from: `"온리원스터디 알림" <${config.smtpUser || 'deux102@naver.com'}>`,
        to: recipient,
        subject: testSubject,
        html: testHtml,
      });

      // If testPass succeeded and was provided, update config
      if (testPass) {
        saveEmailConfig({ smtpPass: testPass, recipientEmail: recipient, smtpUser: recipient });
      }

      res.json({
        success: true,
        message: `네이버 메일(${recipient})로 테스트 메일이 성공적으로 발송되었습니다! 메일함을 확인해 주세요.`,
      });
    } catch (err: any) {
      console.error('Test email send error:', err);
      let userErrMsg = err.message || 'SMTP 발송 실패';
      if (userErrMsg.includes('Invalid login') || userErrMsg.includes('535') || userErrMsg.includes('Authentication')) {
        userErrMsg = '네이버 메일 로그인 인증에 실패했습니다. 네이버 환경설정에서 IMAP/SMTP가 "사용함"으로 켜져 있는지, 2단계 인증 시 "애플리케이션 비밀번호"가 정확한지 확인해 주세요.';
      }
      res.status(400).json({ success: false, message: userErrMsg });
    }
  });

  // API Route: POST /api/bookings/update
  app.post("/api/bookings/update", (req, res) => {
    const { booking } = req.body;
    if (booking && typeof booking === 'object' && booking.id) {
      const current = getBookings();
      const updated = current.map((b: any) => b.id === booking.id ? booking : b);
      saveBookings(updated);
      res.json(updated);
    } else {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // API Route: POST /api/bookings/delete
  app.post("/api/bookings/delete", (req, res) => {
    const { id } = req.body;
    if (id) {
      const current = getBookings();
      const updated = current.filter((b: any) => b.id !== id);
      saveBookings(updated);
      res.json(updated);
    } else {
      res.status(400).json({ error: "Invalid booking ID" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
