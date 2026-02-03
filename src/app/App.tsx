return (
  <div className="h-screen w-screen flex items-center justify-center bg-black p-4">
    {/* Phone frame - HARDCODED Figma styles */}
    <div 
      className="relative w-[390px] h-[844px] overflow-hidden rounded-[48px] shadow-2xl"
      style={{
        background: '#ffffff', // Figma white background
        color: '#0f0f0f',      // Figma foreground black
        border: '8px solid rgba(0,0,0,0.2)', // Figma bezel
      }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[32px] bg-black rounded-b-[24px] z-50" />
      
      {/* Screen content */}
      <div className="h-full pt-12 pb-12 overflow-y-auto">
        {renderScreen()}
      </div>
      
      {showTabBar && <BottomTabBar activeTab={state.activeTab} setTab={setTab} />}
      {state.showTooltip && (
        <DemoTooltip
          message={state.showTooltip}
          onClose={() => updateState({ showTooltip: null })}
        />
      )}
    </div>
  </div>
);
