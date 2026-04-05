import { CheckInRecord, CheckInStats } from '@/types/checkin';

const STORAGE_KEY = 'artifact_checkin_records';

export const getCheckInRecords = (): CheckInRecord[] => {
  if (typeof window === 'undefined') return [];
  
  const records = localStorage.getItem(STORAGE_KEY);
  return records ? JSON.parse(records) : [];
};

export const saveCheckInRecords = (records: CheckInRecord[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const checkIn = (): CheckInRecord => {
  const records = getCheckInRecords();
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  const existingToday = records.find(r => r.date === today);
  if (existingToday) {
    throw new Error('今日已签到');
  }
  
  const newRecord: CheckInRecord = {
    id: Date.now().toString(),
    date: today,
    checkInTime: now.toLocaleTimeString('zh-CN', { hour12: false }),
    checkOutTime: null,
    duration: null,
    status: 'checked_in',
  };
  
  records.unshift(newRecord);
  saveCheckInRecords(records);
  
  return newRecord;
};

export const checkOut = (): CheckInRecord => {
  const records = getCheckInRecords();
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  const todayRecord = records.find(r => r.date === today && r.status === 'checked_in');
  if (!todayRecord) {
    throw new Error('请先签到');
  }
  
  todayRecord.checkOutTime = now.toLocaleTimeString('zh-CN', { hour12: false });
  todayRecord.status = 'checked_out';
  
  const checkInDate = new Date(`${today} ${todayRecord.checkInTime}`);
  const diffMs = now.getTime() - checkInDate.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  todayRecord.duration = `${hours}小时${minutes}分钟`;
  
  saveCheckInRecords(records);
  
  return todayRecord;
};

export const getCheckInStats = (): CheckInStats => {
  const records = getCheckInRecords();
  const today = new Date().toISOString().split('T')[0];
  
  const todayRecord = records.find(r => r.date === today) || null;
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  for (let i = 0; i < sortedRecords.length; i++) {
    const recordDate = new Date(sortedRecords[i].date);
    const prevDate = i > 0 ? new Date(sortedRecords[i - 1].date) : new Date();
    
    if (i === 0) {
      tempStreak = 1;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (recordDate.toISOString().split('T')[0] !== yesterday.toISOString().split('T')[0] &&
          recordDate.toISOString().split('T')[0] !== today) {
        tempStreak = 0;
      }
    } else {
      const expectedPrev = new Date(recordDate);
      expectedPrev.setDate(expectedPrev.getDate() + 1);
      
      if (expectedPrev.toISOString().split('T')[0] === prevDate.toISOString().split('T')[0]) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak);
  }
  
  currentStreak = tempStreak > 0 && sortedRecords.length > 0 ? tempStreak : 0;
  
  return {
    totalDays: records.length,
    currentStreak,
    longestStreak,
    todayStatus: todayRecord?.status || 'not_checked',
    todayRecord,
  };
};
