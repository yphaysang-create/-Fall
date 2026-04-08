import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Activity,
  User,
  ShieldAlert
} from 'lucide-react';
import { QUESTIONS, getRiskLevel } from './constants';

export default function App() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalScore = useMemo(() => {
    return Object.values(answers).reduce((acc: number, val: number) => acc + val, 0);
  }, [answers]);

  const risk = useMemo(() => getRiskLevel(totalScore), [totalScore]);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance for simple yes/no questions if not the last one
    if (currentStep < QUESTIONS.length - 1) {
      // Small delay for UX
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    } else if (currentStep === QUESTIONS.length - 1) {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Stethoscope size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-800">
                แบบประเมินความเสี่ยงต่อการหกล้ม
              </h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                โรงพยาบาลมหาวิทยาลัยนเรศวร
              </p>
            </div>
          </div>
          {Object.keys(answers).length > 0 && !showResult && (
            <button 
              onClick={reset}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
              title="เริ่มใหม่"
            >
              <RotateCcw size={20} />
            </button>
          )}
        </div>
        
        {/* Progress Bar */}
        {!showResult && (
          <div className="h-1 w-full bg-slate-100">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Question Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 text-slate-100 pointer-events-none">
                  <Activity size={120} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">
                      ข้อที่ {currentStep + 1} จาก {QUESTIONS.length}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-snug">
                    {QUESTIONS[currentStep].text}
                  </h2>
                  
                  {QUESTIONS[currentStep].description && (
                    <div className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                      <Info className="text-blue-500 shrink-0" size={20} />
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {QUESTIONS[currentStep].description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    {QUESTIONS[currentStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(QUESTIONS[currentStep].id, option.value)}
                        className={`
                          group relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 text-left
                          ${answers[QUESTIONS[currentStep].id] === option.value 
                            ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                            : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'}
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                            ${answers[QUESTIONS[currentStep].id] === option.value 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-slate-300 group-hover:border-blue-400'}
                          `}>
                            {answers[QUESTIONS[currentStep].id] === option.value && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className={`font-semibold ${answers[QUESTIONS[currentStep].id] === option.value ? 'text-blue-700' : 'text-slate-700'}`}>
                            {option.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {option.value} คะแนน
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-slate-500 font-semibold hover:text-blue-600 disabled:opacity-0 transition-all"
                >
                  <ChevronLeft size={20} />
                  ย้อนกลับ
                </button>
                
                <div className="flex gap-2">
                  {currentStep === QUESTIONS.length - 1 && Object.keys(answers).length === QUESTIONS.length && (
                    <button
                      onClick={() => setShowResult(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      ดูผลการประเมิน
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Result Header */}
                <div className={`p-8 text-center ${risk.bg} border-b ${risk.border}`}>
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${risk.color} bg-white shadow-sm`}>
                    {totalScore >= 8 ? <ShieldAlert size={40} /> : totalScore >= 4 ? <AlertTriangle size={40} /> : <CheckCircle size={40} />}
                  </div>
                  <h3 className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-1">
                    ผลการประเมิน
                  </h3>
                  <div className={`text-4xl font-black mb-2 ${risk.color}`}>
                    {risk.level}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/80 backdrop-blur rounded-full text-slate-700 font-bold text-lg shadow-sm">
                    คะแนนรวม: {totalScore} / 14
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-8 space-y-8">
                  <section>
                    <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <Activity size={18} />
                      </div>
                      แนวทางปฏิบัติทางการพยาบาล
                    </h4>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <p className="font-bold text-blue-700 mb-2">
                        ใช้แนวปฏิบัติ {risk.guideline}
                      </p>
                      <ul className="space-y-3 text-slate-600 text-sm list-disc pl-5">
                        {risk.guideline === "Fall 1" ? (
                          <>
                            <li>แนะนำการใช้กริ่งเรียกพยาบาลและวางไว้ในที่ที่หยิบใช้ได้สะดวก</li>
                            <li>จัดสิ่งแวดล้อมให้ปลอดภัย เช่น แสงสว่างเพียงพอ พื้นไม่ลื่น</li>
                            <li>แนะนำการเปลี่ยนท่าทางอย่างช้าๆ เพื่อป้องกันอาการหน้ามืด</li>
                            <li><span className="font-semibold text-slate-800">ความถี่การประเมิน:</span> ประเมินซ้ำทุกเวร หรือเมื่อมีการเปลี่ยนแปลงของอาการ</li>
                          </>
                        ) : (
                          <>
                            <li><span className="font-semibold text-slate-800">ความถี่การประเมิน:</span> ประเมินทุกวัน (เวรเช้า) หรือ เมื่อมีอาการเปลี่ยนแปลง</li>
                            <li><strong>ต้องเฝ้าระวังเป็นพิเศษ:</strong> ติดสัญลักษณ์ความเสี่ยงที่เตียงและป้ายข้อมือ</li>
                            <li>จัดให้ผู้ป่วยอยู่ใกล้เคาน์เตอร์พยาบาล (ถ้าเป็นไปได้)</li>
                            <li>ยกไม้กั้นเตียงขึ้นตลอดเวลาเมื่อผู้ป่วยอยู่บนเตียง</li>
                            <li>ช่วยเหลือในการขับถ่ายและทำกิจวัตรประจำวันอย่างใกล้ชิด</li>
                            <li>ทบทวนรายการยากับแพทย์และเภสัชกร</li>
                          </>
                        )}
                        <li className="text-red-600 font-medium">หากเกิดการพลัดตกหกล้ม: ให้รายงานความเสี่ยง และทบทวนเหตุการณ์ทันที</li>
                      </ul>
                    </div>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ผู้ประเมิน</p>
                        <p className="text-sm font-semibold text-slate-700">พยาบาลวิชาชีพ / เจ้าหน้าที่</p>
                      </div>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                        <Activity size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">วันที่ประเมิน</p>
                        <p className="text-sm font-semibold text-slate-700">{new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row gap-3">
                  <button 
                    onClick={reset}
                    className="flex-1 bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} />
                    ประเมินใหม่
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                  >
                    พิมพ์ผลการประเมิน
                  </button>
                </div>
              </div>
              
              <p className="text-center text-slate-400 text-xs font-medium px-4">
                * ข้อมูลนี้ใช้เพื่อประกอบการตัดสินใจทางการพยาบาลเท่านั้น โปรดใช้วิจารณญาณทางวิชาชีพร่วมด้วย
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="max-w-3xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} โรงพยาบาลมหาวิทยาลัยนเรศวร</p>
      </footer>
    </div>
  );
}
