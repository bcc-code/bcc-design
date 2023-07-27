import{d as k,l as V,k as j,o as s,c,e as f,n as d,t as h,b as r,m as C,g as N,f as $,p as A}from"./vue.esm-bundler-a42abfac.js";const M={class:"space-y-2"},P={key:0,class:"bcc-input-label"},z={key:1,class:"bcc-input-optional-label"},F=["disabled","required"],H={inheritAttrs:!1},a=k({...H,__name:"BccInput",props:{state:{default:"default"},disabled:{type:Boolean,default:!1},label:null,optionalLabel:{default:"Optional"},required:{type:Boolean,default:!1}},setup(e){const m=V(),W=j(()=>{let l={};for(const t in m)t!=="class"&&t!=="style"&&(l[t]=m[t]);return l});return(l,t)=>(s(),c("div",{class:d(["inline-flex flex-col space-y-2",l.$attrs.class]),style:A(l.$attrs.style)},[f("label",M,[e.label||!e.required?(s(),c("span",{key:0,class:d(["flex gap-x-2",{"justify-between":e.label&&!e.required,"justify-end":!e.label&&!e.required}])},[e.label?(s(),c("span",P,h(e.label),1)):r("",!0),e.required?r("",!0):(s(),c("span",z,h(e.optionalLabel),1))],2)):r("",!0),f("input",C({disabled:e.disabled,required:e.required,class:["bcc-input",{"bcc-input-error":e.state==="error","bcc-input-success":e.state==="success"}]},N(W)),null,16,F)]),l.$slots.default?(s(),c("span",{key:0,class:d({"bcc-input-message-default":e.state==="default","bcc-input-message-error":e.state==="error","bcc-input-message-success":e.state==="success"})},[$(l.$slots,"default")],2)):r("",!0)],6))}});a.__docgenInfo={exportName:"default",displayName:"BccInput",description:"",tags:{},props:[{name:"state",required:!1,type:{name:"union",elements:[{name:'"default"'},{name:'"error"'},{name:'"success"'}]},defaultValue:{func:!1,value:'"default"'}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"label",required:!1,type:{name:"string"}},{name:"optionalLabel",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"Optional"'}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccInput/BccInput.vue"]};const J={title:"Components/BccInput",component:a,argTypes:{state:{description:"Style of the input",options:["default","error","success"],control:{type:"radio"}},placeholder:{description:"The HTML placeholder attribute"},slotDefault:{name:"default slot",description:"An optional message below the input"}}},U=e=>({components:{BccInput:a},setup(){return{args:e}},template:`
    <BccInput v-bind="args" type="text" value="Example value">
      {{ args.slotDefault }}
    </BccInput>
  `}),n=U.bind({});n.args={state:"default",disabled:!1,required:!0,placeholder:"Example placeholder",slotDefault:"",label:"Example label",optionalLabel:"Optional"};const o=()=>({components:{BccInput:a},template:`
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" required />
      <BccInput value="Default disabled" placeholder="Example placeholder" :disabled="true" required />
      <BccInput value="Error" placeholder="Example placeholder" state="error" required />
      <BccInput value="Success" placeholder="Example placeholder" state="success" required />
    </div>
  `}),u=()=>({components:{BccInput:a},template:`
    <div class="flex flex-col space-y-4">
      <BccInput label="Example Label" placeholder="Example placeholder" required />
      <BccInput label="Example Label that is really long but should still display" placeholder="Example placeholder" required class="w-1/4" />
    </div>
  `}),p=()=>({components:{BccInput:a},template:`
    <div class="flex flex-col space-y-4">
      <BccInput label="Default" placeholder="With label and optional" :required="false" class="w-1/2" />
      <BccInput placeholder="Without label" :required="false" class="w-1/2" />
      <BccInput label="Label" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long optional label" :required="false" class="w-1/4" />
      <BccInput label="Pretty long label as well" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long label and optional label" :required="false" class="w-1/4" />
    </div>
  `}),i=()=>({components:{BccInput:a},template:`
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" required>This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Error" placeholder="Example placeholder" state="error" required>This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Success" placeholder="Example placeholder" state="success" required>This is an example message with <strong>styling</strong>.</BccInput>
    </div>
  `});var b,g,B;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    BccInput
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <BccInput v-bind="args" type="text" value="Example value">
      {{ args.slotDefault }}
    </BccInput>
  \`
})`,...(B=(g=n.parameters)==null?void 0:g.docs)==null?void 0:B.source}}};var x,I,y;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`() => ({
  components: {
    BccInput
  },
  template: \`
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" required />
      <BccInput value="Default disabled" placeholder="Example placeholder" :disabled="true" required />
      <BccInput value="Error" placeholder="Example placeholder" state="error" required />
      <BccInput value="Success" placeholder="Example placeholder" state="success" required />
    </div>
  \`
})`,...(y=(I=o.parameters)==null?void 0:I.docs)==null?void 0:y.source}}};var v,q,E;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`() => ({
  components: {
    BccInput
  },
  template: \`
    <div class="flex flex-col space-y-4">
      <BccInput label="Example Label" placeholder="Example placeholder" required />
      <BccInput label="Example Label that is really long but should still display" placeholder="Example placeholder" required class="w-1/4" />
    </div>
  \`
})`,...(E=(q=u.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var L,w,S;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`() => ({
  components: {
    BccInput
  },
  template: \`
    <div class="flex flex-col space-y-4">
      <BccInput label="Default" placeholder="With label and optional" :required="false" class="w-1/2" />
      <BccInput placeholder="Without label" :required="false" class="w-1/2" />
      <BccInput label="Label" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long optional label" :required="false" class="w-1/4" />
      <BccInput label="Pretty long label as well" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long label and optional label" :required="false" class="w-1/4" />
    </div>
  \`
})`,...(S=(w=p.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var D,O,T;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`() => ({
  components: {
    BccInput
  },
  template: \`
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" required>This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Error" placeholder="Example placeholder" state="error" required>This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Success" placeholder="Example placeholder" state="success" required>This is an example message with <strong>styling</strong>.</BccInput>
    </div>
  \`
})`,...(T=(O=i.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};const K=["Example","State","WithLabel","Optional","WithMessage"];export{n as Example,p as Optional,o as State,u as WithLabel,i as WithMessage,K as __namedExportsOrder,J as default};
//# sourceMappingURL=BccInput.stories-bbd36a0f.js.map
