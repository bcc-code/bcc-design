import{h as w,i as L,d as N,j as S,k as q,o as i,c as d,g as c,b as E,t as M,n as T,e as A}from"./vue.esm-bundler-a42abfac.js";function B(e,t=0,o=1e3){if(o<=.1)return{value:e};const n=w(t);function a(r,p){const m=Date.now(),C=o,_=p-r,y=()=>{const f=Date.now()-m,b=D(f,r,_,C);f<C?(n.value=Math.floor(b),window.requestAnimationFrame(y)):n.value=p};y()}return L(e,r=>{a(n.value??t,r)},{immediate:!0}),{value:n}}function D(e,t,o,n){return e/=n,-o*e*(e-2)+t}const V=A("circle",{cx:"20",cy:"20",r:"18",fill:"none","stroke-width":"2",stroke:"currentColor","stroke-opacity":"0.3"},null,-1),j=["stroke-dashoffset"],z={key:1,"text-anchor":"middle",x:"20",y:"25","font-size":"14","font-weight":"600",fill:"currentColor"},F={key:2,d:"M14.4122 25.1588C13.1109 25.1588 12.017 24.6844 11.1305 23.7354C10.244 22.7864 9.80078 21.6525 9.80078 20.3337C9.80078 19.0287 10.2475 17.9121 11.1409 16.984C12.0343 16.0559 13.1247 15.5918 14.4122 15.5918C14.9358 15.5918 15.4424 15.679 15.9319 15.8533C16.4214 16.0277 16.8557 16.2965 17.2347 16.6597L19.0662 18.417L17.885 19.5628L16.1877 17.9045C15.9538 17.6704 15.6828 17.5015 15.3745 17.3978C15.0663 17.294 14.7475 17.2422 14.4182 17.2422C13.5803 17.2422 12.8763 17.5449 12.3063 18.1504C11.7362 18.756 11.4512 19.4851 11.4512 20.3379C11.4512 21.2047 11.7327 21.9497 12.2957 22.5732C12.8587 23.1967 13.566 23.5085 14.4176 23.5085C14.7413 23.5085 15.0554 23.4567 15.3599 23.3532C15.6644 23.2497 15.9391 23.088 16.1839 22.8681L22.7673 16.6597C23.1462 16.2965 23.5805 16.0277 24.07 15.8533C24.5596 15.679 25.0592 15.5918 25.5689 15.5918C26.8702 15.5918 27.9676 16.0559 28.861 16.984C29.7544 17.9121 30.2012 19.0287 30.2012 20.3337C30.2012 21.6525 29.7544 22.7864 28.861 23.7354C27.9676 24.6844 26.8702 25.1588 25.5689 25.1588C25.0592 25.1588 24.5561 25.0751 24.0596 24.9077C23.5631 24.7403 23.1324 24.475 22.7673 24.1117L20.9892 22.3545L22.1586 21.2087L23.8177 22.8681C24.0383 23.0885 24.3035 23.2503 24.6133 23.3536C24.9231 23.4568 25.2398 23.5085 25.5635 23.5085C26.4151 23.5085 27.1259 23.1961 27.6958 22.5714C28.2658 21.9467 28.5508 21.2021 28.5508 20.3377C28.5508 19.4872 28.2623 18.7586 27.6854 18.152C27.1085 17.5455 26.4012 17.2422 25.5635 17.2422C25.2398 17.2422 24.9257 17.3009 24.6212 17.4183C24.3167 17.5357 24.0489 17.7043 23.818 17.9242L17.2347 24.1326C16.8557 24.4819 16.418 24.7403 15.9215 24.9077C15.425 25.0751 14.9219 25.1588 14.4122 25.1588Z",fill:"currentColor"},u=N({__name:"BccCapacityIndicator",props:{total:null,used:{default:0},animate:{type:Boolean,default:!0}},setup(e){const t=e,o=t.animate?1e3:0,{value:n}=B(S(t,"used"),0,o),{value:a}=B(q(()=>t.total===-1?-1:t.used>t.total||t.used===t.total?100:t.total>0?t.used/t.total*100:0),0,o),r=Math.PI*18*2;return(p,m)=>(i(),d("svg",{width:"2em",height:"2em",viewBox:"0 0 40 40",class:T({"text-neutral-800 dark:text-neutral-200":e.total==-1,"text-tree-green-600 dark:text-neutral-300":c(a)>=0&&c(a)<50,"text-muddy-waters-500":c(a)>=50&&c(a)<100,"text-red-800":c(a)>=100})},[V,c(a)>-1?(i(),d("circle",{key:0,cx:"20",cy:"20",r:"18",fill:"none","stroke-width":"2","stroke-dasharray":r,"stroke-dashoffset":r*((100-c(a))/100),stroke:"currentColor","stroke-opacity":"0.6",transform:"rotate(-90 20 20)"},null,8,j)):E("",!0),c(a)>-1?(i(),d("text",z,M(c(a)<100?e.total-c(n):0),1)):(i(),d("path",F))],2))}});u.__docgenInfo={exportName:"default",displayName:"BccCapacityIndicator",description:"",tags:{},props:[{name:"total",required:!0,type:{name:"number"}},{name:"used",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"animate",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccCapacityIndicator/BccCapacityIndicator.vue"]};const H={title:"Components/BccCapacityIndicator",component:u,argTypes:{total:{description:"The total available capacity"},used:{description:"How much from the total capacity is not available"},animate:{description:"If the indicator should animate on display or not"}}},O=e=>({components:{BccCapacityIndicator:u},setup(){return{args:e}},template:`
    <BccCapacityIndicator v-bind="args" />
  `}),s=O.bind({});s.args={total:20,used:14,animate:!0};const l=()=>({components:{BccCapacityIndicator:u},template:`
    <div class="flex items-center space-x-4">
      <BccCapacityIndicator :total="42" />
      <BccCapacityIndicator :total="200" :used="1" />
      <BccCapacityIndicator :total="20" :used="6" />
      <BccCapacityIndicator :total="20" :used="18" />
      <BccCapacityIndicator :total="20" :used="20" />
      <BccCapacityIndicator :total="0" :used="0" />
      <BccCapacityIndicator :total="-1" />
    </div>
  `});var I,h,v;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`args => ({
  components: {
    BccCapacityIndicator
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <BccCapacityIndicator v-bind="args" />
  \`
})`,...(v=(h=s.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var x,g,k;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`() => ({
  components: {
    BccCapacityIndicator
  },
  template: \`
    <div class="flex items-center space-x-4">
      <BccCapacityIndicator :total="42" />
      <BccCapacityIndicator :total="200" :used="1" />
      <BccCapacityIndicator :total="20" :used="6" />
      <BccCapacityIndicator :total="20" :used="18" />
      <BccCapacityIndicator :total="20" :used="20" />
      <BccCapacityIndicator :total="0" :used="0" />
      <BccCapacityIndicator :total="-1" />
    </div>
  \`
})`,...(k=(g=l.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};const P=["Example","State"];export{s as Example,l as State,P as __namedExportsOrder,H as default};
//# sourceMappingURL=BccCapacityIndicator.stories-a42b74d6.js.map
