// CONS/CONS_dynamic/index.tsx
import BOX_header from 'BOX/BOX_header';
import BOX_nav from 'BOX/BOX_nav';
import React from 'react';
import { RouteConfig } from 'TYPE';
import BOX_actionn from 'BOX/BOX_action';
import BOX_actiomMenue from 'BOX/BOX_actionMenue';
import BOX_actiomContent from 'BOX/BOX_actionContent';
import { panelman } from 'ACTR/RACT_panelman_V00.04/index';
import BOX_assistant from 'BOX/BOX_assistant';
import Jini from "BOX/BOX_Jinni";
import NotFoundPage from 'CONS/CONS_notFound';
import Nav from "COMP/RCMP_navigator_VAR.01_V00.04"
import Avatar from 'WIDG/RWID_avatar_V00.04';
import { FaBell, FaUser } from 'react-icons/fa6';
import avatarPng from 'ASST/images/avatar.png';
import Accordion from 'WIDG/RWID_accordion_V00.04';
import { ChevronDownIcon, ChevronUpIcon } from 'flowbite-react';
interface DynamicPageProps {
  pageKey: string;
  config: RouteConfig;
}

// کامپوننت 404 برای صفحاتی که وجود ندارند

// کامپوننت پیش‌فرض برای صفحاتی که در ENVI_CONS وجود دارند
const DefaultComponent: React.FC<DynamicPageProps> = ({ pageKey, config }) => (
  <div className='flex flex-wrap items-center w-full h-full bg-secendory gap-1 px-1 font-sans font-semibold'>
    <BOX_header />
    <div className="flex items-center w-full h-full gap-1">
      <BOX_nav >
        <Nav />
      </BOX_nav >
      <BOX_actionn>
        <div className='w-9/12 h-full bg-light text-dark rounded-md overflow-y-auto custom-scrollbar'>
          <Jini />

          <BOX_actiomMenue>
            منوی {config.name || pageKey}
          </BOX_actiomMenue>
          <BOX_actiomContent>
            <div className='bg-light text-dark'  >
              <div className="flex flex-col mt-96 gap-4 items-center p-4">




                <div>

 <div className="max-w-2xl mx-auto mt-10">
      <Accordion
        geometric={{
          width: "w-full",
          spacing: "space-y-3",
        }}
        logic={{
          alwaysOpen: false,
          collapseIcon: <ChevronUpIcon className="w-5 h-5 text-gray-600" />,
          expandIcon: <ChevronDownIcon className="w-5 h-5 text-gray-600" />,
          onPanelToggle: (index, isOpen) => {
            console.log(`پنل ${index} ${isOpen ? "باز شد" : "بسته شد"}`);
          },
        }}
        style={{
          // رنگ‌ها و استایل‌ها را می‌توان در اینجا override کرد
          colorBlue_titleBg: "bg-blue-100",
          colorBlue_titleText: "text-blue-900",
          colorBlue_contentBg: "bg-blue-50",
          colorBlue_contentText: "text-blue-800",
          title_base:
            "flex items-center justify-between w-full p-4 font-semibold text-left rounded-xl transition-all duration-300",
          content_base: "p-4 text-sm leading-relaxed",
        }}
      >
        <Accordion.Panel>
          <Accordion.Title> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quibusdam?</Accordion.Title>
          <Accordion.Content>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quibusdam?
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quibusdam?</Accordion.Title>
          <Accordion.Content>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quibusdam?

          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title> Lorem ipsum dolor sit amet.</Accordion.Title>
          <Accordion.Content>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quibusdam?

          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
                </div>
                {/* Basic Avatar */}
                <Avatar
                  geometric={{ width: "w-12", height: "h-12" }}
                  logic={{}}
                  img={avatarPng}
                  alt="User avatar"
                />

                {/* Avatar with badge */}
                <Avatar
                  geometric={{ width: "w-10", height: "h-10" }}
                  logic={{
                    badge: <FaBell className="w-2 h-2" />,
                    badgePosition: "top-right"
                  }}
                  img={avatarPng}
                />

                {/* Avatar with status */}
                <Avatar
                  geometric={{ width: "w-16", height: "h-16" }}
                  logic={{}}
                  status="online"
                  statusPosition="bottom-right"
                  placeholderInitials="JD"
                />

                {/* Avatar with custom fallback */}
                <Avatar
                  geometric={{ width: "w-14", height: "h-14", rounding: "rounded-lg" }}
                  logic={{
                    fallback: <FaUser className="w-6 h-6 text-gray-500" />
                  }}
                  style={{
                    placeholder_base: "absolute flex items-center justify-center bg-blue-100 text-blue-600"
                  }}
                />

                {/* Loading state */}
                <Avatar
                  geometric={{ width: "w-12", height: "h-12" }}
                  logic={{ isLoading: true }}
                />
                <div className="flex -space-x-4">
                  <Avatar
                    geometric={{ width: "w-10", height: "h-10" }}
                    logic={{}}
                    img={avatarPng}
                  />
                  <Avatar
                    geometric={{ width: "w-10", height: "h-10" }}
                    logic={{}}
                    img={avatarPng}
                  />
                  <Avatar
                    geometric={{ width: "w-10", height: "h-10" }}
                    logic={{}}
                    placeholderInitials="+3"

                  />
                </div>
                <div className="flex items-center gap-4">
                  <Avatar
                    geometric={{ width: "w-8", height: "h-8" }}
                    logic={{}}
                    img={avatarPng}
                    alt="Extra small"
                  />
                  <Avatar
                    geometric={{ width: "w-12", height: "h-12" }}
                    logic={{}}
                    img={avatarPng}
                    alt="Small"
                  />
                  <Avatar
                    geometric={{ width: "w-16", height: "h-16" }}
                    logic={{}}
                    img={avatarPng}
                    alt="Medium"
                  />
                  <Avatar
                    geometric={{ width: "w-24", height: "h-24" }}
                    logic={{}}
                    img={avatarPng}
                    alt="Large"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  {/* Online */}
                  <Avatar
                    geometric={{ width: "w-12", height: "h-12" }}
                    logic={{}}
                    status="online"
                    img={avatarPng}
                  />

                  {/* Away */}
                  <Avatar
                    geometric={{ width: "w-12", height: "h-12" }}
                    logic={{}}
                    status="away"
                    img={avatarPng}
                  />

                  {/* Busy */}
                  <Avatar
                    geometric={{ width: "w-12", height: "h-12" }}
                    logic={{}}
                    status="busy"
                    img={avatarPng}
                  />

                  {/* Offline */}
                  <Avatar
                    geometric={{ width: "w-12", height: "h-12" }}
                    logic={{}}
                    status="offline"
                    img={avatarPng}
                  />
                </div>
              </div>
              <h1>{config.name || pageKey}</h1>
              <div>مسیر: {config.path}</div>
              <div>کلید: {pageKey}</div>

              {/* اینجا می‌توانید محتوای داینامیک خود را بر اساس pageKey بارگذاری کنید */}
              <div >
                <h3>محتوای صفحه {pageKey}</h3>
                <p>این بخش می‌تواند بر اساس pageKey کامپوننت مختلفی نمایش دهد</p>

                {/* نمایش اطلاعات config */}
                {config.BUNDL && (
                  <div >
                    <strong>اطلاعات BUNDL:</strong>
                    <pre style={{ fontSize: '12px', marginTop: '10px' }}>
                      {JSON.stringify(config.BUNDL, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

          </BOX_actiomContent>
        </div>

        <BOX_assistant >

        </BOX_assistant>
      </BOX_actionn>
    </div>
  </div>
);

// کامپوننت‌های خاص برای هر صفحه (اختیاری)
const componentMap: Record<string, React.FC<DynamicPageProps>> = {
  // home: HomeComponent,
  // cast: CastComponent,
  // gasma: GasmaComponent,
  // wiki: WikiComponent,
};

const DynamicPage: React.FC<DynamicPageProps> = ({ pageKey, config }) => {
  // بررسی وجود صفحه در ENVI_CONS
  const routeExists = panelman.getRouteState(pageKey);
  const routeConfig = panelman.getRouteConfig(pageKey);

  // اگر صفحه وجود نداشت، کامپوننت 404 نمایش داده شود
  if (!routeExists || !routeConfig) {
    return <NotFoundPage />;
  }

  // اگر صفحه وجود داشت، کامپوننت مربوطه را نمایش بده
  const PageComponent = componentMap[pageKey] || DefaultComponent;

  return <PageComponent pageKey={pageKey} config={{ ...config, ...routeConfig }} />;
};

export default DynamicPage;