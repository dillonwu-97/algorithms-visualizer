(this["webpackJsonpalgorithms-visualizer"]=this["webpackJsonpalgorithms-visualizer"]||[]).push([[0],[,,,,,function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return a}));r(0);function n(e,t,r,n,a){for(var c=[[r,n]];r!=e||n!=t;){c.push(a[r][n]);var o=r,u=n;r=a[o][u][0],n=a[o][u][1]}return c}function a(e,t){for(var r=new Array(e),n=0;n<e;n++)r[n]=new Array(t).fill(0);return r}},function(e,t,r){"use strict";r.d(t,"c",(function(){return n})),r.d(t,"d",(function(){return a})),r.d(t,"e",(function(){return c})),r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return u}));r(0);function n(e){for(var t=0;t<9;t++)for(var r=0;r<9;r++)if(0==e[t][r])return[t,r];return[-1,-1]}function a(e,t,r,n){for(var a=0;a<9;a++)if(e[t][a]==n)return!1;for(var c=0;c<9;c++)if(e[c][r]==n)return!1;for(var o=3*Math.floor(t/3),u=3*Math.floor(r/3),l=o;l<o+3;l++)for(var i=u;i<u+3;i++)if(e[l][i]==n)return!1;return!0}function c(e){for(var t,r,n=e.length-1;n>0;n--)t=Math.floor(Math.random()*(n+1)),r=e[n],e[n]=e[t],e[t]=r;return e}function o(){for(var e=new Array(9),t=0;t<9;t++)e[t]=new Array(9).fill(0);return e}function u(e){for(var t=0;t<9;t++)console.log(e[t].toString())}},,,,,function(e,t,r){(function(e){e.rc=31,e.cc=51,e.si=15,e.sj=20,e.ei=15,e.ej=30}).call(this,r(3))},,,,,,,,function(e,t,r){"use strict";(function(e){r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return c}));var n=r(9),a=r(6);r(20);function c(t){for(var r=[],n=0;n<9;n++)for(var c=0;c<9;c++)r.push([n,c]);r=Object(a.e)(r);for(var o=0,l=0;l<r.length;l++){e.total_solutions=0,o=t[r[l][0]][r[l][1]],t[r[l][0]][r[l][1]]=0,1==u(t.map((function(e){return e.slice()})),0)&&(t[r[l][0]][r[l][1]]=o)}return t}function o(){var e=Object(a.a)(),t=Object(n.a)(Array(10).keys());t.splice(t.indexOf(0),1);for(var r=[0,3,3,6,6,9],c=0,o=0;o<r.length;o+=2){c=0,t=Object(a.e)(t);for(var l=r[o];l<r[o+1];l++)for(var i=r[o];i<r[o+1];i++)e[l][i]=t[c],c++}return u(e,1),Object(a.b)(e),e}function u(t,r){var n,c,o;if(n=(o=Object(a.c)(t))[0],c=o[1],-1==n)return e.total_solutions++,1==r||e.total_solutions>=2;for(var l=1;l<10;l++)if(Object(a.d)(t,n,c,l)){if(t[n][c]=l,u(t,r))return!0;t[n][c]=0,e.backtrack_count++}return!1}}).call(this,r(3))},function(e,t,r){(function(e){e.backtrack_count=0,e.values=[],e.total_solutions=0}).call(this,r(3))},,,,function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return a}));r(0);var n=r(6);r(20);function a(t,r){var c,o,u;if(c=(u=Object(n.c)(t))[0],o=u[1],-1==c)return!0;for(var l=1;l<10;l++)if(Object(n.d)(t,c,o,l)){if(t[c][o]=l,1==r&&e.values.push([c,o,l]),a(t,r))return!0;t[c][o]=0,1==r&&e.values.push([c,o,0,1]),e.backtrack_count++}return!1}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return c}));var n=r(9),a=(r(0),r(6));r(20);function c(t,r){var u,l,i,s;if(u=(i=Object(a.c)(t))[0],l=i[1],-1==u)return!0;for(var f=1;f<10;f++)if(Object(a.d)(t,u,l,f)){if(t[u][l]=f,s=o(t,u,l,f),1==r&&(e.values.push([u,l,f]),e.values=[].concat(Object(n.a)(e.values),Object(n.a)(s))),c(t,r))return!0;t[u][l]=0;for(var d=0;d<s.length;d++)t[s[d][0]][s[d][1]]=0,1==r&&e.values.push([s[d][0],s[d][1],0]);1==r&&e.values.push([u,l,0,1]),e.backtrack_count++}return!1}function o(e,t,r,c){var o,u,l=[[0,3,0,3],[3,6,0,3],[6,9,0,3],[0,3,3,6],[3,6,3,6],[6,9,3,6],[0,3,6,9],[3,6,6,9],[6,9,6,9]],i=[];e[t][r]=c;var s=new Set(Object(n.a)(Array(10).keys()));s.delete(0);for(var f=1,d=function(){f=0;for(var t=Object(n.a)(Array(9)).map((function(e){return Array(9).fill(0)})),r=0;r<l.length;r++)for(var c=function(c){for(var d=function(d){if(0==e[c][d]){o=new Set;for(var v=0;v<9;v++)0!=e[c][v]&&o.add(e[c][v]),0!=e[v][d]&&o.add(e[v][d]);for(var h=l[r][0];h<l[r][1];h++)for(var m=l[r][2];m<l[r][3];m++)0!=e[h][m]&&o.add(e[h][m]);t[c][d]=Object(n.a)(o),t[c][d]=new Set(Object(n.a)(s).filter((function(e){return!t[c][d].includes(e)}))),1==t[c][d].size&&(u=t[c][d].values().next().value,Object(a.d)(e,c,d,u)&&(i.push([c,d,u]),e[c][d]=u,f=1))}},v=l[r][2];v<l[r][3];v++)d(v)},d=l[r][0];d<l[r][1];d++)c(d)};1==f;)d();return i}}).call(this,r(3))},,,,,function(e,t,r){},,,,function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return A}));var n=r(23),a=r.n(n),c=r(35),o=r(12),u=r(13),l=r(4),i=r(15),s=r(14),f=r(0),d=r.n(f),v=r(36),h=r(37),m=r(38),p=r(39),b=r(40),g=r(41),k=r(42),y=r(43),E=r(44),w=r(45),j=(r(11),r(31),r(60),r(61),r(30),r(64),e.rc),O=e.cc,_=15,M=20,z=15,N=30,S=[],A=function(e){Object(i.a)(r,e);var t=Object(s.a)(r);function r(e){var n;return Object(o.a)(this,r),(n=t.call(this)).state={start_end:0},n.handleSearch=n.handleSearch.bind(Object(l.a)(n)),n.startEnd=n.startEnd.bind(Object(l.a)(n)),n.createWall=n.createWall.bind(Object(l.a)(n)),n.reset=n.reset.bind(Object(l.a)(n)),n.make_maze=n.make_maze.bind(Object(l.a)(n)),n.dark_maze=n.dark_maze.bind(Object(l.a)(n)),n}return Object(u.a)(r,[{key:"create_cell",value:function(){return{type:"",weight:1}}},{key:"handleSearch",value:function(e,t,r,n,a,c){for(var o=this,u=0;u<a.length;u++)a[u]=a[u].toString();var l,i=Array.from(new Set(a));switch(c){case"bfs":l=Object(h.a)(e,t,r,n,i);break;case"dfs":l=Object(m.a)(e,t,r,n,i);break;case"greedy":l=Object(p.a)(e,t,r,n,i);break;case"astar":l=Object(b.a)(e,t,r,n,i);break;case"dijkstra":l=Object(g.a)(e,t,r,n,i)}this.reset_paths();var s=this.animate_pathfind(l);void 0!=l[l.length-1][0][0]&&setTimeout((function(){o.animate_backtrack(l[l.length-1])}),s)}},{key:"animate_pathfind",value:function(e){for(var t=function(t){var r="cell-"+e[t][0]+"-"+e[t][1];return"cell cell-start"==document.getElementById(r).className||"cell cell-finish"==document.getElementById(r).className?"continue":void setTimeout((function(){document.getElementById(r).className="cell cell-visited"}),10*t)},r=0;r<e.length-1;r++)t(r);return 10*e.length}},{key:"animate_backtrack",value:function(e){for(var t=function(t){var r=e[t][0],n=e[t][1];if(r==_&&n==M)return"continue";if(r==z&&n==N)return"continue";var a="cell-"+r+"-"+n;setTimeout((function(){document.getElementById(a).className="cell cell-backtrack"}),50*t)},r=0;r<e.length;r++)t(r)}},{key:"animate_maze",value:function(){for(var e=function(e){var t="cell-"+S[e][0]+"-"+S[e][1];setTimeout((function(){document.getElementById(t).className="cell cell-wall"}),5*e)},t=0;t<S.length;t++)e(t)}},{key:"dark_animate_maze",value:function(e){for(var t=function(t){var r="cell-"+e[t][0]+"-"+e[t][1];setTimeout((function(){document.getElementById(r).className="cell "}),5*t)},r=0;r<e.length;r++)t(r)}},{key:"createWall",value:function(e){if(e.shiftKey){var t=e.currentTarget.id;parseInt(document.getElementById(t).getAttribute("row")),parseInt(document.getElementById(t).getAttribute("col"));document.getElementById(t).className="cell cell-wall";var r=t.split("-")[1],n=t.split("-")[2];S.push([r,n])}}},{key:"make_maze",value:function(){var e=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.reset();case 2:S=Object(k.a)(),this.animate_maze();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"dark_maze",value:function(e){var t;switch(this.darken(),e){case"kruskal":t=Object(y.a)();break;case"prim":t=Object(E.a)();break;case"wilson":t=Object(w.a)()}S=t.walls,this.dark_animate_maze(t.maze)}},{key:"startEnd",value:function(e){var t=e.currentTarget.id,r=parseInt(document.getElementById(t).getAttribute("row")),n=parseInt(document.getElementById(t).getAttribute("col"));0==this.state.start_end?(document.getElementById("cell-"+_+"-"+M).className="cell ",document.getElementById(t).className="cell cell-start",this.setState({start_end:1}),_=r,M=n):(document.getElementById("cell-"+z+"-"+N).className="cell ",document.getElementById(t).className="cell cell-finish",this.setState({start_end:0}),z=r,N=n)}},{key:"darken",value:function(){for(var e=0;e<j;e++)for(var t=0;t<O;t++){var r="cell-"+e+"-"+t;document.getElementById(r).className="cell cell-wall"}}},{key:"reset",value:function(){for(var e=0;e<j;e++)for(var t=0;t<O;t++){var r="cell-"+e+"-"+t;document.getElementById(r).className="cell "}S=[]}},{key:"reset_paths",value:function(){for(var e=0;e<j;e++)for(var t=0;t<O;t++){var r="cell-"+e+"-"+t;"cell cell-visited"!=document.getElementById(r).className&&"cell cell-backtrack"!=document.getElementById(r).className||(document.getElementById(r).className="cell ")}}},{key:"render",value:function(){for(var e=this,t=[],r=0;r<j;r++){for(var n=[],a=0;a<O;a++)n.push(0);t.push(n)}return d.a.createElement("div",{className:"parent"},d.a.createElement("div",{className:"grid"},d.a.createElement("div",{className:"wrapper"},t.map((function(t,r){return d.a.createElement("div",{className:"row"},t.map((function(t,n){var a=e.create_cell(),c=a.type,o=a.weight;return r==_&&n==M?c="cell-start":r==z&&n==N&&(c="cell-finish"),d.a.createElement(v.a,{element_id:"cell-"+r+"-"+n,type:c,weight:o,row:r,col:n,onMouseMove:e.createWall,onClick:e.startEnd})})))})))),d.a.createElement("div",null),d.a.createElement("div",{class:"container"},d.a.createElement("div",{id:"pathfinder-dropdown",class:"row text-center"},d.a.createElement("div",{class:"col-4"},d.a.createElement("div",{class:"dropdown"},d.a.createElement("button",{class:"btn btn-secondary dropdown-toggle",className:"algorithms-button",type:"button","data-toggle":"dropdown"},"Select Algorithm"),d.a.createElement("div",{class:"dropdown-menu"},["bfs","dfs","greedy","astar","dijkstra"].map((function(t){return d.a.createElement("div",null,d.a.createElement("a",{class:"dropdown-item",className:"algorithms-menu",onClick:function(){return e.handleSearch(_,M,z,N,S,t)}},"Visualize ",t),d.a.createElement("div",{class:"dropdown-divider"}))}))))),d.a.createElement("div",{class:"col-4"},d.a.createElement("button",{type:"button",class:"btn btn-outline-secondary",className:"btn-xlarge",id:"reset button",onClick:function(){return e.reset()}},"Reset")),d.a.createElement("div",{class:"col-4"},d.a.createElement("div",{class:"dropdown"},d.a.createElement("button",{class:"btn btn-secondary dropdown-toggle",className:"maze-button",type:"button","data-toggle":"dropdown"},"Select Maze"),d.a.createElement("div",{class:"dropdown-menu"},d.a.createElement("div",null,d.a.createElement("a",{class:"dropdown-item",className:"maze-menu",onClick:this.make_maze},"General Maze"),d.a.createElement("div",{class:"dropdown-divider"})),["kruskal","prim","wilson"].map((function(t){return d.a.createElement("div",null,d.a.createElement("a",{class:"dropdown-item",className:"maze-menu",onClick:function(){return e.dark_maze(t)}},t," maze"),d.a.createElement("div",{class:"dropdown-divider"}))}))))))))}}]),r}(f.Component)}).call(this,r(3))},,function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(12),a=r(13),c=r(15),o=r(14),u=r(0),l=r.n(u),i=(r(30),function(e){Object(c.a)(r,e);var t=Object(o.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){var e=this.props,t=e.element_id,r=e.type,n=(e.weight,e.row),a=e.col,c=e.onClick,o=(e.onMouseDown,e.onMouseUp,e.onMouseMove);return l.a.createElement("div",{id:t,row:n,col:a,className:"cell "+r,onClick:c,onMouseMove:o})}}]),r}(u.Component))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return a}));r(0);var n=r(5);r(11);function a(t,r,a,c,o){var u,l=[],i=e.rc,s=e.cc,f=Object(n.b)(i,s);l.push({coord:[t,r],count:0,prev:[t,r]});for(var d=[];0!=l.length;){var v=(u=l.shift()).coord[0],h=u.coord[1];if(!o.includes([v,h].toString())){if(d.push([v,h]),f[v][h]=u.prev,v==a&&h==c){console.log("bfs count: ",u.count),d.push(Object(n.a)(t,r,a,c,f));break}v>0&&0==f[v-1][h]&&(l.push({coord:[v-1,h],count:u.count+1,prev:u.coord}),f[v-1][h]=1),h>0&&0==f[v][h-1]&&(l.push({coord:[v,h-1],count:u.count+1,prev:u.coord}),f[v][h-1]=1),v<i-1&&0==f[v+1][h]&&(l.push({coord:[v+1,h],count:u.count+1,prev:u.coord}),f[v+1][h]=1),h<s-1&&0==f[v][h+1]&&(l.push({coord:[v,h+1],count:u.count+1,prev:u.coord}),f[v][h+1]=1)}}return d}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return a}));r(0);var n=r(5);r(11);function a(t,r,a,c,o){var u,l=[],i=e.rc,s=e.cc,f=Object(n.b)(i,s);l.push({coord:[t,r],count:0,prev:[t,r]});for(var d=[];0!=l.length;){var v=(u=l.pop()).coord[0],h=u.coord[1];if(!o.includes([v,h].toString())&&0==f[v][h]){if(d.push([v,h]),f[v][h]=u.prev,v==a&&h==c){d.push(Object(n.a)(t,r,a,c,f));break}v<i-1&&0==f[v+1][h]&&l.push({coord:[v+1,h],count:u.count+1,prev:u.coord}),h>0&&0==f[v][h-1]&&l.push({coord:[v,h-1],count:u.count+1,prev:u.coord}),v>0&&0==f[v-1][h]&&l.push({coord:[v-1,h],count:u.count+1,prev:u.coord}),h<s-1&&0==f[v][h+1]&&l.push({coord:[v,h+1],count:u.count+1,prev:u.coord})}}return d}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return c}));r(0);var n=r(5),a=(r(11),r(22));function c(t,r,c,u,l){var i,s,f=function(e,t){return e[0]<t[0]},d=e.rc,v=e.cc,h=[],m=Object(n.b)(d,v);a.push(h,[0,{coord:[t,r],count:0,prev:[t,r]}],f);for(var p=[];0!=h.length;){var b=(i=a.pop(h,f)[1]).coord[0],g=i.coord[1];if(!l.includes([b,g].toString())){if(p.push([b,g]),m[b][g]=i.prev,b==c&&g==u){p.push(Object(n.a)(t,r,c,u,m));break}b>0&&0==m[b-1][g]&&(s=o(c,b-1,u,g),a.push(h,[s,{coord:[b-1,g],count:i.count+1,prev:i.coord}],f),m[b-1][g]=1),g>0&&0==m[b][g-1]&&(s=o(c,b,u,g-1),a.push(h,[s,{coord:[b,g-1],count:i.count+1,prev:i.coord}],f),m[b][g-1]=1),b<d-1&&0==m[b+1][g]&&(s=o(c,b+1,u,g),a.push(h,[s,{coord:[b+1,g],count:i.count+1,prev:i.coord}],f),m[b+1][g]=1),g<v-1&&0==m[b][g+1]&&(s=o(c,b,u,g+1),a.push(h,[s,{coord:[b,g+1],count:i.count+1,prev:i.coord}],f),m[b][g+1]=1)}}return p}function o(e,t,r,n){return Math.abs(e-t)+Math.abs(r-n)}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return c}));r(0);var n=r(5),a=(r(11),r(22));function c(t,r,c,u,l){var i,s,f=function(e,t){return e[0]<t[0]},d=e.rc,v=e.cc,h=[],m=Object(n.b)(d,v),p=Object(n.b)(d,v),b=Object(n.b)(d,v);a.push(h,[0,{coord:[t,r],count:0,prev:[t,r]}],f);for(var g=[];0!=h.length;){var k=(i=a.pop(h,f)[1]).coord[0],y=i.coord[1];if(b[k][y]--,!l.includes([k,y].toString())){if(g.push([k,y]),(1==m[k][y]||p[k][y]>i.count)&&(p[k][y]=i.count,m[k][y]=i.prev),k==c&&y==u){console.log("astar count: ",i.count),g.push(Object(n.a)(t,r,c,u,m));break}k>0&&(s=i.count+o(c,k-1,u,y),0==m[k-1][y]?(a.push(h,[s,{coord:[k-1,y],count:i.count+1,prev:i.coord}],f),m[k-1][y]=1,b[k-1][y]=s):s<b[k-1][y]&&(b[k-1][y]=s,a.push(h,[s,{coord:[k-1,y],count:i.count+1,prev:i.coord}],f))),y>0&&(s=i.count+o(c,k,u,y-1),0==m[k][y-1]?(a.push(h,[s,{coord:[k,y-1],count:i.count+1,prev:i.coord}],f),m[k][y-1]=1,b[k][y-1]=s):s<b[k][y-1]&&(b[k][y-1]=s,a.push(h,[s,{coord:[k,y-1],count:i.count+1,prev:i.coord}],f))),k<d-1&&(s=i.count+o(c,k+1,u,y),0==m[k+1][y]?(a.push(h,[s,{coord:[k+1,y],count:i.count+1,prev:i.coord}],f),m[k+1][y]=1,b[k+1][y]=s):s<b[k+1][y]&&(b[k+1][y]=s,a.push(h,[s,{coord:[k+1,y],count:i.count+1,prev:i.coord}],f))),y<v-1&&(s=i.count+o(c,k,u,y+1),0==m[k][y+1]?(a.push(h,[s,{coord:[k,y+1],count:i.count+1,prev:i.coord}],f),m[k][y+1]=1,b[k][y+1]=s):s<b[k][y+1]&&(b[k][y+1]=s,a.push(h,[s,{coord:[k,y+1],count:i.count+1,prev:i.coord}],f)))}}return g}function o(e,t,r,n){return Math.abs(e-t)+Math.abs(r-n)}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return c}));r(0);var n=r(5),a=(r(11),r(22));function c(t,r,c,o,u){console.log(t,r);var l,i,s=function(e,t){return e[0]<t[0]},f=e.rc,d=e.cc,v=[],h=Object(n.b)(f,d);a.push(v,[0,{coord:[t,r],count:0,prev:[t,r]}],s);for(var m=[];0!=v.length;){var p=(l=a.pop(v,s)[1]).coord[0],b=l.coord[1];if(!u.includes([p,b].toString())){if(m.push([p,b]),h[p][b]=l.prev,p==c&&b==o){m.push(Object(n.a)(t,r,c,o,h));break}p>0&&0==h[p-1][b]&&(i=l.count+1,a.push(v,[i,{coord:[p-1,b],count:l.count+1,prev:l.coord}],s),h[p-1][b]=1),b>0&&0==h[p][b-1]&&(i=l.count+1,a.push(v,[i,{coord:[p,b-1],count:l.count+1,prev:l.coord}],s),h[p][b-1]=1),p<f-1&&0==h[p+1][b]&&(i=l.count+1,a.push(v,[i,{coord:[p+1,b],count:l.count+1,prev:l.coord}],s),h[p+1][b]=1),b<d-1&&0==h[p][b+1]&&(i=l.count+1,a.push(v,[i,{coord:[p,b+1],count:l.count+1,prev:l.coord}],s),h[p][b+1]=1)}}return m}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return n}));r(0),r(11);function n(){for(var t=l(e.rc,e.cc),r=[],n=0;n<e.rc;n++)for(var o=0;o<e.cc;o++)Math.random()>.15&&u(n,o,t)&&(t[n][o]=1);for(var i=0;i<e.cc;i++)r.push([0,i]),r.push([e.rc-1,i]),t[0][i]=1,t[e.rc-1][i]=1;for(var s=0;s<e.rc;s++)r.push([s,0]),r.push([s,e.cc-1]),t[s][0]=1,t[s][e.cc-1]=1;for(var f=0;f<2;f++)t=a(t=c(t));for(var d=1;d<e.cc-1;d++)Math.random()>.15&&(t[e.rc-2][d]=0);t=a(t);for(var v=1;v<e.rc-1;v++)for(var h=1;h<e.cc-1;h++)1==t[v][h]&&r.push([v,h]);return r}function a(t){for(var r,n,a,c,o,u,i,s=[],f=[1,e.cc-2],d=[1,e.rc-2],v=l(e.rc,e.cc),h=1;h>-1;h--)for(var m=1;m<e.cc-1;m++)if(1==t[d[h]][m]&&0==v[d[h]][m])for(s.push([d[h],m]);0!=s.length;){if(n=(r=s.shift())[0],((a=r[1])in f||n in d)&&(Math.abs(m-a)>0||Math.abs(d[h]-n)>0)){for(u=n,i=a;i>0&&1==t[u][i];)t[u][i]=0,i-=1;for(;u>0&&1==t[u][a];)t[u][a]=0,u-=1;for(u=n;a<e.cc&&1==t[u][a];)t[u][a]=0,a+=1;for(;n<e.rc&&1==t[n][a];)t[a][a]=0,n+=1;t[d[h]][m]=0}for(var p=-1;p<2;p++)for(var b=-1;b<2;b++)o=a+b,1==t[c=n+p][o]&&0==v[c][o]&&0!=c&&0!=o&&c!=e.rc-1&&o!=e.cc-1&&(s.push([c,o]),v[c][o]=1)}return t}function c(t){for(var r,n,a,c=[],u=l(e.rc,e.cc),i=0;i<e.rc;i++)for(var s=0;s<e.cc;s++)if(0==u[i][s]&&0==t[i][s]){for(c.push([i,s]);0!=c.length;)n=(r=c.shift())[0],a=r[1],n>0&&0==u[n-1][a]&&0==t[n-1][a]&&(c.push([n-1,a]),u[n-1][a]=1),a>0&&0==u[n][a-1]&&0==t[n][a-1]&&(c.push([n,a-1]),u[n][a-1]=1),n<e.rc-1&&0==u[n+1][a]&&0==t[n+1][a]&&(c.push([n+1,a]),u[n+1][a]=1),a<e.cc-1&&0==u[n][a+1]&&0==t[n][a+1]&&(c.push([n,a+1]),u[n][a+1]=1);var f=void 0;n+1<e.rc-2&&1==t[n+1][a]?f=o(n+1,a,t,u):n-1>1&&1==t[n-1][a]?f=o(n-1,a,t,u):a+1<e.cc-2&&1==t[n][a+1]?f=o(n,a+1,t,u):a-1>1&&1==t[n][a-1]&&(f=o(n,a-1,t,u)),void 0!==f&&(t=f.visited,u=f.checked)}return t}function o(t,r,n,a){for(n[t][r]=1;t<e.rc-1&&1==n[t][r];)n[t][r]=0,a[t][r]=0,t+=1;for(n[t][r]=1;r<e.cc-1&&1==n[t][r];)n[t][r]=0,a[t][r]=0,r+=1;return{visited:n,checked:a}}function u(e,t,r){for(var n=0,a=-1;a<2;a++)for(var c=-1;c<2;c++){try{-1==a&&-1==c||1==a&&-1==c||1==a&&1==c||-1==a&&1==c?1==r[e+a][t+c]&&(n+=2):1==r[e+a][t+c]&&(n+=1)}catch(o){n+=1}if(n>4)return!1}return!0}function l(e,t){for(var r=new Array(e),n=0;n<e;n++)r[n]=new Array(t).fill(0);return r}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return a}));r(0),r(11);var n=r(59);function a(){for(var t,r,a,o,u=n(),l=c(e.rc,e.cc),i=c(e.rc,e.cc),s=[],f=[],d=1;d<e.rc-1;d++)for(var v=1;v<e.cc-1;v++)v%2==1&&d%2==1?(l[d][v]={i:d,j:v},u.add(l[d][v])):(i[d][v]=1,s.push([d,v]));for(var h=0;h<e.cc;h++)i[0][h]=1,i[e.rc-1][h]=1;for(var m=0;m<e.rc;m++)i[m][0]=1,i[m][e.cc-1]=1;s=function(e){for(var t,r,n=e.length-1;n>0;n--)t=Math.floor(Math.random()*(n+1)),r=e[n],e[n]=e[t],e[t]=r;return e}(s);for(var p=0;p<s.length;p++)t=s[p][0],r=s[p][1],0==i[t+1][r]&&0==i[t-1][r]?(a=l[t+1][r],o=l[t-1][r],u.connected(a,o)||(i[t][r]=0,u.union(a,o),f.push([t+1,r],[t,r],[t-1,r]))):0==i[t][r+1]&&0==i[t][r-1]&&(a=l[t][r+1],o=l[t][r-1],u.connected(a,o)||(i[t][r]=0,u.union(a,o),f.push([t,r+1],[t,r],[t,r-1])));for(var b=[],g=0;g<i.length;g++)for(var k=0;k<i[0].length;k++)1==i[g][k]&&b.push([g,k]);return{maze:f,walls:b}}function c(e,t){for(var r=new Array(e),n=0;n<e;n++)r[n]=new Array(t).fill(0);return r}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return n}));r(0),r(11);function n(){for(var t=c(e.rc,e.cc),r=c(e.rc,e.cc),n=[],o=1;o<e.rc-1;o++)for(var u=1;u<e.cc-1;u++)r[o][u]=u%2==1&&o%2==1?0:1;for(var l=0;l<e.cc;l++)r[0][l]=1,r[e.rc-1][l]=1;for(var i=0;i<e.rc;i++)r[i][0]=1,r[i][e.cc-1]=1;var s,f,d,v,h,m=c(e.rc,e.cc),p=2*Math.floor(Math.random()*Math.floor((e.rc-1)/2))+1,b=2*Math.floor(Math.random()*Math.floor((e.cc-1)/2))+1;console.log(p," ",b),t[p][b]=1;var g=[];for(m[p+1][b]=1,m[p-1][b]=1,m[p][b+1]=1,m[p][b-1]=1,g.push([p+1,b],[p-1,b],[p,b+1],[p,b-1]),n.push([p,b]);g.length>0;)s=Math.floor(Math.random()*Math.floor(g.length)),d=(f=g.splice(s,1)[0])[0],v=f[1],console.log("rand num ",s," x ",d," y ",v),0!=d&&0!=v&&d!=e.rc-1&&v!=e.cc-1&&(0==t[d+1][v]&&1==t[d-1][v]||1==t[d+1][v]&&0==t[d-1][v]?(n.push([d,v]),0==t[d+1][v]?(h=a(g,d+1,v,m,r),t[d+1][v]=1,n.push([d+1,v])):0==t[d-1][v]&&(h=a(g,d-1,v,m,r),t[d-1][v]=1,n.push([d-1,v])),g=h.a,m=h.in_a,r[d][v]=0,t[d][v]=1):(0==t[d][v+1]&&1==t[d][v-1]||1==t[d][v+1]&&0==t[d][v-1])&&(n.push([d,v]),0==t[d][v+1]?(h=a(g,d,v+1,m,r),t[d][v+1]=1,n.push([d,v+1])):0==t[d][v-1]&&(h=a(g,d,v-1,m,r),t[d][v-1]=1,n.push([d,v-1])),g=h.a,m=h.in_a,r[d][v]=0,t[d][v]=1));for(var k=0;k<e.rc;k++)console.log(r[k].toString());for(var y=[],E=0;E<r.length;E++)for(var w=0;w<r[0].length;w++)1==r[E][w]&&y.push([E,w]);return{maze:n,walls:y}}function a(e,t,r,n,a){console.log("before ",e," ",t," ",r);for(var c=-1;c<=1;c+=2)1==a[t+c][r]&&0==n[t+c][r]&&(e.push([t+c,r]),n[t+c][r]=1),1==a[t][r+c]&&0==n[t][r+c]&&(e.push([t,r+c]),n[t][r+c]=1);return console.log("after ",e),{a:e,in_a:n}}function c(e,t){for(var r=new Array(e),n=0;n<e;n++)r[n]=new Array(t).fill(0);return r}}).call(this,r(3))},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return a}));var n=r(28);r(0),r(11);function a(){for(var t,r,a,s,f=l(e.rc,e.cc),d=l(e.rc,e.cc),v=[],h=[],m=1;m<e.rc-1;m++)for(var p=1;p<e.cc-1;p++)p%2==1&&m%2==1?(h.push([m,p])):d[m][p]=1;for(var b=0;b<e.cc;b++)d[0][b]=1,d[e.rc-1][b]=1;for(var g=0;g<e.rc;g++)d[g][0]=1,d[g][e.cc-1]=1;h=i(h);var k,y,E,w,j,O,_,M=2*Math.floor(Math.random()*Math.floor((e.rc-1)/2))+1,z=2*Math.floor(Math.random()*Math.floor((e.cc-1)/2))+1,N={},S={},A=[],B=[];a=[],S[k=(y=[M,z]).toString()]=y,f[M][z]=1;for(var I=0;I<h.length;I++)if(0==f[h[I][0]][h[I][1]])for(a.push(h[I]),N[k=h[I].toString()]=h[I],f[h[I][0]][h[I][1]]=1;0!=a.length;)if(t=(s=a.shift())[0],r=s[1],(k=s.toString())in S)A=c(t,r,f),B=B.concat(A.reverse()),S=Object(n.a)(Object(n.a)({},S),N),N={};else{for(k=(y=u(t,r,f)).toString(),E=[t,r];k in N;)f=(w=o(E[0],E[1],y[0],y[1],f,N)).v,N=w.c,k=(y=u((E=y)[0],E[1],f)).toString();f[y[0]][y[1]]=E,N[k]=y,a.push(y)}v.push(B[0]);for(var C=1;C<B.length;C++)j=B[C-1],O=B[C],_=0,j[0]==O[0]?(_=j[1]+O[1],_/=2,1==Math.abs(_-j[1])&&(v.push([j[0],_]),d[j[0]][_]=0)):j[1]==O[1]&&(_=j[0]+O[0],_/=2,1==Math.abs(_-j[0])&&(v.push([_,j[1]]),d[_][j[1]]=0)),v.push(B[C]);for(var x=[],T=0;T<d.length;T++)for(var V=0;V<d[0].length;V++)1==d[T][V]&&x.push([T,V]);return{maze:v,walls:x}}function c(e,t,r){for(var n,a=[[e,t]];1!=r[e][t];)n=r[e][t],a.push(r[e][t]),e=n[0],t=n[1];return a}function o(e,t,r,n,a,c){for(var o;e!=r||t!=n;)o=a[e][t],a[e][t]=0,delete c[[e,t].toString()],e=o[0],t=o[1];return{v:a,c:c}}function u(t,r,n){var a,c=[];return a=n[t][r],1==t&&1==r||t==e.rc-2&&r==e.cc-2||1==t&&r==e.cc-2||t==e.rc-2&&1==r?1==t&&1==r?c=[[t+2,r],[t,r+2]]:t==e.rc-2&&r==e.cc-2?c=[[t-2,r],[t,r-2]]:1==t&&r==e.cc-2?c=[[t+2,r],[t,r-2]]:t==e.rc-2&&1==r&&(c=[[t-2,r],[t,r+2]]):1==t||1==r||t==e.rc-2||r==e.cc-2?1==t||t==e.rc-2?(1==t?c.push([t+2,r]):c.push([t-2,r]),c.push([t,r+2]),c.push([t,r-2])):(1==r?c.push([t,r+2]):c.push([t,r-2]),c.push([t+2,r]),c.push([t-2,r])):c=[[t+2,r],[t-2,r],[t,r-2],[t,r+2]],(c=i(c))[0][0]==a[0]&&c[0][1]==a[1]?c[1]:c[0]}function l(e,t){for(var r=new Array(e),n=0;n<e;n++)r[n]=new Array(t).fill(0);return r}function i(e){for(var t,r,n=e.length-1;n>0;n--)t=Math.floor(Math.random()*(n+1)),r=e[n],e[n]=e[t],e[t]=r;return e}}).call(this,r(3))},function(e,t,r){e.exports=r.p+"static/media/pathfinder-slow1.45a9d4d9.gif"},function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return h}));var n=r(9),a=r(12),c=r(13),o=r(4),u=r(15),l=r(14),i=r(0),s=r.n(i),f=r(24),d=(r(20),r(25)),v=r(19);r(65),r(66);e.vis=0,e.timeid=[],e.board=Object(v.b)(),Object(v.a)(e.board);var h=function(t){Object(u.a)(i,t);var r=Object(l.a)(i);function i(t){var n;return Object(a.a)(this,i),(n=r.call(this)).state={board:e.board.map((function(e){return e.slice()})),original:e.board.map((function(e){return e.slice()})),backtrack_count:0},n.solve_puzzle=n.solve_puzzle.bind(Object(o.a)(n)),n.visualize_puzzle=n.visualize_puzzle.bind(Object(o.a)(n)),n.resetboard=n.resetboard.bind(Object(o.a)(n)),n.receiveinput=n.receiveinput.bind(Object(o.a)(n)),n.customboard=n.customboard.bind(Object(o.a)(n)),n}return Object(c.a)(i,[{key:"visualize_puzzle",value:function(t){var r=this,n=this.state.board.map((function(e){return e.slice()}));switch(e.values=[],e.backtrack_count=0,t){case"bruteforce":Object(f.a)(n,1);break;case"smart":Object(d.a)(n,1)}for(var a=function(t){e.vis=setTimeout((function(){r.setState((function(r){var n=r.board,a=r.backtrack_count;return 0==e.values[t][2]?n[e.values[t][0]][e.values[t][1]]="":n[e.values[t][0]][e.values[t][1]]=e.values[t][2],e.values[t].length>3&&a++,{board:n,backtrack_count:a}}))}),10*t),e.timeid.push(e.vis)},c=0;c<e.values.length;c++)a(c)}},{key:"solve_puzzle",value:function(t){var r,n=this.state.board;switch(e.values=[],e.backtrack_count=0,t){case"bruteforce":r=Object(f.a)(n,0);break;case"smart":r=Object(d.a)(n,0)}r?this.setState({board:n,backtrack_count:e.backtrack_count}):this.setState({backtrack_count:"NOT SOLVABLE"})}},{key:"resetboard",value:function(){for(var t=0;t<e.timeid.length;t++)clearTimeout(e.timeid[t]);var r=this.state.original.map((function(e){return e.slice()}));console.log(this.state.board),console.log(this.state.original),this.setState({board:r,backtrack_count:0})}},{key:"generateboard",value:function(){var e=Object(v.b)();Object(v.a)(e);var t=e.map((function(e){return e.slice()}));this.setState({board:e,original:t,backtrack_count:0})}},{key:"receiveinput",value:function(e,t,r){var n=this.state.board;try{var a=parseInt(e.target.value);n[t][r]=a>=1&&a<=9?a:0}catch(c){n[t][r]=0}this.setState({board:n})}},{key:"customboard",value:function(){this.setState({board:Object(n.a)(Array(9)).map((function(e){return Array(9).fill(0)})),original:Object(n.a)(Array(9)).map((function(e){return Array(9).fill(0)}))})}},{key:"render",value:function(){var e=this,t=["bruteforce","smart"];return s.a.createElement("div",null,s.a.createElement("nav",{class:"navbar navbar-expand-lg bg-light"},s.a.createElement("div",{class:"navbar-collapse"},s.a.createElement("ul",{class:"navbar-nav mr-auto nav-fill w-100"},s.a.createElement("li",{class:"nav-item dropdown"},s.a.createElement("div",{class:"dropdown"},s.a.createElement("button",{class:"dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown"},"Visualize"),s.a.createElement("div",{class:"dropdown-menu dropdown-menu-center"},t.map((function(t){return s.a.createElement("a",{class:"dropdown-item",onClick:function(){return e.visualize_puzzle(t)}},t)}))))),s.a.createElement("li",{class:"nav-item active"},s.a.createElement("div",null,s.a.createElement("button",{type:"button",onClick:function(){return e.resetboard()}},"Reset Board"))),s.a.createElement("li",{class:"nav-item active"},s.a.createElement("div",null,s.a.createElement("button",{type:"button",onClick:function(){return e.customboard()}},"Custom Board"))),s.a.createElement("li",null,s.a.createElement("div",null,s.a.createElement("button",{type:"button",onClick:function(){return e.generateboard()}},"Generate Board"))),s.a.createElement("li",{class:"nav-item dropdown"},s.a.createElement("div",{class:"dropdown",className:"button-div"},s.a.createElement("button",{class:"dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown"},"Instant"),s.a.createElement("div",{class:"dropdown-menu dropdown-menu-center"},t.map((function(t){return s.a.createElement("div",null,s.a.createElement("a",{class:"dropdown-item",onClick:function(){return e.solve_puzzle(t)}},t))})))))))),s.a.createElement("div",{className:"sudoku-grid"},s.a.createElement("table",null,this.state.board.map((function(t,r){return s.a.createElement("tr",null,t.map((function(t,n){return 0==t?s.a.createElement("td",{id:"sudoku-"+r+"-"+n},s.a.createElement("input",{value:"",onChange:function(t){return e.receiveinput(t,r,n)}})):s.a.createElement("td",{id:"sudoku-"+r+"-"+n},s.a.createElement("input",{value:t,onChange:function(t){return e.receiveinput(t,r,n)}}))})))})))),s.a.createElement("div",{className:"back-counter"},"Backtrack Counter: ",this.state.backtrack_count))}}]),i}(i.Component)}).call(this,r(3))},function(e,t,r){e.exports=r.p+"static/media/sudoku-slow.139d31f6.gif"},,,function(e,t,r){e.exports=r(72)},,,,,function(e,t,r){},function(e,t,r){},,,,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},,,,,function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(33),o=r.n(c),u=r(16),l=r(1),i=(r(56),r(57),r(34)),s=r(46),f=r.n(s),d=r(47),v=r(48),h=r.n(v),m=r(12),p=r(13),b=r(4),g=r(15),k=r(14);r(67);var y=function(e,t,r){var n=e[t];return e[t]=e[r],e[r]=n,[[t,e[t]],[r,e[r]]]};var E=function(e){for(var t,r=[],n=0;n<e.length-1;n++)for(var a=0;a<e.length-n-1;a++)e[a]>e[a+1]&&(t=y(e,a,a+1),r.push(t));return r};var w=function(e){for(var t=[],r=[],n=1;n<e.length;n++)for(var a=n-1,c=e[n];a>=0&&e[a]>c;)r=y(e,a,a+1),t.push(r),a-=1;return t};function j(e,t,r,n,a){for(var c=r-t+1,o=n-r,u=e.slice(t,r+1),l=e.slice(r+1,1+n),i=[],s=0,f=0,d=t;s<c&&f<o;)u[s]<=l[f]?(e[d]!=u[s]&&(e[d]=u[s],i.push([d,u[s]])),s++):(e[d]!=l[f]&&(e[d]=l[f],i.push([d,l[f]])),f++),d++;for(;s<c;)e[d]!=u[s]&&(e[d]=u[s],i.push([d,u[s]])),s++,d++;for(;f<o;)e[d]!=l[f]&&(e[d]=l[f],i.push([d,l[f]])),f++,d++;a.push(i)}var O=function(e){for(var t=[],r=1;r<e.length;r*=2)for(var n=0;n<e.length-1;n+=2*r)j(e,n,Math.min(n+r-1,e.length-1),Math.min(n+2*r-1,e.length-1),t);return t};var _=function(e){for(var t=[],r=0;r<e.length-1;r++){for(var n=r,a=r+1;a<e.length;a++)e[a]<e[n]&&(n=a);var c=y(e,n,r);t.push(c)}return t};function M(e,t,r,n){var a=r,c=2*r+1,o=2*r+2;if(c<t&&e[c]>e[a]&&(a=c),o<t&&e[o]>e[a]&&(a=o),a!=r){var u=y(e,r,a);n.push(u),M(e,t,a,n)}}var z=function(e){for(var t=[],r=e.length/2-1;r>=0;r--)M(e,e.length,r,t);for(var n=e.length-1;n>0;n--){var a=y(e,0,n);t.push(a),M(e,n,0,t)}return t},N=window.innerHeight,S=window.innerWidth,A=(S-200)/200,B=function(e){Object(g.a)(r,e);var t=Object(k.a)(r);function r(){var e;return Object(m.a)(this,r),(e=t.call(this)).state={array:Array.from(Array(200),(function(){return Math.floor(200*Math.random())+1}))},e.sort=e.sort.bind(Object(b.a)(e)),e.newArray=e.newArray.bind(Object(b.a)(e)),e}return Object(p.a)(r,[{key:"sort",value:function(e){var t;switch(e){case"bubblesort":t=E(this.state.array);break;case"insertionsort":t=w(this.state.array);break;case"mergesort":t=O(this.state.array);break;case"selectionsort":t=_(this.state.array);break;case"heapsort":t=z(this.state.array)}if("mergesort"==e)for(var r=0;r<t.length;r++)for(var n=0,a=function(){var e=t[r][n],a=e[0],c=e[1],o="array-"+a;setTimeout((function(){document.getElementById(o).style.height="".concat(Math.floor(N*(c/(200*1.1))),"px")}),1e3*r/200),n++};n<t[r].length;)a();else for(var c=function(e){var r=t[e],n=r[0][0],a=r[0][1],c="array-"+n,o=r[1][0],u=r[1][1],l="array-"+o;setTimeout((function(){document.getElementById(c).style.height="".concat(Math.floor(N*(a/201)),"px"),document.getElementById(l).style.height="".concat(Math.floor(N*(u/201)),"px")}),1e3*e/200)},o=0;o<t.length;o++)c(o)}},{key:"newArray",value:function(){this.setState({array:Array.from(Array(200),(function(){return Math.floor(200*Math.random()+1)}))})}},{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement("button",{onClick:this.newArray},"Create New Array"),["bubblesort","insertionsort","selectionsort","heapsort","mergesort"].map((function(t){return a.a.createElement("button",{onClick:function(){return e.sort(t)}},t)})),a.a.createElement("div",{className:"sorting-grid"},this.state.array.map((function(e,t){return a.a.createElement("div",{id:"array-"+t,className:"bar",style:{width:A,height:N*(e/(200*1.1))}})}))))}}]),r}(n.Component);function I(){return a.a.createElement("div",{className:"algorithm-matrix"},a.a.createElement("div",{className:"algorithm"},a.a.createElement(u.c,{style:{color:"white"},to:"/pathfinder"},a.a.createElement("img",{class:"thumbnail",src:f.a,alt:""}),a.a.createElement("h3",null," Pathfinding Visualizer "))),a.a.createElement("div",{className:"algorithm"},a.a.createElement(u.c,{style:{color:"white"},to:"/sudoku"},a.a.createElement("img",{class:"thumbnail",src:h.a,alt:""}),a.a.createElement("h3",null," Sudoku Visualizer "))),a.a.createElement("div",{className:"algorithm"},a.a.createElement(u.c,{style:{color:"white"},to:"/sorting"},a.a.createElement("h3",null," Sorting Visualizer "))),a.a.createElement("div",{className:"algorithm"},"NQueens will be here"))}function C(){return a.a.createElement("div",{className:"app-pathfinder"},a.a.createElement(i.a,null))}function x(){return a.a.createElement("div",{className:"app-sudoku"},a.a.createElement(d.a,null))}function T(){return a.a.createElement("div",{className:"app-sorting"},a.a.createElement(B,null))}var V=function(){return a.a.createElement("div",null,a.a.createElement(u.b,null,a.a.createElement(l.c,null,a.a.createElement(l.a,{exact:!0,path:"/",component:I}),a.a.createElement(l.a,{exact:!0,path:"/pathfinder",component:C}),a.a.createElement(l.a,{exact:!0,path:"/sudoku",component:x}),a.a.createElement(l.a,{exact:!0,path:"/sorting",component:T}))))};o.a.render(a.a.createElement(u.a,null,a.a.createElement(V,null)),document.getElementById("root"))}],[[51,1,2]]]);
//# sourceMappingURL=main.356a34ab.chunk.js.map