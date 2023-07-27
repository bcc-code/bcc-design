import{o as e,c as y,e as f,d as rt,u as st,a as g,w as it,n as x,g as ut,r as b,b as S,f as Bt}from"./vue.esm-bundler-a42abfac.js";import"./index-05944238.js";import{s as lt}from"./chunk-2GDW2BFM-0c8ec476.js";import"./index-d475d2ea.js";function et(t,o){return e(),y("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",viewBox:"0 96 960 960",fill:"currentColor"},[f("path",{d:"m536.13 796.87-198-198q-5.478-5.479-7.837-11.316-2.358-5.837-2.358-12.554 0-6.717 2.358-12.554 2.359-5.837 7.837-11.316l199-199q10.196-10.195 24.37-10.195 14.174 0 24.37 10.195 10.195 10.196 9.695 24.87-.5 14.674-10.695 24.87L411.739 575 585.87 749.13q10.195 10.196 10.195 23.87 0 13.674-10.195 23.87-10.196 10.195-24.87 10.195-14.674 0-24.87-10.195Z"})])}function ct(t,o){return e(),y("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",viewBox:"0 96 960 960",fill:"currentColor"},[f("path",{d:"M351.13 796.87q-9.195-11.196-9.695-24.87-.5-13.674 9.695-23.87L524.261 575 350.13 400.87q-9.195-9.196-8.695-24.37.5-15.174 9.695-24.37 11.196-11.195 24.37-10.695 13.174.5 23.37 10.695l199 199q5.478 5.479 7.837 11.316 2.358 5.837 2.358 12.554 0 6.717-2.358 12.554-2.359 5.837-7.837 11.316l-198 198q-10.196 10.195-23.87 9.695-13.674-.5-24.87-9.695Z"})])}function v(t,o){return e(),y("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",viewBox:"0 96 960 960",fill:"currentColor"},[f("path",{d:"M770.891 916.826 531.326 677.5q-29.761 25.264-69.6 39.415-39.84 14.15-85.161 14.15-109.835 0-185.95-76.195Q114.5 578.674 114.5 471t76.196-183.87q76.195-76.195 184.369-76.195t183.87 76.195q75.695 76.196 75.695 184.02 0 43.328-13.641 82.97-13.641 39.641-40.924 74.402L821.63 868.087q10.196 9.877 10.196 23.83 0 13.953-11.109 24.822-10.351 10.522-25.213 10.522t-24.613-10.435ZM375.65 662.935q79.73 0 135.29-56.245Q566.5 550.446 566.5 471t-55.595-135.69q-55.595-56.245-135.255-56.245-80.494 0-136.757 56.245Q182.63 391.554 182.63 471t56.228 135.69q56.227 56.245 136.792 56.245Z"})])}const n=rt({__name:"BccButton",props:{is:{default:"button"},variant:{default:"primary"},color:{default:"default"},size:{default:"base"},icon:null,iconRight:{type:Boolean,default:!1},center:{type:Boolean,default:!0},rounded:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(t){const o=t,ot=st(),at=o.icon!==void 0&&!ot.default;return(h,mt)=>(e(),g(b(t.is),{disabled:t.disabled,class:x(["bcc-button",{"bcc-button-xs":t.size==="xs","bcc-button-sm":t.size==="sm","bcc-button-lg":t.size==="lg","bcc-button-xl":t.size==="xl","bcc-button-danger":t.color==="danger","bcc-button-primary":t.variant==="primary","bcc-button-secondary":t.variant==="secondary","bcc-button-tertiary":t.variant==="tertiary","bcc-button-icon-only":ut(at),"bcc-button-rounded":t.rounded,"bcc-button-center":t.center}])},{default:it(()=>[t.icon?(e(),g(b(t.icon),{key:0,class:"bcc-button-icon order-2"})):S("",!0),h.$slots.default?(e(),y("span",{key:1,class:x([t.iconRight?"order-1":"order-3"])},[Bt(h.$slots,"default")],2)):S("",!0)]),_:3},8,["disabled","class"]))}});n.__docgenInfo={exportName:"default",displayName:"BccButton",description:"",tags:{},props:[{name:"is",required:!1,type:{name:"union",elements:[{name:'"button"'},{name:'"a"'},{name:"string"},{name:"Component"}]},defaultValue:{func:!1,value:'"button"'}},{name:"variant",required:!1,type:{name:"union",elements:[{name:'"primary"'},{name:'"secondary"'},{name:'"tertiary"'}]},defaultValue:{func:!1,value:'"primary"'}},{name:"color",required:!1,type:{name:"union",elements:[{name:'"default"'},{name:'"danger"'}]},defaultValue:{func:!1,value:'"default"'}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"xs"'},{name:'"sm"'},{name:'"base"'},{name:'"lg"'},{name:'"xl"'}]},defaultValue:{func:!1,value:'"base"'}},{name:"icon",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Component"},{name:"Function"}]}},{name:"iconRight",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"center",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"rounded",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/Users/laurens/projects/bcc/vue-components/src/components/BccButton/BccButton.vue"]};lt(t=>{t.component("ChevronRightIcon",ct),t.component("ChevronLeftIcon",et),t.component("SearchIcon",v)});const ht={title:"Components/BccButton",component:n,argTypes:{color:{description:"Which color forms the base of the button style",options:["default","danger"],control:{type:"radio"}},variant:{description:"The global style of the button",options:["primary","secondary","tertiary"],control:{type:"radio"}},size:{description:"The size of the button",options:["xs","sm","base","lg","xl"],control:{type:"radio"}},iconRight:{description:"Whether the icon prop is rendered on the left or right side of the button"},center:{description:"Whether text and icon are centered or at the opposing sides of the button"},is:{description:"The actual underlying HTML element to use for the button",options:["button","a"],control:{type:"radio"}},slotDefault:{name:"default slot",description:"The button text"}}},dt=t=>({components:{BccButton:n,SearchIcon:v},setup(){return{args:t}},template:`
    <BccButton v-bind="args" icon="SearchIcon">
      {{ args.slotDefault }}
    </BccButton>
  `}),c=dt.bind({});c.args={variant:"primary",color:"default",size:"base",rounded:!1,iconRight:!1,center:!0,disabled:!1,is:"button",slotDefault:"Example Button"};const a=()=>({components:{BccButton:n},template:`
    <div class="flex items-start gap-x-2">
      <BccButton size="xs">Primary (xs)</BccButton>
      <BccButton size="sm">Primary (sm)</BccButton>
      <BccButton size="base">Primary (base)</BccButton>
      <BccButton size="lg">Primary (lg)</BccButton>
      <BccButton size="xl">Primary (xl)</BccButton>
    </div>
  `}),r=()=>({components:{BccButton:n},template:`
    <div class="flex items-start gap-x-2">
      <BccButton variant="secondary" size="xs">Secondary (xs)</BccButton>
      <BccButton variant="secondary" size="sm">Secondary (sm)</BccButton>
      <BccButton variant="secondary" size="base">Secondary (base)</BccButton>
      <BccButton variant="secondary" size="lg">Secondary (lg)</BccButton>
      <BccButton variant="secondary" size="xl">Secondary (xl)</BccButton>
    </div>
  `}),s=()=>({components:{BccButton:n},template:`
    <div class="flex items-center gap-x-2">
      <BccButton variant="tertiary" size="xs">Tertiary (xs)</BccButton>
      <BccButton variant="tertiary" size="sm">Tertiary (sm)</BccButton>
      <BccButton variant="tertiary" size="base">Tertiary (base)</BccButton>
      <BccButton variant="tertiary" size="lg">Tertiary (lg)</BccButton>
      <BccButton variant="tertiary" size="xl">Tertiary (xl)</BccButton>
    </div>
  `}),i=()=>({components:{BccButton:n},template:`
    <div class="flex items-center gap-x-2">
      <BccButton color="danger">Danger (primary)</BccButton>
      <BccButton color="danger" variant="secondary">Danger (secondary)</BccButton>
      <BccButton color="danger" variant="tertiary">Danger (tertiary)</BccButton>
    </div>
  `}),u=()=>({components:{BccButton:n},template:`
    <div class="flex items-start gap-x-2">
      <BccButton variant="primary" :disabled="true">Primary disabled</BccButton>
      <BccButton variant="secondary" :disabled="true">Secondary disabled</BccButton>
      <BccButton variant="tertiary" :disabled="true">Tertiary disabled</BccButton>
    </div>
  `}),B=()=>({components:{BccButton:n},template:`
    <div class="flex items-start gap-x-2">
      <BccButton variant="primary" :rounded="true">Primary rounded</BccButton>
      <BccButton variant="secondary" :rounded="true">Secondary rounded</BccButton>
      <BccButton variant="tertiary" :rounded="true">Tertiary rounded</BccButton>
    </div>
  `}),l=()=>({components:{BccButton:n,SearchIcon:v},template:`
    <div class="flex items-start gap-x-2">
      <BccButton icon="SearchIcon">
        With left icon
      </BccButton>
      <BccButton icon="SearchIcon" icon-right>
        With right icon
      </BccButton>
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton variant="secondary" icon="SearchIcon">
        Secondary with icon
      </BccButton>
      <BccButton variant="tertiary" icon="SearchIcon">
        Tertiary with icon
      </BccButton>
      <BccButton :disabled="true" icon="SearchIcon">
        Disabled with icon
      </BccButton>
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton size="xs" icon="SearchIcon">
        xs button
      </BccButton>
      <BccButton size="sm" icon="SearchIcon">
        sm button
      </BccButton>
      <BccButton size="base" icon="SearchIcon">
        base button
      </BccButton>
      <BccButton size="lg" icon="SearchIcon">
        lg button
      </BccButton>
      <BccButton size="xl" icon="SearchIcon">
        xl button
      </BccButton>
    </div>
  `}),d=()=>({components:{BccButton:n,SearchIcon:v},template:`
    <div class="flex items-start gap-x-2">
      <BccButton icon="SearchIcon" />
      <BccButton icon-right icon="SearchIcon" />
      <BccButton rounded icon="SearchIcon" />
      <BccButton variant="secondary" icon="SearchIcon" />
      <BccButton variant="tertiary" icon="SearchIcon" />
      <BccButton disabled icon="SearchIcon" />
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton size="xs" icon="SearchIcon" />
      <BccButton size="sm" icon="SearchIcon" />
      <BccButton size="base" icon="SearchIcon" />
      <BccButton size="lg" icon="SearchIcon" />
      <BccButton size="xl" icon="SearchIcon" />
    </div>
  `}),m=()=>({components:{BccButton:n,ChevronRightIcon:ct,ChevronLeftIcon:et},template:`
    <div class="space-y-4">
      <BccButton variant="primary" class="w-full">
        Default text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" :rounded="true" :disabled="true" icon="ChevronLeftIcon">
        Default text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-right icon="ChevronRightIcon">
        Default text, icon right
      </BccButton>
      
      <BccButton variant="primary" class="w-full" :center="false">
        Non-centered text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" :rounded="true" :disabled="true" :center="false" icon="ChevronLeftIcon">
        Non-centered text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-right :center="false" icon="ChevronRightIcon">
        Non-centered text, icon right
      </BccButton>
    </div>
  `}),p=()=>({components:{BccButton:n},template:`
    <div class="flex items-start gap-x-2">
      <BccButton is="a" variant="primary">Primary</BccButton>
      <BccButton is="a" variant="secondary">Secondary</BccButton>
      <BccButton is="a" variant="tertiary">Tertiary</BccButton>
    </div>
  `});var I,z,w;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`args => ({
  components: {
    BccButton,
    SearchIcon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <BccButton v-bind="args" icon="SearchIcon">
      {{ args.slotDefault }}
    </BccButton>
  \`
})`,...(w=(z=c.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};var C,T,q;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`() => ({
  components: {
    BccButton
  },
  template: \`
    <div class="flex items-start gap-x-2">
      <BccButton size="xs">Primary (xs)</BccButton>
      <BccButton size="sm">Primary (sm)</BccButton>
      <BccButton size="base">Primary (base)</BccButton>
      <BccButton size="lg">Primary (lg)</BccButton>
      <BccButton size="xl">Primary (xl)</BccButton>
    </div>
  \`
})`,...(q=(T=a.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var D,P,R;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`() => ({
  components: {
    BccButton
  },
  template: \`
    <div class="flex items-start gap-x-2">
      <BccButton variant="secondary" size="xs">Secondary (xs)</BccButton>
      <BccButton variant="secondary" size="sm">Secondary (sm)</BccButton>
      <BccButton variant="secondary" size="base">Secondary (base)</BccButton>
      <BccButton variant="secondary" size="lg">Secondary (lg)</BccButton>
      <BccButton variant="secondary" size="xl">Secondary (xl)</BccButton>
    </div>
  \`
})`,...(R=(P=r.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var L,N,V;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`() => ({
  components: {
    BccButton
  },
  template: \`
    <div class="flex items-center gap-x-2">
      <BccButton variant="tertiary" size="xs">Tertiary (xs)</BccButton>
      <BccButton variant="tertiary" size="sm">Tertiary (sm)</BccButton>
      <BccButton variant="tertiary" size="base">Tertiary (base)</BccButton>
      <BccButton variant="tertiary" size="lg">Tertiary (lg)</BccButton>
      <BccButton variant="tertiary" size="xl">Tertiary (xl)</BccButton>
    </div>
  \`
})`,...(V=(N=s.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var W,k,E;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`() => ({
  components: {
    BccButton
  },
  template: \`
    <div class="flex items-center gap-x-2">
      <BccButton color="danger">Danger (primary)</BccButton>
      <BccButton color="danger" variant="secondary">Danger (secondary)</BccButton>
      <BccButton color="danger" variant="tertiary">Danger (tertiary)</BccButton>
    </div>
  \`
})`,...(E=(k=i.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var M,O,Z;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`() => ({
  components: {
    BccButton
  },
  template: \`
    <div class="flex items-start gap-x-2">
      <BccButton variant="primary" :disabled="true">Primary disabled</BccButton>
      <BccButton variant="secondary" :disabled="true">Secondary disabled</BccButton>
      <BccButton variant="tertiary" :disabled="true">Tertiary disabled</BccButton>
    </div>
  \`
})`,...(Z=(O=u.parameters)==null?void 0:O.docs)==null?void 0:Z.source}}};var $,Q,A;B.parameters={...B.parameters,docs:{...($=B.parameters)==null?void 0:$.docs,source:{originalSource:`() => ({
  components: {
    BccButton
  },
  template: \`
    <div class="flex items-start gap-x-2">
      <BccButton variant="primary" :rounded="true">Primary rounded</BccButton>
      <BccButton variant="secondary" :rounded="true">Secondary rounded</BccButton>
      <BccButton variant="tertiary" :rounded="true">Tertiary rounded</BccButton>
    </div>
  \`
})`,...(A=(Q=B.parameters)==null?void 0:Q.docs)==null?void 0:A.source}}};var F,j,H;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`() => ({
  components: {
    BccButton,
    SearchIcon
  },
  template: \`
    <div class="flex items-start gap-x-2">
      <BccButton icon="SearchIcon">
        With left icon
      </BccButton>
      <BccButton icon="SearchIcon" icon-right>
        With right icon
      </BccButton>
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton variant="secondary" icon="SearchIcon">
        Secondary with icon
      </BccButton>
      <BccButton variant="tertiary" icon="SearchIcon">
        Tertiary with icon
      </BccButton>
      <BccButton :disabled="true" icon="SearchIcon">
        Disabled with icon
      </BccButton>
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton size="xs" icon="SearchIcon">
        xs button
      </BccButton>
      <BccButton size="sm" icon="SearchIcon">
        sm button
      </BccButton>
      <BccButton size="base" icon="SearchIcon">
        base button
      </BccButton>
      <BccButton size="lg" icon="SearchIcon">
        lg button
      </BccButton>
      <BccButton size="xl" icon="SearchIcon">
        xl button
      </BccButton>
    </div>
  \`
})`,...(H=(j=l.parameters)==null?void 0:j.docs)==null?void 0:H.source}}};var U,G,J;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`() => ({
  components: {
    BccButton,
    SearchIcon
  },
  template: \`
    <div class="flex items-start gap-x-2">
      <BccButton icon="SearchIcon" />
      <BccButton icon-right icon="SearchIcon" />
      <BccButton rounded icon="SearchIcon" />
      <BccButton variant="secondary" icon="SearchIcon" />
      <BccButton variant="tertiary" icon="SearchIcon" />
      <BccButton disabled icon="SearchIcon" />
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton size="xs" icon="SearchIcon" />
      <BccButton size="sm" icon="SearchIcon" />
      <BccButton size="base" icon="SearchIcon" />
      <BccButton size="lg" icon="SearchIcon" />
      <BccButton size="xl" icon="SearchIcon" />
    </div>
  \`
})`,...(J=(G=d.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,X,Y;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`() => ({
  components: {
    BccButton,
    ChevronRightIcon,
    ChevronLeftIcon
  },
  template: \`
    <div class="space-y-4">
      <BccButton variant="primary" class="w-full">
        Default text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" :rounded="true" :disabled="true" icon="ChevronLeftIcon">
        Default text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-right icon="ChevronRightIcon">
        Default text, icon right
      </BccButton>
      
      <BccButton variant="primary" class="w-full" :center="false">
        Non-centered text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" :rounded="true" :disabled="true" :center="false" icon="ChevronLeftIcon">
        Non-centered text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-right :center="false" icon="ChevronRightIcon">
        Non-centered text, icon right
      </BccButton>
    </div>
  \`
})`,...(Y=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var _,tt,nt;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`() => ({
  components: {
    BccButton
  },
  template: \`
    <div class="flex items-start gap-x-2">
      <BccButton is="a" variant="primary">Primary</BccButton>
      <BccButton is="a" variant="secondary">Secondary</BccButton>
      <BccButton is="a" variant="tertiary">Tertiary</BccButton>
    </div>
  \`
})`,...(nt=(tt=p.parameters)==null?void 0:tt.docs)==null?void 0:nt.source}}};const gt=["Example","Primary","Secondary","Tertiary","Danger","Disabled","Rounded","WithIcon","IconOnly","ContentPosition","Anchor"];export{p as Anchor,m as ContentPosition,i as Danger,u as Disabled,c as Example,d as IconOnly,a as Primary,B as Rounded,r as Secondary,s as Tertiary,l as WithIcon,gt as __namedExportsOrder,ht as default};
//# sourceMappingURL=BccButton.stories-35ea406e.js.map
