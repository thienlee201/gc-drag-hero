"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("os");var e=require("fs"),r=require("path"),t=require("./playable-adapter-core-bdddc91a.js"),o=require("electron");require("util"),require("stream"),require("http"),require("https"),require("url"),require("assert"),require("zlib"),require("events");const i="build-finished",a="build-start",s="playable-ads-adapter",d=(r,t)=>e.readFileSync(r).toString(t),n=()=>{const r=`${Editor.Project.path}/.adapterrc`;return e.existsSync(r)?JSON.parse(d(r)):null},l=()=>{const e=Editor.Project.path,t="/build",o=n();let i=o?.buildPlatform??"web-mobile";return{projectRootPath:e,projectBuildPath:t,buildPlatform:i,originPkgPath:r.join(e,t,i),adapterBuildConfig:o}},u=()=>{const e=n();return!!e&&(e.skipBuild??!1)};var c=require("path").join(__dirname+"/2x-41f6a9e1.js");const p=(e,r)=>{Editor.log(`${s} 进行预构建处理`),Editor.log(`${s} 预构建处理完成`),r&&r()},h=async(e,i)=>{Editor.info(`${s} 开始适配`);const a=(new Date).getTime(),d=()=>{const e=(new Date).getTime();Editor.success(`${s} 适配完成，共耗时${((e-a)/1e3).toFixed(0)}秒`),o.shell.openPath(h),i&&i()},{projectRootPath:n,projectBuildPath:u,adapterBuildConfig:p}=l(),h=r.join(n,u),g={buildFolderPath:h,adapterBuildConfig:{...p,buildPlatform:e.platform,orientation:e.webOrientation}};try{const{Worker:e}=require("worker_threads");console.log("支持Worker，将开启子线程适配");new e(c,{workerData:g}).on("message",(({finished:e,msg:r,event:t})=>{var o;"adapter:finished"!==t?Editor[t.split(":")[1]](r):e?d():(o=r,Editor.error("适配失败"),Editor.error(o),i&&i())}))}catch(e){console.log("不支持Worker，将开启主线程适配"),await t.exec2xAdapter(g,{mode:"serial"}),d()}},g=()=>{const{buildPlatform:e,originPkgPath:r}=l();Editor.log(`开始构建项目，导出${e}包`),Editor.Ipc.sendToMain("builder:query-build-options",((t,o)=>{const i=o.scenes||[];0===i.length&&i.push(o.startScene);const a=(()=>{const e=`${Editor.Project.path}/settings/project.json`;return JSON.parse(d(e))["excluded-modules"]||["3D Physics/Builtin"]})();let s={...o,md5Cache:!1,inlineSpriteFrames:!1,inlineSpriteFrames_native:!1,debug:!1,platform:e,actualPlatform:e,sourceMaps:!1,scenes:i,excludedModules:a,dest:r};u()?p(0,(()=>{h(s)})):Editor.Ipc.sendToMain("builder:start-task","build",s)}))};const b={"adapter-build"(){g()}};exports.load=function(){console.log(`${s} is loaded`),Editor.Builder.on(a,p),Editor.Builder.on(i,h)},exports.messages=b,exports.unload=function(){console.log(`${s} is unloaded`),Editor.Builder.removeListener(a,p),Editor.Builder.removeListener(i,h)};