import{o as a,c,e as u,x as j,d as z,y as O,k as R,z as W,A as Z,g as l,B as A,a as G,F as H,C as v,b as V,t as J,n as K}from"./vue.esm-bundler-a42abfac.js";function P(e,o){return a(),c("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",viewBox:"0 96 960 960",fill:"currentColor"},[u("path",{d:"M378 802.065q-6.717 0-12.554-2.358-5.837-2.359-11.316-7.837l-181-181q-10.195-10.196-10.195-24.87 0-14.674 10.195-24.87 10.196-10.195 23.99-10.195 13.793 0 24.228 10.195L378 717.782 737.891 358.13q10.196-10.195 24.37-10.315 14.174-.119 24.369 10.315 10.196 10.196 10.196 24.49 0 14.293-10.196 24.489L401.87 791.87q-5.479 5.478-11.316 7.837-5.837 2.358-12.554 2.358Z"})])}function Q(e,o){return a(),c("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",viewBox:"0 96 960 960",fill:"currentColor"},[u("path",{d:"M480 623.739 272.87 830.87q-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87L432.261 576 225.13 368.87q-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87 10.196-10.195 23.87-10.195 13.674 0 23.87 10.195L480 528.261 687.13 321.13q10.196-10.195 23.87-10.195 13.674 0 23.87 10.195 10.195 10.196 10.195 23.87 0 13.674-10.195 23.87L527.739 576 734.87 783.13q10.195 10.196 10.195 23.87 0 13.674-10.195 23.87-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195L480 623.739Z"})])}const X=(e,o)=>{const n=e.__vccOpts||e;for(const[m,p]of o)n[m]=p;return n},E={},Y={fill:"none",viewBox:"0 0 58 58","aria-hidden":"true"},ee=j('<g transform="translate(2 1)" stroke="currentColor" stroke-width="1.5" class="h-3 w-3"><circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="1;0;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;1;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;1;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;1;0;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;1;0;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;1;0;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;1;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="5" r="5" fill-opacity="0" fill="currentColor"><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;0;1" calcMode="linear" repeatCount="indefinite"></animate></circle></g>',1),le=[ee];function ae(e,o){return a(),c("svg",Y,le)}const te=X(E,[["render",ae]]);E.__docgenInfo={displayName:"CircleLoader",description:"",tags:{},sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccToggle/CircleLoader.vue"]};const oe=["disabled"],ce={class:"bcc-toggle-circle","aria-hidden":"true"},se={key:0,class:"bcc-toggle-label"},t=z({__name:"BccToggle",props:{modelValue:{type:Boolean},wasToggled:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},withIcon:{type:Boolean,default:!0},label:{default:""}},emits:["update:modelValue"],setup(e,{emit:o}){const n=e,{modelValue:m,wasToggled:p,disabled:F,loading:b}=O(n),f=R({get(){return!!m.value},set(T){o("update:modelValue",T)}});return(T,B)=>(a(),c("label",{class:K(["bcc-toggle",{"bcc-toggle-was-toggled":l(p)}])},[W(u("input",{type:"checkbox",class:"bcc-toggle-input",disabled:l(b)||l(F),"onUpdate:modelValue":B[0]||(B[0]=U=>A(f)?f.value=U:null)},null,8,oe),[[Z,l(f)]]),u("span",ce,[l(b)?(a(),G(te,{key:0,class:"h-3 w-3"})):e.withIcon?(a(),c(H,{key:1},[v(l(P),{class:"hidden h-3 w-3 [.bcc-toggle-input:checked~.bcc-toggle-circle>&]:block"}),v(l(Q),{class:"h-3 w-3 [.bcc-toggle-input:checked~.bcc-toggle-circle>&]:hidden"})],64)):V("",!0)]),e.label?(a(),c("span",se,J(e.label),1)):V("",!0)],2))}});t.__docgenInfo={exportName:"default",displayName:"BccToggle",description:"",tags:{},props:[{name:"modelValue",required:!0,type:{name:"boolean"}},{name:"wasToggled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loading",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"withIcon",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"label",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'""'}}],events:[{name:"update:modelValue"}],sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccToggle/BccToggle.vue"]};const ie={title:"Components/BccToggle",component:t,argTypes:{}},ne=e=>({components:{BccToggle:t},setup(){return{args:e}},template:`
    <BccToggle v-model="args.modelValue" />
  `}),s=ne.bind({});s.args={modelValue:!1,wasToggled:!1,disabled:!1,loading:!1,withIcon:!0,label:"Test label"};const r=()=>({components:{BccToggle:t},template:`
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" />
      <BccToggle :modelValue="false" />
      <BccToggle :modelValue="false" :label="'Test label'" />
    </div>
  `}),i=()=>({components:{BccToggle:t},template:`
    <div class="mb-4 text-gray-700">
      Set the <code>was-toggled</code> prop to <code>true</code> to indicate that changing the value of the toggle to off has consequences.
    </div>
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" :was-toggled="true" />
      <BccToggle :modelValue="false" :was-toggled="true" />
      <BccToggle :modelValue="false" :was-toggled="true" :label="'Test label'" />
    </div>
  `}),d=()=>({components:{BccToggle:t},template:`
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" disabled />
      <BccToggle :modelValue="false" disabled />
      <BccToggle :modelValue="false" disabled :was-toggled="true" />
      <BccToggle :modelValue="false" disabled :was-toggled="true" :label="'Test label'" />
    </div>
  `}),g=()=>({components:{BccToggle:t},template:`
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" loading />
      <BccToggle :modelValue="false" loading />
      <BccToggle :modelValue="false" :was-toggled="true" loading />
      <BccToggle :modelValue="false" :was-toggled="true" loading :label="'Test label'" />
    </div>
    <div class="flex items-center space-x-2 mt-4">
      <BccToggle :modelValue="true" loading disabled />
      <BccToggle :modelValue="false" loading disabled />
      <BccToggle :modelValue="false" :was-toggled="true" loading disabled />
      <BccToggle :modelValue="false" loading disabled :was-toggled="true" :label="'Test label'" />
    </div>
  `});var x,y,w;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
  components: {
    BccToggle
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <BccToggle v-model="args.modelValue" />
  \`
})`,...(w=(y=s.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var h,_,C;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => ({
  components: {
    BccToggle
  },
  template: \`
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" />
      <BccToggle :modelValue="false" />
      <BccToggle :modelValue="false" :label="'Test label'" />
    </div>
  \`
})`,...(C=(_=r.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var q,k,N;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`() => ({
  components: {
    BccToggle
  },
  template: \`
    <div class="mb-4 text-gray-700">
      Set the <code>was-toggled</code> prop to <code>true</code> to indicate that changing the value of the toggle to off has consequences.
    </div>
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" :was-toggled="true" />
      <BccToggle :modelValue="false" :was-toggled="true" />
      <BccToggle :modelValue="false" :was-toggled="true" :label="'Test label'" />
    </div>
  \`
})`,...(N=(k=i.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var L,M,S;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`() => ({
  components: {
    BccToggle
  },
  template: \`
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" disabled />
      <BccToggle :modelValue="false" disabled />
      <BccToggle :modelValue="false" disabled :was-toggled="true" />
      <BccToggle :modelValue="false" disabled :was-toggled="true" :label="'Test label'" />
    </div>
  \`
})`,...(S=(M=d.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var I,$,D;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`() => ({
  components: {
    BccToggle
  },
  template: \`
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" loading />
      <BccToggle :modelValue="false" loading />
      <BccToggle :modelValue="false" :was-toggled="true" loading />
      <BccToggle :modelValue="false" :was-toggled="true" loading :label="'Test label'" />
    </div>
    <div class="flex items-center space-x-2 mt-4">
      <BccToggle :modelValue="true" loading disabled />
      <BccToggle :modelValue="false" loading disabled />
      <BccToggle :modelValue="false" :was-toggled="true" loading disabled />
      <BccToggle :modelValue="false" loading disabled :was-toggled="true" :label="'Test label'" />
    </div>
  \`
})`,...(D=($=g.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};const de=["Example","Basic","WasToggled","Disabled","Loading"];export{r as Basic,d as Disabled,s as Example,g as Loading,i as WasToggled,de as __namedExportsOrder,ie as default};
//# sourceMappingURL=BccToggle.stories-48c55c68.js.map
