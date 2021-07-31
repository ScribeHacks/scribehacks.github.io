var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function s(e){e.forEach(t)}function i(e){return"function"==typeof e}function l(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function a(e,t,n,s){return e[1]&&s?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](s(t))):n.ctx}function o(e,t,n,s,i,l,o){const c=function(e,t,n,s){if(e[2]&&s){const i=e[2](s(n));if(void 0===t.dirty)return i;if("object"==typeof i){const e=[],n=Math.max(t.dirty.length,i.length);for(let s=0;s<n;s+=1)e[s]=t.dirty[s]|i[s];return e}return t.dirty|i}return t.dirty}(t,s,i,l);if(c){const i=a(t,n,s,o);e.p(i,c)}}function c(e,t){e.appendChild(t)}function r(e,t,n){e.insertBefore(t,n||null)}function u(e){e.parentNode.removeChild(e)}function d(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function m(e){return document.createElement(e)}function h(e){return document.createTextNode(e)}function g(){return h(" ")}function p(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function f(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}let v;function b(e){v=e}function $(e){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(e)}const w=[],y=[],k=[],x=[],j=Promise.resolve();let H=!1;function M(e){k.push(e)}let S=!1;const C=new Set;function A(){if(!S){S=!0;do{for(let e=0;e<w.length;e+=1){const t=w[e];b(t),P(t.$$)}for(b(null),w.length=0;y.length;)y.pop()();for(let e=0;e<k.length;e+=1){const t=k[e];C.has(t)||(C.add(t),t())}k.length=0}while(w.length);for(;x.length;)x.pop()();H=!1,S=!1,C.clear()}}function P(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(M)}}const T=new Set;let _;function q(){_={r:0,c:[],p:_}}function z(){_.r||s(_.c),_=_.p}function L(e,t){e&&e.i&&(T.delete(e),e.i(t))}function W(e,t,n,s){if(e&&e.o){if(T.has(e))return;T.add(e),_.c.push((()=>{T.delete(e),s&&(n&&e.d(1),s())})),e.o(t)}}function E(e){e&&e.c()}function I(e,n,l){const{fragment:a,on_mount:o,on_destroy:c,after_update:r}=e.$$;a&&a.m(n,l),M((()=>{const n=o.map(t).filter(i);c?c.push(...n):s(n),e.$$.on_mount=[]})),r.forEach(M)}function B(e,t){const n=e.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function F(e,t){-1===e.$$.dirty[0]&&(w.push(e),H||(H=!0,j.then(A)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function D(t,i,l,a,o,c,r=[-1]){const d=v;b(t);const m=i.props||{},h=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:o,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:r,skip_bound:!1};let g=!1;if(h.ctx=l?l(t,m,((e,n,...s)=>{const i=s.length?s[0]:n;return h.ctx&&o(h.ctx[e],h.ctx[e]=i)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](i),g&&F(t,e)),n})):[],h.update(),g=!0,s(h.before_update),h.fragment=!!a&&a(h.ctx),i.target){if(i.hydrate){const e=function(e){return Array.from(e.childNodes)}(i.target);h.fragment&&h.fragment.l(e),e.forEach(u)}else h.fragment&&h.fragment.c();i.intro&&L(t.$$.fragment),I(t,i.target,i.anchor),A()}b(d)}class N{$destroy(){B(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function O(e){let t;return{c(){t=m("div"),t.innerHTML='<a class="nav-link svelte-14ewlvb" href="#about">About</a> \n      <a class="nav-link svelte-14ewlvb" href="#faq">FAQ</a> \n      <a class="nav-link svelte-14ewlvb" href="#schedule">Schedule</a> \n      <a class="nav-link svelte-14ewlvb" href="#venue">Map</a> \n      <a class="nav-link svelte-14ewlvb" href="#team">Team</a> \n      <a class="nav-link svelte-14ewlvb" href="#contact">Contact</a>',p(t,"class","collapsable svelte-14ewlvb")},m(e,n){r(e,t,n)},d(e){e&&u(t)}}}function G(t){let n,s,i,l,a,o=!t[0]&&O();return{c(){n=m("nav"),o&&o.c(),s=g(),i=m("button"),i.textContent="☰",p(i,"class","menu-control svelte-14ewlvb"),p(i,"aria-label","Toggle Menu"),p(n,"class","nav svelte-14ewlvb")},m(e,u){var d,m,h,g;r(e,n,u),o&&o.m(n,null),c(n,s),c(n,i),l||(d=i,m="click",h=t[1],d.addEventListener(m,h,g),a=()=>d.removeEventListener(m,h,g),l=!0)},p(e,[t]){e[0]?o&&(o.d(1),o=null):o||(o=O(),o.c(),o.m(n,s))},i:e,o:e,d(e){e&&u(n),o&&o.d(),l=!1,a()}}}function Q(e,t,n){let s=!1;function i(){console.log("hi"),window.innerWidth>768?n(0,s=!1):n(0,s=!0)}return $((()=>{window.addEventListener("resize",i)})),[s,function(){n(0,s=!s)}]}class V extends N{constructor(e){super(),D(this,e,Q,G,l,{})}}function R(t){let n;return{c(){n=m("section"),n.innerHTML='<div class="hero svelte-awv9u4"><div><div class="title svelte-awv9u4"><img src="img/scribehacks/logo.png" alt="ScribeHacks Logo" class="svelte-awv9u4"/> \n        <h1 class="fadeInDown svelte-awv9u4">ScribeHacks I</h1></div> \n\n      <p class="info-group svelte-awv9u4"><span class="subtitle svelte-awv9u4">California Bay Area</span> \n        <span class="subtitle svelte-awv9u4">September 18-19</span> \n        <span class="subtitle svelte-awv9u4">Registrations Open</span></p> \n      <br/> \n      <p><a class="typeform-share button svelte-awv9u4" id="register-cta" href="https://form.typeform.com/to/AnwB5Ngz?typeform-medium=embed-snippet" data-mode="popup" data-size="100" target="_blank">Register</a>  <script>(function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()<\/script></p></div></div>',p(n,"class","section svelte-awv9u4")},m(e,t){r(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class Y extends N{constructor(e){super(),D(this,e,null,R,l,{})}}function Z(t){let n;return{c(){n=m("a"),n.innerHTML='<section class="section about svelte-523h4w"><div class="section-left svelte-523h4w"><h2 class="svelte-523h4w">Write the code of the future.</h2></div> \n  <div class="section-right svelte-523h4w"><p class="svelte-523h4w"><b>Coding gives us the power to make things.</b><br/>\n    Every Facebook, Google, and Microsoft started with just a bit of code, so we want to encourage each person to learn to make something impactful or through technology.</p></div></section>',p(n,"name","about")},m(e,t){r(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class J extends N{constructor(e){super(),D(this,e,null,Z,l,{})}}function K(t){let n,s,i,l,a,o,d,v,b,$,w=t[0].title+"",y=t[0].content+"";return{c(){n=m("details"),s=m("summary"),i=m("span"),l=m("span"),a=h(w),o=g(),d=m("span"),v=g(),b=m("div"),$=m("p"),p(l,"class","title"),p(d,"class","icon svelte-1ct6jij"),p(d,"aria-hidden","true"),p(i,"class","svelte-1ct6jij"),p(s,"class","svelte-1ct6jij"),p(b,"class","content svelte-1ct6jij"),p(n,"class","accordion svelte-1ct6jij")},m(e,t){r(e,n,t),c(n,s),c(s,i),c(i,l),c(l,a),c(i,o),c(i,d),c(n,v),c(n,b),c(b,$),$.innerHTML=y},p(e,[t]){1&t&&w!==(w=e[0].title+"")&&f(a,w),1&t&&y!==(y=e[0].content+"")&&($.innerHTML=y)},i:e,o:e,d(e){e&&u(n)}}}function U(e,t,n){let{faq:s}=t;return e.$$set=e=>{"faq"in e&&n(0,s=e.faq)},[s]}class X extends N{constructor(e){super(),D(this,e,U,K,l,{faq:0})}}function ee(e,t,n){const s=e.slice();return s[1]=t[n],s}function te(t){let n,s;return n=new X({props:{faq:t[1]}}),{c(){E(n.$$.fragment)},m(e,t){I(n,e,t),s=!0},p:e,i(e){s||(L(n.$$.fragment,e),s=!0)},o(e){W(n.$$.fragment,e),s=!1},d(e){B(n,e)}}}function ne(e){let t,n,s,i,l,a,o,h,f=e[0],v=[];for(let t=0;t<f.length;t+=1)v[t]=te(ee(e,f,t));const b=e=>W(v[e],1,1,(()=>{v[e]=null}));return{c(){t=m("a"),n=m("section"),s=m("h2"),s.textContent="Frequently Asked Questions",i=g(),l=m("br"),a=g(),o=m("div");for(let e=0;e<v.length;e+=1)v[e].c();p(s,"class","svelte-19egonz"),p(o,"class","faq svelte-19egonz"),p(n,"class","section svelte-19egonz"),p(t,"name","faq")},m(e,u){r(e,t,u),c(t,n),c(n,s),c(n,i),c(n,l),c(n,a),c(n,o);for(let e=0;e<v.length;e+=1)v[e].m(o,null);h=!0},p(e,[t]){if(1&t){let n;for(f=e[0],n=0;n<f.length;n+=1){const s=ee(e,f,n);v[n]?(v[n].p(s,t),L(v[n],1)):(v[n]=te(s),v[n].c(),L(v[n],1),v[n].m(o,null))}for(q(),n=f.length;n<v.length;n+=1)b(n);z()}},i(e){if(!h){for(let e=0;e<f.length;e+=1)L(v[e]);h=!0}},o(e){v=v.filter(Boolean);for(let e=0;e<v.length;e+=1)W(v[e]);h=!1},d(e){e&&u(t),d(v,e)}}}function se(e){return[[{title:"Who can participate?",content:'We allow those in middle school to join us, but only with parental permission. If you are in college, you are welcome to mentor or give speeches at the hackathon. If you want to be a mentor, you can <a target="_blank" href="https://sohamb117.typeform.com/to/pq7eingx">sign up here</a> or if you want to sponsor you can email us at <a href="mailto:sponsorship@scribehacks.tech">sponsorship@scribehacks.tech</a>'},{title:"What can we make?",content:"At ScribeHacks we want you to pioneer with what you make. While there's no strict guidelines on what you can make, we urge participants to make something that looks towards the future of technology or solves a problem, no matter how small."},{title:"What is a hackathon?",content:"A hackathon is an event where participants use their knowledge and skills to create, develop, design, and create a full product in a certain amount of time. They’re open not just to programmers and engineers, but to anyone who’s interested in working together to find answers to the world’s most pressing problems, or just making something fun."},{title:"What if I can't code?",content:"No matter what your skills are, we'll try to make this event fun for you. We believe that solutions are better when they integrate diverse ways of thinking. There will be many opportunities to learn new skills or ideas at workshops and from the people around you. We’ll also be holding team building events where you can meet new people. Just come eager to learn!"},{title:"Does it cost anything?",content:"ScribeHacks is absolutely free! There is no entry fee, ScribeHacks will provide you with plenty of food, snacks, swag, and prizes throughout the 24 hours. We can provide all of this due to our wonderful sponsors!"},{title:"What should I bring?",content:"Please bring a valid form of identification like a student id or driver's license, a computer (preferably a laptop), chargers, and any hardware you will use for your hack. You can also bring a sleeping bag, pillow, toiletries, and a couple changes of clothes. Food will be provided at the event. No firearms, weapons, alcohol, or illegal drugs are allowed on campus."},{title:"How do I prepare?",content:"While you are not allowed to start coding or making the art for your project until the hackathon starts, you can always find a team, register for the hackathon, make mockups in Figma, XD, Sketch, and get the materials needed to make your project."},{title:"What are the rules?",content:"All participants are expected to follow the Hack Club Code of Conduct to ensure that everyone stays safe and has a fun time. In addition, plagiarism, copying code off the internet, or hardcoding values and not disclosing them, and other dishonesty may disqualify your project."}]]}class ie extends N{constructor(e){super(),D(this,e,se,ne,l,{})}}function le(t){let n;return{c(){n=m("a"),n.innerHTML='<section class="section svelte-m1ibvs"><h2 class="svelte-m1ibvs">Schedule and Activities</h2> \n\n  <div class="schedule svelte-m1ibvs"><ul class="svelte-m1ibvs"><h3>Saturday</h3> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">8:00 AM</div> \n        <div class="col-2">Doors Open, Check In</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">9:00 AM</div> \n        <div class="col-2">Opening Ceremony</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">10:00 AM</div> \n        <div class="col-2">Hacking Begins</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">1:00 PM</div> \n        <div class="col-2">Lunch</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">4:00 PM</div> \n        <div class="col-2">Capture The Flag (Digital)</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">7:00 PM</div> \n        <div class="col-2">Dinner</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">12:00 AM</div> \n        <div class="col-2">Midnight Snack</div> \n        <div class="col-3">Pending</div></li></ul> \n    <ul class="traveller svelte-m1ibvs" aria-hidden="true"><li class="stop svelte-m1ibvs"></li> \n      <li class="stop svelte-m1ibvs"></li> \n      <li class="stop svelte-m1ibvs"></li> \n      <li class="stop svelte-m1ibvs"></li> \n      <li class="stop svelte-m1ibvs"></li> \n      <li class="stop svelte-m1ibvs"></li> \n      <li class="stop svelte-m1ibvs"></li> \n      <li class="stop svelte-m1ibvs"></li></ul> \n    <ul class="svelte-m1ibvs"><h3>Sunday</h3> \n      <li class="schedule-gap svelte-m1ibvs"></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">9:00 AM</div> \n        <div class="col-2">Project Submissions</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-gap svelte-m1ibvs"></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">1:00 PM</div> \n        <div class="col-2">Closing Ceremony</div> \n        <div class="col-3">Pending</div></li> \n      <li class="schedule-gap svelte-m1ibvs"></li> \n      <li class="schedule-item svelte-m1ibvs"><div class="col-1">7:00 PM</div> \n        <div class="col-2">Virtual Afterparty</div> \n        <div class="col-3">Pending</div></li></ul></div></section>',p(n,"name","schedule")},m(e,t){r(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class ae extends N{constructor(e){super(),D(this,e,null,le,l,{})}}function oe(t){let n;return{c(){n=m("a"),n.innerHTML='<section class="section venue svelte-2f8lue"><div class="section-left svelte-2f8lue"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225513.800459859!2d-124.66329873915016!3d37.86226004028482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808583a3a688d7b5%3A0x8c891b8457461fa9!2sSan%20Francisco%20Bay%20Area%2C%20CA!5e0!3m2!1sen!2sus!4v1606525794824!5m2!1sen!2sus" style="border:0" allowfullscreen="" width="100%" height="450" frameborder="0" title="Location of Venue"></iframe></div> \n  <div class="section-right svelte-2f8lue"><h2 class="svelte-2f8lue">Venue</h2> \n    <p class="svelte-2f8lue"><b>Virtual</b>  <br/>\n    Located in the Bay Area. All times are in PST.</p></div></section>',p(n,"name","venue")},m(e,t){r(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class ce extends N{constructor(e){super(),D(this,e,null,oe,l,{})}}function re(e){let t,n,s,i,l,d,v,b,$,w,y,k,x;const j=e[4].default,H=function(e,t,n,s){if(e){const i=a(e,t,n,s);return e[0](i)}}(j,e,e[3],null);return{c(){t=m("section"),n=m("img"),i=g(),l=m("h3"),d=h(e[0]),v=g(),b=m("div"),$=m("p"),w=h(e[1]),y=g(),k=m("p"),H&&H.c(),n.src!==(s=e[2])&&p(n,"src",s),p(n,"alt",e[0]),p(n,"class","svelte-sztrak"),p(l,"class","svelte-sztrak"),p($,"class","pre-reveal svelte-sztrak"),p(k,"class","post-reveal svelte-sztrak"),p(b,"class","text-container svelte-sztrak"),p(t,"class","reveal-item svelte-sztrak")},m(e,s){r(e,t,s),c(t,n),c(t,i),c(t,l),c(l,d),c(t,v),c(t,b),c(b,$),c($,w),c(b,y),c(b,k),H&&H.m(k,null),x=!0},p(e,[t]){(!x||4&t&&n.src!==(s=e[2]))&&p(n,"src",s),(!x||1&t)&&p(n,"alt",e[0]),(!x||1&t)&&f(d,e[0]),(!x||2&t)&&f(w,e[1]),H&&H.p&&8&t&&o(H,j,e,e[3],t,null,null)},i(e){x||(L(H,e),x=!0)},o(e){W(H,e),x=!1},d(e){e&&u(t),H&&H.d(e)}}}function ue(e,t,n){let{$$slots:s={},$$scope:i}=t,{title:l}=t,{tag:a}=t,{imgHref:o}=t;return e.$$set=e=>{"title"in e&&n(0,l=e.title),"tag"in e&&n(1,a=e.tag),"imgHref"in e&&n(2,o=e.imgHref),"$$scope"in e&&n(3,i=e.$$scope)},[l,a,o,i,s]}class de extends N{constructor(e){super(),D(this,e,ue,re,l,{title:0,tag:1,imgHref:2})}}function me(e){let t;return{c(){t=h("[ Placeholder text about scoring ]")},m(e,n){r(e,t,n)},d(e){e&&u(t)}}}function he(e){let t;return{c(){t=h("We put the prizing in your hands. Winners will be allowed to choose prizes from our pool. Higher ranked projects will get first pick. For more details go to the page on it here.")},m(e,n){r(e,t,n)},d(e){e&&u(t)}}}function ge(e){let t;return{c(){t=h("[ Placeholder text about mentor tracks ]")},m(e,n){r(e,t,n)},d(e){e&&u(t)}}}function pe(e){let t,n,s,i,l,a,o,d,h,f,v;return a=new de({props:{title:"Scoring System",tag:"Encouraging Originality and Quality",imgHref:"img/scribehacks/hash.png",$$slots:{default:[me]},$$scope:{ctx:e}}}),d=new de({props:{title:"Prize Pool",tag:"Choose Your Own Prize",imgHref:"img/scribehacks/funding.png",$$slots:{default:[he]},$$scope:{ctx:e}}}),f=new de({props:{title:"Mentor Tracks",tag:"Helping Beginners Start",imgHref:"img/scribehacks/hash.png",$$slots:{default:[ge]},$$scope:{ctx:e}}}),{c(){t=m("a"),n=m("section"),s=m("h2"),s.textContent="How Does It Work?",i=g(),l=m("div"),E(a.$$.fragment),o=g(),E(d.$$.fragment),h=g(),E(f.$$.fragment),p(s,"class","svelte-qs0l0s"),p(l,"class","explainers svelte-qs0l0s"),p(n,"class","section svelte-qs0l0s"),p(t,"name","explainers")},m(e,u){r(e,t,u),c(t,n),c(n,s),c(n,i),c(n,l),I(a,l,null),c(l,o),I(d,l,null),c(l,h),I(f,l,null),v=!0},p(e,[t]){const n={};1&t&&(n.$$scope={dirty:t,ctx:e}),a.$set(n);const s={};1&t&&(s.$$scope={dirty:t,ctx:e}),d.$set(s);const i={};1&t&&(i.$$scope={dirty:t,ctx:e}),f.$set(i)},i(e){v||(L(a.$$.fragment,e),L(d.$$.fragment,e),L(f.$$.fragment,e),v=!0)},o(e){W(a.$$.fragment,e),W(d.$$.fragment,e),W(f.$$.fragment,e),v=!1},d(e){e&&u(t),B(a),B(d),B(f)}}}class fe extends N{constructor(e){super(),D(this,e,null,pe,l,{})}}function ve(e){let t,n,s,i;return{c(){t=h("Q&A and a talk with Zach Latta, the founder of Hack Club. "),n=m("br"),s=g(),i=m("b"),i.textContent="September 18 - 5 PM"},m(e,l){r(e,t,l),r(e,n,l),r(e,s,l),r(e,i,l)},d(e){e&&u(t),e&&u(n),e&&u(s),e&&u(i)}}}function be(e){let t,n,s,i,l,a,o;return a=new de({props:{title:"Zach Latta",tag:"Founding Hack Club",imgHref:"img/scribehacks/zach.png",$$slots:{default:[ve]},$$scope:{ctx:e}}}),{c(){t=m("a"),n=m("section"),s=m("h2"),s.textContent="Event Speakers",i=g(),l=m("div"),E(a.$$.fragment),p(s,"class","svelte-259grs"),p(l,"class","speakers svelte-259grs"),p(n,"class","section svelte-259grs"),p(t,"name","speakers")},m(e,u){r(e,t,u),c(t,n),c(n,s),c(n,i),c(n,l),I(a,l,null),o=!0},p(e,[t]){const n={};1&t&&(n.$$scope={dirty:t,ctx:e}),a.$set(n)},i(e){o||(L(a.$$.fragment,e),o=!0)},o(e){W(a.$$.fragment,e),o=!1},d(e){e&&u(t),B(a)}}}class $e extends N{constructor(e){super(),D(this,e,null,be,l,{})}}function we(t){let n,s,i,l,a,o,d,v,b,$,w,y,k,x,j,H,M,S,C,A=t[0].name+"";return{c(){n=m("li"),s=m("img"),l=g(),a=m("div"),o=m("p"),d=m("b"),v=h(A),b=g(),$=m("div"),w=m("a"),y=m("img"),j=g(),H=m("a"),M=m("img"),p(s,"class","pfp svelte-1yxilpp"),s.src!==(i=t[0].image)&&p(s,"src",i),p(s,"alt","Team Member"),y.src!==(k="/img/social/github.png")&&p(y,"src","/img/social/github.png"),p(y,"alt","GitHub"),p(y,"class","svelte-1yxilpp"),p(w,"href",x=t[0].github),M.src!==(S="/img/social/linkedin.png")&&p(M,"src","/img/social/linkedin.png"),p(M,"alt","LinkedIn"),p(M,"class","svelte-1yxilpp"),p(H,"href",C=t[0].linkedin),p($,"class","socials svelte-1yxilpp"),p(a,"class","info svelte-1yxilpp"),p(n,"class","team-member svelte-1yxilpp")},m(e,t){r(e,n,t),c(n,s),c(n,l),c(n,a),c(a,o),c(o,d),c(d,v),c(a,b),c(a,$),c($,w),c(w,y),c($,j),c($,H),c(H,M)},p(e,[t]){1&t&&s.src!==(i=e[0].image)&&p(s,"src",i),1&t&&A!==(A=e[0].name+"")&&f(v,A),1&t&&x!==(x=e[0].github)&&p(w,"href",x),1&t&&C!==(C=e[0].linkedin)&&p(H,"href",C)},i:e,o:e,d(e){e&&u(n)}}}function ye(e,t,n){let{profile:s}=t;return e.$$set=e=>{"profile"in e&&n(0,s=e.profile)},[s]}class ke extends N{constructor(e){super(),D(this,e,ye,we,l,{profile:0})}}function xe(e,t,n){const s=e.slice();return s[1]=t[n],s}function je(t){let n,s;return n=new ke({props:{profile:t[1]}}),{c(){E(n.$$.fragment)},m(e,t){I(n,e,t),s=!0},p:e,i(e){s||(L(n.$$.fragment,e),s=!0)},o(e){W(n.$$.fragment,e),s=!1},d(e){B(n,e)}}}function He(e){let t,n,s,i,l,a,o,h,f,v=e[0],b=[];for(let t=0;t<v.length;t+=1)b[t]=je(xe(e,v,t));const $=e=>W(b[e],1,1,(()=>{b[e]=null}));return{c(){t=m("a"),n=m("section"),s=m("div"),i=m("h2"),i.textContent="The Team",l=g(),a=m("br"),o=g(),h=m("ul");for(let e=0;e<b.length;e+=1)b[e].c();p(i,"class","svelte-1jgtc8e"),p(h,"class","team-members svelte-1jgtc8e"),p(s,"class","team svelte-1jgtc8e"),p(n,"class","section svelte-1jgtc8e"),p(t,"name","team")},m(e,u){r(e,t,u),c(t,n),c(n,s),c(s,i),c(s,l),c(s,a),c(s,o),c(s,h);for(let e=0;e<b.length;e+=1)b[e].m(h,null);f=!0},p(e,[t]){if(1&t){let n;for(v=e[0],n=0;n<v.length;n+=1){const s=xe(e,v,n);b[n]?(b[n].p(s,t),L(b[n],1)):(b[n]=je(s),b[n].c(),L(b[n],1),b[n].m(h,null))}for(q(),n=v.length;n<b.length;n+=1)$(n);z()}},i(e){if(!f){for(let e=0;e<v.length;e+=1)L(b[e]);f=!0}},o(e){b=b.filter(Boolean);for(let e=0;e<b.length;e+=1)W(b[e]);f=!1},d(e){e&&u(t),d(b,e)}}}function Me(e){return[[{name:"Soham",image:"/img/team/soham.jpg",in:"https://linkedin.com/in/sohamb117/",gh:"https://github.com/sohamb117"},{name:"Kyle",image:"/img/team/kyle.jpg",in:"https://www.linkedin.com/in/sdbagel/",gh:"https://github.com/SDBagel"},{name:"Rohan",image:"/img/team/rohan.jpg",in:"https://linkedin.com/in/bansal-rohan",gh:"https://github.com/rohan-bansal"},{name:"Aparna",image:"/img/team/aparna.jpg",in:"https://www.linkedin.com/in/aparna-prabhakar-a8490a1b1/"},{name:"Ginni",image:"/img/team/ginni.jpg"},{name:"Chenghao",image:"/img/team/chenghao.png",in:"https://www.linkedin.com/in/chenghao-li786/",gh:"https://github.com/chenghaoli36"},{name:"Chloe",image:"/img/team/chloe.jpg",in:"https://www.linkedin.com/in/chloewang55/"},{name:"Pradyun",image:"/img/team/pradyun.png",in:"https://www.linkedin.com/in/pradyun-n-958499b8/",gh:"https://github.com/pradyungn/"}]]}class Se extends N{constructor(e){super(),D(this,e,Me,He,l,{})}}function Ce(t){let n;return{c(){n=m("a"),n.innerHTML='<section class="section"><div class="contact svelte-y4si6b"><h2 class="svelte-y4si6b">Contact Us</h2> \n    <p class="svelte-y4si6b">Send us a message at <a href="mailto:support@scribehacks.tech">support@scribehacks.tech</a> or use this form to submit an inquiry.</p> \n    <form align="center" id="contact-form" action="mailto:support@scribehacks.tech" class="svelte-y4si6b"><input name="subject" type="text" placeholder="Subject..." class="svelte-y4si6b"/><br/> \n      <textarea name="body" placeholder="Message..." class="svelte-y4si6b"></textarea> \n      <input class="button svelte-y4si6b" type="submit" value="Send"/></form></div></section>',p(n,"name","contact")},m(e,t){r(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class Ae extends N{constructor(e){super(),D(this,e,null,Ce,l,{})}}function Pe(t){let n;return{c(){n=m("footer"),n.innerHTML='<p class="social-links svelte-1n92rwb"><a href="https://discord.com"><img src="/img/social/discord.png" alt="Discord" class="svelte-1n92rwb"/></a> \n    <a href="https://github.com/ScribeHacks"><img src="/img/social/github.png" alt="GitHub" class="svelte-1n92rwb"/></a> \n    <a href="https://www.instagram.com/scribehacks/"><img src="/img/social/instagram.png" alt="Instagram" class="svelte-1n92rwb"/></a> \n    <a href="https://twitter.com/scribe_hacks?lang=en"><img src="/img/social/twitter.png" alt="Twitter" class="svelte-1n92rwb"/></a></p> \n  <p>© ScribeHacks I | 2021</p> \n  <p>Fiscally sponsored by <a href="https://hackclub.com">Hack Club,</a> a 501(c)(3) organization.</p>',p(n,"class","section footer svelte-1n92rwb")},m(e,t){r(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class Te extends N{constructor(e){super(),D(this,e,null,Pe,l,{})}}function _e(t){let n,s,i,l,a,o,d,h,p,f,v,b,$,w,y,k,x,j,H,M,S,C,A;return s=new V({}),l=new Y({}),o=new J({}),h=new fe({}),f=new ae({}),b=new ce({}),w=new ie({}),k=new $e({}),j=new Se({}),M=new Ae({}),C=new Te({}),{c(){n=m("main"),E(s.$$.fragment),i=g(),E(l.$$.fragment),a=g(),E(o.$$.fragment),d=g(),E(h.$$.fragment),p=g(),E(f.$$.fragment),v=g(),E(b.$$.fragment),$=g(),E(w.$$.fragment),y=g(),E(k.$$.fragment),x=g(),E(j.$$.fragment),H=g(),E(M.$$.fragment),S=g(),E(C.$$.fragment)},m(e,t){r(e,n,t),I(s,n,null),c(n,i),I(l,n,null),c(n,a),I(o,n,null),c(n,d),I(h,n,null),c(n,p),I(f,n,null),c(n,v),I(b,n,null),c(n,$),I(w,n,null),c(n,y),I(k,n,null),c(n,x),I(j,n,null),c(n,H),I(M,n,null),c(n,S),I(C,n,null),A=!0},p:e,i(e){A||(L(s.$$.fragment,e),L(l.$$.fragment,e),L(o.$$.fragment,e),L(h.$$.fragment,e),L(f.$$.fragment,e),L(b.$$.fragment,e),L(w.$$.fragment,e),L(k.$$.fragment,e),L(j.$$.fragment,e),L(M.$$.fragment,e),L(C.$$.fragment,e),A=!0)},o(e){W(s.$$.fragment,e),W(l.$$.fragment,e),W(o.$$.fragment,e),W(h.$$.fragment,e),W(f.$$.fragment,e),W(b.$$.fragment,e),W(w.$$.fragment,e),W(k.$$.fragment,e),W(j.$$.fragment,e),W(M.$$.fragment,e),W(C.$$.fragment,e),A=!1},d(e){e&&u(n),B(s),B(l),B(o),B(h),B(f),B(b),B(w),B(k),B(j),B(M),B(C)}}}return new class extends N{constructor(e){super(),D(this,e,null,_e,l,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map