import{d as m,o,c as u,t as v,n as g}from"./vue.esm-bundler-a42abfac.js";const t=m({__name:"BccAvatar",props:{initials:null,gender:{default:"unknown"},child:{type:Boolean,default:!1},size:{default:"sm"}},setup(e){return(p,B)=>(o(),u("div",{class:g(["bcc-avatar",{"bcc-avatar-xs":e.size==="xs","bcc-avatar-man":!e.child&&e.gender==="male","bcc-avatar-woman":!e.child&&e.gender==="female","bcc-avatar-person":!e.child&&e.gender==="unknown","bcc-avatar-boy":e.child&&e.gender==="male","bcc-avatar-girl":e.child&&e.gender==="female","bcc-avatar-child":e.child&&e.gender==="unknown"}])},v(e.initials.slice(0,2)),3))}});t.__docgenInfo={exportName:"default",displayName:"BccAvatar",description:"",tags:{},props:[{name:"initials",required:!0,type:{name:"string"}},{name:"gender",required:!1,type:{name:"union",elements:[{name:'"male"'},{name:'"female"'},{name:'"unknown"'}]},defaultValue:{func:!1,value:'"unknown"'}},{name:"child",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"xs"'},{name:'"sm"'}]},defaultValue:{func:!1,value:'"sm"'}}],sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccAvatar/BccAvatar.vue"]};const h={title:"Components/BccAvatar",component:t,argTypes:{gender:{options:["male","female","unknown"],control:{type:"radio"}},size:{options:["xs","sm"],control:{type:"radio"}}}},f=e=>({components:{BccAvatar:t},setup(){return{args:e}},template:`
    <BccAvatar v-bind="args" />
  `}),a=f.bind({});a.args={initials:"LG",gender:"male",child:!1,size:"sm"};const n=()=>({components:{BccAvatar:t},template:`
    <div class="flex items-center space-x-4">
      <BccAvatar initials="Ge" gender="male" />
      <BccAvatar initials="Id" gender="female" />
      <BccAvatar initials="Un" gender="unknown" />
      <BccAvatar initials="Ab" gender="male" :child="true" />
      <BccAvatar initials="Cd" gender="female" :child="true" />
      <BccAvatar initials="Un" gender="unknown" :child="true" />
    </div>
  `});var c,r,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    BccAvatar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <BccAvatar v-bind="args" />
  \`
})`,...(i=(r=a.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};var s,l,d;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`() => ({
  components: {
    BccAvatar
  },
  template: \`
    <div class="flex items-center space-x-4">
      <BccAvatar initials="Ge" gender="male" />
      <BccAvatar initials="Id" gender="female" />
      <BccAvatar initials="Un" gender="unknown" />
      <BccAvatar initials="Ab" gender="male" :child="true" />
      <BccAvatar initials="Cd" gender="female" :child="true" />
      <BccAvatar initials="Un" gender="unknown" :child="true" />
    </div>
  \`
})`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const b=["Example","State"];export{a as Example,n as State,b as __namedExportsOrder,h as default};
//# sourceMappingURL=BccAvatar.stories-2f73ff43.js.map
