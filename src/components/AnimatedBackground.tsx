'use client';

/**
 * רקע אסתטי עם גריד וגרדיאנטים בכחול וסגול
 * ללא חלקיקים קופצים - יציב ונעים לעין
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* רקע בסיסי */}
      <div className="absolute inset-0 bg-[#09090b]" />
      
      {/* גרדיאנטים עדינים */}
      <div className="absolute inset-0 opacity-30">
        {/* גרדיאנט סגול - פינה עליונה שמאלית */}
        <div 
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
          }}
        />
        
        {/* גרדיאנט כחול - פינה תחתונה ימנית */}
        <div 
          className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
          }}
        />
        
        {/* גרדיאנט מרכזי - מיזוג */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* גריד עדין */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* קווים דינמיים עדינים */}
      <div className="absolute inset-0 overflow-hidden">
        {/* קו אופקי עליון */}
        <div 
          className="absolute top-0 left-0 right-0 h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), rgba(37, 99, 235, 0.5), transparent)',
          }}
        />
        
        {/* קו אופקי תחתון */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.5), rgba(147, 51, 234, 0.5), transparent)',
          }}
        />
      </div>

      {/* אפקט זוהר עדין - נעים */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(37, 99, 235, 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}

