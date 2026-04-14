export default function PageWrapper({ title, children }: any) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">{title}</h1>

      <div className="bg-[#1a1d2e] border border-slate-800 rounded-xl p-5 space-y-4">
        {children}
      </div>
    </div>
  );
}