import type { User, Chat, ChatMessage } from '@/types';

const mockUser: User = {
    user_id: 1,
    id: 'test1',
    name: '테스트',
    age: 25,
    gender: 'male',
    phone: '010-1234-5678',
};

const mockChats: Chat[] = [
    { chat_id: 1, title: '두통 상담', created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { chat_id: 2, title: '감기 증상', created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { chat_id: 3, title: '소화불량', created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
    { chat_id: 4, title: '허리 통증', created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
    { chat_id: 5, title: '불면증 상담', created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() },
    { chat_id: 6, title: '피부 발진', created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
    { chat_id: 7, title: '눈 충혈', created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString() },
];

const mockChatHistory: Record<number, ChatMessage[]> = {
    1: [
        { content_id: 1, content: '머리가 너무 아파요', is_question: true, is_diag: false, is_recommend: false, temp: 36.8, ecg: 0, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        { content_id: 2, content: '두통이 언제부터 시작되었나요?', is_question: false, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5000).toISOString() },
        { content_id: 3, content: '어제 저녁부터요', is_question: true, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60000).toISOString() },
        { content_id: 4, content: '편두통 증상으로 보입니다. 충분한 휴식과 수분 섭취를 권장드립니다.', is_question: false, is_diag: true, is_recommend: true, temp: null, ecg: null, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 65000).toISOString() },
    ],
    2: [
        { content_id: 5, content: '콧물이 나고 기침이 나요', is_question: true, is_diag: false, is_recommend: false, temp: 37.5, ecg: 0, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { content_id: 6, content: '열은 있으신가요?', is_question: false, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 5000).toISOString() },
        { content_id: 7, content: '37.5도 정도요', is_question: true, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 60000).toISOString() },
        { content_id: 8, content: '감기 초기 증상입니다. 이비인후과 방문을 권장드립니다.', is_question: false, is_diag: true, is_recommend: true, temp: null, ecg: null, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 65000).toISOString() },
    ],
    3: [
        { content_id: 9, content: '배가 더부룩하고 소화가 안돼요', is_question: true, is_diag: false, is_recommend: false, temp: 36.5, ecg: 0, created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
        { content_id: 10, content: '식사 후 증상이 심해지나요?', is_question: false, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000 + 5000).toISOString() },
        { content_id: 11, content: '네 특히 기름진 음식 먹으면요', is_question: true, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000 + 60000).toISOString() },
        { content_id: 12, content: '소화불량 증상입니다. 소화제 복용과 식이조절을 권장합니다.', is_question: false, is_diag: true, is_recommend: true, temp: null, ecg: null, created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000 + 65000).toISOString() },
    ],
    4: [
        { content_id: 13, content: '허리가 뻐근하고 아파요', is_question: true, is_diag: false, is_recommend: false, temp: 36.7, ecg: 1, created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
        { content_id: 14, content: '오래 앉아계시는 편인가요?', is_question: false, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000 + 5000).toISOString() },
        { content_id: 15, content: '네 하루 8시간 이상 앉아있어요', is_question: true, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000 + 60000).toISOString() },
        { content_id: 16, content: '근막통증 증후군으로 보입니다. 스트레칭과 정형외과 방문을 권장합니다.', is_question: false, is_diag: true, is_recommend: true, temp: null, ecg: null, created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000 + 65000).toISOString() },
    ],
    5: [
        { content_id: 17, content: '잠을 못자서 너무 힘들어요', is_question: true, is_diag: false, is_recommend: false, temp: 36.4, ecg: 0, created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() },
        { content_id: 18, content: '언제부터 수면에 어려움이 있으셨나요?', is_question: false, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000 + 5000).toISOString() },
        { content_id: 19, content: '한 달 전부터요', is_question: true, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000 + 60000).toISOString() },
        { content_id: 20, content: '불면증 증상입니다. 수면위생 개선과 필요시 신경정신과 상담을 권장합니다.', is_question: false, is_diag: true, is_recommend: true, temp: null, ecg: null, created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000 + 65000).toISOString() },
    ],
    6: [
        { content_id: 21, content: '팔에 빨간 발진이 생겼어요', is_question: true, is_diag: false, is_recommend: false, temp: 37.1, ecg: 2, created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
        { content_id: 22, content: '가려움증도 있으신가요?', is_question: false, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000 + 5000).toISOString() },
        { content_id: 23, content: '네 많이 가려워요', is_question: true, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000 + 60000).toISOString() },
        { content_id: 24, content: '접촉성 피부염으로 보입니다. 피부과 방문을 권장합니다.', is_question: false, is_diag: true, is_recommend: true, temp: null, ecg: null, created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000 + 65000).toISOString() },
    ],
    7: [
        { content_id: 25, content: '눈이 빨갛고 따가워요', is_question: true, is_diag: false, is_recommend: false, temp: 36.9, ecg: 0, created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString() },
        { content_id: 26, content: '눈물이 많이 나시나요?', is_question: false, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000 + 5000).toISOString() },
        { content_id: 27, content: '네 그리고 눈곱도 껴요', is_question: true, is_diag: false, is_recommend: false, temp: null, ecg: null, created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000 + 60000).toISOString() },
        { content_id: 28, content: '결막염 증상입니다. 안과 방문을 권장합니다.', is_question: false, is_diag: true, is_recommend: true, temp: null, ecg: null, created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000 + 65000).toISOString() },
    ],
};

const USE_MOCK: boolean = true;

export { mockUser, mockChats, mockChatHistory, USE_MOCK };
