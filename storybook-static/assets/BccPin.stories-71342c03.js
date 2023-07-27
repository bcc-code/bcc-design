import{d as P,o as i,c as s,a as g,r as x,t as f,b as h,n as k}from"./vue.esm-bundler-a42abfac.js";import{r}from"./CheckCircleIcon-1227504a.js";import"./index-05944238.js";import{s as I}from"./chunk-2GDW2BFM-0c8ec476.js";import"./index-d475d2ea.js";const y={key:1},c=P({__name:"BccPin",props:{icon:null,variant:{default:"neutral"},text:null},setup(n){return(w,E)=>(i(),s("div",{class:k(["bcc-pin",{"bcc-pin-danger":n.variant==="danger","bcc-pin-warning":n.variant==="warning","bcc-pin-success":n.variant==="success","bcc-pin-info":n.variant==="info","bcc-pin-system":n.variant==="system"}])},[n.icon?(i(),g(x(n.icon),{key:0,class:"bcc-pin-icon"})):n.text?(i(),s("span",y,f(n.text),1)):h("",!0)],2))}});c.__docgenInfo={exportName:"default",displayName:"BccPin",description:"",tags:{},props:[{name:"icon",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Component"},{name:"Function"}]}},{name:"variant",required:!1,type:{name:"union",elements:[{name:'"neutral"'},{name:'"danger"'},{name:'"warning"'},{name:'"success"'},{name:'"info"'},{name:'"system"'}]},defaultValue:{func:!1,value:'"neutral"'}},{name:"text",required:!1,type:{name:"string"}}],sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccPin/BccPin.vue"]};I(n=>n.component("CheckCircleIcon",r));const N={title:"Components/BccPin",component:c,argTypes:{variant:{description:"Determines the styling of the pin",options:["neutral","danger","warning","success","info","systemInfo"],control:{type:"radio"}}}},b=n=>({components:{BccPin:c,CheckCircleIcon:r},setup(){return{args:n}},template:`
    <BccPin v-bind="args" icon="CheckCircleIcon" />
  `}),e=b.bind({});e.args={variant:"neutral",text:""};const a=()=>({components:{BccPin:c,CheckCircleIcon:r},template:`
    <div class="flex items-start space-x-2">
      <BccPin variant="neutral" icon="CheckCircleIcon" />
      <BccPin variant="danger" icon="CheckCircleIcon" />
      <BccPin variant="warning" icon="CheckCircleIcon" />
      <BccPin variant="success" icon="CheckCircleIcon" />
      <BccPin variant="info" icon="CheckCircleIcon" />
    </div>
  `}),t=()=>({components:{BccPin:c},template:`
    <div class="flex items-start space-x-2">
      <BccPin variant="neutral" text="1" />
      <BccPin variant="danger" text="1" />
      <BccPin variant="warning" text="1" />
      <BccPin variant="success" text="1" />
      <BccPin variant="info" text="1" />
    </div>
  `});var o,m,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
  components: {
    BccPin,
    CheckCircleIcon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <BccPin v-bind="args" icon="CheckCircleIcon" />
  \`
})`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,u,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`() => ({
  components: {
    BccPin,
    CheckCircleIcon
  },
  template: \`
    <div class="flex items-start space-x-2">
      <BccPin variant="neutral" icon="CheckCircleIcon" />
      <BccPin variant="danger" icon="CheckCircleIcon" />
      <BccPin variant="warning" icon="CheckCircleIcon" />
      <BccPin variant="success" icon="CheckCircleIcon" />
      <BccPin variant="info" icon="CheckCircleIcon" />
    </div>
  \`
})`,...(d=(u=a.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var v,C,B;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`() => ({
  components: {
    BccPin
  },
  template: \`
    <div class="flex items-start space-x-2">
      <BccPin variant="neutral" text="1" />
      <BccPin variant="danger" text="1" />
      <BccPin variant="warning" text="1" />
      <BccPin variant="success" text="1" />
      <BccPin variant="info" text="1" />
    </div>
  \`
})`,...(B=(C=t.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};const F=["Example","WithIcon","WithText"];export{e as Example,a as WithIcon,t as WithText,F as __namedExportsOrder,N as default};
//# sourceMappingURL=BccPin.stories-71342c03.js.map
