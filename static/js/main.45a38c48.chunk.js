(this["webpackJsonptest-project-to-do-list"]=this["webpackJsonptest-project-to-do-list"]||[]).push([[0],{19:function(t,e,n){},20:function(t,e,n){},26:function(t,e,n){"use strict";n.r(e);var c=n(0),i=n.n(c),a=n(7),o=n.n(a),s=(n(19),n(20),n(4)),r=n(1),d=i.a.memo((function(t){var e=Object(c.useState)(""),n=Object(s.a)(e,2),i=n[0],a=n[1],o=Object(c.useState)(null),d=Object(s.a)(o,2),u=d[0],T=d[1],l=function(){""!==i.trim()?(t.addItem(i),a("")):T("Title is required")};return Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{value:i,onChange:function(t){return a(t.currentTarget.value)},onKeyPress:function(t){null!==u&&T(null),13===t.charCode&&l()},className:u?"error":""}),Object(r.jsx)("button",{onClick:l,children:"Add"}),u&&Object(r.jsx)("div",{className:"error-message",children:u})]})})),u=i.a.memo((function(t){var e=Object(c.useState)(!1),n=Object(s.a)(e,2),i=n[0],a=n[1],o=Object(c.useState)(t.title),d=Object(s.a)(o,2),u=d[0],T=d[1];return i?Object(r.jsx)("input",{value:u,autoFocus:!0,onBlur:function(){a(!1),t.onChange(u)},onChange:function(t){T(t.currentTarget.value)}}):Object(r.jsx)("span",{onDoubleClick:function(){a(!0),T(t.title)},children:t.title})})),T=function(t){var e=Object(c.useCallback)((function(e){return t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.changeTaskTitle,t.todolistId]);return Object(r.jsxs)("li",{className:t.task.isDone?"is-done":"",children:[Object(r.jsx)("input",{type:"checkbox",checked:t.task.isDone,onChange:function(e){return t.changeTasksStatus(t.task.id,e.currentTarget.checked,t.todolistId)}}),Object(r.jsx)(u,{title:t.task.title,onChange:e}),Object(r.jsx)("button",{onClick:function(){return t.removeTask(t.task.id,t.todolistId)},children:"X"})]})},l=i.a.memo((function(t){var e=Object(c.useCallback)((function(e){return t.addTask(e,t.id)}),[t.addTask,t.id]),n=Object(c.useCallback)((function(e){return t.changeTodolistTitle(t.id,e)}),[t.changeTodolistTitle,t.id]);return Object(r.jsxs)("div",{children:[Object(r.jsx)(u,{title:t.title,onChange:n}),Object(r.jsx)("button",{onClick:function(){return t.removeTodolist(t.id)},children:"X"}),Object(r.jsx)(d,{addItem:e}),Object(r.jsx)("ul",{children:t.tasks.map((function(e){return Object(r.jsx)(T,{task:e,todolistId:t.id,removeTask:t.removeTask,changeTasksStatus:t.changeTasksStatus,changeTaskTitle:t.changeTaskTitle},e.id)}))})]})})),O=n(6),j=n(27),b=[],S=n(9),I=n(2),k={},f=n(3),h=function(){var t=Object(f.c)((function(t){return t.todolists})),e=Object(f.c)((function(t){return t.tasks})),n=Object(f.b)(),i=Object(c.useCallback)((function(t,e){n(function(t,e){return{type:"TEST/TASKS/REMOVE-TASK",taskId:t,todolistId:e}}(t,e))}),[]),a=Object(c.useCallback)((function(t,e){n(function(t,e){return{type:"TEST/TASK/ADD-TASK",taskTitle:t,todolistId:e}}(t,e))}),[]),o=Object(c.useCallback)((function(t,e,c){n(function(t,e,n){return{type:"TEST/TASK/CHANGE-TASK-STATUS",taskId:t,newIsDone:e,todolistId:n}}(t,e,c))}),[]),s=Object(c.useCallback)((function(t,e,c){n(function(t,e,n){return{type:"TEST/TASK/CHANGE-TASK-TITLE",taskId:t,newTitle:e,todolistId:n}}(t,e,c))}),[]),u=Object(c.useCallback)((function(t){n(function(t){return{type:"TEST/TODOLIST/REMOVE-TODOLIST",todolistId:t}}(t))}),[]),T=Object(c.useCallback)((function(t){n(function(t){return{type:"TEST/TODOLIST/ADD-TODOLIST",title:t,todolistId:Object(j.a)()}}(t))}),[]),O=Object(c.useCallback)((function(t,e){n(function(t,e){return{type:"TEST/TODOLIST/CHANGE-TODOLIST-TITLE",todolistId:t,newTitle:e}}(t,e))}),[]);return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(d,{addItem:T}),t.map((function(t){var n=e[t.id];return Object(r.jsx)(l,{id:t.id,title:t.title,tasks:n,removeTask:i,addTask:a,changeTasksStatus:o,removeTodolist:u,changeTaskTitle:s,changeTodolistTitle:O},t.id)}))]})},E=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,28)).then((function(e){var n=e.getCLS,c=e.getFID,i=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),c(t),i(t),a(t),o(t)}))},v=n(13),D=Object(v.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"TEST/TASKS/REMOVE-TASK":var n=Object(I.a)({},t),c=n[e.todolistId];return n[e.todolistId]=c.filter((function(t){return t.id!==e.taskId})),n;case"TEST/TASK/ADD-TASK":var i=Object(I.a)({},t),a=i[e.todolistId],o={id:Object(j.a)(),title:e.taskTitle,isDone:!1};return i[e.todolistId]=[o].concat(Object(O.a)(a)),i;case"TEST/TASK/CHANGE-TASK-STATUS":var s=Object(I.a)({},t),r=s[e.todolistId],d=r.map((function(t){return t.id===e.taskId?Object(I.a)(Object(I.a)({},t),{},{isDone:e.newIsDone}):t}));return s[e.todolistId]=d,s;case"TEST/TASK/CHANGE-TASK-TITLE":var u=Object(I.a)({},t),T=u[e.todolistId],l=T.map((function(t){return t.id===e.taskId?Object(I.a)(Object(I.a)({},t),{},{title:e.newTitle}):t}));return u[e.todolistId]=l,u;case"TEST/TODOLIST/ADD-TODOLIST":return Object(I.a)(Object(I.a)({},t),{},Object(S.a)({},e.todolistId,[]));case"TEST/TODOLIST/REMOVE-TODOLIST":var b=Object(I.a)({},t);return delete b[e.todolistId],b;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"TEST/TODOLIST/REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.todolistId}));case"TEST/TODOLIST/ADD-TODOLIST":return[{id:e.todolistId,title:e.title}].concat(Object(O.a)(t));case"TEST/TODOLIST/CHANGE-TODOLIST-TITLE":var n=t.find((function(t){return t.id===e.todolistId}));return n&&(n.title=e.newTitle),Object(O.a)(t);default:return t}}}),g=Object(v.b)(D);o.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(f.a,{store:g,children:Object(r.jsx)(h,{})})}),document.getElementById("root")),E()}},[[26,1,2]]]);
//# sourceMappingURL=main.45a38c48.chunk.js.map