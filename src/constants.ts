export interface Question {
  id: number;
  text: string;
  description?: string;
  options: {
    label: string;
    value: number;
    subtext?: string;
  }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "ช่วงอายุของผู้ป่วย",
    options: [
      { label: "น้อยกว่า 60 ปี", value: 0 },
      { label: "60-70 ปี", value: 1 },
      { label: "71-80 ปี", value: 1 },
      { label: "81-90 ปี", value: 1 },
      { label: "91-100 ปี", value: 1 },
      { label: "มากกว่า 100 ปี", value: 1 }
    ]
  },
  {
    id: 6,
    text: "มีประวัติการหกล้มในช่วง 1 ปีที่ผ่านมา",
    options: [
      { label: "ใช่", value: 1 },
      { label: "ไม่ใช่", value: 0 }
    ]
  },
  {
    id: 7,
    text: "มีภาวะสับสน หรือ ประเมินความสามารถของตนเองไม่ตรงความจริง",
    description: "(เช่น แขนขาอ่อนแรง แต่คิดว่าตนเองเดินไปเข้าห้องน้ำเองได้)",
    options: [
      { label: "ใช่", value: 1 },
      { label: "ไม่ใช่", value: 0 }
    ]
  },
  {
    id: 8,
    text: "มีปัญหาการมองเห็นที่ส่งผลต่อชีวิตประจำวัน",
    description: "เช่น การมองเห็นเลือนลาง ทำให้เดินชนประตูหรือสิ่งกีดขวางอื่น",
    options: [
      { label: "ใช่", value: 1 },
      { label: "ไม่ใช่", value: 0 }
    ]
  },
  {
    id: 9,
    text: "มีปัญหาการขับถ่าย",
    description: "(ปัสสาวะ/อุจจาระบ่อย/กลั้นไม่อยู่)",
    options: [
      { label: "ใช่", value: 1 },
      { label: "ไม่ใช่", value: 0 }
    ]
  },
  {
    id: 10,
    text: "ได้รับสารน้ำทางหลอดเลือดดำ/ มีอุปกรณ์ทางการแพทย์ติดตัว",
    description: "เช่น IV lock, Foley’s Catheter, Radivac drain ฯลฯ",
    options: [
      { label: "ใช่", value: 1 },
      { label: "ไม่ใช่", value: 0 }
    ]
  },
  {
    id: 11,
    text: "ผู้ป่วยสามารถลุกเดิน / ทรงตัว / เคลื่อนย้ายตัวเองได้หรือไม่",
    options: [
      { label: "ทำได้ต้องมีคนช่วย หรือ ท่าทางไม่มั่นคง", value: 1 },
      { label: "ทำไม่ได้ หรือ bed ridden หรือ ทำได้เอง", value: 0 }
    ]
  },
  {
    id: 12,
    text: "ผู้ป่วยสามารถเคลื่อนไหวร่างกายเพื่อทำกิจวัตรประจำวันได้หรือไม่",
    options: [
      { label: "ทำได้ต้องมีคนช่วย หรือ ใช้รถเข็น/ เครื่องช่วยพยุง", value: 1 },
      { label: "ทำไม่ได้ หรือ ทำได้เอง", value: 0 }
    ]
  },
  {
    id: 13,
    text: "มีการใช้ยาที่ทำให้เสี่ยงต่อการหกล้มหรือไม่",
    description: "Analgesics, Antipsychotics, Anticonvulsants, Benzodiazepine, Antihypertensives, Cardiac drugs, Antiarrhythmics, Antidepressants, Diuretics",
    options: [
      { label: "มี", value: 1 },
      { label: "ไม่มี", value: 0 }
    ]
  },
  {
    id: 14,
    text: "ผลการตรวจทางห้องปฏิบัติการผิดปกติ",
    description: "(เช่น Hb, Hct, Electrolyte)",
    options: [
      { label: "มี", value: 1 },
      { label: "ไม่มี", value: 0 }
    ]
  }
];

export const getRiskLevel = (score: number) => {
  if (score <= 3) return { level: "ความเสี่ยงต่ำ", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", guideline: "Fall 1" };
  if (score <= 7) return { level: "ความเสี่ยงปานกลาง", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", guideline: "Fall 2" };
  return { level: "ความเสี่ยงสูง", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", guideline: "Fall 2" };
};
