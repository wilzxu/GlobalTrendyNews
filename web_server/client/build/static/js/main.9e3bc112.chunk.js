(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{157:function(e,t,a){e.exports=a(310)},162:function(e,t,a){},163:function(e,t,a){},305:function(e,t,a){},306:function(e,t,a){},307:function(e,t,a){},310:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(37),s=a.n(o),l=a(20),i=a(14),c=a(27),u=a(26),m=a(28),p=(a(162),function(){function e(){Object(l.a)(this,e)}return Object(i.a)(e,null,[{key:"authenticateUser",value:function(e,t){localStorage.setItem("token",e),localStorage.setItem("email",t)}},{key:"isUserAuthenticated",value:function(){return null!==localStorage.getItem("token")}},{key:"deauthenticateUser",value:function(){localStorage.removeItem("token"),localStorage.removeItem("email")}},{key:"getToken",value:function(){return localStorage.getItem("token")}},{key:"getEmail",value:function(){return localStorage.getItem("email")}}]),e}()),h=(a(163),a(337)),d=a(339),f=a(340),w=a(342),g=a(341),E=a(338),v=a(343),b=a(357),y=a(344),k=a(345),j=a(346),S=a(347),C=a(348),O=a(349),N=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"redirectToUrl",value:function(e,t){t.preventDefault(),window.open(e,"_blank")}},{key:"render",value:function(){var e=this;return r.a.createElement(h.a,{className:"card"},r.a.createElement(E.a,null,r.a.createElement(d.a,{component:"img",height:"320",image:this.props.news.urlToImage}),r.a.createElement(f.a,null,r.a.createElement(g.a,{gutterBottom:!0,variant:"h4",component:"h2"},this.props.news.title),null!=this.props.news.source&&r.a.createElement(b.a,{label:this.props.news.source,color:"primary"}),"\xa0 \xa0",null!=this.props.news.reason&&r.a.createElement(b.a,{label:this.props.news.reason,color:"secondary"}),"\xa0 \xa0",null!=this.props.news.time&&r.a.createElement(b.a,{label:this.props.news.time,variant:"outlined",color:"primary"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(g.a,{component:"p"},this.props.news.description))),r.a.createElement(w.a,null,r.a.createElement(v.a,{size:"small",color:"primary",onClick:function(t){return e.redirectToUrl(e.props.news.url,t)}},"Learn More"),r.a.createElement(y.a,{url:this.props.news.url,quote:this.props.news.title},r.a.createElement(k.a,{size:24,round:!0})),r.a.createElement(j.a,{url:this.props.news.url,quote:this.props.news.title},r.a.createElement(S.a,{size:24,round:!0})),r.a.createElement(C.a,{url:this.props.news.url,quote:this.props.news.title},r.a.createElement(O.a,{size:24,round:!0}))))}}]),t}(r.a.Component),U=a(150),T=a(7),_=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"onClick",value:function(e){this.props.handleNodeClick(e);var t=1+60/Math.hypot(e.x,e.y,e.z);this.fg.cameraPosition({x:e.x*t,y:e.y*t,z:e.z*t},e,3e3)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(U.a,{ref:function(t){e.fg=t},width:.6*window.innerWidth,backgroundColor:"white",linkColor:function(e){return"#0a6aee"},graphData:this.props.graphData,linkWidth:function(e){return.5},onNodeClick:function(t){return e.onClick(t)},nodeThreeObject:function(e){var t=e.news,a=(new T.TextureLoader).load(t.urlToImage),n=new T.SpriteMaterial({map:a}),r=new T.Sprite(n);return r.scale.set(21,14,1),r}}))}}]),t}(r.a.Component),q=a(350),F=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={data:{},focused_news:{},loaded:!1},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.loadNews()}},{key:"loadNews",value:function(){var e=this,t="http://"+window.location.hostname+"/news",a=new Request(t,{method:"GET",headers:{Authorization:"bearer "+p.getToken()}});fetch(a).then(function(e){return e.json()}).then(function(t){e.setState({data:t,focused_news:t.focused_news,loaded:!0})})}},{key:"generateGraphData",value:function(e){return{nodes:e.news.map(function(e){return{id:e.digest,news:e}}),links:e.graph.links.map(function(e){return{source:e.from,target:e.to}})}}},{key:"handleNodeClick",value:function(e){this.setState({focused_news:e.news})}},{key:"render",value:function(){var e=this;if(!this.state.loaded)return r.a.createElement("div",null,r.a.createElement("p",null,"Loading..."));var t=this.generateGraphData(this.state.data);return r.a.createElement("div",null,r.a.createElement(q.a,{container:!0},r.a.createElement(q.a,{item:!0,md:8},r.a.createElement(_,{graphData:t,handleNodeClick:function(t){return e.handleNodeClick(t)}})),r.a.createElement(q.a,{item:!0,md:4},r.a.createElement(N,{news:this.state.focused_news}))))}}]),t}(r.a.Component),W=(a(305),a(351)),D=a(356),I=a(355),A=a(151),x=function(e){var t=e.onSubmit,a=e.onChange,n=e.error;return r.a.createElement("div",{className:"login-panel"},r.a.createElement(A.a,{className:"paper"},r.a.createElement(g.a,{component:"h1",variant:"h4"},"Sign in"),r.a.createElement("form",{onSubmit:t},n&&r.a.createElement("p",{className:"error-message"},n),r.a.createElement(W.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"email"},"Email Address"),r.a.createElement(D.a,{id:"email",name:"email",autoComplete:"email",autoFocus:!0,onChange:a})),r.a.createElement(W.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"password"},"Password"),r.a.createElement(D.a,{name:"password",type:"password",id:"password",autoComplete:"current-password",onChange:a})),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(v.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary"},"Sign in"))))},z=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={error:"",user:{email:"",password:""}},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"processForm",value:function(e){var t=this;e.preventDefault();var a=this.state.user.email,n=this.state.user.password;console.log("response"),console.log("email:",a),console.log("password:",n);var r="http://"+window.location.hostname+"/auth/login",o=new Request(r,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:this.state.user.email,password:this.state.user.password})});fetch(o).then(function(e){200===e.status?(t.setState({error:""}),e.json().then(function(e){p.authenticateUser(e.token,a),window.location.replace("/")})):(console.log("Login failed"),e.json().then(function(e){var a=e.error?e.error:"";t.setState({error:a})}))})}},{key:"changeUser",value:function(e){var t=e.target.name,a=this.state.user;a[t]=e.target.value,this.setState({user:a})}},{key:"render",value:function(){var e=this;return r.a.createElement(x,{onSubmit:function(t){return e.processForm(t)},onChange:function(t){return e.changeUser(t)},error:this.state.error})}}]),t}(r.a.Component),P=(a(306),function(e){var t=e.onSubmit,a=e.onChange,n=e.error;return r.a.createElement("div",{className:"signup-panel"},r.a.createElement(A.a,{className:"paper"},r.a.createElement(g.a,{component:"h1",variant:"h4"},"Sign Up"),r.a.createElement("form",{onSubmit:t},n&&r.a.createElement("p",{className:"error-message"},n),r.a.createElement(W.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"email"},"Email Address"),r.a.createElement(D.a,{id:"email",name:"email",autoComplete:"email",autoFocus:!0,onChange:a})),r.a.createElement(W.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"password"},"Password"),r.a.createElement(D.a,{name:"password",type:"password",id:"password",autoComplete:"current-password",onChange:a})),r.a.createElement(W.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"password"},"Confirm Password"),r.a.createElement(D.a,{name:"confirm_password",type:"password",id:"confirm_password",autoComplete:"current-password",onChange:a})),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(v.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary"},"Sign Up"))))}),L=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={error:"",user:{email:"",password:"",confirm_password:""}},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"processForm",value:function(e){var t=this;e.preventDefault();var a=this.state.user.email,n=this.state.user.password,r=this.state.user.confirm_password;console.log("email:",a),console.log("password",n),console.log("confirm_password",r);var o="http://"+window.location.hostname+"/auth/signup",s=new Request(o,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:this.state.user.email,password:this.state.user.password})});fetch(s).then(function(e){200===e.status?(t.setState({error:""}),window.location.replace("/")):e.json().then(function(e){console.log(e);var a=e.error?e.error:"";t.setState({error:a})})})}},{key:"changeUser",value:function(e){var t=e.target.name,a=this.state.user;a[t]=e.target.value,this.setState({user:a});var n=this.state.error;n=this.state.user.password!==this.state.user.confirm_password?"Password and confirm password don't match.":"",this.setState({error:n})}},{key:"render",value:function(){var e=this;return r.a.createElement(P,{onSubmit:function(t){return e.processForm(t)},onChange:function(t){return e.changeUser(t)},error:this.state.error})}}]),t}(r.a.Component),B=a(352),M=a(353),J=a(354),G=a(149),R=a.n(G),$=a(40),H=a(67),K=(a(307),Object($.e)(function(e){var t=e.history;return r.a.createElement("div",{className:"root"},r.a.createElement(B.a,{position:"static",className:"appBar"},r.a.createElement(M.a,{variant:"dense"},r.a.createElement(J.a,{className:"menuButton",color:"inherit","aria-label":"Menu"},r.a.createElement(R.a,null)),r.a.createElement(g.a,{variant:"h6",color:"inherit",className:"grow"},"Trendy App"),p.isUserAuthenticated()?r.a.createElement("div",null,p.getEmail(),r.a.createElement(v.a,{color:"inherit",href:"/logout",onClick:function(e){return function(e,t){e.preventDefault(),p.deauthenticateUser(),console.log(p.localStorage),t.push("/login")}(e,t)}},"Log out")):r.a.createElement("div",null,r.a.createElement(v.a,{color:"inherit",component:H.b,to:"/login"},"Log in"),r.a.createElement(v.a,{color:"inherit",component:H.b,to:"/signup"},"Sign up")))),r.a.createElement("br",null),r.a.createElement($.a,{exact:!0,path:"/",render:function(){return p.isUserAuthenticated()?r.a.createElement(F,null):r.a.createElement(z,null)}}),r.a.createElement($.a,{exact:!0,path:"/login",component:z}),r.a.createElement($.a,{exact:!0,path:"/signup",component:L}))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(H.a,null,r.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[157,1,2]]]);
//# sourceMappingURL=main.9e3bc112.chunk.js.map