(this.webpackJsonpgithubook=this.webpackJsonpgithubook||[]).push([[0],{36:function(e,t,a){e.exports=a(67)},41:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(16),r=a.n(c),i=(a(41),a(42),a(34)),l=a(2),s=a(9),u="SET_CURRENT_USER",m=function(e){return{type:u,payload:e}},h=a(8),g=a.n(h),d=a(15),p=a(12),E=function(e){return g.a.get("https://api.github.com/user",{headers:{Authorization:"token ".concat(e)}})},b=function(e,t){return g.a.get("https://api.github.com/users/".concat(e,"/events"),{headers:{Authorization:"token ".concat(t)}})},f=function(e){var t,a=new Date,n=new Date(e),o=a.getTime()-n.getTime(),c=Math.floor(o/36e5),r=Math.floor(o%36e5/6e4),i=n.getHours(),l=n.getMinutes(),s=!0;return i>12&&(s=!1,i-=12),t=[n.getFullYear()+"\ub144 ",n.getMonth()+1+"\uc6d4 ",n.getDate()+"\uc77c ",["\uc77c\uc694\uc77c ","\uc6d4\uc694\uc77c ","\ud654\uc694\uc77c ","\uc218\uc694\uc77c ","\ubaa9\uc694\uc77c ","\uae08\uc694\uc77c ","\ud1a0\uc694\uc77c "][n.getDay()],s?"\uc624\uc804 ":"\uc624\ud6c4 ",1===String(i).length?"0"+i:i,":",l<10?"0"+l:l],o>864e5?[t]:c>0?[t,c+"\uc2dc\uac04 \uc804"]:[t,r+"\ubd84 \uc804"]},v=function(e){return o.a.createElement("div",{id:"githubook-nav"},o.a.createElement("div",{id:"githubook-nav-side-l"},o.a.createElement("img",{src:"https://img.icons8.com/cotton/40/000000/cat--v3.png",style:{width:"35px",height:"35px"}})),o.a.createElement("div",{id:"githubook-nav-main"},o.a.createElement("ul",{onClick:function(t){document.getElementsByClassName("active")[0].classList.toggle("active"),"IMG"===t.target.tagName&&(e.handleEventType(t.target.parentElement.id),t.target.parentElement.classList.toggle("active")),"LI"===t.target.tagName&&(e.handleEventType(t.target.id),t.target.classList.toggle("active"))},id:"githubook-nav-main-ul",className:"githubook-nav-main-ul"},o.a.createElement("li",{id:"All",className:"githubook-card-date active"},o.a.createElement("img",{src:"https://img.icons8.com/android/24/000000/home.png"}),o.a.createElement("span",{className:"githubook-card-date-tooltips"},"All Events")),o.a.createElement("li",{id:"PushEvent",className:"githubook-card-date"},o.a.createElement("img",{src:"https://img.icons8.com/ios/40/000000/commit-git.png"}),o.a.createElement("span",{className:"githubook-card-date-tooltips"},"Commits")),o.a.createElement("li",{id:"PullRequestEvent",className:"githubook-card-date"},o.a.createElement("img",{src:"https://img.icons8.com/ios/24/000000/pull-request.png"}),o.a.createElement("span",{className:"githubook-card-date-tooltips"},"Pull Requests")),o.a.createElement("li",{id:"IssuesEvent",className:"githubook-card-date"},o.a.createElement("img",{src:"https://img.icons8.com/ios/100/000000/exclamation-mark.png"}),o.a.createElement("span",{className:"githubook-card-date-tooltips"},"Issues")))),o.a.createElement("div",{id:"githubook-nav-side-r"},o.a.createElement("img",{className:"mr-2",src:e.data.avatar_url,style:{width:"30px",height:"30px",borderRadius:"50%"}}),o.a.createElement("span",{className:"mr-4"},e.data.login)))},k=(a(64),function(e,t,a){return o.a.createElement("div",{className:"githubook-menubox"},o.a.createElement("div",{className:"githubook-menubox-icon"},o.a.createElement("img",{className:a,src:e})),o.a.createElement("div",{className:"githubook-menubox-text"},o.a.createElement("span",null,t)))}),y=function(e,t){return o.a.createElement("div",{className:"githubook-card-info-box"},o.a.createElement("div",null,o.a.createElement("img",{src:e,style:{height:"60px",width:"60px"}}),t),o.a.createElement("div",{className:"mt-3"},o.a.createElement("a",{href:"https://github.com/"+t},"\uae43\ud5c8\ube0c - https://github.com/",t)))},w=function(e,t){var a=f(e.created_at),n=[a[0][1],a[0][2],a[0][4],a[0][5],a[0][6],a[0][7]];return o.a.createElement("div",{key:t,className:"githubook-card"},o.a.createElement("div",{className:"githubook-card-title"},o.a.createElement("div",null,o.a.createElement("span",{className:"githubook-card-info"},o.a.createElement("img",{src:e.actor.avatar_url,style:{height:"40px",width:"40px"}}),y(e.actor.avatar_url,e.actor.login))),o.a.createElement("div",null,o.a.createElement("p",{className:"mb-0"},o.a.createElement("span",{className:"githubook-card-info"},e.actor.login," >\xa0 ",y(e.actor.avatar_url,e.actor.login)),o.a.createElement("a",{href:"https://github.com/"+e.repo.name},e.repo.name)),o.a.createElement("p",{className:"mb-0 githubook-card-date"},a[1]?a[1]:n,o.a.createElement("span",{className:"githubook-card-date-tooltips"},a[0])))),o.a.createElement("div",{className:"githubook-card-main"},"- ",e.type,o.a.createElement("hr",null),"PushEvent"===e.type&&o.a.createElement("h5",null,JSON.stringify(e.payload.commits[0].message).split('"')[1]),"IssuesEvent"===e.type&&o.a.createElement("h5",null,JSON.stringify(e.payload.issue.body).split('"')[1])))},N=function(){var e=Object(s.c)((function(e){return e.auth})),t=Object(n.useState)(!1),a=Object(p.a)(t,2),c=a[0],r=a[1],i=Object(n.useState)(),l=Object(p.a)(i,2),u=l[0],m=l[1],h=Object(n.useState)([]),f=Object(p.a)(h,2),N=f[0],_=f[1],j=Object(n.useState)([]),O=Object(p.a)(j,2),x=O[0],S=O[1],q=Object(n.useState)("All"),R=Object(p.a)(q,2),A=R[0],I=R[1];Object(n.useEffect)((function(){E(e.user).then((function(t){var a;m(t.data),b(t.data.login,e.user).then((function(e){S((function(t){return[].concat(Object(d.a)(t),Object(d.a)(e.data))}))})),(a=e.user,g.a.get("https://api.github.com/user/following",{headers:{Authorization:"token ".concat(a)}})).then((function(t){_(t.data),t.data.forEach((function(t){b(t.login,e.user).then((function(e){S((function(t){return[].concat(Object(d.a)(t),Object(d.a)(e.data))}))}))}))}))}))}),[]),Object(n.useEffect)((function(){S((function(e){return e.sort((function(e,t){return new Date(e.created_at)>new Date(t.created_at)?-1:1}))})),console.log(x)}),[x]);return o.a.createElement("div",{id:"githubook-container"},u&&o.a.createElement(o.a.Fragment,null,o.a.createElement(v,{data:u,handleEventType:function(e){I(e)}}),o.a.createElement("div",{id:"githubook-body"},o.a.createElement("div",{id:"githubook-side-l"},[[u.avatar_url,u.login,"circle","/githubook"],["https://img.icons8.com/fluent/48/000000/github.png","\uae43\ud5c8\ube0c","square",u.html_url],["https://img.icons8.com/dotty/50/000000/repository.png","\uc800\uc7a5\uc18c","square",u.repos_url],["https://img.icons8.com/ios-glyphs/50/000000/pet-commands-follow.png","\ud314\ub85c\uc6cc","square",u.followers_url],["https://img.icons8.com/doodle/48/000000/follow--v1.png","\ud314\ub85c\uc789","square",u.following_url]].map((function(e){return o.a.createElement("a",{href:e[2]},k(e[0],e[1],e[2]))})),c?o.a.createElement(o.a.Fragment,null,[["https://img.icons8.com/bubbles/48/000000/list.png","Gist","square",u.gists_url],["https://img.icons8.com/cotton/64/000000/star.png","Star","square",u.starred_url]].map((function(e){return o.a.createElement("a",{href:e[2]},k(e[0],e[1],e[2]))})),o.a.createElement("div",{onClick:function(){return r(!c)}},k("https://img.icons8.com/windows/64/000000/minus.png","\uac04\ub7b5\ud558\uac8c \ubcf4\uae30","square"))):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{onClick:function(){return r(!c)}},k("https://img.icons8.com/windows/48/000000/plus.png","\ub354\ubcf4\uae30","square")))),o.a.createElement("div",{id:"githubook-main"},"All"===A?x.map((function(e,t){return w(e,t)})):x.map((function(e,t){return e.type===A&&w(e,t)}))),o.a.createElement("div",{id:"githubook-side-r"},o.a.createElement("div",{className:"madeinfo"},o.a.createElement("h1",null,"Made By"),o.a.createElement("div",{className:"madeinfo-content"},o.a.createElement("a",{href:"https://github.com/hyeonjaae"},k("https://avatars0.githubusercontent.com/u/34333474?v=4","HyeonJaae","circle"))),o.a.createElement("hr",null)),o.a.createElement("div",{className:"following"},o.a.createElement("h1",null,"Following"),o.a.createElement("div",{className:"following-content"},N.map((function(e){return o.a.createElement("div",{className:""},o.a.createElement("a",null,k(e.avatar_url,e.login,"circle")),y(e.avatar_url,e.login))}))))))))},_=(a(65),function(e){var t=Object(s.b)(),a=Object(s.c)((function(e){return e.auth}));return Object(n.useEffect)((function(){window.location.search.split("=")[1]&&g.a.post("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",{code:window.location.search.split("=")[1],client_id:"504c566c0230964f360d",client_secret:"e6821d09a158291b5704634c2f49052d50a6e278"},{headers:{accept:"application/json"}}).then((function(a){console.log(a),t(m(a.data.access_token)),localStorage.setItem("token",a.data.access_token),e.history.push("/")})).catch((function(e){return console.log(e)}))}),[]),o.a.createElement(o.a.Fragment,null,a.user?o.a.createElement(N,null):o.a.createElement("div",{id:"home-container"},o.a.createElement("a",{href:"https://github.com/login/oauth/authorize?client_id=504c566c0230964f360d&redirect_uri=http://localhost:3000"},"dev"),o.a.createElement("a",{href:"https://github.com/login/oauth/authorize?client_id=504c566c0230964f360d&redirect_uri=https://hyeonjaae.github.io/githubook"},o.a.createElement("img",{src:"https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/276/square_480/github_logo.png",style:{width:"40px",height:"40px"}}),o.a.createElement("img",{src:"https://en.followersnet.com/wp-content/uploads/2016/02/Facebook-1.png",style:{width:"60px",height:"60px"}}))))}),j=function(e){var t=Object(s.b)();return Object(n.useEffect)((function(){g.a.post("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",{code:window.location.search.split("=")[1],client_id:"504c566c0230964f360d",client_secret:"e6821d09a158291b5704634c2f49052d50a6e278"},{headers:{accept:"application/json"}}).then((function(a){console.log(a),t(m(a.data.access_token)),e.history.push("/")})).catch((function(e){return console.log(e)}))}),[]),o.a.createElement("div",{className:"text-center"},o.a.createElement("div",{className:"spinner-border",role:"status"},o.a.createElement("span",{className:"sr-only"},"Loading...")))},O=function(){return Object(s.b)()(m(localStorage.getItem("token"))),o.a.createElement(i.a,{basename:"/githubook"},o.a.createElement(l.a,{exact:!0,path:"/",component:_}),o.a.createElement(l.a,{path:"/login",component:j}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var x=a(10),S=a(35),q={user:{}},R={},A="counter/INCREASE",I="counter/DECREASE",C={count:0},T=Object(x.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u:return{user:t.payload};default:return e}},counter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:return{count:e.count+1};case I:return{count:e.count-1};case"counter/INCREASE_BY":return{count:e.count+t.payload};default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}}}),D=function(e){return function(t){return function(a){console.log("current state",e.getState()),console.log("action",a);var n=t(a);return console.log("next state",e.getState()),console.log("\n"),n}}},F=[S.a,D],M=Object(x.e)(T,{},Object(x.d)(x.a.apply(void 0,F)));r.a.render(o.a.createElement(s.a,{store:M},o.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.fc726b1a.chunk.js.map