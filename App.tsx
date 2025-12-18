
import React, { useState, useMemo } from 'react';
import { INITIAL_DEPARTMENTS, SLP_COLORS, SLP_LABELS } from './constants';
import { Department } from './types';
import { 
  Factory, 
  Layout, 
  Settings, 
  CheckCircle, 
  Info,
  BarChart3,
  Bot,
  Map as MapIcon,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const getAiRecommendation = async () => {
    setIsOptimizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const deptList = departments.map(d => `${d.code} (${d.name}): Current=${d.currentArea}m2, Needed=${d.neededArea}m2`).join('\n');
      
      const prompt = `
        أنا طالب هندسة منشآت أعمل على مشروع تحسين مصنع أجبان (مشروع Lacima). 
        بناءً على البيانات التالية التي تقارن المساحة الحالية (Current) والمساحة المطلوبة بعد التحسين (Needed):
        ${deptList}
        
        يرجى تقديم دراسة تحليلية مهنية باللغة العربية تتضمن:
        1. تحليل الفجوات (Gap Analysis) للأقسام التي تعاني من ازدحام (مثل Filling & Capping).
        2. تفسير هندسي لسبب تقليص مساحة أقسام مثل (Cold Storage) وزيادة أخرى.
        3. توصيات حول تدفق المواد بناءً على الترتيب: استلام -> طبخ -> بسترة -> تجانس -> تعبئة -> تغليف -> تخزين.
        4. تعليق على أهمية تحسين الممرات (Aisles) لسلامة العمال.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setAiAnalysis(response.text);
    } catch (error) {
      console.error(error);
      setAiAnalysis("حدث خطأ في جلب توصيات الذكاء الاصطناعي.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const chartData = useMemo(() => {
    return departments.map(d => ({
      name: d.code,
      fullName: d.name,
      'الحالي (قبل)': d.currentArea,
      'المطلوب (بعد)': d.neededArea
    }));
  }, [departments]);

  // Map representation based on the sketch
  const LayoutMap = () => (
    <div className="grid grid-cols-4 grid-rows-5 gap-2 w-full h-[500px] bg-slate-200 p-4 rounded-xl border-4 border-slate-300 relative font-bold text-xs">
      {/* Row 1-5 Left: D9 and D8 */}
      <div className="col-span-1 row-span-5 bg-blue-100 border-2 border-blue-400 flex items-center justify-center text-center p-2 rounded shadow-inner">D9<br/>Cold Storage</div>
      <div className="col-span-1 row-span-5 bg-blue-50 border-2 border-blue-300 flex items-center justify-center text-center p-2 rounded shadow-inner">D8<br/>Case Packing</div>
      
      {/* Rest of the layout */}
      <div className="col-span-1 row-span-2 bg-green-100 border-2 border-green-400 flex items-center justify-center text-center p-1 rounded">D6<br/>Inspect</div>
      <div className="col-span-1 row-span-1 bg-green-50 border-2 border-green-300 flex items-center justify-center text-center p-1 rounded">D7<br/>Label</div>
      
      {/* Mid Right */}
      <div className="col-span-1 row-span-1 bg-yellow-50 border-2 border-yellow-400 flex items-center justify-center text-center p-1 rounded">D3<br/>Pasteur</div>
      <div className="col-span-1 row-span-3 bg-red-100 border-2 border-red-400 flex items-center justify-center text-center p-1 rounded">D5<br/>Filling</div>
      <div className="col-start-3 row-start-4 col-span-1 row-span-1 bg-yellow-100 border-2 border-yellow-500 flex items-center justify-center text-center p-1 rounded">D4<br/>Homog</div>
      
      {/* Bottom */}
      <div className="col-span-1 row-span-2 bg-orange-100 border-2 border-orange-400 flex items-center justify-center text-center p-1 rounded">D2<br/>Prep & Cook</div>
      <div className="col-span-1 row-span-1 bg-slate-100 border-2 border-slate-400 flex items-center justify-center text-center p-1 rounded">D1<br/>Raw Mat</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Factory className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold">مشروع تحسين تخطيط مصنع Lacima</h1>
              <p className="text-xs opacity-90 font-medium">دراسة المساحات: قبل التحسين vs بعد التحسين</p>
            </div>
          </div>
          <button 
            onClick={getAiRecommendation}
            className="bg-white text-emerald-700 px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-lg text-sm"
          >
            {isOptimizing ? 'جاري التحليل...' : (
              <>
                <Bot className="w-5 h-5" />
                توليد الدراسة الهندسية
              </>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Statistics & Charts */}
        <div className="lg:col-span-8 space-y-8">
          {/* Comparison Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                مقارنة المساحة الإجمالية (م²)
              </h2>
              <div className="flex gap-4 text-xs font-bold">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-400 rounded"></span> قبل</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded"></span> بعد</div>
              </div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Bar dataKey="الحالي (قبل)" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="المطلوب (بعد)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Analysis Section */}
          {aiAnalysis && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-emerald-100 p-8 animate-in fade-in duration-700">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="w-8 h-8 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-800 underline decoration-emerald-200 decoration-4 underline-offset-4">
                  التحليل الفني والتوصيات المقترحة
                </h2>
              </div>
              <div className="prose prose-emerald max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                {aiAnalysis}
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                جدول مقارنة المساحات التفصيلي
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-xs uppercase">
                    <th className="px-6 py-4 font-bold">الرمز</th>
                    <th className="px-6 py-4 font-bold">القسم</th>
                    <th className="px-6 py-4 font-bold text-center">قبل (م²)</th>
                    <th className="px-6 py-4 font-bold text-center">بعد (م²)</th>
                    <th className="px-6 py-4 font-bold text-center">الممرات (م²)</th>
                    <th className="px-6 py-4 font-bold text-center">الفرق</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {departments.map(dept => {
                    const diff = dept.neededArea - dept.currentArea;
                    return (
                      <tr key={dept.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-emerald-700">{dept.code}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{dept.name}</td>
                        <td className="px-6 py-4 text-center text-slate-500">{dept.currentArea}</td>
                        <td className="px-6 py-4 text-center font-bold text-emerald-600">{dept.neededArea}</td>
                        <td className="px-6 py-4 text-center text-slate-400">{dept.aislesArea}</td>
                        <td className={`px-6 py-4 text-center font-bold ${diff > 0 ? 'text-blue-500' : diff < 0 ? 'text-orange-500' : 'text-slate-300'}`}>
                          {diff > 0 ? `+${diff}` : diff}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Layout Visualization */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapIcon className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-800">تخطيط المساحات (بعد)</h2>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-medium italic">
              محاكاة رقمية للرسم اليدوي المرفق توضح توزيع الأقسام في المنشأة:
            </p>
            <LayoutMap />
            <div className="mt-6 space-y-2">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2 rounded">
                 <ArrowRight className="w-4 h-4 text-emerald-500" />
                 تم تحسين D5 (التعبئة) بزيادة 25 م² لتقليل الازدحام.
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2 rounded">
                 <ArrowRight className="w-4 h-4 text-emerald-500" />
                 تقليص D9 (التخزين) بـ 65 م² لتحسين كفاءة المساحة.
               </div>
            </div>
          </div>

          <div className="bg-emerald-900 text-emerald-50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-3 flex items-center gap-2 text-lg">
                <Info className="w-5 h-5" />
                ملاحظات المشروع
              </h3>
              <ul className="text-xs space-y-3 opacity-90 leading-loose list-disc pr-4">
                <li>تم رصد ازدحام في مناطق التعبئة والطبخ بسبب ضيق الممرات.</li>
                <li>التخطيط الجديد يهدف لتقليل حركة العمال غير الضرورية.</li>
                <li>تم تطبيق مبادئ <b>HACCP</b> في توزيع الأقسام لضمان سلامة الغذاء.</li>
                <li>الأرقام مبنية على مقارنة "المساحة الحالية" مقابل "المساحة المطلوبة".</li>
              </ul>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 mt-12 text-center text-slate-400 text-xs font-medium">
        <p>مشروع مادة تصميم وتخطيط المنشآت | تطوير أداة التحسين الذكية © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
