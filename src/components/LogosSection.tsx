export default function LogosSection() {
  return (
    <section className="py-12 px-8 bg-[#121215] border-t border-b border-white/8">
      <p className="text-center text-xs text-[#71717a] mb-6 uppercase tracking-wider">
        עבדנו עם חברות מובילות
      </p>
      <div className="flex justify-center items-center gap-12 flex-wrap max-w-[800px] mx-auto">
        {['TechStart', 'FinanceHub', 'HealthApp', 'RetailPro', 'DataFlow'].map((logo, i) => (
          <span key={i} className="font-english text-xl font-bold text-[#71717a] opacity-50 hover:opacity-80 transition-opacity">
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}

