(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7de4cdf6"],{1945:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{},[r("b",[t._v("Información del veterinario")]),r("v-divider"),r("form",[r("v-text-field",{staticClass:"mt-5 mb-5",attrs:{"error-messages":t.ErroresNombreUsuario,counter:30,label:"Nombre usuario",required:""},on:{input:function(e){return t.$v.nombreUsuario.$touch()},blur:function(e){return t.$v.nombreUsuario.$touch()}},model:{value:t.nombreUsuario,callback:function(e){t.nombreUsuario=e},expression:"nombreUsuario"}}),r("v-text-field",{staticClass:"mt-5 mb-5",attrs:{"error-messages":t.ErroresCorreo,label:"Correo",required:""},on:{input:function(e){return t.$v.correo.$touch()},blur:function(e){return t.$v.correo.$touch()}},model:{value:t.correo,callback:function(e){t.correo=e},expression:"correo"}}),r("v-btn",{staticClass:"mr-4 white--text",attrs:{rounded:"",color:"blue"},on:{click:t.actualizar}},[r("v-icon",{attrs:{left:"",color:"white"}},[t._v(" mdi-account ")]),t._v(" Actualizar ")],1),r("v-btn",{staticClass:"mr-4 white--text",attrs:{rounded:"",color:"blue"},on:{click:t.reiniciar}},[r("v-icon",{attrs:{left:"",color:"white"}},[t._v(" mdi-reload ")]),t._v(" Reiniciar ")],1)],1),r("v-snackbar",{attrs:{color:"white"},scopedSlots:t._u([{key:"action",fn:function(e){var i=e.attrs;return[r("v-btn",t._b({attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",i,!1),[t._v(" Cerrar ")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[r("p",{staticClass:"blue--text mt-5"},[t._v(t._s(t.mensaje))])])],1)},a=[],o=r("1da1"),s=(r("96cf"),r("b64b"),r("4ee7")),n=r("1dce"),c=r("b5ae"),u={mixins:[n["validationMixin"]],validations:{nombreUsuario:{required:c["required"],alphaNum:c["alphaNum"],maxLength:Object(c["maxLength"])(30)},correo:{required:c["required"],email:c["email"]}},data:function(){return{nombreUsuario:"",correo:"",snackbar:!1,mensaje:""}},computed:{ErroresNombreUsuario:function(){var t=[];return this.$v.nombreUsuario.$dirty?(!this.$v.nombreUsuario.maxLength&&t.push("El nombre de usuario es muy largo."),!this.$v.nombreUsuario.alphaNum&&t.push("El nombre de usuario debe ser alfanumerico."),!this.$v.nombreUsuario.required&&t.push("El nombre de usuario es requerido."),t):t},ErroresCorreo:function(){var t=[];return this.$v.correo.$dirty?(!this.$v.correo.email&&t.push("El correo debe ser válido."),!this.$v.correo.required&&t.push("El correo es requerido."),t):t}},methods:{actualizar:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$v.$touch(),!t.$v.$anyError){e.next=6;break}return t.mensaje="Hay un error en el formulario.",t.snackbar=!0,setTimeout((function(){t.snackbar=!1}),3e3),e.abrupt("return");case 6:r=s["b"].auth().currentUser,i={},a={},t.nombreUsuario!==r.displayName&&(i.displayName=t.nombreUsuario,a.nombreUsuario=t.nombreUsuario),t.correo!==r.email&&(i.email=t.correo,a.correo=t.correo),Object.keys(i).length?(i.displayName&&r.updateProfile(i),i.email&&r.updateEmail(i.email),s["a"].collection("Usuarios").doc(t.$store.state.usuarios.usuario.uid).update(a)):(t.mensaje="No hay datos para actualizar.",t.snackbar=!0,setTimeout((function(){t.snackbar=!1}),3e3));case 12:case"end":return e.stop()}}),e)})))()},reiniciar:function(){var t=s["b"].auth().currentUser;this.nombreUsuario=t.displayName,this.correo=t.email}},mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=t.$store.state.usuarios.usuario,t.nombreUsuario=r.nombreUsuario,t.correo=r.correo;case 3:case"end":return e.stop()}}),e)})))()}},l=u,h=r("2877"),m=r("6544"),d=r.n(m),b=r("8336"),v=r("ce7e"),p=r("132d"),f=r("2db4"),k=r("8654"),g=Object(h["a"])(l,i,a,!1,null,null,null);e["default"]=g.exports;d()(g,{VBtn:b["a"],VDivider:v["a"],VIcon:p["a"],VSnackbar:f["a"],VTextField:k["a"]})},"2db4":function(t,e,r){"use strict";r("ca71");var i=r("8dd9"),a=r("a9ad"),o=r("7560"),s=r("f2e7"),n=r("fe6c"),c=r("58df"),u=r("80d2"),l=r("d9bd");e["a"]=Object(c["a"])(i["a"],a["a"],s["a"],Object(n["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:o["a"].options.computed.isDark.call(this)},styles(){if(this.absolute)return{};const{bar:t,bottom:e,footer:r,insetFooter:i,left:a,right:o,top:s}=this.$vuetify.application;return{paddingBottom:Object(u["g"])(e+r+i),paddingLeft:this.app?Object(u["g"])(a):void 0,paddingRight:this.app?Object(u["g"])(o):void 0,paddingTop:Object(u["g"])(t+s)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&Object(l["e"])("auto-height",this),0==this.timeout&&Object(l["d"])('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(u["p"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[Object(u["p"])(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:i["a"].options.computed.classes.call(this),style:i["a"].options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout(()=>{this.isActive=!1},t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},ca71:function(t,e,r){}}]);
//# sourceMappingURL=chunk-7de4cdf6.cafd7142.js.map