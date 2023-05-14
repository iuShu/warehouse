'use client';

import {useState} from "react";

export function SideTree() {

  const structure = [
    {
      id: 111,
      level: 1,
      name: '系统',
      child: [
        {
          id: 132,
          level: 2,
          name: '财务',
          child: []
        },
        {
          id: 734,
          level: 2,
          name: '人力',
          child: [{
            id: 9342,
            level: 3,
            name: 'Tony',
            child: []
          }]
        }
      ]
    },
    {
      id: 91,
      level: 1,
      name: '总裁',
      child: []
    }
  ]

  return (
    <>
      <div className="flex flex-col h-full px-2 py-2">
        <div className="h-10 flex flex-row justify-end items-center gap-1 text-slate-500">
          <button title="Collapse All" className="px-2 py-2 rounded-full hover:bg-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"/>
            </svg>
          </button>
          <button title="Expand All" className="px-2 py-2 rounded-full hover:bg-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"/>
            </svg>
          </button>
        </div>
        <TreeNodes data={structure} />
      </div>
    </>
  )
}

function TreeNodes({ data }) {
  return (
    <>
      {data.map(each =>
        <div key={each.id} className="flex flex-col w-full">
          <Node node={each} />
          {each.child ? <TreeNodes data={each.child}/> : <></>}
        </div>
      )}
    </>
  )
}

function Node({node, ref}) {
  const [expand, setExpand] = useState(false)
  const indent = []
  for (let i = 0; i < node.level - 1; i++)
    indent.push(i)
  console.log(node.name, node.level, indent.length)
  return (
    <>
      <div onClick={() => setExpand(!expand)}
           className={"h-8 flex flex-row gap-1 pl-1 rounded items-center cursor-pointer hover:bg-gray-50 " + (node.level > 10 ? "hidden" : "")}>
        {indent.map(each => <div key={"indent-" + each} className="w-4 h-8" />)}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className={"w-6 h-6 " + (expand ? "hidden" : "")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className={"w-6 h-6 " + (expand ? "" : "hidden")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6"/>
        </svg>
        <p className="pt-1 select-none tracking-widest">{node.name}</p>
        <span className="ml-2 pt-1 text-slate-400">{node.child.length > 0 ? node.child.length : ""}</span>
      </div>
    </>
  )
}