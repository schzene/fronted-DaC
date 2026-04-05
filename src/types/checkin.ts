export interface CheckInRecord {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  duration: string | null;
  status: 'checked_in' | 'checked_out';
}

export interface CheckInStats {
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  todayStatus: 'not_checked' | 'checked_in' | 'checked_out';
  todayRecord: CheckInRecord | null;
}
