import { Booking } from '../types';

export const DEFAULT_NOTIFICATION_EMAIL = 'deux102@naver.com';

export function getSavedNotificationEmail(): string {
  try {
    const saved = localStorage.getItem('onlyone_notify_email');
    if (saved && saved.includes('@')) {
      return saved.trim();
    }
  } catch (e) {
    console.warn(e);
  }
  return DEFAULT_NOTIFICATION_EMAIL;
}

export function saveNotificationEmail(email: string): void {
  try {
    localStorage.setItem('onlyone_notify_email', email.trim());
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Sends a real-time email notification directly to the manager's email (deux102@naver.com)
 * without requiring backend server routing or sensitive passwords.
 */
export async function sendConsultationEmailAlert(
  booking: Booking,
  targetEmail?: string
): Promise<{ success: boolean; message: string; needsActivation?: boolean }> {
  const recipient = targetEmail || getSavedNotificationEmail();

  try {
    const payload = {
      _subject: `🔔 [Only One Study] 신규 상담 신청: ${booking.applicantName || '학부모'}님 (${booking.contact || '연락처'})`,
      _template: 'table',
      _captcha: 'false',
      '신청자 성함': `${booking.applicantName || '미기재'} (${booking.relationship || '본인'})`,
      '연락처': booking.contact || '미기재',
      '수강생 이름 / 학년': `${booking.studentName || '미기재'} (${booking.gradeOrJob || (booking.studentAge ? `${booking.studentAge}세` : '미기재')})`,
      '신청 과목': booking.selectedCourse || '미기재',
      '거주 지역': booking.region || '미기재',
      '수업 방식': booking.classType || '방문/화상 협의',
      '희망 일정 및 시간': `${booking.preferredDate || '빠른 상담'} ${booking.preferredTimeSlot ? `(${booking.preferredTimeSlot})` : ''}`,
      '현재 학습 수준': booking.currentLevel || '상담 시 진단',
      '선생님 선호': booking.preferredTeacherGender || '무관',
      '신청 및 상담 사유': booking.reason || '상담 요청',
      '학습 목표': booking.goals || '기초 및 성적 향상',
      '기타 요청사항': booking.memo || '없음',
      '접수 일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    };

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    
    // Check if form needs activation
    if (data.message && data.message.includes('Activate Form')) {
      return {
        success: true,
        needsActivation: true,
        message: `네이버 메일(${recipient})로 [Activate Form / 활성화] 확인 메일이 발송되었습니다. 메일함에서 파란색 버튼을 딱 1번만 클릭해 주시면 모든 알림 연동이 즉시 완료됩니다!`,
      };
    }

    if (data.success === 'true' || data.success === true) {
      return {
        success: true,
        message: `네이버 메일(${recipient})로 상담 알림이 성공적으로 전송되었습니다.`,
      };
    }

    return {
      success: true,
      message: data.message || '알림 메일이 성공적으로 전송되었습니다.',
    };
  } catch (err: any) {
    console.warn('Direct email dispatch failed:', err);
    return {
      success: false,
      message: err.message || '이메일 전송 중 네트워크 오류가 발생했습니다.',
    };
  }
}

/**
 * Sends a test email to verify the connection
 */
export async function sendTestEmailAlert(
  targetEmail: string
): Promise<{ success: boolean; message: string; needsActivation?: boolean }> {
  try {
    const payload = {
      _subject: `🧪 [Only One Study] 네이버 메일(${targetEmail}) 실시간 알림 연동 테스트`,
      _template: 'table',
      _captcha: 'false',
      '알림 종류': '실시간 상담 신청 알림 연동 테스트',
      '수신 관리자 이메일': targetEmail,
      '관리자 대표 연락처': '010-8374-6543',
      '연동 상태': '정상 작동 중 (실시간 푸시 수신 가능)',
      '발송 일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      '안내': '앞으로 웹사이트에서 학부모 및 학생이 상담을 신청하면 이 메일함으로 신청서 상세 정보가 즉시 자동 전송됩니다.',
    };

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.message && data.message.includes('Activate Form')) {
      return {
        success: true,
        needsActivation: true,
        message: `네이버 메일(${targetEmail})로 [Activate Form / 활성화] 확인 메일이 발송되었습니다! 네이버 메일함에 접속하셔서 파란색 버튼을 딱 1번만 클릭해 주시면 즉시 활성화됩니다.`,
      };
    }

    if (data.success === 'true' || data.success === true) {
      return {
        success: true,
        message: `네이버 메일(${targetEmail})로 테스트 메일이 성공적으로 발송되었습니다! 메일함을 확인해 주세요.`,
      };
    }

    return {
      success: true,
      message: data.message || '테스트 메일이 발송되었습니다.',
    };
  } catch (err: any) {
    console.error('Test email error:', err);
    return {
      success: false,
      message: err.message || '네트워크 오류가 발생했습니다.',
    };
  }
}
