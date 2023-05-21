'use client';

import Link from "next/link";
import {useEffect, useState} from "react";
import {AdminTheme} from "./action/admin-theme";
import {Logout} from "./action/logout";

const menu = [
  {
    name: 'dashboard',
    title: '统计',
    url: '/admin',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>
      </svg>
  },
  {
    name: 'warehouse',
    title: '仓储',
    url: '/admin/warehouse',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"/>
      </svg>
  },
  {
    name: 'store',
    title: '店铺',
    url: '/admin/store',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>
      </svg>
  },
  {
    name: 'product',
    title: '商品',
    url: '/admin/product',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
      </svg>
  },
  {
    name: 'authority',
    title: '用户',
    url: '/admin/authority',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
      </svg>
  }
]

export function Sidebar() {
  const defaultClass = "text-zinc-800 dark:text-slate-400 hover:bg-zinc-200 hover:dark:bg-zinc-700 hover:dark:text-slate-200 transition duration-300",
    activeClass = "font-semibold bg-gradient-to-r from-violet-400 to-violet-500 text-slate-50 dark:bg-zinc-700 dark:text-slate-200"
  const [tab, setTab] = useState("dashboard")

  const clickTab = (t) => {
    setTab(t)
  }

  useEffect(() => {
    const pathname = window.location.pathname
    if (tab === 'dashboard' && pathname !== '/admin') {
      const seg = pathname.split('/')
      setTab(seg[seg.length - 1])
    }
  }, [])

  return (
    <>
      <nav className="flex flex-col gap-1 h-screen tracking-widest">
        <div className="basis-3/5 flex flex-col gap-1">
          <div className="h-16 flex flex-row pl-4 pt-4 gap-2">
            <div className="flex items-center justify-end">
              <svg width="30" height="25" version="1.1" viewBox="0 0 30 23" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Artboard" transform="translate(-95.000000, -51.000000)">
                    <g id="logo" transform="translate(95.000000, 50.000000)">
                      <path id="Combined-Shape" fill="#9155FD" d="M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z"/>
                      <polygon id="Rectangle" opacity="0.077704" fill="#000" points="0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646"/>
                      <polygon id="Rectangle" opacity="0.077704" fill="#000" points="0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162"/>
                      <polygon id="Rectangle" opacity="0.077704" fill="#000" points="22.7419355 8.58870968 30 12.7417372 30 16.9537453" transform="translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) "/>
                      <polygon id="Rectangle" opacity="0.077704" fill="#000" points="22.7419355 8.58870968 30 12.6409734 30 15.2601969" transform="translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) "/>
                      <path id="Rectangle" fillOpacity="0.15" fill="#FFF" d="M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z"/>
                      <path id="Rectangle" fillOpacity="0.35" fill="#FFF" transform="translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) " d="M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z"/>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="flex items-center justify-start tracking-widest font-semibold text-base text-violet-500 select-none">
              Warehouse
            </div>
          </div>
          {menu.map(each =>
            <Link key={each.name} href={each.url} onClick={() => clickTab(each.name)}
                  className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start rounded-r-full " + (tab === each.name ? activeClass : defaultClass)}
            >
              {each.icon}
              <span>{each.title}</span>
            </Link>
          )}
        </div>
        <div className="basis-2/5 flex flex-col justify-end gap-1 pb-4">
          {/*<AdminTheme />*/}
          <button
            className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start rounded-r-full tracking-widest " + defaultClass}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
            </svg>
            <span>帮助</span>
          </button>
          <button className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start rounded-r-full tracking-widest " + defaultClass}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>设置</span>
          </button>
          <Logout />
        </div>
      </nav>
    </>
  )
}