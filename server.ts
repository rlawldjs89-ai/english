import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'bookings.json');
const TELEGRAM_CONFIG_FILE = path.join(process.cwd(), 'telegram-config.json');

// Helper to get Telegram Bot configuration
function getTelegramConfig() {
  let config = {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || '',
    notifyPhone: '010-8374-6543',
    isEnabled: true,
  };
  if (fs.existsSync(TELEGRAM_CONFIG_FILE)) {
    try {
      const fileData = JSON.parse(fs.readFileSync(TELEGRAM_CONFIG_FILE, 'utf8'));
      config = { ...config, ...fileData };
    } catch (e) {
      console.error('Error reading telegram-config.json:', e);
    }
  }
  return config;
}

function saveTelegramConfig(config: { botToken?: string; chatId?: string; notifyPhone?: string; isEnabled?: boolean }) {
  try {
    const current = getTelegramConfig();
    const merged = { ...current, ...config };
    fs.writeFileSync(TELEGRAM_CONFIG_FILE, JSON.stringify(merged, null, 2), 'utf8');
    return merged;
  } catch (e) {
    console.error('Failed to save telegram config:', e);
    return null;
  }
}

// Format booking details into Telegram message
function formatBookingTelegramMessage(booking: any) {
  const dateStr = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  return `🔔 <b>[Only One Study] 신규 무료 상담 신청 접수!</b>

👤 <b>신청자:</b> ${booking.applicantName || '미기재'} (${booking.relationship || '본인'})
📞 <b>연락처:</b> ${booking.contact || '미기재'}
🎓 <b>수강생/학년:</b> ${booking.studentName || '미기재'} (${booking.gradeOrJob || (booking.studentAge ? `${booking.studentAge}세` : '미기재')})
📚 <b>신청 과목:</b> <b>${booking.selectedCourse || '미기재'}</b>
📍 <b>거주 지역:</b> ${booking.region || '미기재'}
🚗 <b>희망 방식:</b> ${booking.classType || '미기재'}
🗓️ <b>희망 일정:</b> ${booking.preferredDate || '빠른 상담'} ${booking.preferredTimeSlot ? `(${booking.preferredTimeSlot})` : ''}
💡 <b>신청 사유:</b> ${booking.reason || '상담 요청'}
🎯 <b>학습 목표:</b> ${booking.goals || '기초 향상 및 성적 향상'}
👩‍🏫 <b>선생님 선호:</b> ${booking.preferredTeacherGender || '무관'}
⏰ <b>접수 시간:</b> ${dateStr}

👉 <i>관리자 대시보드에서 신청서 확인 및 담당 강사를 배정해 주세요.</i>`;
}

// Function to send message via Telegram Bot API
async function sendTelegramNotification(text: string): Promise<{ success: boolean; message?: string }> {
  const config = getTelegramConfig();
  const token = config.botToken || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = config.chatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('Telegram notification skipped: botToken or chatId not configured yet.');
    return { success: false, message: '텔레그램 봇 토큰(Bot Token) 또는 Chat ID가 설정되지 않았습니다.' };
  }

  if (config.isEnabled === false) {
    return { success: false, message: '텔레그램 알림이 비활성화 상태입니다.' };
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const resJson: any = await response.json();
    if (resJson.ok) {
      console.log('Telegram notification sent successfully to chat:', chatId);
      return { success: true };
    } else {
      console.error('Telegram API error:', resJson);
      return { success: false, message: resJson.description || '텔레그램 발송 실패' };
    }
  } catch (err: any) {
    console.error('Telegram send error:', err);
    return { success: false, message: err.message || '네트워크 오류' };
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

        // Auto Send Telegram Notification for new booking
        sendTelegramNotification(formatBookingTelegramMessage(booking)).catch((err) => {
          console.error("Failed to send telegram notification:", err);
        });

        res.json(updated);
      } else {
        res.json(current);
      }
    } else {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // API Route: POST /api/notify-telegram/booking (Explicit notification trigger)
  app.post("/api/notify-telegram/booking", async (req, res) => {
    const { booking } = req.body;
    if (!booking) {
      return res.status(400).json({ error: "Booking data required" });
    }
    const result = await sendTelegramNotification(formatBookingTelegramMessage(booking));
    res.json(result);
  });

  // API Route: GET /api/telegram-config
  app.get("/api/telegram-config", (req, res) => {
    const config = getTelegramConfig();
    const maskedToken = config.botToken
      ? `${config.botToken.slice(0, 6)}...${config.botToken.slice(-4)}`
      : '';
    res.json({
      hasToken: Boolean(config.botToken),
      botTokenMasked: maskedToken,
      chatId: config.chatId,
      notifyPhone: config.notifyPhone || '010-8374-6543',
      isEnabled: config.isEnabled !== false,
    });
  });

  // API Route: POST /api/telegram-config
  app.post("/api/telegram-config", (req, res) => {
    const { botToken, chatId, notifyPhone, isEnabled } = req.body;
    const current = getTelegramConfig();
    const updated = saveTelegramConfig({
      botToken: botToken !== undefined && botToken !== '' ? botToken : current.botToken,
      chatId: chatId !== undefined ? chatId : current.chatId,
      notifyPhone: notifyPhone || current.notifyPhone || '010-8374-6543',
      isEnabled: isEnabled !== undefined ? isEnabled : current.isEnabled,
    });
    if (updated) {
      res.json({ success: true, config: {
        hasToken: Boolean(updated.botToken),
        chatId: updated.chatId,
        notifyPhone: updated.notifyPhone,
        isEnabled: updated.isEnabled,
      }});
    } else {
      res.status(500).json({ error: "Failed to save configuration" });
    }
  });

  // API Route: POST /api/notify-telegram/test
  app.post("/api/notify-telegram/test", async (req, res) => {
    const { testChatId, testBotToken } = req.body || {};
    const config = getTelegramConfig();
    const token = testBotToken || config.botToken || process.env.TELEGRAM_BOT_TOKEN;
    const chatId = testChatId || config.chatId || process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(400).json({ 
        success: false, 
        message: '텔레그램 Bot Token과 Chat ID가 필요합니다. 설정창에서 입력 후 테스트해 주세요.' 
      });
    }

    const testMessage = `🧪 <b>[Only One Study] 텔레그램 실시간 알림 연동 테스트 성공!</b>

📱 <b>수신 관리자:</b> 010-8374-6543
⏰ <b>테스트 일시:</b> ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}

✅ 텔레그램 봇과 채팅방이 성공적으로 연결되었습니다!
앞으로 학부모 및 학생의 <b>신규 무료 상담/과외 신청</b>이 접수되면 이 텔레그램 채팅방으로 0.1초 만에 알림이 발송됩니다.`;

    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: testMessage,
          parse_mode: 'HTML',
        }),
      });
      const resJson: any = await response.json();
      if (resJson.ok) {
        res.json({ success: true, message: '텔레그램으로 테스트 메시지가 성공적으로 발송되었습니다!' });
      } else {
        res.status(400).json({ success: false, message: resJson.description || '텔레그램 발송 실패' });
      }
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || '네트워크 통신 오류' });
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
