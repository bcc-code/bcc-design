import{d as v,o as t,c as h,a as x,n as r,r as C,b,e as y,f as k}from"./vue.esm-bundler-a42abfac.js";import{r as z}from"./CheckCircleIcon-1227504a.js";import"./index-05944238.js";import{s as I}from"./chunk-2GDW2BFM-0c8ec476.js";import"./index-d475d2ea.js";const w={class:"order-2"},c=v({__name:"BccBadge",props:{icon:null,iconRight:{type:Boolean,default:!1},size:{default:"xs"},variant:{default:"neutral"}},setup(e){return(f,D)=>(t(),h("div",{class:r(["bcc-badge",{"bcc-badge-sm":e.size==="sm","bcc-badge-danger":e.variant==="danger","bcc-badge-warning":e.variant==="warning","bcc-badge-success":e.variant==="success","bcc-badge-info":e.variant==="info","bcc-badge-system":e.variant==="system"}])},[e.icon?(t(),x(C(e.icon),{key:0,class:r(["bcc-badge-icon",[e.iconRight?"order-3":"order-1"]])},null,8,["class"])):b("",!0),y("span",w,[k(f.$slots,"default")])],2))}});c.__docgenInfo={exportName:"default",displayName:"BccBadge",description:"",tags:{},props:[{name:"icon",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Component"},{name:"Function"}]}},{name:"iconRight",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"xs"'},{name:'"sm"'}]},defaultValue:{func:!1,value:'"xs"'}},{name:"variant",required:!1,type:{name:"union",elements:[{name:'"neutral"'},{name:'"danger"'},{name:'"warning"'},{name:'"success"'},{name:'"info"'},{name:'"system"'}]},defaultValue:{func:!1,value:'"neutral"'}}],slots:[{name:"default"}],sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccBadge/BccBadge.vue"]};I(e=>e.component("CheckCircleIcon",z));const T={title:"Components/BccBadge",component:c,argTypes:{variant:{description:"Determines the styling of the badge",options:["neutral","danger","warning","success","info","system"],control:{type:"radio"}},size:{description:"Size of the badge",options:["xs","sm"],control:{type:"radio"}},iconRight:{description:"Pull icon to right side of the contents",control:{type:"boolean"}},slotDefault:{name:"default slot",description:"The badge text"}}},V=e=>({components:{BccBadge:c},setup(){return{args:e}},template:`
    <BccBadge v-bind="args" icon="CheckCircleIcon">
      <template #default>
        {{ args.slotDefault }}
      </template>
    </BccBadge>
  `}),a=V.bind({});a.args={variant:"neutral",size:"xs",iconRight:!1,slotDefault:"Example Badge"};const n=()=>({components:{BccBadge:c},template:`
    <div class="flex items-start space-x-2">
      <BccBadge variant="neutral">neutral</BccBadge>
      <BccBadge variant="danger">danger</BccBadge>
      <BccBadge variant="warning">warning</BccBadge>
      <BccBadge variant="success">success</BccBadge>
      <BccBadge variant="info">info</BccBadge>
      <BccBadge variant="system">system</BccBadge>
    </div>
  `}),s=()=>({components:{BccBadge:c},template:`
    <div class="flex items-start space-x-2">
      <BccBadge variant="danger" size="xs" icon="CheckCircleIcon">
        xs, icon left
      </BccBadge>
      <BccBadge variant="danger" size="xs" icon-right icon="CheckCircleIcon">
        xs, icon right
      </BccBadge>
      <BccBadge variant="success" size="sm" icon="CheckCircleIcon">
        sm, icon left
      </BccBadge>
      <BccBadge variant="success" size="sm" icon-right icon="CheckCircleIcon">
        sm, icon right
      </BccBadge>
    </div>
  `});var i,o,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    BccBadge
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <BccBadge v-bind="args" icon="CheckCircleIcon">
      <template #default>
        {{ args.slotDefault }}
      </template>
    </BccBadge>
  \`
})`,...(d=(o=a.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};var l,B,g;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`() => ({
  components: {
    BccBadge
  },
  template: \`
    <div class="flex items-start space-x-2">
      <BccBadge variant="neutral">neutral</BccBadge>
      <BccBadge variant="danger">danger</BccBadge>
      <BccBadge variant="warning">warning</BccBadge>
      <BccBadge variant="success">success</BccBadge>
      <BccBadge variant="info">info</BccBadge>
      <BccBadge variant="system">system</BccBadge>
    </div>
  \`
})`,...(g=(B=n.parameters)==null?void 0:B.docs)==null?void 0:g.source}}};var m,u,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`() => ({
  components: {
    BccBadge
  },
  template: \`
    <div class="flex items-start space-x-2">
      <BccBadge variant="danger" size="xs" icon="CheckCircleIcon">
        xs, icon left
      </BccBadge>
      <BccBadge variant="danger" size="xs" icon-right icon="CheckCircleIcon">
        xs, icon right
      </BccBadge>
      <BccBadge variant="success" size="sm" icon="CheckCircleIcon">
        sm, icon left
      </BccBadge>
      <BccBadge variant="success" size="sm" icon-right icon="CheckCircleIcon">
        sm, icon right
      </BccBadge>
    </div>
  \`
})`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const F=["Example","Variant","WithIcon"];export{a as Example,n as Variant,s as WithIcon,F as __namedExportsOrder,T as default};
//# sourceMappingURL=BccBadge.stories-331b0c80.js.map
