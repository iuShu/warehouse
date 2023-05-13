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
      <div className="flex flex-col h-full px-2 py-2 bg-blue-50">
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
          {data.child ? <TreeNodes data={each.child}/> : <></>}
        </div>
      )}
    </>
  )
}

function Node({node, ref}) {
  const expand = false
  return (
    <>
      <div className={"h-8 w-full flex flex-row gap-1 pl-1 rounded items-center cursor-pointer hover:shadow hover:bg-zinc-100 " + (node.level > 10 ? "hidden" : "")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className={"w-6 h-6 " + (expand ? "hidden" : "")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className={"w-6 h-6 " + (expand ? "" : "hidden")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6"/>
        </svg>
        <p className="pt-1 select-none tracking-widest">{node.name}</p>
      </div>
    </>
  )
}