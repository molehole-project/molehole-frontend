import React, { useState } from 'react';

type Tab = 'home' | 'post';

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="px-4 py-2">
          <h3 className="text-xl font-bold">header</h3>
        </div>
      </header>

      {/* User Header Image */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-100 border-2 border-black h-48 flex items-center justify-center">
          <span className="text-gray-600">header image</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="col-span-3">
            {/* Profile Section */}
            <div className="mb-4">
              {/* Profile Image */}
              <div className="flex justify-center mb-3">
                <div className="w-20 h-20 rounded-full border-4 border-black bg-white flex items-center justify-center">
                  <span className="text-xs">profile</span>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-3">
                <div className="font-bold text-lg">nickname</div>
                <div className="text-sm text-gray-600">@accountId</div>
              </div>

              {/* Follow Stats */}
              <div className="flex justify-center gap-4 text-sm">
                <span className="cursor-pointer hover:underline">
                  <strong>10</strong> 팔로잉
                </span>
                <span className="cursor-pointer hover:underline">
                  <strong>10</strong> 팔로워
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white border-2 border-black p-4 mb-4 h-24 flex items-center justify-center">
              <span className="text-gray-600">bio</span>
            </div>

            {/* Left Widget / Category */}
            <div className="bg-white border-2 border-black p-6 h-40 flex items-center justify-center">
              <span className="text-gray-600">
                {activeTab === 'home' ? 'left widget' : 'category'}
              </span>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-span-9">
            {/* Tab Navigation */}
            <nav className="mb-4 border-b border-gray-200">
              <div className="flex gap-6 text-[15px]">
                {(
                  [
                    { key: 'home', label: '전체' },
                    { key: 'post', label: '포스트' },
                  ] as const
                ).map((t) => {
                  const active = activeTab === t.key;

                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={[
                        "relative py-3",
                        active ? "text-black font-semibold" : "text-gray-400 font-medium hover:text-gray-600",
                      ].join(" ")}
                    >
                      {t.label}

                      {/* 활성 탭 밑줄 */}
                      {active && (
                        <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-black" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Content Area */}
            <div className="bg-white border-2 border-black p-8 min-h-[400px] flex items-center justify-center">
              {activeTab === 'home' ? (
                <span className="text-gray-600 text-lg">right widget</span>
              ) : (
                <div className="text-gray-600 text-lg text-center">
                  <div>post list or</div>
                  <div>post detail</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;